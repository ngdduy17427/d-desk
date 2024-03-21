import { createProgramFile } from "program_files";
import ProjectsUI from "./ui";

const ProjectsUProgram = createProgramFile({
  component: ProjectsUI,
  name: "Projects",
  width: 1000,
  height: 600,
});

export default ProjectsUProgram;
