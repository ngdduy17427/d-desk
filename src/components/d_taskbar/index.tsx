import { IAppContext, TAppDispatch } from "@type";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
import { IProgramFile } from "program_files";
import AboutMeProgram from "program_files/about_me";
import ContactProgram from "program_files/contact";
import MyPetProgram from "program_files/my_pet";
import ProjectsProgram from "program_files/projects";
import SettingsProgram from "program_files/settings";
import SkillsProgram from "program_files/skills";
import TaskManagerProgram from "program_files/task_manager";
import { useRef } from "react";
import { WCDTaskbar } from "web_components";
import "./css.css";
import BtnFullscreen from "./ui/btn_fullscreen";
import BtnMobileMenu from "./ui/btn_mobile_menu";
import DesktopShortcut from "./ui/desktop_shortcut";
import MobileShortcut from "./ui/mobile_shortcut";

export const programFiles = [
  AboutMeProgram,
  MyPetProgram,
  ProjectsProgram,
  SkillsProgram,
  ContactProgram,
  TaskManagerProgram,
  SettingsProgram,
];

interface IDTaskbarProps {
  appContext: IAppContext;
  appDispatch: TAppDispatch;
}

const DTaskbar = ({ appContext: { appProcesses }, appDispatch }: IDTaskbarProps): JSX.Element => {
  const mobileShortcutRef = useRef<HTMLUListElement>(null);

  const handleToggleMobileMenu = (): void => {
    if (mobileShortcutRef.current?.classList.contains("show"))
      mobileShortcutRef.current?.classList.remove("show");
    else {
      mobileShortcutRef.current?.classList.add("show");
    }
  };

  const handleOpenWindow = (programFile: IProgramFile): void => {
    if (appProcesses.has(programFile.id))
      appDispatch(AppActionType.OPEN_WINDOW_FROM_MINIMIZE, { programFileId: programFile.id });
    else {
      appDispatch(AppActionType.OPEN_NEW_WINDOW, { programFile: programFile });
    }

    handleToggleMobileMenu();
  };

  return (
    <WCDTaskbar>
      <h1 className="title-name">D-Desk</h1>
      <DesktopShortcut handleOpenWindow={handleOpenWindow} />
      <MobileShortcut ref={mobileShortcutRef} handleOpenWindow={handleOpenWindow} />
      <BtnMobileMenu handleToggleMobileMenu={handleToggleMobileMenu} />
      <BtnFullscreen />
    </WCDTaskbar>
  );
};

export default withContext(DTaskbar);
