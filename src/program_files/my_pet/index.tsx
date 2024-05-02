import DContainer from "components/d_container";
import { createProgramFile } from "program_files";
import { ChangeEvent, FormEvent, useState } from "react";
import "./css.css";
import MyPetLogin from "./ui/my_pet_login";
import MyPetUI from "./ui/my_pet_ui";

const UI = (): JSX.Element => {
  const [petName, setPetName] = useState<string>("");
  const [isHavePetName, setIsHavePetName] = useState<boolean>(false);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void =>
    setPetName(event.target.value);

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (petName === "") return;
    setIsHavePetName(true);
  };

  return (
    <DContainer className="my-pet-container">
      {isHavePetName ? (
        <MyPetUI petName={petName} />
      ) : (
        <MyPetLogin petName={petName} handleChangeName={handleChangeName} onSubmit={onSubmit} />
      )}
    </DContainer>
  );
};

const MyPetProgram = createProgramFile({
  name: "My Pet 🐅",
  component: UI,
  windowState: {
    width: 300,
    height: 200,
  },
});

export default MyPetProgram;
