import { memo } from "react";
import Select, { Props } from "react-select";

interface ISelectFieldProps extends Props {
  label: string;
}

const SelectField = ({ label, ...props }: ISelectFieldProps): JSX.Element => (
  <label className="select-field">
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

export default memo(SelectField);
