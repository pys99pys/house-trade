import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import css from "./Box.module.css";

interface BoxProps {
  title?: string;
  className?: string;
}

const Box: FC<PropsWithChildren<BoxProps>> = ({ title, className, children }) => {
  return (
    <div className={classNames(css.box, className, "box flex direction-column")}>
      {title && <h2 className={classNames(css.title, "font-bold text-left")}>{title}</h2>}
      {children}
    </div>
  );
};

export default Box;
