import { AppActionType } from "context/actions";
import { CursorEffectResult, DefaultOptions } from "cursor-effects";
import { IProgramFile } from "program_files";

type TAppProcesses = Map<string, IProgramFile>;
type TProcessIndex = Array<string>;
type TProcessMinimize = Array<string>;

export type TAppDispatch = (type: AppActionType, payload?: any) => void;

interface IAppSettingOption {
  value: string;
  label: string;
}
export interface IAppThemeOption extends IAppSettingOption {
  theme: string;
}
export interface IAppBackgroundOption extends IAppSettingOption {
  image: string;
}
export interface IAppCursorOption extends IAppSettingOption {
  cursorEffect?: (options?: DefaultOptions) => CursorEffectResult;
}
export interface IAppSettings {
  appTheme?: IAppThemeOption;
  appBackground?: IAppBackgroundOption;
  appCursor?: IAppCursorOption;
  appCursorEffectResult?: CursorEffectResult;
}

export interface IAppContext {
  appSettings: IAppSettings;
  appProcesses: TAppProcesses;
  processIndex: TProcessIndex;
  processMinimize: TProcessMinimize;
}
