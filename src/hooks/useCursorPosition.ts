import { useCallback, useLayoutEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

interface ICursorState {
  cursorTop?: number;
  cursorLeft?: number;
  cursorBottom?: number;
  cursorRight?: number;
  cursorY?: number;
  cursorX?: number;
}

const useCursorPosition = () => {
  const {
    windowSize: { windowWidth, windowHeight },
  } = useWindowSize();
  const [cursorPos, setCursorPos] = useState<ICursorState>({
    cursorTop: undefined,
    cursorLeft: undefined,
    cursorBottom: undefined,
    cursorRight: undefined,
    cursorY: undefined,
    cursorX: undefined,
  });

  const onMouseMove = useCallback(
    (event: any) => {
      setCursorPos({
        cursorTop: event.pageY,
        cursorLeft: event.pageX,
        cursorBottom: Math.abs(windowHeight - event.pageY),
        cursorRight: Math.abs(windowWidth - event.pageX),
        cursorY: event.pageY,
        cursorX: event.pageX,
      });
    },
    [windowWidth, windowHeight]
  );

  useLayoutEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return [cursorPos];
};

export default useCursorPosition;
