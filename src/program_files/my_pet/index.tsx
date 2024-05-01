import { createProgramFile } from "program_files";
import "./css.css";
import MyPetUI from "./ui/my_pet_ui";

const MyPetProgram = createProgramFile({
  name: "My Pet",
  component: MyPetUI,
  windowState: {
    width: 300,
    height: 200,
  },
});

export default MyPetProgram;
