import { useEffect, useRef } from 'react'

export const OneAMAudio = () => {
  const gameAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (gameAudioRef.current) gameAudioRef.current.volume = 0.25
  }, [])

  return (
    <audio
      ref={gameAudioRef}
      autoPlay
      loop
    >
      <source
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/sounds/1am.mp3`}
        type='audio/mpeg'
      />
    </audio>
  )
}
