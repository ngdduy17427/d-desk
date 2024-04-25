import React, { useState } from "react";
import { clamp } from "utils/utils_helper";
import useContainerSize from "./useContainerSize";

interface IUseDragProps<T> {
  dragRef: T;
  dragLayerRef: T[];
  isDraggable?: boolean;
  onDragStart?: () => void;
  container?: HTMLElement;
}

interface IDragPosition {
  top: number | undefined;
  left: number | undefined;
  bottom: number | undefined;
  right: number | undefined;
}

interface IDragState {
  isPressing: boolean;
  isDragging: boolean;
  relCursor: {
    relY: number;
    relX: number;
  };
  position: IDragPosition;
}

export interface IDrag {
  dragState: {
    isDragging: boolean;
    position: IDragPosition;
  };
}

const useDrag = <T extends HTMLElement>({
  dragRef,
  dragLayerRef,
  isDraggable = true,
  onDragStart,
  container,
}: IUseDragProps<T>): IDrag => {
  const containerSize = useContainerSize(container);
  const [dragState, setDragState] = useState<IDragState>({
    isPressing: false,
    isDragging: false,
    relCursor: {
      relY: 0,
      relX: 0,
    },
    position: {
      top: undefined,
      left: undefined,
      bottom: undefined,
      right: undefined,
    },
  });

  const overrideEventDefaults = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onMouseMoveStart = React.useCallback(
    (event: MouseEvent): void => {
      onDragStart?.();

      if (!dragRef || !isDraggable || event.button === 1 || event.button === 2) return;
      overrideEventDefaults(event);

      window.requestAnimationFrame((): void => {
        setDragState(
          (prevState): IDragState => ({
            ...prevState,
            isPressing: true,
            relCursor: {
              relY: Math.floor(event.pageY - dragRef.getBoundingClientRect().top),
              relX: Math.floor(event.pageX - dragRef.getBoundingClientRect().left),
            },
          })
        );
      });
    },
    [dragRef, isDraggable, onDragStart]
  );

  const onMouseMove = React.useCallback(
    (event: MouseEvent): void => {
      if (!dragRef || !isDraggable || !dragState.isPressing) return;
      overrideEventDefaults(event);

      window.requestAnimationFrame((): void => {
        setDragState(
          (prevState): IDragState => ({
            ...prevState,
            isDragging: true,
          })
        );

        let posTop: any = event.pageY - dragState.relCursor.relY;
        let posLeft: any = event.pageX - dragState.relCursor.relX;
        let posBottom: any =
          containerSize.offsetHeight - dragRef.offsetHeight - posTop + containerSize.offsetTop;
        let posRight: any =
          containerSize.offsetWidth - dragRef.offsetWidth - posLeft + containerSize.offsetLeft;

        posTop = clamp(
          posTop,
          containerSize.offsetTop,
          containerSize.offsetHeight - dragRef.offsetHeight + containerSize.offsetTop
        );
        posLeft = clamp(
          posLeft,
          containerSize.offsetLeft,
          containerSize.offsetWidth - dragRef.offsetWidth + containerSize.offsetLeft
        );
        posBottom = clamp(
          posBottom,
          containerSize.offsetBottom,
          containerSize.offsetHeight - dragRef.offsetHeight
        );
        posRight = clamp(
          posRight,
          containerSize.offsetRight,
          containerSize.offsetWidth - dragRef.offsetWidth
        );

        dragRef.style.boxSizing = "border-box";
        dragRef.style.position = "fixed";
        dragRef.style.transition = "none";
        dragRef.style.pointerEvents = "none";
        dragRef.style.top = `${Math.floor(posTop)}px`;
        dragRef.style.left = `${Math.floor(posLeft)}px`;
        dragRef.style.bottom = `${Math.floor(posBottom)}px`;
        dragRef.style.right = `${Math.floor(posRight)}px`;

        setDragState(
          (prevState): IDragState => ({
            ...prevState,
            position: {
              top: posTop,
              left: posLeft,
              bottom: posBottom,
              right: posRight,
            },
          })
        );
      });
    },
    [
      dragRef,
      isDraggable,
      dragState.isPressing,
      dragState.relCursor.relX,
      dragState.relCursor.relY,
      containerSize,
    ]
  );

  const onMouseMoveEnd = React.useCallback(
    (event: MouseEvent): void => {
      if (dragState.isPressing)
        setDragState(
          (prevState): IDragState => ({
            ...prevState,
            isPressing: false,
          })
        );

      if (!dragRef || !dragState.isDragging) return;
      overrideEventDefaults(event);

      window.requestAnimationFrame((): void => {
        dragRef.style.boxSizing = "";
        dragRef.style.position = "";
        dragRef.style.transition = "";
        dragRef.style.pointerEvents = "";

        setDragState(
          (prevState): IDragState => ({
            ...prevState,
            isDragging: false,
          })
        );
      });
    },
    [dragRef, dragState.isPressing, dragState.isDragging]
  );

  React.useLayoutEffect((): (() => void) => {
    if (dragLayerRef.length > 0) {
      dragLayerRef.forEach((element): void => {
        if (element) element.onmousedown = onMouseMoveStart;
      });
    } else if (dragRef) dragRef.onmousedown = onMouseMoveStart;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseMoveEnd);
    return (): void => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseMoveEnd);
    };
  }, [dragRef, dragLayerRef, onMouseMoveStart, onMouseMove, onMouseMoveEnd]);

  return { dragState };
};

export default useDrag;
