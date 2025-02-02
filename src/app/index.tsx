import { FC, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTE } from "@/shared/consts";
import "@/shared/styles/index.css";
import Layout from "@/wigets/layout";

import { useRegistNotifyPermmistion } from "./hooks/useRegistNotifyPermmistion";
import { useSetClientState } from "./hooks/useSetClientState";
import { useSetMobileState } from "./hooks/useSetMobileState";
import RootProvider from "./providers/RootProvider";

const TradesPage = lazy(() => import("@/pages/trades-page"));
const ApartsPage = lazy(() => import("@/pages/aparts-page"));
const ApartPage = lazy(() => import("@/pages/apart-page"));
const MigrationPage = lazy(() => import("@/pages/migration-page"));

const withProvider = (Component: FC): FC => {
  const WrappedComponent: React.FC = () => (
    <RootProvider>
      <Component />
    </RootProvider>
  );

  return WrappedComponent;
};

const App: FC = () => {
  useRegistNotifyPermmistion();
  useSetMobileState();

  const isClient = useSetClientState();

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
