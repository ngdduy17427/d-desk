import { EDWindowSizing } from 'components/d-window'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { WCDPerspectiveIcon } from 'web-components'
import './css.css'

type DPerspectiveIconProps = {
  children: React.ReactNode
  className?: string
  windowSizing?: EDWindowSizing
}

const DPerspectiveIconComp = ({ children, className, windowSizing }: DPerspectiveIconProps) => {
  const iconRef = useRef<HTMLElement>(null)

  const isDisabled = useMemo(() => windowSizing === EDWindowSizing.MINIMIZE, [windowSizing])

  const onMove = useCallback((x: number, y: number) => {
    requestAnimationFrame(() => {
      if (!iconRef.current) return

      const box = iconRef.current.getBoundingClientRect()
      const calcY = (x - box.x - box.width / 2) / 15
      const calcX = -(y - box.y - box.height / 2) / 15

      iconRef.current.style.transform = `perspective(${iconRef.current.offsetWidth}px) rotateX(${calcX}deg) rotateY(${calcY}deg)`
    })
  }, [])

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDisabled) return
      onMove(event.pageX, event.pageY)
    },
    [isDisabled, onMove],
  )

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      if (isDisabled) return
      onMove(event.targetTouches[0].pageX, event.targetTouches[0].pageY)
    },
    [isDisabled, onMove],
  )

  useEffect(() => {
    addEventListener('mousemove', onMouseMove)
    addEventListener('touchmove', onTouchMove)
    return () => {
      removeEventListener('mousemove', onMouseMove)
      removeEventListener('touchmove', onTouchMove)
    }
  }, [onMouseMove, onTouchMove])

  return (
    <WCDPerspectiveIcon
      ref={iconRef}
      className={className}
    >
      {children}
    </WCDPerspectiveIcon>
  )
}

export const DPerspectiveIcon = memo(DPerspectiveIconComp)
