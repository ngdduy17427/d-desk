import React from "react";
import { isUndefined } from "utils/utils_helper";
import useWindowSize from "./useWindowSize";

export interface IContainerSize {
  offsetWidth: number;
  offsetHeight: number;
  offsetTop: number;
  offsetLeft: number;
  offsetBottom: number;
  offsetRight: number;
}

const useContainerSize = <ElementType extends HTMLElement>(
  containerElement?: ElementType
): IContainerSize => {
  const windowSize = useWindowSize();

  const containerSize = React.useMemo(
    (): IContainerSize => ({
      offsetWidth: !isUndefined(containerElement?.offsetWidth)
        ? Number(containerElement?.offsetWidth)
        : windowSize.windowWidth,
      offsetHeight: !isUndefined(containerElement?.offsetHeight)
        ? Number(containerElement?.offsetHeight)
        : windowSize.windowHeight,
      offsetTop: !isUndefined(containerElement?.offsetTop)
        ? Number(containerElement?.offsetTop)
        : 0,
      offsetLeft: !isUndefined(containerElement?.offsetLeft)
        ? Number(containerElement?.offsetLeft)
        : 0,
      offsetBottom:
        !isUndefined(containerElement?.offsetTop) && !isUndefined(containerElement?.offsetHeight)
          ? windowSize.windowHeight - containerElement?.offsetTop - containerElement?.offsetHeight
          : 0,
      offsetRight:
        !isUndefined(containerElement?.offsetLeft) && !isUndefined(containerElement?.offsetWidth)
          ? windowSize.windowWidth - containerElement?.offsetLeft - containerElement?.offsetWidth
          : 0,
    }),
    [containerElement, windowSize.windowWidth, windowSize.windowHeight]
  );

  return containerSize;
};

export default useContainerSize;
