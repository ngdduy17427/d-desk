import { RefObject, startTransition, useCallback, useEffect, useRef, useState } from "react";
import { clamp } from "utils/utils_helper";
import useContainerSize from "./useContainerSize";

interface IUseDragOption {
  containerRef?: RefObject<any>;
  isDraggable?: boolean;
  onDragStart?: () => void;
}

interface IDragState {
  isPressing: boolean;
  isDragging: boolean;
  relCursor: {
    relY: number;
    relX: number;
  };
  position?: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
}

const useDrag = <T extends HTMLElement>({
  containerRef,
  isDraggable = true,
  onDragStart,
}: IUseDragOption) => {
  const dragRef = useRef<T>(null);
  const dragLayerRef = useRef<T>(null);

  const { containerSize } = useContainerSize(containerRef as RefObject<any>);
  const [dragState, setDragState] = useState<IDragState>({
    isPressing: false,
    isDragging: false,
    relCursor: {
      relY: 0,
      relX: 0,
    },
  });

  const overrideEventDefaults = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onMouseMoveStart = useCallback(
    (event: any) => {
      onDragStart?.();

      if (!isDraggable || event.button === 1 || event.button === 2) return;
      overrideEventDefaults(event);

      startTransition(() =>
        setDragState((prevState) => ({
          ...prevState,
          isPressing: true,
          relCursor: {
            relY: Math.floor(
              event.pageY - (dragRef.current?.getBoundingClientRect().top as number)
            ),
            relX: Math.floor(
              event.pageX - (dragRef.current?.getBoundingClientRect().left as number)
            ),
          },
        }))
      );
    },
    [onDragStart, isDraggable, dragRef]
  );

  const onMouseMove = useCallback(
    (event: any) => {
      if (!isDraggable || !dragState.isPressing || !dragRef.current) return;
      overrideEventDefaults(event);

      let posTop: any = event.pageY - dragState.relCursor.relY;
      let posLeft: any = event.pageX - dragState.relCursor.relX;
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
      dragRef.current.style.top = `${Math.floor(posTop)}px`;
      dragRef.current.style.left = `${Math.floor(posLeft)}px`;
      dragRef.current.style.bottom = `${Math.floor(posBottom)}px`;
      dragRef.current.style.right = `${Math.floor(posRight)}px`;

      startTransition(() =>
        setDragState((prevState) => ({
          ...prevState,
          isDragging: true,
          position: {
            top: posTop,
            left: posLeft,
            bottom: posBottom,
            right: posRight,
          },
        }))
      );
    },
    [isDraggable, dragState, containerSize, dragRef]
  );

  const onMouseMoveEnd = useCallback(
    (event: any) => {
      if (dragState.isPressing)
        startTransition(() =>
          setDragState((prevState) => ({
            ...prevState,
            isPressing: false,
          }))
        );

      if (!dragState.isDragging) return;
      overrideEventDefaults(event);

      startTransition(() => {
        setDragState((prevState) => ({
          ...prevState,
          isDragging: false,
        }));

        (dragRef.current as HTMLElement).style.boxSizing = "";
        (dragRef.current as HTMLElement).style.position = "";
        (dragRef.current as HTMLElement).style.transition = "";
      });
    },
    [dragState]
  );

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

  return { dragRef, dragLayerRef, dragState };
};

export default useDrag;
