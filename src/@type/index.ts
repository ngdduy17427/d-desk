import { AppActionType } from "context/actions";
import { CursorEffectResult, DefaultOptions } from "cursor-effects";
import { IProgramFile } from "program_files";

export interface IAppSettingOption {
  value: string;
  label: string;
}
export interface IAppTheme extends IAppSettingOption {
  theme: string;
}
export interface IAppBackground extends IAppSettingOption {
  image: string;
}
export interface IAppCursor extends IAppSettingOption {
  cursorEffect?: (options?: DefaultOptions) => CursorEffectResult;
}
export interface IAppSettings {
  appTheme?: IAppTheme;
  appBackground?: IAppBackground;
  appCursor?: IAppCursor;
  appCursorEffectResult?: CursorEffectResult;
}

export type TAppDispatch = (type: AppActionType, payload?: any) => void;
export interface IAppContext {
  appSettings: IAppSettings;
  appProcesses: IProgramFile[];
  processIndex: string[];
  processMinimize: string[];
}
