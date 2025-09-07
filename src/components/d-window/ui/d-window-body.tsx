import { ProgramFile } from 'program-files'
import { ForwardedRef, memo } from 'react'
import { WCDWindowBody } from 'web-components'

type DWindowBodyProps = {
  ref: ForwardedRef<HTMLElement>
  windowApp: ProgramFile
}

const DWindowBodyComp = ({ ref, windowApp }: DWindowBodyProps) => {
  const WindowComponent = windowApp.component

  return (
    <WCDWindowBody ref={ref}>
      <WindowComponent {...windowApp} />
    </WCDWindowBody>
  )
}

export const DWindowBody = memo(DWindowBodyComp)
