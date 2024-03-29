import { useAppContext } from "context/context";
import { IProgramFile, createProgramFile } from "program_files";
import "./css.scss";
import AppTask from "./ui/app_task";

const UI = () => {
  const {
    appContext: { appProcesses },
  } = useAppContext();

  return (
    <div className="task-manager-ui">
      {appProcesses?.map((appInProcess: IProgramFile) => (
        <AppTask key={appInProcess.id} appInProcess={appInProcess} />
      ))}
    </div>
  );
};

const TaskManagerProgram = createProgramFile({
  component: UI,
  name: "Task Manager",
  width: 350,
  height: 500,
});

export default TaskManagerProgram;
