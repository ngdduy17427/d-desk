import { RefObject, useMemo } from "react";
import { isUndefined } from "utils/utils_helper";
import useWindowSize from "./useWindowSize";

const useContainerSize = (containerRef: RefObject<any>) => {
  const {
    windowSize: { windowWidth, windowHeight },
  } = useWindowSize();

  const containerSize = useMemo(
    () => ({
      offsetWidth: !isUndefined(containerRef?.current?.offsetWidth)
        ? (containerRef?.current?.offsetWidth as number)
        : windowWidth,
      offsetHeight: !isUndefined(containerRef?.current?.offsetHeight)
        ? (containerRef?.current?.offsetHeight as number)
        : windowHeight,
      offsetTop: !isUndefined(containerRef?.current?.offsetTop)
        ? (containerRef?.current?.offsetTop as number)
        : 0,
      offsetLeft: !isUndefined(containerRef?.current?.offsetLeft)
        ? (containerRef?.current?.offsetLeft as number)
        : 0,
      offsetBottom:
        !isUndefined(containerRef?.current?.offsetTop) &&
        !isUndefined(containerRef?.current?.offsetHeight)
          ? windowHeight - containerRef?.current?.offsetTop - containerRef?.current?.offsetHeight
          : 0,
      offsetRight:
        !isUndefined(containerRef?.current?.offsetLeft) &&
        !isUndefined(containerRef?.current?.offsetWidth)
          ? windowWidth - containerRef?.current?.offsetLeft - containerRef?.current?.offsetWidth
          : 0,
    }),
    [containerRef, windowWidth, windowHeight]
  );

  return { containerSize };
};

export default useContainerSize;
