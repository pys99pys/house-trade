import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import css from "./Box.module.css";

const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className="font-bold">{children}</h2>;
};

const Content: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

const Box: FC<PropsWithChildren> & { Title: typeof Title; Content: typeof Content } = ({ children }) => {
  return <div className={classNames(css.box, "box flex direction-column")}>{children}</div>;
};

Box.Title = Title;
Box.Content = Content;

export default Box;
