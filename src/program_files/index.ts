import { Moment } from "moment";
import { uuidv4 } from "utils/utils_helper";

export interface IProgramFile {
  id?: string;
  component: (...args: any) => React.ReactNode;
  name: string;
  width: number;
  height: number;
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  isCenter?: boolean;
  isDraggable?: boolean;
  runtime?: Moment;
}

export const createProgramFile = (config: IProgramFile) => ({
  id: config.id ?? uuidv4(),
  component: config.component,
  name: config.name,
  width: config.width,
  height: config.height,
  position: {
    top: config.position?.top,
    right: config.position?.right,
    bottom: config.position?.bottom,
    left: config.position?.left,
  },
  isCenter: config.isCenter ?? true,
  isDraggable: config.isDraggable ?? true,
  runtime: config.runtime ?? undefined,
});
