import DInputField from "components/d_fields/d_input_field";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { uuidv4 } from "utils/utils_helper";
import { PlayerMessage } from "../@type";
import { GameService } from "../game/game_service";

interface IMyPetChatProps {
  gameService: GameService;
}

const MyPetChat = ({ gameService }: IMyPetChatProps): JSX.Element => {
  const gameSocket = useRef<Socket | undefined>(undefined);

  const [chatList, setChatList] = useState<Array<PlayerMessage>>([]);
  const [message, setMessage] = useState<string>("");

  useEffect((): (() => void) => {
    gameSocket.current = io(String(process.env.NEXT_PUBLIC_SERVER_SOCKET_URL), {
      upgrade: false,
      transports: ["websocket"],
      reconnection: false,
    });

    gameSocket.current.on("connect", () => {
      gameSocket.current?.emit("playerJoinChat");
    });
    gameSocket.current.on("playerMessage", (playerMessage: PlayerMessage): void =>
      setChatList((prevState): Array<PlayerMessage> => [...prevState, playerMessage])
    );

    return () => gameSocket.current?.disconnect();
  }, []);

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>): void =>
    setMessage(event.target.value);

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (message !== "") {
      setMessage("");

      const playerMessage: PlayerMessage = {
        id: String(gameService.game.player?.entity.id),
        name: String(gameService.game.player?.petName),
        message: message,
      };

      setChatList((prevState): Array<PlayerMessage> => [...prevState, playerMessage]);
      gameService.game.player?.setPlayerMessage(playerMessage);
      gameSocket.current?.emit("playerMessage", playerMessage);
    }
  };

  return (
    <div className="my-pet-chat-container">
      <div className="my-pet-chat-box">
        {chatList.map((chat) => (
          <p key={uuidv4()} className="my-pet-player-message">
            <span>{chat.name}: </span>
            <span>{chat.message}</span>
          </p>
        ))}
      </div>
      <form className="my-pet-chat-nav" onSubmit={onSubmit}>
        <DInputField
          id="my-pet-chat-input-field"
          label=""
          maxLength={50}
          value={message}
          onChange={handleChangeMessage}
        />
        <button id="my-pet-chat-btn-send" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default MyPetChat;
