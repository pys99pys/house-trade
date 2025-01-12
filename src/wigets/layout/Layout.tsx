import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import { ROUTE } from "@/shared/consts";

import css from "./Layout.module.css";

export const ROUTES = [
  {
    path: ROUTE.TRADES,
    name: "실거래가 조회",
  },
  {
    path: ROUTE.APARTS,
    name: "저장 목록",
  },
];

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={css.layout}>
      <header className={css.header}>
        <div className={css.container}>
          <h1 role="button" onClick={onClick}>
            <FaRegBuilding className={css.logo} />
            <span className={css.text}>아파트 실거래가 조회</span>
          </h1>
          <nav>
            {ROUTES.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={classNames({ [css.active]: location.pathname === route.path })}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className={css.main}>{children}</main>
    </div>
  );
};

export default Layout;
