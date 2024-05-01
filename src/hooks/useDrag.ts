import React from "react";
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
    relX: number;
    relY: number;
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
  const [dragState, setDragState] = React.useState<IDragState>({
    isPressing: false,
    isDragging: false,
    relCursor: {
      relX: 0,
      relY: 0,
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

  const onInitRelCursor = React.useCallback(
    (x: number, y: number): void => {
      requestAnimationFrame((): void => {
        setDragState(
          (prevState): IDragState => ({
            ...prevState,
            isPressing: true,
            relCursor: {
              relX: Math.floor(x - dragRef.getBoundingClientRect().left),
              relY: Math.floor(y - dragRef.getBoundingClientRect().top),
            },
          })
        );
      });
    },
    [dragRef]
  );

  const onMoveElement = React.useCallback(
    (x: number, y: number): void => {
      requestAnimationFrame((): void => {
        setDragState(
          (prevState): IDragState => ({
            ...prevState,
            isDragging: true,
          })
        );

        let posTop: any = y - dragState.relCursor.relY;
        let posLeft: any = x - dragState.relCursor.relX;
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
      dragState.relCursor.relX,
      dragState.relCursor.relY,
      containerSize.offsetWidth,
      containerSize.offsetHeight,
      containerSize.offsetTop,
      containerSize.offsetLeft,
      containerSize.offsetBottom,
      containerSize.offsetRight,
    ]
  );

  const onMouseMoveStart = React.useCallback(
    (event: MouseEvent): void => {
      onDragStart?.();

      if (!dragRef || !isDraggable || event.button !== 0) return;
      overrideEventDefaults(event);
      onInitRelCursor(event.pageX, event.pageY);
    },
    [onDragStart, dragRef, isDraggable, onInitRelCursor]
  );

  const onMouseMove = React.useCallback(
    (event: MouseEvent): void => {
      if (!dragRef || !isDraggable || !dragState.isPressing) return;
      overrideEventDefaults(event);
      onMoveElement(event.pageX, event.pageY);
    },
    [dragRef, isDraggable, dragState.isPressing, onMoveElement]
  );

  const onTouchMoveStart = React.useCallback(
    (event: TouchEvent): void => {
      onDragStart?.();

      if (!dragRef || !isDraggable) return;
      onInitRelCursor(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
    },
    [onDragStart, dragRef, isDraggable, onInitRelCursor]
  );

  const onTouchMove = React.useCallback(
    (event: TouchEvent): void => {
      if (!dragRef || !isDraggable || !dragState.isPressing) return;
      onMoveElement(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
    },
    [dragRef, isDraggable, dragState.isPressing, onMoveElement]
  );

  const onMoveEnd = React.useCallback(
    (event: MouseEvent | TouchEvent): void => {
      if (dragState.isPressing)
        setDragState(
          (prevState): IDragState => ({
            ...prevState,
            isPressing: false,
          })
        );

      if (!dragRef || !dragState.isDragging) return;
      overrideEventDefaults(event);

      requestAnimationFrame((): void => {
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
        if (element) {
          element.onmousedown = onMouseMoveStart;
          element.ontouchstart = onTouchMoveStart;
        }
      });
    } else if (dragRef) {
      dragRef.onmousedown = onMouseMoveStart;
      dragRef.ontouchstart = onTouchMoveStart;
    }

    addEventListener("mousemove", onMouseMove);
    addEventListener("mouseup", onMoveEnd);
    addEventListener("touchmove", onTouchMove);
    addEventListener("touchend", onMoveEnd);
    return (): void => {
      removeEventListener("mousemove", onMouseMove);
      removeEventListener("mouseup", onMoveEnd);
      removeEventListener("touchmove", onTouchMove);
      removeEventListener("touchend", onMoveEnd);
    };
  }, [
    dragRef,
    dragLayerRef,
    onMouseMoveStart,
    onMouseMove,
    onTouchMoveStart,
    onTouchMove,
    onMoveEnd,
  ]);

  return { dragState };
};

export default useDrag;
