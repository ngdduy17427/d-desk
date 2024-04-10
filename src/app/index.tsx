import { IAppSettings, TAppDispatch } from "@type";
import Desktop from "components/desktop";
import Taskbar from "components/taskbar";
import { AppActionType } from "context/actions";
import AboutMeProgram from "program_files/about_me";
import { Fragment, useCallback, useEffect } from "react";
import localStorageHelper from "utils/local_storage_helper";
import { AppProvider, withContext } from "../context/context";

const AppInit = withContext(({ appDispatch }: { appDispatch: TAppDispatch }) => {
  useEffect(() => {
    appDispatch(AppActionType.OPEN_NEW_WINDOWS, { programFile: AboutMeProgram });
  }, [appDispatch]);

  const loadLocalSettings = useCallback(() => {
    if (localStorageHelper.get("appSettings")) {
      const localStorageSettings: IAppSettings = JSON.parse(
        String(localStorageHelper.get("appSettings"))
      );

      if (
        !localStorageSettings.appTheme?.value ||
        !localStorageSettings.appBackground?.value ||
        !localStorageSettings.appCursor?.value
      )
        appDispatch(AppActionType.INITIAL_APP_SETTINGS);
      else
        appDispatch(AppActionType.UPDATE_APP_SETTINGS, {
          appSettings: JSON.parse(String(localStorageHelper.get("appSettings"))),
        });
    } else appDispatch(AppActionType.INITIAL_APP_SETTINGS);
  }, [appDispatch]);

  useEffect(() => {
    loadLocalSettings();

    window.addEventListener("storage", loadLocalSettings);
    return () => window.removeEventListener("storage", loadLocalSettings);
  }, [loadLocalSettings]);

  return (
    <Fragment>
      <Taskbar />
      <Desktop />
    </Fragment>
  );
});

const App = () => (
  <AppProvider
    initialValue={{
      appSettings: {},
      appProcesses: [],
      processIndex: [],
      processMinimize: [],
    }}
  >
    <AppInit />
  </AppProvider>
);

export default App;
