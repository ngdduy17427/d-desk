import { IAppContext, TAppDispatch } from "@type";
import classNames from "classnames";
import { AppActionType } from "store/actions";
import { withContext } from "store/context";
import useContainerSize from "hooks/use-container-size";
import useDrag from "hooks/use-drag";
import { IProgramFile } from "program-files";
import { useMemo, useRef } from "react";
import { clamp, isUndefined } from "utils/utils-helper";
import { WCDWindow } from "web-components";
import "./css.css";
import DWindowBody from "./ui/d-window-body";
import DWindowHeader from "./ui/d-window-header";

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
  isFocus?: boolean;
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
    dragRef: windowRef.current as HTMLElement,
    dragLayerRef: [windowHeaderRef.current as HTMLElement],
    isDraggable: windowState?.isDraggable && windowState.sizing === EDWindowSizing.NORMAL,
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
    (): number =>
      clamp(Number(windowState?.width), Number(windowState?.width), containerSize.offsetWidth),
    [windowState?.width, containerSize.offsetWidth]
  );
  const maxHeight = useMemo(
    (): number =>
      clamp(Number(windowState?.height), Number(windowState?.height), containerSize.offsetHeight),
    [windowState?.height, containerSize.offsetHeight]
  );

  const windowStyle = useMemo((): IDWindowStyle => {
    let _windowStyle: IDWindowStyle = {
      width: maxWidth,
      height: maxHeight,
      top: Number(windowState?.position?.top),
      right: Number(windowState?.position?.right),
      bottom: Number(windowState?.position?.bottom),
      left: Number(windowState?.position?.left),
      zIndex: processIndex?.length - processIndex?.indexOf(String(windowApp.id)),
    };

    if (windowState?.isCenter)
      _windowStyle = {
        ..._windowStyle,
        top: containerSize.offsetTop + containerSize.offsetHeight / 2 - maxHeight / 2,
        right: containerSize.offsetLeft + containerSize.offsetWidth / 2 - maxWidth / 2,
        bottom: containerSize.offsetTop + containerSize.offsetHeight / 2 - maxHeight / 2,
        left: containerSize.offsetLeft + containerSize.offsetWidth / 2 - maxWidth / 2,
      };

    switch (windowState?.sizing) {
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
              Number(dragState.position?.top),
              containerSize.offsetTop,
              containerSize.offsetHeight - maxHeight + containerSize.offsetTop
            ),
            left: clamp(
              Number(dragState.position?.left),
              containerSize.offsetLeft,
              containerSize.offsetWidth - maxWidth + containerSize.offsetLeft
            ),
            bottom: clamp(
              Number(dragState.position?.bottom),
              containerSize.offsetBottom,
              containerSize.offsetHeight - maxHeight
            ),
            right: clamp(
              Number(dragState.position?.right),
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
        { center: windowState?.isCenter },
        { focus: windowState?.isFocus },
        { minimize: windowState?.sizing === EDWindowSizing.MINIMIZE },
        { maximize: windowState?.sizing === EDWindowSizing.MAXIMIZE }
      )}
      onClick={(): void => appDispatch(AppActionType.CLICK_WINDOW, { programFileId: windowApp.id })}
    >
      <DWindowHeader ref={windowHeaderRef} windowApp={windowApp} />
      <DWindowBody windowApp={windowApp} />
    </WCDWindow>
  );
};

export default withContext(DWindow);
