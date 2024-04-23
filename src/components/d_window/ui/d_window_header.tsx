import { IProgramFile } from "program_files";
import { ForwardedRef, forwardRef } from "react";
import { WCDWindowHeader } from "web_components";
import BtnClose from "./btn_close";
import BtnMaximize from "./btn_maximize";
import BtnMinimize from "./btn_minimize";

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
        <h1 className="window-name">{windowApp.name}</h1>
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
