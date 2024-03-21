import { useAppContext } from "app/app_context";
import Windows from "components/windows";
import { IProgramFile } from "program_files";
import { useRef } from "react";
import "./css.scss";

const Desktop = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const {
    appContext: { appProcesses },
  } = useAppContext();

  return (
    <div ref={desktopRef} className="desktop">
      {appProcesses?.map((appInProcess: IProgramFile) => (
        <Windows key={appInProcess.id} windowsApp={appInProcess} containerRef={desktopRef} />
      ))}
    </div>
  );
};

export default Desktop;
