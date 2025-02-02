import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import css from "./Box.module.css";

interface BoxProps {
  className?: string;
  active?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

const Box: FC<PropsWithChildren<BoxProps>> = ({ className, active = false, hoverable = false, onClick, children }) => {
  return (
    <div
      className={classNames(css.box, className, {
        [css.active]: active,
        [css.hoverable]: hoverable,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Box;
