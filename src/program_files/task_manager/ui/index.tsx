import { AppActionType } from "app/app_action";
import { useAppContext } from "app/app_context";
import { IProgramFile } from "program_files";
import "./css.scss";

const TaskManagerUI = () => {
  const {
    appContext: { appProcesses },
    appDispatch,
  } = useAppContext();

  return (
    <div className="task-manager-ui">
      <ul className="task-list">
        {appProcesses?.map((appInProcess: IProgramFile) => {
          return (
            <li key={appInProcess.id}>
              <details>
                <summary>{appInProcess.name}</summary>
                <p>
                  aaaaaaaaaaaaaas dajksh dajshd klajshd lkajshdl kajshd lkajshd lkjashd lkajshd
                  lkajsh ldkasjh dlkajhd s
                </p>
              </details>
              <button
                type="button"
                className="btn-end-task"
                onClick={() => appDispatch(AppActionType.CLOSE_WINDOWS, appInProcess.id)}
              >
                End task
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskManagerUI;
