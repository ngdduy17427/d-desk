import { PropsWithChildren, useEffect, useRef } from 'react'

export const OneAMChatBox = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }
  }, [children])

  return (
    <div
      ref={containerRef}
      className='one-am-chat-box'
    >
      {children}
    </div>
  )
}
