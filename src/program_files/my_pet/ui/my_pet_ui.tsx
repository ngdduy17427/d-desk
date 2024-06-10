import { IProgramFile } from "program_files";
import { FormEvent, memo, useState } from "react";
import { PetOptions, PetSelectOption, PetSettings } from "../@type";
import { PetSelectOptions } from "../utils/pet_helper";
import MyPetGame from "./my_pet_game";
import MyPetGUI from "./my_pet_gui";

interface IMyPetUIProps {
  windowApp: IProgramFile;
  playersOnline: number | undefined;
}

const MyPetUI = ({ windowApp, playersOnline }: IMyPetUIProps): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [petSettings, setPetSettings] = useState<PetSettings>({
    petName: "",
    petSelectOption: PetSelectOptions.get(PetOptions.YELLOW_CAT) as PetSelectOption,
  });

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (petSettings.petName !== "") setIsLogin(true);
  };

  return isLogin ? (
    <MyPetGame windowApp={windowApp} playersOnline={playersOnline} petSettings={petSettings} />
  ) : (
    <MyPetGUI
      playersOnline={playersOnline}
      petSettings={petSettings}
      setPetSettings={setPetSettings}
      onSubmit={onSubmit}
    />
  );
};

export default memo(MyPetUI);
