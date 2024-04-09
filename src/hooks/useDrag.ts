import { RefObject, useCallback, useEffect, useRef } from "react";
import { clamp } from "utils/utils_helper";
import useContainerSize from "./useContainerSize";

interface IUseDragOption {
  containerRef?: RefObject<any>;
  isDraggable?: boolean;
  onDragStart?: () => void;
}

interface IDragStateRef {
  isPressing: boolean;
  isDragging: boolean;
  relCursor: {
    relY: number;
    relX: number;
  };
  position: {
    top: number | undefined;
    left: number | undefined;
    bottom: number | undefined;
    right: number | undefined;
  };
}

const useDrag = <T extends HTMLElement>({
  containerRef,
  isDraggable = true,
  onDragStart,
}: IUseDragOption) => {
  const { containerSize } = useContainerSize(containerRef as RefObject<any>);

  const dragRef = useRef<T>(null);
  const dragLayerRef = useRef<T>(null);
  const dragStateRef = useRef<IDragStateRef>({
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

  const overrideEventDefaults = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onMouseMoveStart = useCallback(
    (event: any) => {
      onDragStart?.();

      if (!dragRef.current || !isDraggable || event.button === 1 || event.button === 2) return;
      overrideEventDefaults(event);

      dragStateRef.current.isPressing = true;
      dragStateRef.current.relCursor = {
        relY: Math.floor(event.pageY - dragRef.current.getBoundingClientRect().top),
        relX: Math.floor(event.pageX - dragRef.current.getBoundingClientRect().left),
      };
    },
    [onDragStart, isDraggable, dragRef]
  );

  const onMouseMove = useCallback(
    (event: any) => {
      if (!dragRef.current || !isDraggable || !dragStateRef.current.isPressing) return;
      overrideEventDefaults(event);

      dragStateRef.current.isDragging = true;

      let posTop: any = event.pageY - dragStateRef.current.relCursor.relY;
      let posLeft: any = event.pageX - dragStateRef.current.relCursor.relX;
      let posBottom: any = containerSize.offsetHeight - dragRef.current?.offsetHeight - posTop;
      let posRight: any = containerSize.offsetWidth - dragRef.current?.offsetWidth - posLeft;

      posTop = clamp(
        posTop,
        containerSize.offsetTop,
        containerSize.offsetHeight - dragRef.current?.offsetHeight + containerSize.offsetTop
      );
      posLeft = clamp(
        posLeft,
        containerSize.offsetLeft,
        containerSize.offsetWidth - dragRef.current?.offsetWidth + containerSize.offsetLeft
      );
      posBottom = clamp(
        posBottom,
        containerSize.offsetBottom,
        containerSize.offsetHeight - dragRef.current?.offsetHeight
      );
      posRight = clamp(
        posRight,
        containerSize.offsetRight,
        containerSize.offsetWidth - dragRef.current?.offsetWidth
      );

      dragRef.current.style.boxSizing = "border-box";
      dragRef.current.style.position = "fixed";
      dragRef.current.style.transition = "none";
      dragRef.current.style.pointerEvents = "none";
      dragRef.current.style.top = `${Math.floor(posTop)}px`;
      dragRef.current.style.left = `${Math.floor(posLeft)}px`;
      dragRef.current.style.bottom = `${Math.floor(posBottom)}px`;
      dragRef.current.style.right = `${Math.floor(posRight)}px`;

      dragStateRef.current.position = {
        top: posTop,
        left: posLeft,
        bottom: posBottom,
        right: posRight,
      };
    },
    [dragRef, isDraggable, containerSize]
  );

  const onMouseMoveEnd = useCallback((event: any) => {
    overrideEventDefaults(event);

    if (dragStateRef.current.isPressing) dragStateRef.current.isPressing = false;

    if (!dragRef.current || !dragStateRef.current.isDragging) return;
    dragStateRef.current.isDragging = false;
    dragRef.current.style.boxSizing = "";
    dragRef.current.style.position = "";
    dragRef.current.style.transition = "";
    dragRef.current.style.pointerEvents = "";
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseMoveEnd);

    if (dragLayerRef.current) {
      dragLayerRef.current.onmousedown = onMouseMoveStart;
      dragLayerRef.current.onmousemove = onMouseMove;
      dragLayerRef.current.onmouseup = onMouseMoveEnd;
    } else if (dragRef.current) {
      dragRef.current.onmousedown = onMouseMoveStart;
      dragRef.current.onmousemove = onMouseMove;
      dragRef.current.onmouseup = onMouseMoveEnd;
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseMoveEnd);
    };
  }, [onMouseMoveStart, onMouseMove, onMouseMoveEnd]);

  return {
    dragRef,
    dragLayerRef,
    dragState: {
      isDragging: dragStateRef.current.isDragging,
      position: dragStateRef.current.position,
    },
  };
};

export default useDrag;
