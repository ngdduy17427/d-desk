import { IProgramFile } from "program_files";
import { memo } from "react";
import { WCDWindowBody } from "web_components";

const DWindowBody = ({ windowApp }: { windowApp: IProgramFile }): JSX.Element => {
  const WindowComponent = windowApp.component;

  return (
    <WCDWindowBody>
      <WindowComponent windowApp={windowApp} />
    </WCDWindowBody>
  );
};

export default memo(DWindowBody);
