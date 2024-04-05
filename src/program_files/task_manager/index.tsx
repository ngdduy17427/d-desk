import { IAppContext } from "@type";
import { withContext } from "context/context";
import { IProgramFile, createProgramFile } from "program_files";
import "./css.scss";
import AppTask from "./ui/app_task";

const UI = withContext(({ appContext }: { appContext: IAppContext }) => {
  const { appProcesses } = appContext;

  return (
    <section className="task-manager-ui">
      <container className="task-manager-container">
        {appProcesses?.map((appInProcess: IProgramFile) => (
          <AppTask key={appInProcess.id} appInProcess={appInProcess} />
        ))}
      </container>
    </section>
  );
});

const TaskManagerProgram = createProgramFile({
  component: UI,
  name: "Task Manager",
  width: 350,
  height: 500,
});

export default TaskManagerProgram;
