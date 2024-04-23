import { IProgramFile } from "program_files";
import { memo } from "react";
import { WCDWindowBody } from "web_components";

const DWindowBody = ({ windowApp }: { windowApp: IProgramFile }) => {
  const WindowComponent = windowApp.component;

  return (
    <WCDWindowBody>
      <WindowComponent windowApp={windowApp} />
    </WCDWindowBody>
  );
};

export default memo(DWindowBody);
