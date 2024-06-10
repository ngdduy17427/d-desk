import { IProgramFile } from "program_files";
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { Joystick } from "react-joystick-component";
import { isUndefined } from "utils/utils_helper";
import { PetSettings } from "../@type";
import { GameService } from "../game/game_service";
import MyPetLoading from "./my_pet_loading";

interface IMyPetGameProps {
  windowApp: IProgramFile;
  playersOnline: number | undefined;
  petSettings: PetSettings;
}

const MyPetGame = ({ windowApp, playersOnline, petSettings }: IMyPetGameProps): JSX.Element => {
  const [isGameStarting, setIsGameStarting] = useState<boolean>(true);
  const gameServiceRef = useRef<GameService>(new GameService(windowApp));

  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const gameAudioRef = useRef<HTMLAudioElement>(null);

  useEffect((): (() => void) => {
    const gameService = gameServiceRef.current;

    if (!isUndefined(playersOnline)) {
      gameService
        .startOnline(gameCanvasRef.current as HTMLCanvasElement, petSettings)
        .then((): void => setIsGameStarting(false));
    } else {
      gameService
        .startOffline(gameCanvasRef.current as HTMLCanvasElement, petSettings)
        .then((): void => setIsGameStarting(false));
    }

    return (): void => gameService.destroy();
  }, [playersOnline, petSettings]);

  useEffect((): void => {
    if (gameAudioRef.current) gameAudioRef.current.volume = 0.2;
  }, []);

  const handleJoystickMove = (x: number, y: number): void => {
    if (!gameServiceRef.current.game.player) return;

    if (x > -0.35 && x < 0.35 && y > 0.5)
      gameServiceRef.current.game.player.setPlayerDirection({
        NORTH: true,
        EAST: false,
        SOUTH: false,
        WEST: false,
      });
    if (x > 0.35 && y > 0.35)
      gameServiceRef.current.game.player.setPlayerDirection({
        NORTH: true,
        EAST: true,
        SOUTH: false,
        WEST: false,
      });
    if (x > 0.5 && y > -0.35 && y < 0.35)
      gameServiceRef.current.game.player.setPlayerDirection({
        NORTH: false,
        EAST: true,
        SOUTH: false,
        WEST: false,
      });
    if (x > 0.35 && y < -0.35)
      gameServiceRef.current.game.player.setPlayerDirection({
        NORTH: false,
        EAST: true,
        SOUTH: true,
        WEST: false,
      });
    if (x > -0.35 && x < 0.35 && y < -0.5)
      gameServiceRef.current.game.player.setPlayerDirection({
        NORTH: false,
        EAST: false,
        SOUTH: true,
        WEST: false,
      });
    if (x < -0.35 && y < -0.35)
      gameServiceRef.current.game.player.setPlayerDirection({
        NORTH: false,
        EAST: false,
        SOUTH: true,
        WEST: true,
      });
    if (x < -0.5 && y > -0.35 && y < 0.35)
      gameServiceRef.current.game.player.setPlayerDirection({
        NORTH: false,
        EAST: false,
        SOUTH: false,
        WEST: true,
      });
    if (x < -0.35 && y > 0.35)
      gameServiceRef.current.game.player.setPlayerDirection({
        NORTH: true,
        EAST: false,
        SOUTH: false,
        WEST: true,
      });
  };

  const handleJoystickStop = (): void =>
    gameServiceRef.current.game.player?.setPlayerDirection({
      NORTH: false,
      EAST: false,
      SOUTH: false,
      WEST: false,
    });

  return (
    <Fragment>
      {isGameStarting && <MyPetLoading />}
      <div className="my-pet-game-container">
        <canvas ref={gameCanvasRef} className="my-pet-game" />
        <div className="my-pet-game-joystick-container">
          <Joystick
            size={75}
            baseColor="#4b4b4b70"
            stickColor="#fcd53f80"
            move={(event) => handleJoystickMove(Number(event.x), Number(event.y))}
            stop={handleJoystickStop}
          />
        </div>
        <audio ref={gameAudioRef} autoPlay loop>
          <source
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/sounds/8bit_1am.mp3`}
            type="audio/mpeg"
          />
        </audio>
      </div>
    </Fragment>
  );
};

export default memo(MyPetGame);
