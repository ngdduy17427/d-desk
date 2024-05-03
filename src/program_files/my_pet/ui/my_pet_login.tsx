import classNames from "classnames";
import DContainer from "components/d_container";
import { ChangeEvent, FormEvent } from "react";
import InputField from "./input_field";

interface IMyPetLoginProps {
  isServerAlive: boolean;
  petName: string;
  handleChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
}

const MyPetLogin = ({
  isServerAlive,
  petName,
  handleChangeName,
  onSubmit,
}: IMyPetLoginProps): JSX.Element => {
  return (
    <DContainer className="my-pet-login-container">
      <form className="my-pet-login" onSubmit={onSubmit}>
        <InputField label="Pet name:" value={petName} onChange={handleChangeName} />
        <button type="submit" className="btn btn-login">
          Yes
        </button>
        <div className="my-pet-server-status">
          <span className={classNames("status-dot", { online: isServerAlive })} />
          <p className="status-description">
            {isServerAlive ? "Server is online" : "Server is offline"}
          </p>
        </div>
      </form>
    </DContainer>
  );
};

export default MyPetLogin;
