import classNames from "classnames";
import { FC, PropsWithChildren, ReactNode } from "react";

import css from "./BoxLayout.module.css";

interface BoxLayoutProps {
  icon: ReactNode;
  animationType?: "rotate";
}

const BoxLayout: FC<PropsWithChildren<BoxLayoutProps>> = ({ icon, animationType, children }) => {
  return (
    <div className={css.boxLayout}>
      <div className={classNames(css.icon, { [css.rotate]: animationType === "rotate" })}>{icon}</div>
      <div className={css.text}>{children}</div>
    </div>
  );
};

export default BoxLayout;
