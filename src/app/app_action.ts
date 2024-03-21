import { IAppContext } from "@type";
import { IProgramFile } from "program_files";

export interface AppActionProps {
  type: AppActionType;
  payload: any;
}

export enum AppActionType {
  OPEN_WINDOWS = "OPEN_WINDOWS",
  CLICK_WINDOWS = "CLICK_WINDOWS",
  MINIMIZE_WINDOWS = "MINIMIZE_WINDOWS",
  REMOVE_FROM_PROCESS_MINIMIZE = "REMOVE_FROM_PROCESS_MINIMIZE",
  CLOSE_WINDOWS = "CLOSE_WINDOWS",
}

export const appAction = (
  state: IAppContext,
  dispatch: React.Dispatch<React.SetStateAction<IAppContext>>,
  action: AppActionProps
) => {
  switch (action.type) {
    case AppActionType.OPEN_WINDOWS:
      return state.appProcesses?.filter(
        (appInBackground: IProgramFile) => appInBackground.id === action.payload.id
      )[0]
        ? dispatch((prevState) => ({
            ...prevState,
            processIndex: [
              action.payload.id,
              ...prevState.processIndex.filter((id: string) => id !== action.payload.id),
            ],
            processMinimize: prevState.processMinimize?.filter(
              (id: string) => id !== action.payload.id
            ),
          }))
        : dispatch((prevState) => ({
            ...prevState,
            appProcesses: [...prevState.appProcesses, action.payload],
            processIndex: [action.payload.id, ...prevState.processIndex],
          }));
    case AppActionType.CLICK_WINDOWS:
      return dispatch((prevState) => ({
        ...prevState,
        processIndex: [
          action.payload,
          ...prevState.processIndex.filter((id: string) => id !== action.payload),
        ],
      }));
    case AppActionType.MINIMIZE_WINDOWS:
      return dispatch((prevState) => ({
        ...prevState,
        processMinimize: [action.payload, ...prevState.processMinimize],
      }));
    case AppActionType.REMOVE_FROM_PROCESS_MINIMIZE:
      return dispatch((prevState) => ({
        ...prevState,
        processMinimize: prevState.processMinimize?.filter((id: string) => id !== action.payload),
      }));
    case AppActionType.CLOSE_WINDOWS:
      return dispatch((prevState) => ({
        ...prevState,
        appProcesses: prevState.appProcesses.filter(
          (appInProcess: IProgramFile) => appInProcess.id !== action.payload
        ),
        processIndex: prevState.processIndex.filter((id: string) => id !== action.payload),
        processMinimize: prevState.processMinimize?.filter((id: string) => id !== action.payload),
      }));
    default:
      throw Error(`Unknown action ${action.type}`);
  }
};
