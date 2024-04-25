import { IAppContext, TAppDispatch } from "@type";
import classNames from "classnames";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
import useContainerSize from "hooks/useContainerSize";
import useDrag from "hooks/useDrag";
import { IProgramFile } from "program_files";
import { useMemo, useRef } from "react";
import { clamp, isUndefined } from "utils/utils_helper";
import { WCDWindow } from "web_components";
import "./css.css";
import DWindowBody from "./ui/d_window_body";
import DWindowHeader from "./ui/d_window_header";

export enum EDWindowSizing {
  NORMAL,
  MINIMIZE,
  MAXIMIZE,
}

export interface IDWindowState {
  width: number;
  height: number;
  sizing?: EDWindowSizing;
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  isCenter?: boolean;
  isDraggable?: boolean;
  runtime?: Date;
}

interface IDWindowProps {
  windowApp: IProgramFile;
  appContext: IAppContext;
  appDispatch: TAppDispatch;
  container: HTMLElement;
}

interface IDWindowStyle {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  zIndex: number;
}

const DWindow = ({
  windowApp,
  appContext: { processIndex, processMinimize },
  appDispatch,
  container,
}: IDWindowProps): JSX.Element => {
  const { windowState } = windowApp;

  const windowRef = useRef<HTMLElement>(null);
  const windowHeaderRef = useRef<HTMLElement>(null);

  const containerSize = useContainerSize(container);

  const { dragState } = useDrag<HTMLElement>({
    dragRef: windowRef.current,
    dragLayerRef: [windowHeaderRef.current],
    isDraggable: windowState.isDraggable && windowState.sizing === EDWindowSizing.NORMAL,
    onDragStart: (): void =>
      appDispatch(AppActionType.CLICK_WINDOW, { programFileId: windowApp.id }),
    container: container,
  });

  const minWidthMinimize = useMemo(
    (): number => containerSize.offsetWidth / processMinimize?.length,
    [containerSize.offsetWidth, processMinimize.length]
  );
  const minWidth = useMemo(
    (): number => clamp(minWidthMinimize, minWidthMinimize, 200),
    [minWidthMinimize]
  );
  const minHeight = useMemo(
    (): number => clamp(containerSize.offsetHeight, containerSize.offsetHeight, 40),
    [containerSize.offsetHeight]
  );
  const maxWidth = useMemo(
    (): number => clamp(windowState.width, windowState.width, containerSize.offsetWidth),
    [windowState.width, containerSize.offsetWidth]
  );
  const maxHeight = useMemo(
    (): number => clamp(windowState.height, windowState.height, containerSize.offsetHeight),
    [windowState.height, containerSize.offsetHeight]
  );

  const windowStyle = useMemo((): IDWindowStyle => {
    let _windowStyle: IDWindowStyle = {
      width: maxWidth,
      height: maxHeight,
      top: windowState.position?.top,
      right: windowState.position?.right,
      bottom: windowState.position?.bottom,
      left: windowState.position?.left,
      zIndex: processIndex?.length - processIndex?.indexOf(String(windowApp.id)),
    };

    if (windowState.isCenter)
      _windowStyle = {
        ..._windowStyle,
        top: containerSize.offsetTop + containerSize.offsetHeight / 2 - maxHeight / 2,
        right: containerSize.offsetLeft + containerSize.offsetWidth / 2 - maxWidth / 2,
        bottom: containerSize.offsetTop + containerSize.offsetHeight / 2 - maxHeight / 2,
        left: containerSize.offsetLeft + containerSize.offsetWidth / 2 - maxWidth / 2,
      };

    switch (windowState.sizing) {
      case EDWindowSizing.NORMAL: {
        if (
          !isUndefined(dragState.position.top) &&
          !isUndefined(dragState.position.right) &&
          !isUndefined(dragState.position.bottom) &&
          !isUndefined(dragState.position.left)
        ) {
          _windowStyle = {
            ..._windowStyle,
            top: clamp(
              dragState.position?.top,
              containerSize.offsetTop,
              containerSize.offsetHeight - maxHeight + containerSize.offsetTop
            ),
            left: clamp(
              dragState.position?.left,
              containerSize.offsetLeft,
              containerSize.offsetWidth - maxWidth + containerSize.offsetLeft
            ),
            bottom: clamp(
              dragState.position?.bottom,
              containerSize.offsetBottom,
              containerSize.offsetHeight - maxHeight
            ),
            right: clamp(
              dragState.position?.right,
              containerSize.offsetRight,
              containerSize.offsetWidth - maxWidth
            ),
          };
        }
        break;
      }
      case EDWindowSizing.MINIMIZE:
        _windowStyle = {
          ..._windowStyle,
          width: minWidth,
          height: minHeight,
          top: containerSize.offsetTop + containerSize.offsetHeight - minHeight,
          right: containerSize.offsetWidth - minWidth,
          bottom: containerSize.offsetBottom,
          left:
            (containerSize.offsetLeft + minWidth) * processMinimize?.indexOf(String(windowApp.id)),
          zIndex: 0,
        };
        break;
      case EDWindowSizing.MAXIMIZE:
        _windowStyle = {
          ..._windowStyle,
          width: containerSize.offsetWidth,
          height: containerSize.offsetHeight,
          top: containerSize.offsetTop,
          right: containerSize.offsetRight,
          bottom: containerSize.offsetBottom,
          left: containerSize.offsetLeft,
        };
        break;
      default:
        break;
    }

    return _windowStyle;
  }, [
    windowApp,
    windowState,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    processIndex,
    processMinimize,
    dragState.position,
    containerSize,
  ]);

  return (
    <WCDWindow
      ref={windowRef}
      id={windowApp.id}
      style={windowStyle}
      className={classNames(
        { center: windowState.isCenter },
        { minimize: windowState.sizing === EDWindowSizing.MINIMIZE },
        { maximize: windowState.sizing === EDWindowSizing.MAXIMIZE }
      )}
      onClick={(): void => appDispatch(AppActionType.CLICK_WINDOW, { programFileId: windowApp.id })}
    >
      <DWindowHeader ref={windowHeaderRef} windowApp={windowApp} />
      <DWindowBody windowApp={windowApp} />
    </WCDWindow>
  );
};

export default withContext(DWindow);
