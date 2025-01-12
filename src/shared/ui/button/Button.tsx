import cx from "classnames";
import { FC, PropsWithChildren } from "react";

import { FormColorType, FormSizeType } from "@/shared/models/types";

import css from "./Button.module.css";

interface ButtonProps {
  type?: "button" | "submit";
  size?: FormSizeType;
  color?: FormColorType;
  className?: string;
  onClick?: () => void;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  type = "button",
  size = "default",
  color = "default",
  className,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={cx(css.button, className, {
        [css.defaultSize]: size === "default",
        [css.largeSize]: size === "large",
        [css.smallSize]: size === "small",
        [css.xsmallSize]: size === "xsmall",
        [css.defaultColor]: color === "default",
        [css.primaryColor]: color === "primary",
        [css.redColor]: color === "red",
        [css.yellowColor]: color === "yellow",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
