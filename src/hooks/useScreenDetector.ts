import useWindowSize from "./useWindowSize";

interface IScreenDetector {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useScreenDetector = (): IScreenDetector => {
  const { windowWidth } = useWindowSize();

  return {
    isMobile: windowWidth < 481,
    isTablet: windowWidth >= 481 && windowWidth <= 768,
    isDesktop: windowWidth > 769,
  };
};

export default useScreenDetector;
