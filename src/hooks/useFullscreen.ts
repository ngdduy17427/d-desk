import { useCallback, useEffect, useState } from "react";

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

const useFullscreen = () => {
  const [isFullscreen, setIsFullScreen] = useState<boolean>(false);

  const handleFullscreen = () => {
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

  const handleExitFullscreen = useCallback(() => {
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

  const handleFullscreenChange = useCallback(() => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setIsFullScreen(false);
    } else setIsFullScreen(true);
  }, [setIsFullScreen]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  return { handleFullscreen, handleExitFullscreen, isFullscreen };
};

export default useFullscreen;
