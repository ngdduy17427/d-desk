import { IAppContext } from "@type";
import { withContext } from "context/context";
import { IProgramFile, createProgramFile } from "program_files";
import "./css.scss";
import AppTask from "./ui/app_task";

const UI = withContext(({ appContext }: { appContext: IAppContext }) => {
  const { appProcesses } = appContext;

  return (
    <div className="task-manager-ui">
      {appProcesses?.map((appInProcess: IProgramFile) => (
        <AppTask key={appInProcess.id} appInProcess={appInProcess} />
      ))}
    </div>
  );
});

const TaskManagerProgram = createProgramFile({
  component: UI,
  name: "Task Manager",
  width: 350,
  height: 500,
});

export default TaskManagerProgram;
