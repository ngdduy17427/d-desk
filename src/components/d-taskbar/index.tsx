import { IAppContext, TAppDispatch } from "@type";
import Link from "next/link";
import { IProgramFile } from "program-files";
import AboutMeProgram from "program-files/about-me";
import ContactProgram from "program-files/contact";
import OneAMProgram from "program-files/one-am";
import ProjectsProgram from "program-files/projects";
import SettingsProgram from "program-files/settings";
import SkillsProgram from "program-files/skills";
import TaskManagerProgram from "program-files/task-manager";
import { useRef } from "react";
import { AppActionType } from "store/actions";
import { withContext } from "store/context";
import { WCDTaskbar } from "web-components";
import "./css.css";
import BtnFullscreen from "./ui/btn-fullscreen";
import BtnMobileMenu from "./ui/btn-mobile-menu";
import DesktopShortcut from "./ui/desktop-shortcut";
import MobileShortcut from "./ui/mobile-shortcut";

export const programFiles = [
  OneAMProgram,
  AboutMeProgram,
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
    if (appProcesses.has(String(programFile.id))) {
      appDispatch(AppActionType.NORMAL_WINDOW, { programFileId: programFile.id });
    } else {
      appDispatch(AppActionType.OPEN_NEW_WINDOW, { programFile: programFile });
    }

    handleToggleMobileMenu();
  };

  return (
    <WCDTaskbar>
      <Link href={String(process.env.NEXT_PUBLIC_BASE_URL)} className="title-name">
        D-Desk
      </Link>
      <DesktopShortcut handleOpenWindow={handleOpenWindow} />
      <MobileShortcut ref={mobileShortcutRef} handleOpenWindow={handleOpenWindow} />
      <BtnMobileMenu handleToggleMobileMenu={handleToggleMobileMenu} />
      <BtnFullscreen />
    </WCDTaskbar>
  );
};

export default withContext(DTaskbar);
