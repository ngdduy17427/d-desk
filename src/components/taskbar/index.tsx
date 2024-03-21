import { AppActionType } from "app/app_action";
import { useAppContext } from "app/app_context";
import { IProgramFile } from "program_files";
import AboutMeProgram from "program_files/about_me";
import ProjectsUProgram from "program_files/projects";
import SettingsProgram from "program_files/settings";
import TaskManagerProgram from "program_files/task_manager";
import "./css.scss";

const Taskbar = () => {
  const { appDispatch } = useAppContext();
  const programFiles: IProgramFile[] = [
    AboutMeProgram,
    ProjectsUProgram,
    SettingsProgram,
    TaskManagerProgram,
  ];

  return (
    <nav className="taskbar">
      <p className="title-name">D-Desk</p>
      <ul>
        {programFiles.map((programFile) => (
          <li
            key={programFile.id}
            onClick={() => appDispatch(AppActionType.OPEN_WINDOWS, programFile)}
          >
            {programFile.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Taskbar;
