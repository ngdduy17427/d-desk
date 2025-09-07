import { ProgramFile } from 'program-files'
import { MdMinimize, MdOpenInNew } from 'react-icons/md'
import { useStore } from 'store'
import { EDWindowSizing } from '..'

type BtnMinimizeProps = {
  windowApp: ProgramFile
}

export const BtnMinimize = ({ windowApp }: BtnMinimizeProps) => {
  const minimizeWindow = useStore((store) => store.appStore.minimizeWindow)
  const normalWindow = useStore((store) => store.appStore.normalWindow)

  const { windowState } = windowApp

  const handleMinimizeWindow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()

    if (windowState.sizing === EDWindowSizing.MINIMIZE) {
      normalWindow(windowApp.id)
    } else {
      minimizeWindow(windowApp.id)
    }
  }

  return (
    <button
      type='button'
      className='window-nav-item'
      onClick={handleMinimizeWindow}
    >
      {windowState.sizing === EDWindowSizing.MINIMIZE ? <MdOpenInNew /> : <MdMinimize />}
    </button>
  )
}
