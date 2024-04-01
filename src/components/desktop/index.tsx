import Windows from "components/windows";
import { useAppContext } from "context/context";
import { IProgramFile } from "program_files";
import { useRef } from "react";
import "./css.scss";

const Desktop = () => {
  const {
    appContext: { appProcesses, appSettings },
  } = useAppContext();
  const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <desktop
      ref={desktopRef}
      style={{
        backgroundImage: `url(${appSettings.appBackground?.image})`,
      }}
    >
      {appProcesses?.map((appInProcess: IProgramFile) => (
        <Windows key={appInProcess.id} windowsApp={appInProcess} containerRef={desktopRef} />
      ))}
    </desktop>
  );
};

export default Desktop;
