import { IAppContext } from "@type";
import { AppActionType } from "app/app_action";
import React, { startTransition } from "react";
import { appAction } from "./app_action";

const AppContext = React.createContext<any>({});
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appContext, setAppContext] = React.useState<IAppContext>({
    appProcesses: [],
    processIndex: [],
    processMinimize: [],
  });

  const appDispatch = (type: AppActionType, payload: any) =>
    startTransition(() => appAction(appContext, setAppContext, { type, payload }));

  return React.createElement(AppContext.Provider, { value: { appContext, appDispatch } }, children);
};
const useAppContext = () =>
  React.useContext<{
    appContext: IAppContext;
    appDispatch: (type: AppActionType, payload: any) => void;
  }>(AppContext);
export { AppProvider, useAppContext };
