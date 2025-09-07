import { TTexts, useTypingEffect } from 'hooks/use-typing-effect'
import { memo, useEffect, useRef } from 'react'
import { WCDTypingText } from 'web-components'
import './css.css'

type TypingTextProps = {
  texts: TTexts
  speed?: number
  onFinish?: (isFinish: boolean) => void
  className?: string
}

const DTypingTextComp = ({ texts, speed, onFinish, className }: TypingTextProps) => {
  const textRef = useRef<HTMLElement>(null)
  const { isFinish } = useTypingEffect(texts, textRef, speed)

  useEffect(() => {
    if (isFinish) onFinish?.(isFinish)
  }, [isFinish, onFinish])

  return (
    <WCDTypingText
      ref={textRef}
      className={className}
    />
  )
}

export const DTypingText = memo(DTypingTextComp)
