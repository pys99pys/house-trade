import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import { Box as BaseBox } from "@/shared/ui";

import css from "./Box.module.css";

interface BoxProps {
  title?: string;
  className?: string;
}

const Box: FC<PropsWithChildren<BoxProps>> = ({ title, className, children }) => {
  return (
    <BaseBox className={classNames(css.box, className)}>
      {title && <h2 className={css.title}>{title}</h2>}
      {children}
    </BaseBox>
  );
};

export default Box;
