import { DContainer } from 'components/d-container'
import { DSelectField } from 'components/d-fields/d-select-field'
import { DImage } from 'components/d-image'
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from 'config'
import { createProgramFile } from 'program-files'
import { useStore } from 'store'
import { AppBackgroundOption, AppCursorOption, AppThemeOption } from 'types'
import './css.css'

const UI = () => {
  const appSettings = useStore((store) => store.appStore.appSettings)
  const updateAppSetting = useStore((store) => store.appStore.updateAppSetting)

  return (
    <DContainer className='settings-container'>
      <DSelectField
        label='Theme:'
        options={AppThemeOptions}
        value={appSettings.appTheme}
        onChange={(option) =>
          updateAppSetting({
            ...appSettings,
            appTheme: option as AppThemeOption,
          })
        }
      />
      <DSelectField
        label='Cursor:'
        options={AppCursorOptions}
        value={appSettings.appCursor}
        onChange={(option) =>
          updateAppSetting({
            ...appSettings,
            appCursor: option as AppCursorOption,
          })
        }
      />
      <DSelectField
        label='Background:'
        options={AppBackgroundOptions}
        value={appSettings.appBackground}
        onChange={(option) =>
          updateAppSetting({
            ...appSettings,
            appBackground: option as AppBackgroundOption,
          })
        }
        formatOptionLabel={(option) => (
          <div className='opt-bg'>
            <DImage
              src={(option as AppBackgroundOption).image}
              alt='App Background'
              className='opt-bg-img'
            />
            <p>{(option as AppBackgroundOption).label}</p>
          </div>
        )}
      />
    </DContainer>
  )
}

export const SettingsProgram = createProgramFile({
  name: 'Settings',
  component: UI,
  windowState: {
    width: 300,
    height: 500,
  },
})
