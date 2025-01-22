import classNames from "classnames";
import { FC, MouseEvent, PropsWithChildren } from "react";

import { FormColorType } from "@/shared/models/types";

import css from "./TextButton.module.css";

interface TextButtonProps {
  color?: FormColorType;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const TextButton: FC<PropsWithChildren<TextButtonProps>> = ({ color, children, onClick }) => {
  return (
    <button
      type="button"
      className={classNames(css.textButton, {
        [css.primary]: color === "primary",
        [css.red]: color === "red",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TextButton;
