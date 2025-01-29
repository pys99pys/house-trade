import { FC, lazy, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTE } from "@/shared/consts";
import { registNotifyPermission } from "@/shared/lib";
import { useSetisMobile } from "@/shared/models";
import "@/shared/styles/index.css";
import Layout from "@/wigets/layout";

import Provider from "./provider";

const TradesPage = lazy(() => import("@/pages/trades-page"));
const ApartsPage = lazy(() => import("@/pages/aparts-page"));
const ApartPage = lazy(() => import("@/pages/apart-page"));
const MigrationPage = lazy(() => import("@/pages/migration-page"));

const withProvider = (Component: FC): FC => {
  const WrappedComponent: React.FC = () => (
    <Provider>
      <Component />
    </Provider>
  );

  return WrappedComponent;
};

const App: FC = () => {
  const timer = useRef(0);

  const [isClient, setIsClient] = useState(false);
  const setIsMobile = useSetisMobile();

  const setIsMobileState = () => {
    clearTimeout(timer.current);

    timer.current =
      window &&
      window.setTimeout(() => {
        setIsMobile(window && window.innerWidth <= 640);
      }, 300);
  };

  const setIsMobileStateEvent = () => {
    window.addEventListener("resize", setIsMobileState);
  };

  const removeIsMobileStateEvent = () => {
    window.removeEventListener("resize", setIsMobileState);
  };

  useEffect(() => {
    setIsClient(true);
    setIsMobileStateEvent();
    registNotifyPermission();

    return () => {
      removeIsMobileStateEvent();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Layout>
      <Routes>
        <Route path={ROUTE.TRADES} element={<TradesPage />} />
        <Route path={ROUTE.APARTS} element={<ApartsPage />} />
        <Route path={`${ROUTE.APART}/:regionCode/:apartName`} element={<ApartPage />} />
        <Route path={ROUTE.MIGRATION} element={<MigrationPage />} />
        <Route path="/" element={<Navigate to={ROUTE.TRADES} />} />
      </Routes>
    </Layout>
  );
};

export default withProvider(App);
