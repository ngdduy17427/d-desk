import { useEffect, useState } from 'react'
import { MdChatBubble } from 'react-icons/md'
import { useStore } from 'store'
import { uniqueId } from 'utils/utils-helper'
import { PlayerMessage } from '../@type'
import { GameService } from '../game/game-service'
import { OneAMChatBox } from './one-am-chat-box'
import { OneAMChatForm } from './one-am-chat-form'

type OneAMChatProps = {
  gameService: GameService
}

export const OneAMChat = ({ gameService }: OneAMChatProps) => {
  const isOpenChat = useStore((store) => store.oneAMStore.isOpenChat)
  const updateIsOpenChat = useStore((store) => store.oneAMStore.updateIsOpenChat)

  const [playerMessages, setPlayerMessages] = useState<Array<PlayerMessage>>([])

  const onNetMessage = (playerMessage: PlayerMessage) => {
    setPlayerMessages((prevState): Array<PlayerMessage> => [...prevState, playerMessage])
  }

  useEffect(() => {
    gameService.gameSocket?.on('player:message', onNetMessage)
    return () => {
      gameService.gameSocket?.off('player:message', onNetMessage)
    }
  }, [gameService.gameSocket])

  const toHHMM = (time: number) => {
    const date = new Date(time)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <div className='one-am-chat-container'>
      {isOpenChat ? (
        <div className='one-am-chat-box-container'>
          <OneAMChatBox>
            {playerMessages.map((playerMessage) => (
              <p
                key={uniqueId()}
                className='one-am-player-message'
              >
                <span>[{toHHMM(playerMessage.time)}]</span>
                <span>[{playerMessage.name}]</span>
                <span>{playerMessage.message}</span>
              </p>
            ))}
          </OneAMChatBox>
          <OneAMChatForm gameService={gameService} />
        </div>
      ) : (
        <button
          type='button'
          className='one-am-chat-toggle'
          onClick={() => updateIsOpenChat(true)}
        >
          <MdChatBubble />
        </button>
      )}
    </div>
  )
}
