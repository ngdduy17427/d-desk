import { createProgramFile } from "program_files";
import AboutMeUI from "./ui";

const AboutMeProgram = createProgramFile({
  component: AboutMeUI,
  name: "About Me",
  width: 600,
  height: 400,
});

export default AboutMeProgram;
