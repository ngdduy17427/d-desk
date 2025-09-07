import { DWindowState, EDWindowSizing } from 'components/d-window'
import { uniqueId } from 'utils/utils-helper'

export type ProgramFile = {
  id: string
  name: string
  component: (...args: any) => React.ReactNode
  windowState: DWindowState
  windowProps?: Record<string, any>
}

export type ProgramFileConfig = Omit<ProgramFile, 'id'> & { id?: string }

export const createProgramFile = (config: ProgramFileConfig): ProgramFile => ({
  id: config.id ?? uniqueId(),
  name: config.name,
  component: config.component,
  windowState: {
    width: Number(config.windowState.width),
    height: Number(config.windowState.height),
    sizing: config.windowState.sizing ?? EDWindowSizing.NORMAL,
    position: {
      top: config.windowState.position?.top,
      right: config.windowState.position?.right,
      bottom: config.windowState.position?.bottom,
      left: config.windowState.position?.left,
    },
    isCenter: config.windowState.isCenter ?? true,
    isDraggable: config.windowState.isDraggable ?? true,
    runtime: config.windowState.runtime ?? undefined,
  },
  windowProps: config.windowProps,
})
