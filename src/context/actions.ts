import { IAppContext } from "@type";
import { EDWindowSizing } from "components/d_window";
import { AppCursorOptions } from "config";
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
      const newProgramFile = deepCopy<IProgramFile>(action.payload.programFile);
      newProgramFile.windowState.runtime = new Date();

      return {
        ...state,
        appProcesses: state.appProcesses.set(newProgramFile.id, newProgramFile),
        processIndex: [newProgramFile.id, ...state.processIndex],
      };
    }
    case AppActionType.OPEN_WINDOW_FROM_MINIMIZE: {
      const programFileModified = state.appProcesses.get(action.payload.programFileId);

      if (programFileModified.windowState.sizing === EDWindowSizing.MINIMIZE)
        programFileModified.windowState.sizing = EDWindowSizing.NORMAL;

      return {
        ...state,
        appProcesses: state.appProcesses.set(action.payload.programFileId, programFileModified),
        processIndex: [
          action.payload.programFileId,
          ...state.processIndex.filter((id: string) => id !== action.payload.programFileId),
        ],
        processMinimize: state.processMinimize?.filter(
          (id: string) => id !== action.payload.programFileId
        ),
      };
    }
    case AppActionType.CLICK_WINDOW: {
      return {
        ...state,
        processIndex: [
          action.payload.programFileId,
          ...state.processIndex.filter((id: string) => id !== action.payload.programFileId),
        ],
      };
    }
    case AppActionType.SIZING_WINDOW: {
      const programFileModified = state.appProcesses.get(action.payload.programFileId);
      programFileModified.windowState.sizing = action.payload.sizing;

      return {
        ...state,
        appProcesses: state.appProcesses.set(action.payload.programFileId, programFileModified),
      };
    }
    case AppActionType.MINIMIZE_WINDOW: {
      const programFileModified = state.appProcesses.get(action.payload.programFileId);
      programFileModified.windowState.sizing = EDWindowSizing.MINIMIZE;

      return {
        ...state,
        appProcesses: state.appProcesses.set(action.payload.programFileId, programFileModified),
        processMinimize: [action.payload.programFileId, ...state.processMinimize],
      };
    }
    case AppActionType.MAXIMIZE_WINDOW: {
      const programFileModified = state.appProcesses.get(action.payload.programFileId);
      programFileModified.windowState.sizing = EDWindowSizing.MAXIMIZE;

      return {
        ...state,
        appProcesses: state.appProcesses.set(action.payload.programFileId, programFileModified),
        processMinimize: state.processMinimize?.filter(
          (id: string) => id !== action.payload.programFileId
        ),
      };
    }
    case AppActionType.CLOSE_WINDOW: {
      state.appProcesses.delete(action.payload.programFileId);

      return {
        ...state,
        processIndex: state.processIndex?.filter(
          (id: string) => id !== action.payload.programFileId
        ),
        processMinimize: state.processMinimize?.filter(
          (id: string) => id !== action.payload.programFileId
        ),
      };
    }
    case AppActionType.UPDATE_APP_SETTINGS: {
      delete action.payload.appSettings.appCursorEffectResult;

      state.appSettings.appCursorEffectResult?.destroy();
      localStorageHelper.update("appSettings", action.payload.appSettings);
      document.body.setAttribute("data-theme", action.payload.appSettings?.appTheme?.theme);

      return {
        ...state,
        appSettings: {
          ...action.payload.appSettings,
          appCursorEffectResult: AppCursorOptions.filter(
            (cursor) => cursor.value === action.payload.appSettings.appCursor.value
          )[0].cursorEffect?.(),
        },
      };
    }
    default:
      throw Error(`Unknown action ${action.type}`);
  }
};
