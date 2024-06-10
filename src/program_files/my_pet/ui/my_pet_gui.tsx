import classNames from "classnames";
import DInputField from "components/d_fields/d_input_field";
import DSelectField from "components/d_fields/d_select_field";
import DImage from "components/d_image";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, memo } from "react";
import { PetSelectOption, PetSettings } from "../@type";
import { PetSelectOptions } from "../utils/pet_helper";
import { isUndefined } from "utils/utils_helper";

interface IMyPetGUIProps {
  playersOnline: number | undefined;
  petSettings: PetSettings;
  setPetSettings: Dispatch<SetStateAction<PetSettings>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const MyPetGUI = ({
  playersOnline,
  petSettings,
  setPetSettings,
  onSubmit,
}: IMyPetGUIProps): JSX.Element => {
  const handleChangePetName = (event: ChangeEvent<HTMLInputElement>): void =>
    setPetSettings((prevState) => ({ ...prevState, petName: event.target.value }));
  const handleChangePetSelectOption = (petSelectOption: PetSelectOption): void =>
    setPetSettings((prevState) => ({ ...prevState, petSelectOption: petSelectOption }));

  return (
    <div className="my-pet-gui-container">
      <form className="my-pet-login-box" onSubmit={onSubmit}>
        <DInputField
          id="myPetName"
          label="Name:"
          placeholder="Enter name..."
          maxLength={20}
          value={petSettings.petName}
          onChange={handleChangePetName}
        />
        <DSelectField
          label="Avatar:"
          options={Array.from(PetSelectOptions.values())}
          value={petSettings.petSelectOption}
          onChange={(option): void => handleChangePetSelectOption(option as PetSelectOption)}
          formatOptionLabel={(option): JSX.Element => (
            <div className="opt-pet-avatar">
              <DImage
                src={(option as PetSelectOption).thumb}
                alt="Pet Avatar"
                className="opt-pet-avatar-img"
                unoptimized
              />
              <p>{(option as PetSelectOption).label}</p>
            </div>
          )}
        />
        <button type="submit" className="btn btn-login">
          Yes
        </button>
        <div className="my-pet-server-status">
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

export default memo(MyPetGUI);
