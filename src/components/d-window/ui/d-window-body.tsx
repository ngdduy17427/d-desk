import { IProgramFile } from "program-files";
import { memo } from "react";
import { WCDWindowBody } from "web-components";

const DWindowBody = ({ windowApp }: { windowApp: IProgramFile }): JSX.Element => {
  const WindowComponent = windowApp.component;

  return (
    <WCDWindowBody>
      <WindowComponent windowApp={windowApp} />
    </WCDWindowBody>
  );
};

export default memo(DWindowBody);
