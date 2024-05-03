import useWindowSize from "./useWindowSize";

interface IScreenDetector {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useScreenDetector = (): IScreenDetector => {
  const { windowWidth } = useWindowSize();

  return {
    isMobile: Number(windowWidth) < 481,
    isTablet: Number(windowWidth) >= 481 && Number(windowWidth) <= 768,
    isDesktop: Number(windowWidth) > 769,
  };
};

export default useScreenDetector;
