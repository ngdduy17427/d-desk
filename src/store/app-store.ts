import { EDWindowSizing } from 'components/d-window'
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from 'config'
import { createStore, withDebug } from 'libs/laguz'
import { ProgramFile } from 'program-files'
import {
  AppBackgroundOption,
  AppCursorOption,
  AppSettings,
  AppThemeOption,
  TAppProcesses,
  TProcessIndex,
  TProcessMinimize,
} from 'types'
import { localStorageHelper } from 'utils/local-storage-helper'
import { deepCopy } from 'utils/utils-helper'

type AppStore = {
  appSettings: AppSettings
  appProcesses: TAppProcesses
  processIndex: TProcessIndex
  processMinimize: TProcessMinimize
  runProgram: (v: ProgramFile) => void
  clickWindow: (v: string) => void
  minimizeWindow: (v: string) => void
  maximizeWindow: (v: string) => void
  normalWindow: (v: string) => void
  closeWindow: (v: string) => void
  updateAppSetting: (v: AppSettings) => void
}

export const appStore = createStore<AppStore>(
  withDebug((state) => ({
    appSettings: {
      appTheme: AppThemeOptions[0],
      appBackground: AppBackgroundOptions[0],
      appCursor: AppCursorOptions[0],
    },
    appProcesses: new Map(),
    processIndex: new Array(0),
    processMinimize: new Array(0),
    runProgram: (programFile: ProgramFile) => {
      for (const [appId, appProcess] of state.appProcesses.entries()) {
        appProcess.windowState.isFocus = false
        state.appProcesses.set(appId, appProcess)
      }

      const newProgramFile = deepCopy(programFile) as ProgramFile
      newProgramFile.windowState.isFocus = true
      newProgramFile.windowState.runtime = new Date()

      state.appProcesses.set(newProgramFile.id, newProgramFile)
      state.processIndex = [newProgramFile.id, ...state.processIndex]
    },
    clickWindow: (programFileId: string) => {
      if (!state.appProcesses.has(programFileId)) return

      for (const [appId, appProcess] of state.appProcesses.entries()) {
        if (appId === programFileId) {
          appProcess.windowState.isFocus = appProcess.windowState.sizing !== EDWindowSizing.MINIMIZE
          state.appProcesses.set(appId, appProcess)
        } else {
          appProcess.windowState.isFocus = false
          state.appProcesses.set(appId, appProcess)
        }
      }

      state.processIndex = [
        programFileId,
        ...state.processIndex.filter((id: string): boolean => id !== programFileId),
      ]
    },
    minimizeWindow: (programFileId: string) => {
      dispatchEvent(new CustomEvent(`resize-window-${programFileId}`))

      const programFileModified = state.appProcesses.get(programFileId) as ProgramFile
      programFileModified.windowState.sizing = EDWindowSizing.MINIMIZE
      programFileModified.windowState.isFocus = false

      state.appProcesses.set(programFileId, programFileModified)
      state.processMinimize = [programFileId, ...state.processMinimize]
    },
    maximizeWindow: (programFileId: string) => {
      dispatchEvent(new CustomEvent(`resize-window-${programFileId}`))

      const programFileModified = state.appProcesses.get(programFileId) as ProgramFile
      programFileModified.windowState.sizing = EDWindowSizing.MAXIMIZE
      programFileModified.windowState.isFocus = true

      state.appProcesses.set(programFileId, programFileModified)
      state.processMinimize = state.processMinimize.filter(
        (id: string): boolean => id !== programFileId,
      )
    },
    normalWindow: (programFileId: string) => {
      dispatchEvent(new CustomEvent(`resize-window-${programFileId}`))

      for (const [appId, appProcess] of state.appProcesses.entries()) {
        if (appId === programFileId) {
          appProcess.windowState.sizing = EDWindowSizing.NORMAL
          appProcess.windowState.isFocus = true
          state.appProcesses.set(appId, appProcess)
        } else {
          appProcess.windowState.isFocus = false
          state.appProcesses.set(appId, appProcess)
        }
      }

      state.processIndex = [
        programFileId,
        ...state.processIndex.filter((id: string): boolean => id !== programFileId),
      ]
      state.processMinimize = state.processMinimize.filter(
        (id: string): boolean => id !== programFileId,
      )
    },
    closeWindow: (programFileId: string) => {
      dispatchEvent(new CustomEvent(`close-window-${programFileId}`))

      state.appProcesses.delete(programFileId)
      state.processIndex = state.processIndex.filter((id: string): boolean => id !== programFileId)
      state.processMinimize = state.processMinimize.filter(
        (id: string): boolean => id !== programFileId,
      )
    },
    updateAppSetting: (appSettings: AppSettings) => {
      state.appSettings.appCursorEffectResult?.destroy()
      delete appSettings.appCursorEffectResult

      let appSettingsModified = deepCopy(appSettings) as AppSettings

      const isAppTheme = AppThemeOptions.filter(
        (appTheme) => appTheme.theme === appSettingsModified.appTheme?.theme,
      )[0] as AppThemeOption | undefined
      const isAppBackground = AppBackgroundOptions.filter(
        (appBackground) => appBackground.image === appSettingsModified.appBackground?.image,
      )[0] as AppBackgroundOption | undefined
      const isAppCursor = AppCursorOptions.filter(
        (appCursor) => appCursor.value === appSettingsModified.appCursor?.value,
      )[0] as AppCursorOption | undefined

      appSettingsModified = {
        appTheme: isAppTheme ?? AppThemeOptions[0],
        appBackground: isAppBackground ?? AppBackgroundOptions[0],
        appCursor: isAppCursor ?? AppCursorOptions[0],
      }

      localStorageHelper.set('appSettings', appSettingsModified)
      document.body.setAttribute('data-theme', String(appSettingsModified.appTheme?.theme))
      state.appSettings = {
        ...appSettingsModified,
        appCursorEffectResult: appSettingsModified.appCursor?.cursorEffect?.(),
      }
    },
  })),
)
