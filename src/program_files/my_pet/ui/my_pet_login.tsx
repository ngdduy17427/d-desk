import classNames from "classnames";
import DInputField from "components/d_fields/d_input_field";
import DSelectField from "components/d_fields/d_select_field";
import DImage from "components/d_image";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, memo } from "react";
import { PetAvatarOption, PetSettings } from "../@type";
import { PetAvatars } from "../utils/pet_helper";

interface IMyPetLoginProps {
  isServerOnline: boolean;
  petSettings: PetSettings;
  setPetSettings: Dispatch<SetStateAction<PetSettings>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const MyPetLogin = ({
  isServerOnline,
  petSettings,
  setPetSettings,
  onSubmit,
}: IMyPetLoginProps): JSX.Element => {
  const handleChangePetName = (event: ChangeEvent<HTMLInputElement>): void =>
    setPetSettings((prevState) => ({ ...prevState, petName: event.target.value }));
  const handleChangePetAvatar = (petAvatar: PetAvatarOption): void =>
    setPetSettings((prevState) => ({ ...prevState, petAvatar: petAvatar }));

  return (
    <form className="my-pet-login-box" onSubmit={onSubmit}>
      <DInputField label="Pet name:" value={petSettings.petName} onChange={handleChangePetName} />
      <DSelectField
        label="Pet avatar:"
        options={Array.from(PetAvatars.values())}
        value={petSettings.petAvatar}
        onChange={(option): void => handleChangePetAvatar(option as PetAvatarOption)}
        formatOptionLabel={(option): JSX.Element => (
          <div className="opt-pet-avatar">
            <DImage
              src={(option as PetAvatarOption).thumb}
              alt="Pet Avatar"
              className="opt-pet-avatar-img"
              unoptimized
            />
            <p>{(option as PetAvatarOption).label}</p>
          </div>
        )}
      />
      <button type="submit" className="btn btn-login">
        Yes
      </button>
      <div className="my-pet-server-status">
        <span className={classNames("status-dot", { online: isServerOnline })} />
        <p className="status-description">
          {isServerOnline ? "Server is online" : "Server is offline"}
        </p>
      </div>
    </form>
  );
};

export default memo(MyPetLogin);
