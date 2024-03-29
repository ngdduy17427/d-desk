import { AppBackgrounds, AppCursors } from "config";
import { AppActionType } from "context/actions";
import { useAppContext } from "context/context";
import { createProgramFile } from "program_files";
import Select from "react-select";
import "./css.scss";

const UI = () => {
  const {
    appContext: { appSettings },
    appDispatch,
  } = useAppContext();

  return (
    <div className="settings-ui">
      <label className="setting-field">
        <p>Background:</p>
        <Select
          className="h-[50px]"
          options={AppBackgrounds}
          formatOptionLabel={(option) => (
            <img src={option.image} alt="App Background" className="size-[45px]" />
          )}
          value={appSettings.background}
          onChange={(event) =>
            appDispatch(AppActionType.CHANGE_APP_BACKGROUND, { background: event })
          }
        />
      </label>
      <label className="setting-field">
        <p>Cursor:</p>
        <Select
          className="h-[50px]"
          options={AppCursors}
          value={appSettings.cursor}
          onChange={(event) => appDispatch(AppActionType.CHANGE_APP_CURSOR, { cursor: event })}
          menuPortalTarget={document.body}
          styles={{
            valueContainer: (base: any) => ({ ...base, padding: "0.45rem" }),
            menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
          }}
        />
      </label>
    </div>
  );
};

const SettingsProgram = createProgramFile({
  component: UI,
  name: "Settings",
  width: 300,
  height: 500,
});

export default SettingsProgram;
