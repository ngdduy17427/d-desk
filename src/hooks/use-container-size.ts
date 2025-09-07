import React from 'react'
import { isUndefined } from 'utils/utils-helper'
import { useWindowSize } from './use-window-size'

export type ContainerSize = {
  offsetWidth: number
  offsetHeight: number
  offsetTop: number
  offsetLeft: number
  offsetBottom: number
  offsetRight: number
}

export const useContainerSize = <ElementType extends HTMLElement>(
  containerElement?: ElementType,
): ContainerSize => {
  const windowSize = useWindowSize()

  const containerSize = React.useMemo(
    (): ContainerSize => ({
      offsetWidth: Number(
        !isUndefined(containerElement?.offsetWidth)
          ? Number(containerElement?.offsetWidth)
          : windowSize.windowWidth,
      ),
      offsetHeight: Number(
        !isUndefined(containerElement?.offsetHeight)
          ? Number(containerElement?.offsetHeight)
          : windowSize.windowHeight,
      ),
      offsetTop: Number(
        !isUndefined(containerElement?.offsetTop) ? Number(containerElement?.offsetTop) : 0,
      ),
      offsetLeft: Number(
        !isUndefined(containerElement?.offsetLeft) ? Number(containerElement?.offsetLeft) : 0,
      ),
      offsetBottom: Number(
        !isUndefined(containerElement?.offsetTop) && !isUndefined(containerElement?.offsetHeight)
          ? Number(windowSize.windowHeight) -
              Number(containerElement?.offsetTop) -
              Number(containerElement?.offsetHeight)
          : 0,
      ),
      offsetRight: Number(
        !isUndefined(containerElement?.offsetLeft) && !isUndefined(containerElement?.offsetWidth)
          ? Number(windowSize.windowWidth) -
              Number(containerElement?.offsetLeft) -
              Number(containerElement?.offsetWidth)
          : 0,
      ),
    }),
    [containerElement, windowSize.windowWidth, windowSize.windowHeight],
  )

  return containerSize
}
