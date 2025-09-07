import React from 'react'

type WindowSize = {
  windowWidth: number | undefined
  windowHeight: number | undefined
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    windowWidth: undefined,
    windowHeight: undefined,
  })

  const updateWindowSize = () =>
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    })

  React.useEffect((): (() => void) => {
    updateWindowSize()

    addEventListener('resize', updateWindowSize)
    return () => removeEventListener('resize', updateWindowSize)
  }, [])

  return windowSize
}
