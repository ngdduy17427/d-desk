import { memo } from 'react'
import { WCDContainer } from 'web-components'
import './css.css'

type DContainerProps = {
  children?: React.ReactNode
  id?: string
  className?: string
}

const DContainerComp = ({ children, id, className }: DContainerProps) => {
  return (
    <WCDContainer
      id={id}
      className={className}
    >
      {children}
    </WCDContainer>
  )
}

export const DContainer = memo(DContainerComp)
