import Windows from "components/windows";
import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import { IProgramFile } from "program_files";
import AboutMeProgram from "program_files/about_me";
import { useEffect, useRef } from "react";
import "./css.scss";

const Desktop = () => {
  const {
    appContext: { appProcesses, appSettings },
    appDispatch,
  } = useAppContext();
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    appDispatch(AppActionType.OPEN_NEW_WINDOWS, { programFile: AboutMeProgram });
  }, [appDispatch]);

  return (
    <desktop
      ref={desktopRef}
      style={{
        backgroundImage: `url(${appSettings.background.image})`,
      }}
    >
      {appProcesses?.map((appInProcess: IProgramFile) => (
        <Windows key={appInProcess.id} windowsApp={appInProcess} containerRef={desktopRef} />
      ))}
    </desktop>
  );
};

export default Desktop;
