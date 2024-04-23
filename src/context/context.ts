"use client";

import { IAppContext, TAppDispatch } from "@type";
import React from "react";
import { AppActionType, appAction } from "./actions";

interface IAppProviderProps {
  children: React.ReactNode;
  initialValue: IAppContext;
}

interface IContextProps {
  appContext: IAppContext;
  appDispatch: TAppDispatch;
}

const AppContext = React.createContext<any>({});

const AppProvider = ({ children, initialValue }: IAppProviderProps): JSX.Element => {
  const [appContext, setAppContext] = React.useState<IAppContext>(initialValue);

  const appContextMemo = React.useMemo((): IAppContext => appContext, [appContext]);

  const appDispatchCallback = React.useCallback(
    (type: AppActionType, payload?: any): void =>
      React.startTransition((): void =>
        setAppContext((prevState): IAppContext => appAction(prevState, { type, payload }))
      ),
    []
  );

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        appContext: appContextMemo,
        appDispatch: appDispatchCallback,
      },
    },
    children
  );
};

const withContext = <P>(Component: React.JSXElementConstructor<P>) => {
  const WrappedComponent = (props: Omit<P, keyof IContextProps>): React.JSX.Element =>
    React.createElement(Component, {
      ...(props as P),
      ...React.use<IContextProps>(AppContext),
    });

  return WrappedComponent;
};

export { AppProvider, withContext };
