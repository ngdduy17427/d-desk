import { Fragment, memo, useEffect, useRef, useState } from "react";
import { GameService } from "../game/game_service";
import { PetSettings } from "../@type";
import MyPetLoading from "./my_pet_loading";

interface IMyPetGUIProps {
  isServerOnline: boolean;
  petSettings: PetSettings;
}

const MyPetGUI = ({ isServerOnline, petSettings }: IMyPetGUIProps): JSX.Element => {
  const [isGameStarting, setIsGameStarting] = useState<boolean>(true);
  const gameServiceRef = useRef<GameService>(new GameService());
  const gameGUIRef = useRef<HTMLCanvasElement>(null);

  useEffect((): (() => void) => {
    const gameService = gameServiceRef.current;

    if (isServerOnline) {
      gameService
        .startOnline(petSettings, gameGUIRef.current as HTMLCanvasElement)
        .then((): void => setIsGameStarting(false));
    } else {
      gameService
        .startOffline(petSettings, gameGUIRef.current as HTMLCanvasElement)
        .then((): void => setIsGameStarting(false));
    }

    return (): void => gameService.destroy();
  }, [isServerOnline, petSettings]);

  return (
    <Fragment>
      {isGameStarting && <MyPetLoading />}
      <div className="my-pet-gui-container">
        <canvas ref={gameGUIRef} className="my-pet-gui" />
      </div>
    </Fragment>
  );
};

export default memo(MyPetGUI);
