import { AppActionType } from "app/app_action";
import { useAppContext } from "app/app_context";
import classNames from "classnames";
import useContainerSize from "hooks/useContainerSize";
import useDrag from "hooks/useDrag";
import { IProgramFile } from "program_files";
import { RefObject, createElement, useMemo, useState } from "react";
import { clamp } from "utils/utils_helper";
import BtnClose from "./btn_close";
import BtnMaximize from "./btn_maximize";
import BtnMinimize from "./btn_minimize";
import "./css.scss";

export enum IWindowsSize {
  NORMAL,
  MINIMIZE,
  MAXIMIZE,
  FULLSCREEN,
}

const Windows = ({
  windowsApp,
  containerRef,
}: {
  windowsApp: IProgramFile;
  containerRef?: RefObject<any>;
}) => {
  const [windowsSize, setWindowsSize] = useState(IWindowsSize.NORMAL);
  const { containerSize } = useContainerSize(containerRef as RefObject<any>);
  const {
    appContext: { processIndex, processMinimize },
    appDispatch,
  } = useAppContext();
  const { dragRef, dragLayerRef, dragState } = useDrag({
    containerRef: containerRef,
    isDraggable: windowsApp.isDraggable,
    onDragStart: () => appDispatch(AppActionType.CLICK_WINDOWS, windowsApp.id),
  });

  const minWidthMinimize = useMemo(
    () => containerSize.offsetWidth / processMinimize?.length,
    [containerSize.offsetWidth, processMinimize.length]
  );
  const minWidth = useMemo(
    () => clamp(minWidthMinimize, minWidthMinimize, 200),
    [minWidthMinimize]
  );
  const minHeight = useMemo(
    () => clamp(containerSize.offsetHeight, containerSize.offsetHeight, 32),
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

  return (
    <div
      ref={dragRef}
      id={windowsApp.id}
      style={windowsStyle}
      className={classNames(
        "windows",
        { center: windowsApp.isCenter },
        { minimize: windowsSize === IWindowsSize.MINIMIZE },
        { maximize: windowsSize === IWindowsSize.MAXIMIZE }
      )}
      onClick={() => appDispatch(AppActionType.CLICK_WINDOWS, windowsApp.id)}
    >
      <div ref={dragLayerRef} className="windows-header">
        <span className="windows-name">{windowsApp.name}</span>
        <div className="windows-nav">
          <BtnMinimize
            windowsRef={dragRef}
            windowsSize={windowsSize}
            setWindowsSize={setWindowsSize}
          />
          <BtnMaximize
            windowsRef={dragRef}
            windowsSize={windowsSize}
            setWindowsSize={setWindowsSize}
          />
          <BtnClose windowsRef={dragRef} />
        </div>
      </div>
      <div className="windows-body">{createElement(windowsApp.component, { ...windowsApp })}</div>
    </div>
  );
};

export default Windows;
