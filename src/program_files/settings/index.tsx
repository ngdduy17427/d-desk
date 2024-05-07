import { IAppBackgroundOption, IAppContext, TAppDispatch } from "@type";
import DContainer from "components/d_container";
import DSelectField from "components/d_fields/d_select_field";
import DImage from "components/d_image";
import { AppBackgroundOptions, AppCursorOptions, AppThemeOptions } from "config";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
import { createProgramFile } from "program_files";
import "./css.css";

interface ISettingsUIProps {
  appContext: IAppContext;
  appDispatch: TAppDispatch;
}

const UI = withContext(
  ({ appContext: { appSettings }, appDispatch }: ISettingsUIProps): JSX.Element => {
    return (
      <DContainer className="settings-container">
        <DSelectField
          label="Theme:"
          options={AppThemeOptions}
          value={appSettings.appTheme}
          onChange={(option): void =>
            appDispatch(AppActionType.UPDATE_APP_SETTINGS, {
              appSettings: { ...appSettings, appTheme: option },
            })
          }
        />
        <DSelectField
          label="Cursor:"
          options={AppCursorOptions}
          value={appSettings.appCursor}
          onChange={(option): void =>
            appDispatch(AppActionType.UPDATE_APP_SETTINGS, {
              appSettings: { ...appSettings, appCursor: option },
            })
          }
        />
        <DSelectField
          label="Background:"
          options={AppBackgroundOptions}
          value={appSettings.appBackground}
          onChange={(option): void =>
            appDispatch(AppActionType.UPDATE_APP_SETTINGS, {
              appSettings: { ...appSettings, appBackground: option },
            })
          }
          formatOptionLabel={(option): JSX.Element => (
            <div className="opt-bg">
              <DImage
                src={(option as IAppBackgroundOption).image}
                alt="App Background"
                className="opt-bg-img"
              />
              <p>{(option as IAppBackgroundOption).label}</p>
            </div>
          )}
        />
      </DContainer>
    );
  }
);

const SettingsProgram = createProgramFile({
  name: "Settings",
  component: UI,
  windowState: {
    width: 300,
    height: 500,
  },
});

export default SettingsProgram;
