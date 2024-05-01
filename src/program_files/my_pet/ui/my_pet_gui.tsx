import { useEffect, useRef } from "react";
import { GameService } from "../game/game_service";

interface IMyPetGUIProps {
  gameService: GameService;
}

const MyPetGUI = ({ gameService }: IMyPetGUIProps): JSX.Element => {
  const myPetGUIRef = useRef<HTMLCanvasElement>(null);

  useEffect((): void => {
    gameService.gameGUI.init(myPetGUIRef.current);
  }, [gameService.gameGUI]);

  return <canvas ref={myPetGUIRef} className="my-pet-gui" />;
};

export default MyPetGUI;
