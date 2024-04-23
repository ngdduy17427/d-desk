import useFullscreen from "hooks/useFullscreen";
import useScreenDetector from "hooks/useScreenDetector";
import { memo } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const BtnFullscreen = (): JSX.Element => {
  const { isDesktop } = useScreenDetector();
  const { isFullscreen, handleFullscreen, handleExitFullscreen } = useFullscreen();

  return isDesktop ? (
    isFullscreen ? (
      <button type="button" className="btn-fullscreen" onClick={handleExitFullscreen}>
        <MdFullscreenExit />
      </button>
    ) : (
      <button type="button" className="btn-fullscreen" onClick={handleFullscreen}>
        <MdFullscreen />
      </button>
    )
  ) : null;
};

export default memo(BtnFullscreen);
