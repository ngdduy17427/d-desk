import { IProgramFile } from "program_files";
import { memo, useEffect, useRef, useState } from "react";
import { PlayerSettings } from "../@type";
import { GameService } from "../game/game_service";
import OneAMAudio from "./one_am_audio";
import OneAMChat from "./one_am_chat";
import OneAMJoystick from "./one_am_joystick";

interface IOneAMGameProps {
  windowApp: IProgramFile;
  playerSettings: PlayerSettings;
}

const OneAMGame = ({ windowApp, playerSettings }: IOneAMGameProps): JSX.Element => {
  const gameServiceRef = useRef<GameService>(new GameService(windowApp));
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const gameService = gameServiceRef.current;

    gameService.start(gameCanvasRef.current as HTMLCanvasElement, playerSettings);

    return (): Promise<void> => gameService.destroy();
  }, [playerSettings]);

  return (
    <div className="one-am-game-container">
      <canvas ref={gameCanvasRef} className="one-am-game" />
      <OneAMChat
        gameService={gameServiceRef.current}
        isOpenChat={isOpenChat}
        setIsOpenChat={setIsOpenChat}
      />
      {!isOpenChat && <OneAMJoystick gameService={gameServiceRef.current} />}
      <OneAMAudio />
    </div>
  );
};

export default memo(OneAMGame);
