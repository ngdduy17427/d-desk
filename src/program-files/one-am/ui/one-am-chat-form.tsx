import { DInputField } from 'components/d-fields/d-input-field'
import { ChangeEvent, FormEvent, useState } from 'react'
import { MdClose, MdSend } from 'react-icons/md'
import { PlayerMessage } from '../@type'
import { GameService } from '../game/game-service'
import { useStore } from 'store'

type OneAMChatFormProps = {
  gameService: GameService
}

export const OneAMChatForm = ({ gameService }: OneAMChatFormProps) => {
  const updateIsOpenChat = useStore((store) => store.oneAMStore.updateIsOpenChat)

  const [message, setMessage] = useState('')

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (message !== '') {
      setMessage('')

      const playerMessage: PlayerMessage = {
        id: String(gameService.gameSocket?.id),
        name: String(gameService.game?.player?.name),
        message: String(message).trim(),
        time: Date.now(),
      }

      gameService.game?.player?.setPlayerMessage(playerMessage.message)
      gameService.game?.gameService?.gameSocket?.emit('player:message', playerMessage)
    }
  }

  return (
    <form
      className='one-am-chat-nav'
      onSubmit={onSubmit}
    >
      <DInputField
        maxLength={50}
        value={message}
        onChange={handleChangeMessage}
        onFocus={() => gameService.game?.player?.setIsChatting(true)}
        onBlur={() => gameService.game?.player?.setIsChatting(false)}
      />
      <button
        type='submit'
        className='cursor-pointer'
      >
        <MdSend />
      </button>
      <button
        type='button'
        className='cursor-pointer'
        onClick={() => {
          updateIsOpenChat(false)
          gameService.game?.player?.setIsChatting(false)
        }}
      >
        <MdClose />
      </button>
    </form>
  )
}
