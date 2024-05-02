import { ChangeEvent, FormEvent } from "react";
import InputField from "./input_field";

interface IMyPetLoginProps {
  petName: string;
  handleChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
}

const MyPetLogin = ({ petName, handleChangeName, onSubmit }: IMyPetLoginProps): JSX.Element => {
  return (
    <form className="my-pet-login" onSubmit={onSubmit}>
      <InputField label="Pet name:" value={petName} onChange={handleChangeName} />
      <button type="submit" className="btn btn-login">
        Yes
      </button>
    </form>
  );
};

export default MyPetLogin;
