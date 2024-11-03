import { EDWindowSizing, IDWindowState } from "components/d-window";
import { uuidv4 } from "utils/utils-helper";

export interface IProgramFile {
  id?: string;
  name: string;
  component: (...args: any) => React.ReactNode;
  windowState?: IDWindowState;
}

export const createProgramFile = (config: IProgramFile): IProgramFile => ({
  id: config.id ?? uuidv4(),
  name: config.name,
  component: config.component,
  windowState: {
    width: Number(config.windowState?.width),
    height: Number(config.windowState?.height),
    sizing: config.windowState?.sizing ?? EDWindowSizing.NORMAL,
    position: {
      top: config.windowState?.position?.top,
      right: config.windowState?.position?.right,
      bottom: config.windowState?.position?.bottom,
      left: config.windowState?.position?.left,
    },
    isCenter: config.windowState?.isCenter ?? true,
    isDraggable: config.windowState?.isDraggable ?? true,
    runtime: config.windowState?.runtime ?? undefined,
  },
});
