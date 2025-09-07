import { useWindowSize } from './use-window-size'

type ScreenDetector = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const useScreenDetector = (): ScreenDetector => {
  const { windowWidth } = useWindowSize()

  return {
    isMobile: Number(windowWidth) < 481,
    isTablet: Number(windowWidth) >= 481 && Number(windowWidth) <= 768,
    isDesktop: Number(windowWidth) > 769,
  }
}
