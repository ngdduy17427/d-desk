import { IAppContext, IAppSettings } from "@type";
import { EDWindowSizing, IDWindowState } from "components/d-window";
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from "config";
import { IProgramFile } from "program-files";
import localStorageHelper from "utils/local-storage-helper";
import { deepCopy } from "utils/utils-helper";

export enum AppActionType {
  OPEN_NEW_WINDOW = "OPEN_WINDOW",
  CLICK_WINDOW = "CLICK_WINDOW",
  NORMAL_WINDOW = "NORMAL_WINDOW",
  MINIMIZE_WINDOW = "MINIMIZE_WINDOW",
  MAXIMIZE_WINDOW = "MAXIMIZE_WINDOW",
  CLOSE_WINDOW = "CLOSE_WINDOW",
  UPDATE_APP_SETTINGS = "UPDATE_APP_SETTINGS",
}

interface AppActionProps {
  type: AppActionType;
  payload: any;
}

export const appAction = (state: IAppContext, action: AppActionProps): IAppContext => {
  switch (action.type) {
    case AppActionType.OPEN_NEW_WINDOW: {
      for (const [appId, appProcess] of state.appProcesses.entries()) {
        (<IDWindowState>appProcess.windowState).isFocus = false;
        state.appProcesses.set(appId, appProcess);
      }

      const newProgramFile = <IProgramFile>deepCopy<IProgramFile>(action.payload.programFile);
      (<IDWindowState>newProgramFile.windowState).isFocus = true;
      (<IDWindowState>newProgramFile.windowState).runtime = new Date();

      state.appProcesses.set(String(newProgramFile.id), newProgramFile);
      state.processIndex = [String(newProgramFile.id), ...state.processIndex];

      return { ...state };
    }
    case AppActionType.CLICK_WINDOW: {
      for (const [appId, appProcess] of state.appProcesses.entries()) {
        if (appId === action.payload.programFileId) {
          (<IDWindowState>appProcess.windowState).isFocus =
            (<IDWindowState>appProcess.windowState).sizing !== EDWindowSizing.MINIMIZE;
          state.appProcesses.set(appId, appProcess);
        } else {
          (<IDWindowState>appProcess.windowState).isFocus = false;
          state.appProcesses.set(appId, appProcess);
        }
      }

      state.processIndex = [
        action.payload.programFileId,
        ...state.processIndex.filter((id: string): boolean => id !== action.payload.programFileId),
      ];

      return { ...state };
    }
    case AppActionType.NORMAL_WINDOW: {
      dispatchEvent(new CustomEvent(`resize-window-${action.payload.programFileId}`));

      for (const [appId, appProcess] of state.appProcesses.entries()) {
        if (appId === action.payload.programFileId) {
          (<IDWindowState>appProcess.windowState).sizing = EDWindowSizing.NORMAL;
          (<IDWindowState>appProcess.windowState).isFocus = true;
          state.appProcesses.set(appId, appProcess);
        } else {
          (<IDWindowState>appProcess.windowState).isFocus = false;
          state.appProcesses.set(appId, appProcess);
        }
      }

      state.processIndex = [
        action.payload.programFileId,
        ...state.processIndex.filter((id: string): boolean => id !== action.payload.programFileId),
      ];
      state.processMinimize = state.processMinimize.filter(
        (id: string): boolean => id !== action.payload.programFileId
      );

      return { ...state };
    }
    case AppActionType.MINIMIZE_WINDOW: {
      dispatchEvent(new CustomEvent(`resize-window-${action.payload.programFileId}`));

      const programFileModified = <IProgramFile>(
        state.appProcesses.get(action.payload.programFileId)
      );
      (<IDWindowState>programFileModified.windowState).sizing = EDWindowSizing.MINIMIZE;
      (<IDWindowState>programFileModified.windowState).isFocus = false;

      state.appProcesses.set(action.payload.programFileId, programFileModified);
      state.processMinimize = [action.payload.programFileId, ...state.processMinimize];

      return { ...state };
    }
    case AppActionType.MAXIMIZE_WINDOW: {
      dispatchEvent(new CustomEvent(`resize-window-${action.payload.programFileId}`));

      const programFileModified = <IProgramFile>(
        state.appProcesses.get(action.payload.programFileId)
      );
      (<IDWindowState>programFileModified.windowState).sizing = EDWindowSizing.MAXIMIZE;

      state.appProcesses.set(action.payload.programFileId, programFileModified);
      state.processMinimize = state.processMinimize.filter(
        (id: string): boolean => id !== action.payload.programFileId
      );

      return { ...state };
    }
    case AppActionType.CLOSE_WINDOW: {
      dispatchEvent(new CustomEvent(`close-window-${action.payload.programFileId}`));

      state.appProcesses.delete(action.payload.programFileId);
      state.processIndex = state.processIndex.filter(
        (id: string): boolean => id !== action.payload.programFileId
      );
      state.processMinimize = state.processMinimize.filter(
        (id: string): boolean => id !== action.payload.programFileId
      );

      return { ...state };
    }
    case AppActionType.UPDATE_APP_SETTINGS: {
      state.appSettings.appCursorEffectResult?.destroy();
      delete action.payload.appSettings.appCursorEffectResult;

      let appSettingsModified: IAppSettings = deepCopy(action.payload.appSettings);

      const isAppTheme = AppThemeOptions.filter(
        (appTheme) => appTheme.theme === appSettingsModified.appTheme?.theme
      )[0];
      const isAppBackground = AppBackgroundOptions.filter(
        (appBackground) => appBackground.image === appSettingsModified.appBackground?.image
      )[0];
      const isAppCursor = AppCursorOptions.filter(
        (appCursor) => appCursor.value === appSettingsModified.appCursor?.value
      )[0];

      appSettingsModified = {
        appTheme: isAppTheme ? isAppTheme : AppThemeOptions[0],
        appBackground: isAppBackground ? isAppBackground : AppBackgroundOptions[0],
        appCursor: isAppCursor ? isAppCursor : AppCursorOptions[0],
      };

      localStorageHelper.update("appSettings", appSettingsModified);
      document.body.setAttribute("data-theme", String(appSettingsModified.appTheme?.theme));

      return {
        ...state,
        appSettings: {
          ...appSettingsModified,
          appCursorEffectResult: appSettingsModified.appCursor?.cursorEffect?.(),
        },
      };
    }
    default:
      throw Error(`Unknown action ${action.type}`);
  }
};
