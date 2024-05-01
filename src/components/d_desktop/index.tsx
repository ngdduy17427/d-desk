import { IAppContext, IAppSettings, TAppDispatch } from "@type";
import DWindow from "components/d_window";
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from "config";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
import { IProgramFile } from "program_files";
import AboutMeProgram from "program_files/about_me";
import { useCallback, useLayoutEffect, useRef } from "react";
import localStorageHelper from "utils/local_storage_helper";
import { isUndefined } from "utils/utils_helper";
import { WCDDesktop } from "web_components";
import "./css.css";

interface IDDesktopProps {
  appContext: IAppContext;
  appDispatch: TAppDispatch;
}

const DDesktop = ({
  appContext: { appSettings, appProcesses },
  appDispatch,
}: IDDesktopProps): JSX.Element => {
  const containerRef = useRef<HTMLElement>(null);

  const localLocalSettings = useCallback((): void => {
    const localStorageSettingsStr: string = localStorageHelper.get("appSettings");
    const initAppSettings: IAppSettings = {
      appTheme: AppThemeOptions[0],
      appBackground: AppBackgroundOptions[0],
      appCursor: AppCursorOptions[0],
    };

    if (!localStorageSettingsStr)
      appDispatch(AppActionType.UPDATE_APP_SETTINGS, { appSettings: initAppSettings });
    else {
      const localStorageSettingsParsed: IAppSettings = JSON.parse(localStorageSettingsStr);

      if (
        isUndefined(localStorageSettingsParsed.appTheme?.value) ||
        isUndefined(localStorageSettingsParsed.appBackground?.value) ||
        isUndefined(localStorageSettingsParsed.appCursor?.value)
      ) {
        appDispatch(AppActionType.UPDATE_APP_SETTINGS, { appSettings: initAppSettings });
      } else {
        appDispatch(AppActionType.UPDATE_APP_SETTINGS, { appSettings: localStorageSettingsParsed });
      }
    }
  }, [appDispatch]);

  useLayoutEffect((): (() => void) => {
    localLocalSettings();

    addEventListener("storage", localLocalSettings);
    return (): void => removeEventListener("storage", localLocalSettings);
  }, [localLocalSettings]);

  useLayoutEffect(
    (): void => appDispatch(AppActionType.OPEN_NEW_WINDOW, { programFile: AboutMeProgram }),
    [appDispatch]
  );

  return (
    <WCDDesktop
      ref={containerRef}
      style={{
        backgroundImage: `url(${appSettings.appBackground?.image})`,
      }}
    >
      {Array.from(appProcesses.values()).map(
        (appInProcess: IProgramFile): JSX.Element => (
          <DWindow
            key={appInProcess.id}
            windowApp={appInProcess}
            container={containerRef.current}
          />
        )
      )}
    </WCDDesktop>
  );
};

export default withContext(DDesktop);
