import { InputHTMLAttributes, memo } from "react";

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = ({ label, ...props }: IInputFieldProps): JSX.Element => (
  <label className="input-field">
    <p>{label}</p>
    <input {...props} />
  </label>
);

export default memo(InputField);
