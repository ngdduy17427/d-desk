import { getMyPetPlayersOnline } from "actions";
import DContainer from "components/d_container";
import { IProgramFile, createProgramFile } from "program_files";
import { useEffect, useState } from "react";
import "./css.css";
import MyPetLoading from "./ui/my_pet_loading";
import MyPetUI from "./ui/my_pet_ui";

interface IMyPetProps {
  windowApp: IProgramFile;
}

const UI = ({ windowApp }: IMyPetProps): JSX.Element => {
  const [isCheckingServer, setIsCheckingServer] = useState<boolean>(true);
  const [playersOnline, setPlayersOnline] = useState<number | undefined>(undefined);

  useEffect((): void => {
    getMyPetPlayersOnline()
      .then((numPlayer): void => setPlayersOnline(numPlayer))
      .catch((): void => setPlayersOnline(undefined))
      .finally((): void => setIsCheckingServer(false));
  }, []);

  return (
    <DContainer className="my-pet-container">
      {isCheckingServer && <MyPetLoading />}
      <MyPetUI windowApp={windowApp} playersOnline={playersOnline} />
    </DContainer>
  );
};

const MyPetProgram = createProgramFile({
  name: "1AM 🌕",
  component: UI,
  windowState: {
    width: 1024,
    height: 616,
  },
});

export default MyPetProgram;
