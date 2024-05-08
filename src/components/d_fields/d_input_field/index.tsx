import { InputHTMLAttributes, memo } from "react";
import "./css.css";

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
}

const DInputField = ({ id, label, ...props }: IInputFieldProps): JSX.Element => (
  <label id={id} className="d-input-field">
    {label !== "" && <p>{label}</p>}
    <input {...props} />
  </label>
);

export default memo(DInputField);
