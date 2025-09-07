import { ProgramFile } from 'program-files'
import { memo, useEffect, useRef } from 'react'
import { PlayerSettings } from '../@type'
import { GameService } from '../game/game-service'
import { OneAMAudio } from './one-am-audio'
import { OneAMChat } from './one-am-chat'
import { OneAMJoystick } from './one-am-joystick'

type OneAMGameProps = {
  windowApp: ProgramFile
  playersOnline: number | undefined
  playerSettings: PlayerSettings
}

const OneAMGameComp = ({ windowApp, playersOnline, playerSettings }: OneAMGameProps) => {
  const gameServiceRef = useRef<GameService>(new GameService(windowApp, playersOnline))
  const gameCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const gameService = gameServiceRef.current
    const gameCanvas = gameCanvasRef.current

    if (gameCanvas) gameService.start(gameCanvas, playerSettings)

    return () => gameService.destroy()
  }, [playerSettings])

  return (
    <div className='one-am-game-container'>
      <canvas
        ref={gameCanvasRef}
        className='one-am-game'
      />
      <OneAMChat gameService={gameServiceRef.current} />
      <OneAMJoystick gameService={gameServiceRef.current} />
      <OneAMAudio />
    </div>
  )
}

export const OneAMGame = memo(OneAMGameComp)
