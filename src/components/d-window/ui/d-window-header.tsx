import { IProgramFile } from "program-files";
import { ForwardedRef, forwardRef } from "react";
import { WCDWindowHeader } from "web-components";
import BtnClose from "./btn-close";
import BtnMaximize from "./btn-maximize";
import BtnMinimize from "./btn-minimize";

const DWindowHeader = forwardRef(
  (
    {
      windowApp,
    }: {
      windowApp: IProgramFile;
    },
    ref: ForwardedRef<HTMLElement>
  ): JSX.Element => {
    return (
      <WCDWindowHeader ref={ref}>
        <h2 className="window-name">{windowApp.name}</h2>
        <div className="window-nav">
          <BtnMinimize windowApp={windowApp} />
          <BtnMaximize windowApp={windowApp} />
          <BtnClose windowId={String(windowApp.id)} />
        </div>
      </WCDWindowHeader>
    );
  }
);

DWindowHeader.displayName = "Window Header";

export default DWindowHeader;
