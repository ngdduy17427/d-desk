import { IAppContext, TAppDispatch } from "@type";
import classNames from "classnames";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
import useContainerSize from "hooks/useContainerSize";
import useDrag from "hooks/useDrag";
import { IProgramFile } from "program_files";
import { RefObject, startTransition, useEffect, useMemo, useState } from "react";
import { clamp } from "utils/utils_helper";
import "./css.scss";
import BtnClose from "./ui/btn_close";
import BtnMaximize from "./ui/btn_maximize";
import BtnMinimize from "./ui/btn_minimize";

export enum IWindowsSize {
  NORMAL,
  MINIMIZE,
  MAXIMIZE,
  FULLSCREEN,
}

const Windows = ({
  windowsApp,
  containerRef,
  appContext: { processIndex, processMinimize },
  appDispatch,
}: {
  windowsApp: IProgramFile;
  containerRef?: RefObject<any>;
  appContext: IAppContext;
  appDispatch: TAppDispatch;
}) => {
  const [windowsSize, setWindowsSize] = useState(IWindowsSize.NORMAL);
  const { containerSize } = useContainerSize(containerRef as RefObject<any>);
  const { dragRef, dragLayerRef, dragState } = useDrag<HTMLDivElement>({
    containerRef: containerRef,
    isDraggable: windowsApp.isDraggable && windowsSize === IWindowsSize.NORMAL,
    onDragStart: () => appDispatch(AppActionType.CLICK_WINDOWS, { programFileId: windowsApp.id }),
  });

  useEffect(() => {
    const handleOpenWindows = (event: CustomEventInit) => {
      if (
        event.detail.windowsId !== windowsApp.id ||
        event.detail.windowsSize !== IWindowsSize.MINIMIZE ||
        windowsSize !== IWindowsSize.MINIMIZE
      )
        return;

      startTransition(() => setWindowsSize(IWindowsSize.NORMAL));
    };

    window.addEventListener("openWindows", handleOpenWindows);
    return () => window.removeEventListener("openWindows", handleOpenWindows);
  }, [windowsApp.id, windowsSize]);

  const minWidthMinimize = useMemo(
    () => containerSize.offsetWidth / processMinimize?.length,
    [containerSize.offsetWidth, processMinimize.length]
  );
  const minWidth = useMemo(
    () => clamp(minWidthMinimize, minWidthMinimize, 200),
    [minWidthMinimize]
  );
  const minHeight = useMemo(
    () => clamp(containerSize.offsetHeight, containerSize.offsetHeight, 40),
    [containerSize.offsetHeight]
  );
  const maxWidth = useMemo(
    () => clamp(windowsApp.width, windowsApp.width, containerSize.offsetWidth),
    [windowsApp.width, containerSize.offsetWidth]
  );
  const maxHeight = useMemo(
    () => clamp(windowsApp.height, windowsApp.height, containerSize.offsetHeight),
    [windowsApp.height, containerSize.offsetHeight]
  );

  const windowsStyle = useMemo(() => {
    let _windowsStyle = {
      width: maxWidth,
      height: maxHeight,
      top: windowsApp.position?.top,
      right: windowsApp.position?.right,
      bottom: windowsApp.position?.bottom,
      left: windowsApp.position?.left,
      zIndex: processIndex?.length - processIndex?.indexOf(windowsApp.id as string),
    };

    if (windowsApp.isCenter)
      _windowsStyle = {
        ..._windowsStyle,
        top: containerSize.offsetTop + containerSize.offsetHeight / 2 - maxHeight / 2,
        right: containerSize.offsetLeft + containerSize.offsetWidth / 2 - maxWidth / 2,
        bottom: containerSize.offsetTop + containerSize.offsetHeight / 2 - maxHeight / 2,
        left: containerSize.offsetLeft + containerSize.offsetWidth / 2 - maxWidth / 2,
      };

    switch (windowsSize) {
      case IWindowsSize.NORMAL:
        if (dragState.position)
          _windowsStyle = {
            ..._windowsStyle,
            top: dragState.position?.top,
            right: dragState.position?.right,
            bottom: dragState.position?.bottom,
            left: dragState.position?.left,
          };
        break;
      case IWindowsSize.MINIMIZE:
        _windowsStyle = {
          ..._windowsStyle,
          width: minWidth,
          height: minHeight,
          top: containerSize.offsetTop + containerSize.offsetHeight - minHeight,
          right: containerSize.offsetWidth - minWidth,
          bottom: containerSize.offsetBottom,
          left:
            (containerSize.offsetLeft + minWidth) *
            processMinimize?.indexOf(windowsApp.id as string),
          zIndex: 0,
        };
        break;
      case IWindowsSize.MAXIMIZE:
        _windowsStyle = {
          ..._windowsStyle,
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

    return _windowsStyle;
  }, [
    windowsApp,
    windowsSize,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    processMinimize,
    dragState.position,
    containerSize,
    processIndex,
  ]);

  const WindowsComponent = windowsApp.component;

  return (
    <windows
      ref={dragRef}
      id={windowsApp.id}
      style={windowsStyle}
      className={classNames(
        { center: windowsApp.isCenter },
        { minimize: windowsSize === IWindowsSize.MINIMIZE },
        { maximize: windowsSize === IWindowsSize.MAXIMIZE }
      )}
      onClick={() => appDispatch(AppActionType.CLICK_WINDOWS, { programFileId: windowsApp.id })}
    >
      <div ref={dragLayerRef} className="windows-header">
        <h1 className="windows-name">{windowsApp.name}</h1>
        <div className="windows-nav">
          <BtnMinimize
            windowsId={windowsApp.id as string}
            windowsSize={windowsSize}
            setWindowsSize={(size) => startTransition(() => setWindowsSize(size))}
          />
          <BtnMaximize
            windowsId={windowsApp.id as string}
            windowsSize={windowsSize}
            setWindowsSize={(size) => startTransition(() => setWindowsSize(size))}
          />
          <BtnClose
            onClick={() =>
              appDispatch(AppActionType.CLOSE_WINDOWS, {
                programFileId: windowsApp.id,
              })
            }
          />
        </div>
      </div>
      <div className="windows-body">
        <WindowsComponent windowsApp={windowsApp} />
      </div>
    </windows>
  );
};

export default withContext(Windows);
