import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import { FormSizeType } from "@/shared/models/types";

import css from "./Select.module.css";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;

  size?: FormSizeType;
}

const Select: FC<PropsWithChildren<SelectProps>> = ({ value, onChange, children, size = "default" }) => {
  return (
    <select
      className={classNames(css.select, {
        [css.default]: size === "default",
        [css.small]: size === "small",
      })}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </select>
  );
};

export default Select;
