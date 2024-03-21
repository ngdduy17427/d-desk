import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  const updateWindowSize = () => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return { windowSize };
};

export default useWindowSize;
