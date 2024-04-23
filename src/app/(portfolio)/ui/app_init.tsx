"use client";

import DDesktop from "components/d_desktop";
import DTaskbar from "components/d_taskbar";
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from "config";
import { AppProvider } from "context/context";

const AppInit = (): JSX.Element => {
  return (
    <AppProvider
      initialValue={{
        appSettings: {
          appTheme: AppThemeOptions[0],
          appBackground: AppBackgroundOptions[0],
          appCursor: AppCursorOptions[0],
        },
        appProcesses: new Map(),
        processIndex: new Array(0),
        processMinimize: new Array(0),
      }}
    >
      <DTaskbar />
      <DDesktop />
    </AppProvider>
  );
};

export default AppInit;
