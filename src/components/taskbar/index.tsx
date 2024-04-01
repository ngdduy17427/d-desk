import { IWindowsSize } from "components/windows";
import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { IProgramFile } from "program_files";
import AboutMeProgram from "program_files/about_me";
import ProjectsProgram from "program_files/projects";
import SettingsProgram from "program_files/settings";
import TaskManagerProgram from "program_files/task_manager";
import { Fragment } from "react";
import { MdMenu } from "react-icons/md";
import { addClassToElement, removeClassFromElement } from "utils/utils_helper";
import "./css.scss";

const Taskbar = () => {
  const {
    appContext: { appProcesses },
    appDispatch,
  } = useAppContext();
  const { ref: mobileShortcutRef, secondRef: mobileMenuRef } = useOnClickOutside(() => {
    if (document.getElementById("mobileShortcut")?.classList.contains("show")) {
      removeClassFromElement("mobileShortcut", "show");
    }
  });

  const handleToggleMobileMenu = () => {
    if (document.getElementById("mobileShortcut")?.classList.contains("show")) {
      removeClassFromElement("mobileShortcut", "show");
    } else {
      addClassToElement("mobileShortcut", "show");
    }
  };

  const handleOpenWindows = (programFile: IProgramFile) => {
    if (appProcesses?.filter((appInProcess) => appInProcess.id === programFile.id)[0]) {
      appDispatch(AppActionType.OPEN_WINDOWS_FROM_MINIMIZE, { programFileId: programFile.id });

      window.dispatchEvent(
        new CustomEvent("openWindows", {
          detail: { windowsSize: IWindowsSize.MINIMIZE, windowsId: programFile.id },
        })
      );
    } else appDispatch(AppActionType.OPEN_NEW_WINDOWS, { programFile: programFile });

    handleToggleMobileMenu();
  };

  return (
    <Fragment>
      <taskbar className="taskbar">
        <p className="title-name">D-Desk</p>
        <ul className="pc-shortcut">
          {[AboutMeProgram, ProjectsProgram, SettingsProgram, TaskManagerProgram].map(
            (programFile) => (
              <li key={programFile.id} onClick={() => handleOpenWindows(programFile)}>
                {programFile.name}
              </li>
            )
          )}
        </ul>
        <button
          ref={mobileMenuRef}
          type="button"
          className="mobile-menu"
          onClick={handleToggleMobileMenu}
        >
          <MdMenu />
        </button>
      </taskbar>
      <ul ref={mobileShortcutRef} id="mobileShortcut" className="mobile-shortcut">
        {[AboutMeProgram, ProjectsProgram, SettingsProgram, TaskManagerProgram].map(
          (programFile) => (
            <li key={programFile.id} onClick={() => handleOpenWindows(programFile)}>
              {programFile.name}
            </li>
          )
        )}
      </ul>
    </Fragment>
  );
};

export default Taskbar;
