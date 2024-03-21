import { AppActionType } from "app/app_action";
import { useAppContext } from "app/app_context";
import useFullscreen from "hooks/useFullscreen";
import { RefObject, useState, useTransition } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const BtnFullScreen = ({ windowsRef }: { windowsRef: RefObject<HTMLDivElement> }) => {
  const { isFullscreen, handleFullscreen, handleExitFullscreen } = useFullscreen();
  const { appDispatch } = useAppContext();

  const [, startTrasition] = useTransition();
  const [windowsState, setWindowsState] = useState({
    width: "",
    height: "",
    top: "",
    right: "",
    bottom: "",
    left: "",
  });

  const handleFullscreenWindow = () => {
    if (isFullscreen) {
      handleExitFullscreen();
      windowsRef.current?.classList.remove("maximize", "fullscreen");
      (windowsRef.current as HTMLElement).style.width = windowsState.width;
      (windowsRef.current as HTMLElement).style.height = windowsState.height;
      (windowsRef.current as HTMLElement).style.top = windowsState.top;
      (windowsRef.current as HTMLElement).style.right = windowsState.right;
      (windowsRef.current as HTMLElement).style.bottom = windowsState.bottom;
      (windowsRef.current as HTMLElement).style.left = windowsState.left;
    } else {
      startTrasition(() => {
        setWindowsState({
          width: (windowsRef.current as HTMLElement).style.width,
          height: (windowsRef.current as HTMLElement).style.height,
          top: (windowsRef.current as HTMLElement).style.top,
          right: (windowsRef.current as HTMLElement).style.right,
          bottom: (windowsRef.current as HTMLElement).style.bottom,
          left: (windowsRef.current as HTMLElement).style.left,
        });
      });

      handleFullscreen();
      windowsRef.current?.classList.add("maximize", "fullscreen");
    }

    appDispatch(AppActionType.REMOVE_FROM_PROCESS_MINIMIZE, windowsRef.current?.id);
  };

  return (
    <span className="windows-nav-item" onClick={handleFullscreenWindow}>
      {!isFullscreen ? <MdFullscreen /> : <MdFullscreenExit />}
    </span>
  );
};

export default BtnFullScreen;
