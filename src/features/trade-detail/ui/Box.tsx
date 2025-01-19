import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import css from "./Box.module.css";

interface BoxProps {
  title?: string;
}

const Box: FC<PropsWithChildren<BoxProps>> = ({ title, children }) => {
  return (
    <div className={classNames(css.box, "box flex direction-column")}>
      {title && <h2 className="font-bold">{title}</h2>}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Box;
