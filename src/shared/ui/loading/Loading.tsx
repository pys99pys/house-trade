import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { VscLoading } from "react-icons/vsc";

import css from "./Loading.module.css";

interface LoadingProps {}

const Loading: FC<PropsWithChildren<LoadingProps>> = ({ children = "조회중" }) => {
  return (
    <div className={classNames(css.loading, "flex direction-column justify-content-center align-items-center")}>
      <div className={css.icon}>
        <VscLoading />
      </div>
      <div className={classNames(css.text, "font-bold")}>{children}</div>
    </div>
  );
};

export default Loading;
