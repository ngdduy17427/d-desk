import { CursorEffectResult, DefaultOptions } from "cursor-effects";
import { IProgramFile } from "program_files";

export interface IAppBackground {
  value: string;
  image: string;
}

export interface IAppCursor {
  value: string;
  label: string;
  cursor?: (options?: DefaultOptions) => CursorEffectResult;
}

export interface IAppSetting {
  background: IAppBackground;
  cursor: IAppCursor;
  cursorEffectResult?: CursorEffectResult;
}

export interface IAppContext {
  programFiles: IProgramFile[];
  appProcesses: IProgramFile[];
  processIndex: string[];
  processMinimize: string[];
  appSettings: IAppSetting;
}
