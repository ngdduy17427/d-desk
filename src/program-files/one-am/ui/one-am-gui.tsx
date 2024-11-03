import classNames from "classnames";
import DInputField from "components/d-fields/d-input-field";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, memo } from "react";
import { isUndefined } from "utils/utils-helper";
import { PlayerSettings } from "../@type";

interface IOneAMGUIProps {
  playersOnline: number | undefined;
  playerSettings: PlayerSettings;
  setPlayerSettings: Dispatch<SetStateAction<PlayerSettings>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const OneAMGUI = ({
  playersOnline,
  playerSettings,
  setPlayerSettings,
  onSubmit,
}: IOneAMGUIProps): JSX.Element => {
  const handleChangePlayerName = (event: ChangeEvent<HTMLInputElement>): void =>
    setPlayerSettings((prevState) => ({ ...prevState, playerName: event.target.value }));

  return (
    <div className="one-am-gui-container">
      <form className="one-am-login-box" onSubmit={onSubmit}>
        <DInputField
          id="oneAMName"
          label="Name:"
          placeholder="Enter name..."
          maxLength={20}
          value={playerSettings.playerName}
          onChange={handleChangePlayerName}
        />
        <button type="submit" className="btn btn-login">
          Yes
        </button>
        <div className="one-am-server-status">
          <span className={classNames("status-dot", { online: !isUndefined(playersOnline) })} />
          <p className="status-description">
            {!isUndefined(playersOnline)
              ? `Server is online (${playersOnline})`
              : "Server is offline"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default memo(OneAMGUI);
