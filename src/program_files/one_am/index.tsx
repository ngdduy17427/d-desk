import { getMyPetPlayersOnline } from "actions";
import DContainer from "components/d_container";
import { IProgramFile, createProgramFile } from "program_files";
import { useEffect, useState } from "react";
import "./css.css";
import OneAMUI from "./ui/one_am_ui";

interface IOneAMProps {
  windowApp: IProgramFile;
}

const UI = ({ windowApp }: IOneAMProps): JSX.Element => {
  const [playersOnline, setPlayersOnline] = useState<number | undefined>(undefined);

  useEffect((): void => {
    getMyPetPlayersOnline()
      .then((numPlayer): void => setPlayersOnline(numPlayer))
      .catch((): void => setPlayersOnline(undefined));
  }, []);

  return (
    <DContainer className="one-am-container">
      <OneAMUI windowApp={windowApp} playersOnline={playersOnline} />
    </DContainer>
  );
};

const OneAMProgram = createProgramFile({
  name: "1AM 🌕",
  component: UI,
  windowState: {
    width: 1024,
    height: 616,
  },
});

export default OneAMProgram;
