import { Joystick } from 'react-joystick-component'
import { useStore } from 'store'
import { GameService } from '../game/game-service'

type OneAMJoystickProps = {
  gameService: GameService
}

export const OneAMJoystick = ({ gameService }: OneAMJoystickProps) => {
  const isOpenChat = useStore((store) => store.oneAMStore.isOpenChat)

  if (isOpenChat) return null

  const handleMove = (event: any) => {
    const x = Number(event.x ?? 0)
    const y = Number(event.y ?? 0)
    gameService.game?.player?.inputHelper?.setFromJoystickVector(x, y)
  }

  const handleStop = () => {
    gameService.game?.player?.inputHelper?.clearJoystick()
  }

  return (
    <div className='one-am-game-joystick-container'>
      <Joystick
        size={75}
        baseColor='#4b4b4b70'
        stickColor='#fcd53f80'
        move={handleMove}
        stop={handleStop}
      />
    </div>
  )
}
