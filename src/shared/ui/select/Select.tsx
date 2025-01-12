import { FC, PropsWithChildren } from "react";

import css from "./Select.module.css";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
}

const Select: FC<PropsWithChildren<SelectProps>> = ({ value, onChange, children }) => {
  return (
    <select className={css.select} value={value} onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  );
};

export default Select;
