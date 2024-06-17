import { IProgramFile } from "program_files";
import { FormEvent, memo, useState } from "react";
import { PlayerSettings } from "../@type";
import OneAMGame from "./one_am_game";
import OneAMGUI from "./one_am_gui";

interface IOneAMUIProps {
  windowApp: IProgramFile;
  playersOnline: number | undefined;
}

const OneAMUI = ({ windowApp, playersOnline }: IOneAMUIProps): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [playerSettings, setPlayerSettings] = useState<PlayerSettings>({
    playerName: "",
  });

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (playerSettings.playerName !== "") setIsLogin(true);
  };

  return isLogin ? (
    <OneAMGame windowApp={windowApp} playerSettings={playerSettings} />
  ) : (
    <OneAMGUI
      playersOnline={playersOnline}
      playerSettings={playerSettings}
      setPlayerSettings={setPlayerSettings}
      onSubmit={onSubmit}
    />
  );
};

export default memo(OneAMUI);
