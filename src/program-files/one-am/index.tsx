import DContainer from "components/d-container";
import { IProgramFile, createProgramFile } from "program-files";
import { useState } from "react";
import "./css.css";
import OneAMUI from "./ui/one-am-ui";

interface IOneAMProps {
  windowApp: IProgramFile;
}

const UI = ({ windowApp }: IOneAMProps): JSX.Element => {
  const [playersOnline] = useState<number | undefined>(undefined);

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
