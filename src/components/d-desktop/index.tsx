import { IAppContext, IAppSettings, TAppDispatch } from "@type";
import DWindow from "components/d-window";
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from "config";
import { IProgramFile } from "program-files";
import OneAMProgram from "program-files/one-am";
import { useCallback, useLayoutEffect, useRef } from "react";
import { AppActionType } from "store/actions";
import { withContext } from "store/context";
import localStorageHelper from "utils/local-storage-helper";
import { isUndefined } from "utils/utils-helper";
import { WCDDesktop } from "web-components";
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
    const localStorageSettingsStr: string = String(localStorageHelper.get("appSettings"));
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
        isUndefined(localStorageSettingsParsed?.appTheme?.value) ||
        isUndefined(localStorageSettingsParsed?.appBackground?.value) ||
        isUndefined(localStorageSettingsParsed?.appCursor?.value)
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
    (): void => appDispatch(AppActionType.OPEN_NEW_WINDOW, { programFile: OneAMProgram }),
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
            container={containerRef.current as HTMLElement}
          />
        )
      )}
    </WCDDesktop>
  );
};

export default withContext(DDesktop);
