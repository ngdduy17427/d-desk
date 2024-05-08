import { Fragment, memo, useEffect, useRef, useState } from "react";
import { PetSettings } from "../@type";
import { GameService } from "../game/game_service";
import MyPetChat from "./my_pet_chat";
import MyPetLoading from "./my_pet_loading";
import MyPetState from "./my_pet_state";

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
        <MyPetState gameService={gameServiceRef.current} />
        <MyPetChat gameService={gameServiceRef.current} />
      </div>
    </Fragment>
  );
};

export default memo(MyPetGUI);
