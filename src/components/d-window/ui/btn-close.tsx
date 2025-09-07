import { MdClose } from 'react-icons/md'
import { useStore } from 'store'

type BtnCloseProps = {
  windowId: string
}

export const BtnClose = ({ windowId }: BtnCloseProps) => {
  const closeWindow = useStore((store) => store.appStore.closeWindow)

  const handleCloseWindow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    closeWindow(windowId)
  }

  return (
    <button
      type='button'
      className='window-nav-item'
      onClick={handleCloseWindow}
    >
      <MdClose />
    </button>
  )
}
