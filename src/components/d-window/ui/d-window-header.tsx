import { ProgramFile } from 'program-files'
import { ForwardedRef } from 'react'
import { WCDWindowHeader } from 'web-components'
import { BtnClose } from './btn-close'
import { BtnMaximize } from './btn-maximize'
import { BtnMinimize } from './btn-minimize'

type DWindowHeaderProps = {
  ref: ForwardedRef<HTMLElement>
  windowApp: ProgramFile
}

export const DWindowHeader = ({ ref, windowApp }: DWindowHeaderProps) => {
  return (
    <WCDWindowHeader ref={ref}>
      <h2 className='window-name'>{windowApp.name}</h2>
      <div className='window-nav'>
        <BtnMinimize windowApp={windowApp} />
        <BtnMaximize windowApp={windowApp} />
        <BtnClose windowId={windowApp.id} />
      </div>
    </WCDWindowHeader>
  )
}
