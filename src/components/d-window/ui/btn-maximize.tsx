import { ProgramFile } from 'program-files'
import { MdWebAsset, MdWebAssetOff } from 'react-icons/md'
import { useStore } from 'store'
import { EDWindowSizing } from '..'

type BtnMaximizeProps = {
  windowApp: ProgramFile
}

export const BtnMaximize = ({ windowApp }: BtnMaximizeProps) => {
  const maximizeWindow = useStore((store) => store.appStore.maximizeWindow)
  const normalWindow = useStore((store) => store.appStore.normalWindow)

  const { windowState } = windowApp

  const handleMaximizeWindow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()

    if (windowState.sizing === EDWindowSizing.MAXIMIZE) {
      normalWindow(windowApp.id)
    } else {
      maximizeWindow(windowApp.id)
    }
  }

  return (
    <button
      type='button'
      className='window-nav-item'
      onClick={handleMaximizeWindow}
    >
      {windowState.sizing === EDWindowSizing.MAXIMIZE ? <MdWebAssetOff /> : <MdWebAsset />}
    </button>
  )
}
