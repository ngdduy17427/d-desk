import { checkMyPetServer } from "actions";
import DContainer from "components/d_container";
import { createProgramFile } from "program_files";
import { useEffect, useState } from "react";
import "./css.css";
import MyPetLoading from "./ui/my_pet_loading";
import MyPetUI from "./ui/my_pet_ui";

const UI = (): JSX.Element => {
  const [isCheckingServer, setIsCheckingServer] = useState<boolean>(true);
  const [isServerOnline, setIsServerOnline] = useState<boolean>(false);

  useEffect((): void => {
    checkMyPetServer()
      .then((response): void =>
        response?.status === "ok" ? setIsServerOnline(true) : setIsServerOnline(false)
      )
      .catch((): void => setIsServerOnline(false))
      .finally((): void => setIsCheckingServer(false));
  }, []);

  return (
    <DContainer className="my-pet-container">
      {isCheckingServer && <MyPetLoading />}
      <MyPetUI isServerOnline={isServerOnline} />
    </DContainer>
  );
};

const MyPetProgram = createProgramFile({
  name: "My Pet 🐈",
  component: UI,
  windowState: {
    width: 500,
    height: 500,
  },
});

export default MyPetProgram;
