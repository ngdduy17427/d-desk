import Desktop from "components/desktop";
import Taskbar from "components/taskbar";
import AboutMeProgram from "program_files/about_me";
import ProjectsProgram from "program_files/projects";
import SettingsProgram from "program_files/settings";
import TaskManagerProgram from "program_files/task_manager";
import { AppBackgrounds, AppCursors } from "config";
import { AppProvider } from "../context/context";

const App = () => (
  <AppProvider
    initialValue={{
      programFiles: [AboutMeProgram, ProjectsProgram, SettingsProgram, TaskManagerProgram],
      appProcesses: [],
      processIndex: [],
      processMinimize: [],
      appSettings: {
        background: AppBackgrounds[0],
        cursor: AppCursors[0],
      },
    }}
  >
    <Taskbar />
    <Desktop />
  </AppProvider>
);

export default App;
