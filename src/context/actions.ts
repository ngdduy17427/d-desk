import { IAppContext, IAppSettings } from "@type";
import { AppBackgrounds, AppCursors, AppTheme } from "config";
import moment from "moment";
import { IProgramFile } from "program_files";
import localStorageHelper from "utils/local_storage_helper";

export enum AppActionType {
  OPEN_NEW_WINDOWS = "OPEN_WINDOWS",
  OPEN_WINDOWS_FROM_MINIMIZE = "OPEN_WINDOWS_FROM_MINIMIZE",
  CLICK_WINDOWS = "CLICK_WINDOWS",
  MINIMIZE_WINDOWS = "MINIMIZE_WINDOWS",
  REMOVE_FROM_PROCESS_MINIMIZE = "REMOVE_FROM_PROCESS_MINIMIZE",
  CLOSE_WINDOWS = "CLOSE_WINDOWS",
  INITIAL_APP_SETTINGS = "INITIAL_APP_SETTINGS",
  UPDATE_APP_SETTINGS = "UPDATE_APP_SETTINGS",
}

export enum AppSettingsType {
  INIT = "INIT",
  THEME = "THEME",
  BACKGROUND = "BACKGROUND",
  CURSOR = "CURSOR",
}

export interface AppActionProps {
  type: AppActionType;
  payload: any;
}

export const appAction = (state: IAppContext, action: AppActionProps) => {
  switch (action.type) {
    case AppActionType.OPEN_NEW_WINDOWS:
      action.payload.programFile.runtime = moment();

      return {
        ...state,
        appProcesses: [...state.appProcesses, action.payload.programFile],
        processIndex: [action.payload.programFile?.id, ...state.processIndex],
      };
    case AppActionType.OPEN_WINDOWS_FROM_MINIMIZE:
      return {
        ...state,
        processIndex: [
          action.payload.programFileId,
          ...state.processIndex.filter((id: string) => id !== action.payload.programFileId),
        ],
        processMinimize: state.processMinimize?.filter(
          (id: string) => id !== action.payload.programFileId
        ),
      };
    case AppActionType.CLICK_WINDOWS:
      return {
        ...state,
        processIndex: state.processIndex.includes(action.payload.programFileId)
          ? [
              action.payload.programFileId,
              ...state.processIndex.filter((id: string) => id !== action.payload.programFileId),
            ]
          : state.processIndex,
      };
    case AppActionType.MINIMIZE_WINDOWS:
      return {
        ...state,
        processMinimize: [action.payload.programFileId, ...state.processMinimize],
      };
    case AppActionType.REMOVE_FROM_PROCESS_MINIMIZE:
      return {
        ...state,
        processMinimize: state.processMinimize?.filter(
          (id: string) => id !== action.payload.programFileId
        ),
      };
    case AppActionType.CLOSE_WINDOWS:
      return {
        ...state,
        appProcesses: state.appProcesses?.filter(
          (appInProcess: IProgramFile) => appInProcess.id !== action.payload.programFileId
        ),
        processIndex: state.processIndex?.filter(
          (id: string) => id !== action.payload.programFileId
        ),
        processMinimize: state.processMinimize?.filter(
          (id: string) => id !== action.payload.programFileId
        ),
      };
    case AppActionType.INITIAL_APP_SETTINGS: {
      const initAppSettings: IAppSettings = {
        appTheme: AppTheme[0],
        appBackground: AppBackgrounds[0],
        appCursor: AppCursors[0],
      };

      state.appSettings.appCursorEffectResult?.destroy();
      document.body.setAttribute("data-theme", AppTheme[0].theme);
      localStorageHelper.update("appSettings", initAppSettings);

      return {
        ...state,
        appSettings: initAppSettings,
      };
    }
    case AppActionType.UPDATE_APP_SETTINGS:
      delete action.payload.appSettings.appCursorEffectResult;

      state.appSettings.appCursorEffectResult?.destroy();
      localStorageHelper.update("appSettings", action.payload.appSettings);
      document.body.setAttribute("data-theme", action.payload.appSettings?.appTheme?.theme);

      return {
        ...state,
        appSettings: {
          ...action.payload.appSettings,
          appCursorEffectResult: AppCursors.filter(
            (cursor) => cursor.value === action.payload.appSettings.appCursor.value
          )[0].cursorEffect?.(),
        },
      };
    default:
      throw Error(`Unknown action ${action.type}`);
  }
};
