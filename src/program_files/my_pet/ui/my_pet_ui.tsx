import { FormEvent, memo, useState } from "react";
import { PetAvatarOption, PetSettings } from "../@type";
import { PetAvatars, YellowCat } from "../utils/pet_helper";
import MyPetGUI from "./my_pet_gui";
import MyPetLogin from "./my_pet_login";

interface IMyPetUIProps {
  isServerOnline: boolean;
}

const MyPetUI = ({ isServerOnline }: IMyPetUIProps): JSX.Element => {
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [petSettings, setPetSettings] = useState<PetSettings>({
    petName: "",
    petAvatar: PetAvatars.get(YellowCat) as PetAvatarOption,
  });

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (petSettings.petName !== "") setIsGameStart(true);
  };

  return isGameStart ? (
    <MyPetGUI isServerOnline={isServerOnline} petSettings={petSettings} />
  ) : (
    <MyPetLogin
      isServerOnline={isServerOnline}
      petSettings={petSettings}
      setPetSettings={setPetSettings}
      onSubmit={onSubmit}
    />
  );
};

export default memo(MyPetUI);
