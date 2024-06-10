import DInputField from "components/d_fields/d_input_field";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { Socket, io } from "socket.io-client";
import { isUndefined, uuidv4 } from "utils/utils_helper";
import { PlayerMessage } from "../@type";
import { GameService } from "../game/game_service";

interface IMyPetChatProps {
  playersOnline: number | undefined;
  gameService: GameService;
}

const MyPetChat = ({ playersOnline, gameService }: IMyPetChatProps): JSX.Element => {
  const gameSocketRef = useRef<Socket | undefined>(undefined);

  const [playerMessages, setPlayerMessages] = useState<Array<PlayerMessage>>([]);
  const [message, setMessage] = useState<string>("");

  useEffect((): void | (() => void) => {
    if (isUndefined(playersOnline)) return;

    let gameSocket = gameSocketRef.current;

    gameSocket = io(String(process.env.NEXT_PUBLIC_SERVER_SOCKET_URL), {
      upgrade: false,
      transports: ["websocket"],
      reconnection: false,
    });
    gameSocket.on("connect", () => {
      gameSocket?.emit("playerJoinChat");
    });
    gameSocket.on("playerMessage", (playerMessage: PlayerMessage): void =>
      setPlayerMessages((prevState): Array<PlayerMessage> => [...prevState, playerMessage])
    );

    return () => gameSocket.disconnect();
  }, [playersOnline]);

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (message !== "") {
      setMessage("");

      const playerMessage: PlayerMessage = {
        id: String(gameService.game.player?.id),
        name: String(gameService.game.player?.spriteName),
        message: String(message),
      };

      setPlayerMessages((prevState): Array<PlayerMessage> => [...prevState, playerMessage]);
      gameService.game.player?.setPlayerMessage(playerMessage);

      if (gameSocketRef.current) gameSocketRef.current?.emit("playerMessage", playerMessage);
    }
  };

  return (
    <div className="my-pet-chat-container">
      <div className="my-pet-chat-box">
        {playerMessages.map((playerMessage) => (
          <p key={uuidv4()} className="my-pet-player-message">
            <span>{playerMessage.name}: </span>
            <span>{playerMessage.message}</span>
          </p>
        ))}
      </div>
      <form className="my-pet-chat-nav" onSubmit={onSubmit}>
        <DInputField label="" maxLength={50} value={message} onChange={handleChangeMessage} />
        <button id="my-pet-chat-btn-send" type="submit">
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default MyPetChat;
