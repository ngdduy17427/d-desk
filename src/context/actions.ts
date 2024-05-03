import { IAppContext, IAppSettings } from "@type";
import { EDWindowSizing, IDWindowState } from "components/d_window";
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from "config";
import { IProgramFile } from "program_files";
import localStorageHelper from "utils/local_storage_helper";
import { deepCopy } from "utils/utils_helper";

export enum AppActionType {
  OPEN_NEW_WINDOW = "OPEN_WINDOW",
  OPEN_WINDOW_FROM_MINIMIZE = "OPEN_WINDOW_FROM_MINIMIZE",
  CLICK_WINDOW = "CLICK_WINDOW",
  SIZING_WINDOW = "SIZING_WINDOW",
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
      const newProgramFile = <IProgramFile>deepCopy<IProgramFile>(action.payload.programFile);
      (<IDWindowState>newProgramFile.windowState).runtime = new Date();

      return {
        ...state,
        appProcesses: state.appProcesses.set(String(newProgramFile?.id), newProgramFile),
        processIndex: [String(newProgramFile.id), ...state.processIndex],
      };
    }
    case AppActionType.OPEN_WINDOW_FROM_MINIMIZE: {
      const programFileModified = <IProgramFile>(
        state.appProcesses.get(action.payload.programFileId)
      );

      if (programFileModified?.windowState?.sizing === EDWindowSizing.MINIMIZE)
        programFileModified.windowState.sizing = EDWindowSizing.NORMAL;

      return {
        ...state,
        appProcesses: state.appProcesses.set(action.payload.programFileId, programFileModified),
        processIndex: [
          action.payload.programFileId,
          ...state.processIndex.filter(
            (id: string): boolean => id !== action.payload.programFileId
          ),
        ],
        processMinimize: state.processMinimize?.filter(
          (id: string): boolean => id !== action.payload.programFileId
        ),
      };
    }
    case AppActionType.CLICK_WINDOW: {
      return {
        ...state,
        processIndex: [
          action.payload.programFileId,
          ...state.processIndex.filter(
            (id: string): boolean => id !== action.payload.programFileId
          ),
        ],
      };
    }
    case AppActionType.SIZING_WINDOW: {
      const programFileModified = <IProgramFile>(
        state.appProcesses.get(action.payload.programFileId)
      );
      (<IDWindowState>programFileModified.windowState).sizing = action.payload.sizing;

      return {
        ...state,
        appProcesses: state.appProcesses.set(action.payload.programFileId, programFileModified),
      };
    }
    case AppActionType.MINIMIZE_WINDOW: {
      const programFileModified = <IProgramFile>(
        state.appProcesses.get(action.payload.programFileId)
      );
      (<IDWindowState>programFileModified.windowState).sizing = EDWindowSizing.MINIMIZE;

      return {
        ...state,
        appProcesses: state.appProcesses.set(action.payload.programFileId, programFileModified),
        processMinimize: [action.payload.programFileId, ...state.processMinimize],
      };
    }
    case AppActionType.MAXIMIZE_WINDOW: {
      const programFileModified = <IProgramFile>(
        state.appProcesses.get(action.payload.programFileId)
      );
      (<IDWindowState>programFileModified.windowState).sizing = EDWindowSizing.MAXIMIZE;

      return {
        ...state,
        appProcesses: state.appProcesses.set(action.payload.programFileId, programFileModified),
        processMinimize: state.processMinimize?.filter(
          (id: string): boolean => id !== action.payload.programFileId
        ),
      };
    }
    case AppActionType.CLOSE_WINDOW: {
      state.appProcesses.delete(action.payload.programFileId);

      return {
        ...state,
        processIndex: state.processIndex?.filter(
          (id: string): boolean => id !== action.payload.programFileId
        ),
        processMinimize: state.processMinimize?.filter(
          (id: string): boolean => id !== action.payload.programFileId
        ),
      };
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
