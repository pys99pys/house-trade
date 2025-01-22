import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import css from "./Box.module.css";

interface BoxProps {
  className?: string;
}

const Box: FC<PropsWithChildren<BoxProps>> = ({ className, children }) => {
  return <div className={classNames(css.box, className, "box flex direction-column")}>{children}</div>;
};

export default Box;
