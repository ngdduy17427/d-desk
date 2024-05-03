import { IAppContext } from "@type";
import { getClientIP } from "actions";
import DContainer from "components/d_container";
import { withContext } from "context/context";
import { IProgramFile, createProgramFile } from "program_files";
import { useEffect, useState } from "react";
import "./css.css";
import AppTask from "./ui/app_task";

interface ITaskManagerUIProps {
  appContext: IAppContext;
}

const UI = withContext(({ appContext: { appProcesses } }: ITaskManagerUIProps): JSX.Element => {
  const [clientIP, setClientIP] = useState<string | undefined>(undefined);

  useEffect((): void => {
    getClientIP().then((response): void => setClientIP(response.clientIP));
  }, []);

  return (
    <DContainer className="task-manager-container">
      {Array.from(appProcesses.values()).map(
        (appInProcess: IProgramFile): JSX.Element => (
          <AppTask key={appInProcess.id} appInProcess={appInProcess} clientIP={String(clientIP)} />
        )
      )}
    </DContainer>
  );
});

const TaskManagerProgram = createProgramFile({
  name: "Task Manager",
  component: UI,
  windowState: {
    width: 400,
    height: 500,
  },
});

export default TaskManagerProgram;
