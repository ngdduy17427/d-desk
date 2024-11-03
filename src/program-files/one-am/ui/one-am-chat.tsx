import DInputField from "components/d-fields/d-input-field";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { MdChatBubble, MdClose, MdSend } from "react-icons/md";
import { uuidv4 } from "utils/utils-helper";
import { PlayerMessage } from "../@type";
import { GameService } from "../game/game-service";

interface IOneAMChatProps {
  gameService: GameService;
  isOpenChat: boolean;
  setIsOpenChat: Dispatch<SetStateAction<boolean>>;
}

const OneAMChat = ({ gameService, isOpenChat, setIsOpenChat }: IOneAMChatProps): JSX.Element => {
  const [playerMessages, setPlayerMessages] = useState<Array<PlayerMessage>>([]);
  const [message, setMessage] = useState<string>("");

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (message !== "") {
      setMessage("");

      const playerMessage: PlayerMessage = {
        id: String(gameService.game?.player?.id),
        name: String(gameService.game?.player?.playerName),
        message: String(message),
      };

      setPlayerMessages((prevState): Array<PlayerMessage> => [...prevState, playerMessage]);
      gameService.game?.player?.setPlayerMessage(playerMessage.message);
    }
  };

  return (
    <div className="one-am-chat-container">
      {!isOpenChat && (
        <button
          className="one-am-chat-toggle"
          type="button"
          onClick={() => {
            setIsOpenChat(!isOpenChat);
            gameService.game?.player?.setIsChatting(false);
          }}
        >
          <MdChatBubble />
        </button>
      )}
      {isOpenChat && (
        <div className="one-am-chat-box-container">
          <div className="one-am-chat-box">
            {playerMessages.map((playerMessage) => (
              <p key={uuidv4()} className="one-am-player-message">
                <span>{playerMessage.name}: </span>
                <span>{playerMessage.message}</span>
              </p>
            ))}
          </div>
          <form className="one-am-chat-nav" onSubmit={onSubmit}>
            <DInputField
              label=""
              maxLength={50}
              value={message}
              onChange={handleChangeMessage}
              onFocus={() => gameService.game?.player?.setIsChatting(true)}
              onBlur={() => gameService.game?.player?.setIsChatting(false)}
            />
            <button type="submit">
              <MdSend />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpenChat(false);
                gameService.game?.player?.setIsChatting(false);
              }}
            >
              <MdClose />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OneAMChat;
