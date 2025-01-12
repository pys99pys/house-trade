import cx from "classnames";
import { FC } from "react";

import { FormSizeType } from "@/shared/models/types";

import styles from "./Input.module.css";

interface InputProps {
  size?: FormSizeType;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({ size = "default", placeholder, value, onChange }) => {
  return (
    <input
      className={cx(styles.input, {
        [styles.default]: size === "default",
        [styles.small]: size === "small",
      })}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

export default Input;
