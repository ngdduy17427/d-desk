import React from 'react'

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>
    mozFullScreen?: Element
    mozFullScreenElement?: Element
    msExitFullscreen?: () => Promise<void>
    msFullscreenElement?: Element
    webkitExitFullscreen?: () => Promise<void>
    webkitFullscreenElement?: Element
    webkitIsFullScreen?: boolean
  }

  interface HTMLElement {
    mozRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
  }
}

type FullScreen = {
  isFullscreen: boolean
  handleFullscreen: () => void
  handleExitFullscreen: () => void
}

export const useFullscreen = (): FullScreen => {
  const [isFullscreen, setIsFullScreen] = React.useState(false)

  const handleFullscreen = () => {
    if (isFullscreen) return

    if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.mozRequestFullscreen) {
      document.documentElement.mozRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }

    setIsFullScreen(true)
  }

  const handleExitFullscreen = React.useCallback(() => {
    if (!isFullscreen) return

    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else {
      document.exitFullscreen()
    }

    setIsFullScreen(false)
  }, [isFullscreen])

  const handleFullscreenChange = React.useCallback(() => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setIsFullScreen(false)
    } else {
      setIsFullScreen(true)
    }
  }, [])

  React.useLayoutEffect((): (() => void) => {
    addEventListener('fullscreenchange', handleFullscreenChange)
    addEventListener('webkitfullscreenchange', handleFullscreenChange)
    addEventListener('mozfullscreenchange', handleFullscreenChange)
    addEventListener('MSFullscreenChange', handleFullscreenChange)
    return () => {
      removeEventListener('fullscreenchange', handleFullscreenChange)
      removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      removeEventListener('mozfullscreenchange', handleFullscreenChange)
      removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [handleFullscreenChange])

  return { isFullscreen, handleFullscreen, handleExitFullscreen }
}
