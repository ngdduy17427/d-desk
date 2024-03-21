import * as UtilsHelper from "utils/utils_helper";

export interface IProgramFile {
  id?: string;
  component: () => JSX.Element;
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
}

export const createProgramFile = (config: IProgramFile) => {
  return {
    id: UtilsHelper.uuidv4(),
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
  };
};
