import { ProgramFile } from 'program-files'
import { memo, useEffect, useRef, useState } from 'react'
import { PlayerSettings } from '../@type'
import { GameService } from '../game/game-service'
import { OneAMAudio } from './one-am-audio'
import { OneAMChat } from './one-am-chat'
import { OneAMJoystick } from './one-am-joystick'

type OneAMGameProps = {
  windowApp: ProgramFile
  playerSettings: PlayerSettings
}

const OneAMGameComp = ({ windowApp, playerSettings }: OneAMGameProps) => {
  const gameServiceRef = useRef<GameService>(new GameService(windowApp))
  const gameCanvasRef = useRef<HTMLCanvasElement>(null)

  const [isOpenChat, setIsOpenChat] = useState(false)

  useEffect((): (() => void) => {
    const gameService = gameServiceRef.current

    gameService.start(gameCanvasRef.current as HTMLCanvasElement, playerSettings)

    return (): Promise<void> => gameService.destroy()
  }, [playerSettings])

  return (
    <div className='one-am-game-container'>
      <canvas
        ref={gameCanvasRef}
        className='one-am-game'
      />
      <OneAMChat
        gameService={gameServiceRef.current}
        isOpenChat={isOpenChat}
        setIsOpenChat={setIsOpenChat}
      />
      {!isOpenChat && <OneAMJoystick gameService={gameServiceRef.current} />}
      <OneAMAudio />
    </div>
  )
}

export const OneAMGame = memo(OneAMGameComp)
