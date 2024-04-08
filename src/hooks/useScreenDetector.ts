import useWindowSize from "./useWindowSize";

const useScreenDetector = () => {
  const {
    windowSize: { windowWidth },
  } = useWindowSize();

  return {
    isMobile: windowWidth < 481,
    isTablet: windowWidth >= 481 && windowWidth <= 768,
    isDesktop: windowWidth > 769,
  };
};

export default useScreenDetector;
