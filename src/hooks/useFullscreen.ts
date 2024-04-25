import React, { useRef } from "react";

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
  const isFullScreenRef = useRef<boolean>(false);

  const handleFullscreen = (): void => {
    if (isFullScreenRef.current) return;

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.mozRequestFullscreen) {
      document.documentElement.mozRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }

    isFullScreenRef.current = true;
  };

  const handleExitFullscreen = React.useCallback((): void => {
    if (!isFullScreenRef.current) return;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    isFullScreenRef.current = false;
  }, []);

  const handleFullscreenChange = React.useCallback((): void => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      isFullScreenRef.current = false;
    } else {
      isFullScreenRef.current = true;
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

  return { isFullscreen: isFullScreenRef.current, handleFullscreen, handleExitFullscreen };
};

export default useFullscreen;
