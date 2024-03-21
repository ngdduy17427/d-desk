import { createProgramFile } from "program_files";
import TaskManagerUI from "./ui";

const TaskManagerProgram = createProgramFile({
  component: TaskManagerUI,
  name: "Task Manager",
  width: 500,
  height: 500,
});

export default TaskManagerProgram;
