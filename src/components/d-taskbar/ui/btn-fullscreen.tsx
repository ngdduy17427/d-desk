import { useFullscreen } from 'hooks/use-fullscreen'
import { useScreenDetector } from 'hooks/use-sreen-detector'
import { memo } from 'react'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'

const BtnFullscreenComp = () => {
  const { isDesktop } = useScreenDetector()
  const { isFullscreen, handleFullscreen, handleExitFullscreen } = useFullscreen()

  return isDesktop ? (
    isFullscreen ? (
      <button
        type='button'
        className='btn-fullscreen'
        onClick={handleExitFullscreen}
      >
        <MdFullscreenExit />
      </button>
    ) : (
      <button
        type='button'
        className='btn-fullscreen'
        onClick={handleFullscreen}
      >
        <MdFullscreen />
      </button>
    )
  ) : (
    <></>
  )
}

export const BtnFullscreen = memo(BtnFullscreenComp)
