import { memo } from "react";
import Select, { CSSObjectWithLabel, Props } from "react-select";
import "./css.css";

interface ISelectFieldProps extends Props {
  label: string;
}

const DSelectField = ({ label, ...props }: ISelectFieldProps): JSX.Element => (
  <label className="d-select-field">
    <p>{label}</p>
    <Select
      className="focus:outline-0"
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base: any): CSSObjectWithLabel => ({ ...base, zIndex: 99 }),
        control: (base, state) => ({
          ...base,
          "&:hover": {
            border: "1px solid var(--glb-color-text)",
          },
          borderColor: state.isFocused ? "var(--glb-color-text)" : "none",
          boxShadow: state.isFocused ? "0 0 0 1px var(--glb-color-text)" : "none",
        }),
        option: (provided, state) => ({
          ...provided,
          "&:hover": {
            backgroundColor: "var(--glb-color-text)",
          },
          backgroundColor: state.isSelected ? "var(--glb-bg-header)" : "transparent",
        }),
      }}
      {...props}
    />
  </label>
);

export default memo(DSelectField);
