import { IProgramFile } from "program_files";

export interface IAppContext {
  appProcesses: IProgramFile[];
  processIndex: string[];
  processMinimize: string[];
}
