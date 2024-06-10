import { InputHTMLAttributes, memo } from "react";
import "./css.css";

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const DInputField = ({ label, ...props }: IInputFieldProps): JSX.Element => (
  <label className="d-input-field">
    {label !== "" && <p>{label}</p>}
    <input {...props} />
  </label>
);

export default memo(DInputField);
