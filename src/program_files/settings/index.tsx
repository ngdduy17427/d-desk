import { IAppBackground, IAppContext, TAppDispatch } from "@type";
import { AppBackgrounds, AppCursors, AppTheme } from "config";
import { AppActionType } from "context/actions";
import { withContext } from "context/context";
import { createProgramFile } from "program_files";
import Select from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import "./css.scss";

const SelectField = ({ label, ...props }: { label: string } & StateManagerProps) => (
  <label className="setting-field">
    <p>{label}</p>
    <Select
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base: any) => ({ ...base, zIndex: 99 }),
      }}
      {...props}
    />
  </label>
);

const UI = withContext(
  ({ appContext, appDispatch }: { appContext: IAppContext; appDispatch: TAppDispatch }) => {
    const { appSettings } = appContext;

    return (
      <div className="settings-ui">
        <SelectField
          label="Theme:"
          options={AppTheme}
          value={appSettings.appTheme}
          onChange={(option) =>
            appDispatch(AppActionType.UPDATE_APP_SETTINGS, {
              appSettings: { ...appSettings, appTheme: option },
            })
          }
        />
        <SelectField
          label="Cursor:"
          options={AppCursors}
          value={appSettings.appCursor}
          onChange={(option) =>
            appDispatch(AppActionType.UPDATE_APP_SETTINGS, {
              appSettings: { ...appSettings, appCursor: option },
            })
          }
        />
        <SelectField
          label="Background:"
          options={AppBackgrounds}
          value={appSettings.appBackground}
          onChange={(option) =>
            appDispatch(AppActionType.UPDATE_APP_SETTINGS, {
              appSettings: { ...appSettings, appBackground: option },
            })
          }
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-4">
              <img
                src={(option as IAppBackground).image}
                alt="App Background"
                className="size-[60px]"
              />
              <p>{(option as IAppBackground).label}</p>
            </div>
          )}
        />
      </div>
    );
  }
);

const SettingsProgram = createProgramFile({
  component: UI,
  name: "Settings",
  width: 300,
  height: 500,
});

export default SettingsProgram;
