import DContainer from "components/d_container";
import { useEffect, useRef } from "react";
import { uuidv4 } from "utils/utils_helper";
import { GameService } from "../game/game_service";
import { PlayerSprite } from "../sprites/player_sprite";

interface IMyPetUIProps {
  isServerAlive: boolean;
  petName: string;
}

const MyPetUI = ({ isServerAlive, petName }: IMyPetUIProps): JSX.Element => {
  const gameServiceRef = useRef<GameService>(new GameService(isServerAlive));
  const gameGUIRef = useRef<HTMLCanvasElement>(null);

  useEffect((): (() => void) => {
    const gameService = gameServiceRef.current;

    gameService.start(
      new PlayerSprite(
        uuidv4(),
        petName,
        gameService.game.canvas.width / 2,
        gameService.game.canvas.height / 2
      ),
      gameGUIRef.current as HTMLCanvasElement
    );
    return (): void => gameService.destroy();
  }, [petName]);

  return (
    <DContainer className="my-pet-ui-container">
      <canvas ref={gameGUIRef} className="my-pet-gui" />
    </DContainer>
  );
};

export default MyPetUI;
