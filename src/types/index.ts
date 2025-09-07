import { CursorEffectResult, DefaultOptions } from 'cursor-effects'
import { ProgramFile } from 'program-files'

export type TAppProcesses = Map<string, ProgramFile>
export type TProcessIndex = Array<string>
export type TProcessMinimize = Array<string>

type AppSettingOption = {
  value: string
  label: string
}
export type AppThemeOption = AppSettingOption & {
  theme: string
}
export type AppBackgroundOption = AppSettingOption & {
  image: string
}
export type AppCursorOption = AppSettingOption & {
  cursorEffect?: (options?: DefaultOptions) => CursorEffectResult
}
export type AppSettings = {
  appTheme?: AppThemeOption
  appBackground?: AppBackgroundOption
  appCursor?: AppCursorOption
  appCursorEffectResult?: CursorEffectResult
}
