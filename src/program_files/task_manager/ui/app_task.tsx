import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import moment from "moment";
import { IProgramFile } from "program_files";
import { startTransition, useEffect, useState } from "react";
import { MdArrowRight } from "react-icons/md";

const AppTask = ({ appInProcess }: { appInProcess: IProgramFile }) => {
  const { appDispatch } = useAppContext();
  const [newRuntime, setNewRuntime] = useState(moment().diff(appInProcess.runtime));

  useEffect(() => {
    const runtimer = setInterval(
      () => startTransition(() => setNewRuntime(moment().diff(appInProcess.runtime))),
      1000
    );

    return () => clearInterval(runtimer);
  }, [appInProcess.runtime]);

  return (
    <div className="app-task">
      <MdArrowRight className="text-[1.5rem]" />
      <h1>{appInProcess.name}</h1>
      <p className="runtime">{moment(newRuntime).format("mm:ss")}</p>
      <button
        type="button"
        className="btn-end-task"
        onClick={() => appDispatch(AppActionType.CLOSE_WINDOWS, { programFileId: appInProcess.id })}
      >
        End task
      </button>
    </div>
  );
};

export default AppTask;
