"use client";

import DDesktop from "components/d-desktop";
import DTaskbar from "components/d-taskbar";
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from "config";
import { AppProvider } from "store/context";

const initialStore = {
  appSettings: {
    appTheme: AppThemeOptions[0],
    appBackground: AppBackgroundOptions[0],
    appCursor: AppCursorOptions[0],
  },
  appProcesses: new Map(),
  processIndex: new Array(0),
  processMinimize: new Array(0),
};

const AppInit = (): JSX.Element => {
  return (
    <AppProvider initialValue={initialStore}>
      <DTaskbar />
      <DDesktop />
    </AppProvider>
  );
};

export default AppInit;
