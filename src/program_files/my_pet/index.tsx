import { checkMyPetServer } from "actions";
import DContainer from "components/d_container";
import { createProgramFile } from "program_files";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./css.css";
import MyPetLogin from "./ui/my_pet_login";
import MyPetUI from "./ui/my_pet_ui";

const UI = (): JSX.Element => {
  const [isCheckingServer, setIsCheckingServer] = useState<boolean>(true);
  const [isServerAlive, setIsServerAlive] = useState<boolean>(false);
  const [petName, setPetName] = useState<string>("");
  const [isHavePetName, setIsHavePetName] = useState<boolean>(false);

  useEffect((): void => {
    checkMyPetServer()
      .then((response): void => {
        if (response?.status !== "ok") return;
        setIsServerAlive(true);
        setIsCheckingServer(false);
      })
      .catch((): void => {
        setIsServerAlive(false);
        setIsCheckingServer(false);
      });
  }, []);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void =>
    setPetName(event.target.value);

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (petName === "") return;
    setIsHavePetName(true);
  };

  if (isCheckingServer)
    return (
      <DContainer className="my-pet-login-container">
        <p>...</p>
      </DContainer>
    );

  return isHavePetName ? (
    <MyPetUI isServerAlive={isServerAlive} petName={petName} />
  ) : (
    <MyPetLogin
      isServerAlive={isServerAlive}
      petName={petName}
      handleChangeName={handleChangeName}
      onSubmit={onSubmit}
    />
  );
};

const MyPetProgram = createProgramFile({
  name: "My Pet 🐅",
  component: UI,
  windowState: {
    width: 500,
    height: 300,
  },
});

export default MyPetProgram;
