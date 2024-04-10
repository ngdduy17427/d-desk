import { IProgramFile } from "program_files";
import { memo } from "react";

const WindowsBody = ({ windowsApp }: { windowsApp: IProgramFile }) => {
  const WindowsComponent = windowsApp.component;

  return (
    <div className="windows-body">
      <WindowsComponent windowsApp={windowsApp} />
    </div>
  );
};

export default memo(WindowsBody);
