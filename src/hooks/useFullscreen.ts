import React from "react";

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    mozFullScreen?: Element;
    mozFullScreenElement?: Element;
    msExitFullscreen?: () => Promise<void>;
    msFullscreenElement?: Element;
    webkitExitFullscreen?: () => Promise<void>;
    webkitFullscreenElement?: Element;
    webkitIsFullScreen?: boolean;
  }

  interface HTMLElement {
    mozRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

interface IFullScreen {
  isFullscreen: boolean;
  handleFullscreen: () => void;
  handleExitFullscreen: () => void;
}

const useFullscreen = (): IFullScreen => {
  const [isFullscreen, setIsFullScreen] = React.useState<boolean>(false);

  const handleFullscreen = (): void => {
    if (isFullscreen) return;

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.mozRequestFullscreen) {
      document.documentElement.mozRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }

    setIsFullScreen(true);
  };

  const handleExitFullscreen = React.useCallback((): void => {
    if (!isFullscreen) return;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    setIsFullScreen(false);
  }, [isFullscreen]);

  const handleFullscreenChange = React.useCallback((): void => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setIsFullScreen(false);
    } else {
      setIsFullScreen(true);
    }
  }, []);

  React.useLayoutEffect((): (() => void) => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    return (): void => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  return { isFullscreen, handleFullscreen, handleExitFullscreen };
};

export default useFullscreen;
