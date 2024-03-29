import { IAppContext } from "@type";
import moment from "moment";
import { IProgramFile } from "program_files";

export enum AppActionType {
  OPEN_NEW_WINDOWS = "OPEN_WINDOWS",
  OPEN_WINDOWS_FROM_MINIMIZE = "OPEN_WINDOWS_FROM_MINIMIZE",
  CLICK_WINDOWS = "CLICK_WINDOWS",
  MINIMIZE_WINDOWS = "MINIMIZE_WINDOWS",
  REMOVE_FROM_PROCESS_MINIMIZE = "REMOVE_FROM_PROCESS_MINIMIZE",
  CLOSE_WINDOWS = "CLOSE_WINDOWS",
  CHANGE_APP_BACKGROUND = "CHANGE_APP_BACKGROUND",
  CHANGE_APP_CURSOR = "CHANGE_APP_CURSOR",
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
    case AppActionType.CHANGE_APP_BACKGROUND:
      return {
        ...state,
        appSettings: {
          ...state.appSettings,
          background: action.payload.background,
        },
      };
    case AppActionType.CHANGE_APP_CURSOR:
      state.appSettings.cursorEffectResult?.destroy();

      return {
        ...state,
        appSettings: {
          ...state.appSettings,
          cursor: action.payload.cursor,
          cursorEffectResult: action.payload.cursor.cursor?.(),
        },
      };
    default:
      throw Error(`Unknown action ${action.type}`);
  }
};
