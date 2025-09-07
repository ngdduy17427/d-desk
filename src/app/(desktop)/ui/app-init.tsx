'use client'

import { DDesktop } from 'components/d-desktop'
import { DTaskbar } from 'components/d-taskbar'
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from 'config'
import { Fragment, useCallback, useLayoutEffect } from 'react'
import { useStore } from 'store'
import { AppSettings } from 'types'
import { localStorageHelper } from 'utils/local-storage-helper'
import { isUndefined } from 'utils/utils-helper'

export const AppInit = () => {
  const updateAppSetting = useStore((store) => store.appStore.updateAppSetting)

  const localLocalSettings = useCallback(() => {
    const localStorageSettingsStr: string = String(localStorageHelper.get('appSettings'))
    const initAppSettings: AppSettings = {
      appTheme: AppThemeOptions[0],
      appBackground: AppBackgroundOptions[0],
      appCursor: AppCursorOptions[0],
    }

    if (!localStorageSettingsStr) {
      updateAppSetting(initAppSettings)
    } else {
      const localStorageSettingsParsed: AppSettings = JSON.parse(localStorageSettingsStr)

      if (
        isUndefined(localStorageSettingsParsed.appTheme?.value) ||
        isUndefined(localStorageSettingsParsed.appBackground?.value) ||
        isUndefined(localStorageSettingsParsed.appCursor?.value)
      ) {
        updateAppSetting(initAppSettings)
      } else {
        updateAppSetting(localStorageSettingsParsed)
      }
    }
  }, [updateAppSetting])

  useLayoutEffect(() => {
    localLocalSettings()
    addEventListener('storage', localLocalSettings)
    return () => removeEventListener('storage', localLocalSettings)
  }, [localLocalSettings])

  return (
    <Fragment>
      <DTaskbar />
      <DDesktop />
    </Fragment>
  )
}
