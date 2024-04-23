import React from "react";

export interface IWindowSize {
  windowWidth: number | undefined;
  windowHeight: number | undefined;
}

const useWindowSize = (): IWindowSize => {
  const [windowSize, setWindowSize] = React.useState<IWindowSize>({
    windowWidth: undefined,
    windowHeight: undefined,
  });

  const updateWindowSize = (): void =>
    React.startTransition((): void =>
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      })
    );

  React.useEffect(() => {
    updateWindowSize();

    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return windowSize;
};

export default useWindowSize;
