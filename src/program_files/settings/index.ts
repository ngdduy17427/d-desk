import { createProgramFile } from "program_files";
import SettingsUI from "./ui";

const SettingsProgram = createProgramFile({
  component: SettingsUI,
  name: "Settings",
  width: 300,
  height: 500,
});

export default SettingsProgram;
