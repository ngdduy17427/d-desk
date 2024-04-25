import { TAppDispatch } from "@type";
import { EDWindowSizing } from "components/d_window";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
import { IProgramFile } from "program_files";
import { useLayoutEffect, useState } from "react";
import { MdArrowRight } from "react-icons/md";

interface IAppTaskProps {
  appInProcess: IProgramFile;
  appDispatch: TAppDispatch;
  clientIP: string;
}

const AppTask = ({ appInProcess, appDispatch, clientIP }: IAppTaskProps): JSX.Element => {
  const { windowState } = appInProcess;
  const [appRuntime, setAppRuntime] = useState<string>("00:00:00");

  useLayoutEffect((): (() => void) => {
    const formatHMS = (value: number): number | string =>
      value < 10 ? "0".concat(String(value)) : value;

    const runtimer = setInterval((): void => {
      const currentRuntime = new Date().getTime();
      const distance = currentRuntime - (windowState.runtime as Date).getTime();

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setAppRuntime(`${formatHMS(hours)}:${formatHMS(minutes)}:${formatHMS(seconds)}`);
    }, 1000);

    return (): void => clearInterval(runtimer);
  }, [windowState.runtime]);

  return (
    <div className="app-task">
      <div className="app-task-summary">
        <MdArrowRight className="text-[1.5rem]" />
        <h1 className="app-name">{appInProcess.name}</h1>
        <p className="runtime">{appRuntime}</p>
        <button
          type="button"
          className="btn-end-task"
          onClick={(): void =>
            appDispatch(AppActionType.CLOSE_WINDOW, { programFileId: appInProcess.id })
          }
        >
          End task
        </button>
      </div>
      <div className="app-task-detail">
        <span>
          ID: <p>{appInProcess.id}</p>
        </span>
        <span>
          Sizing: <p>{EDWindowSizing[windowState.sizing]}</p>
        </span>
        <span>
          User: <p>{clientIP}</p>
        </span>
      </div>
    </div>
  );
};

export default withContext(AppTask);
