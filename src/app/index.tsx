import { FC, lazy, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ROUTE } from "@/shared/consts";
import { setisMobile } from "@/shared/lib";
import "@/shared/styles/index.css";
import Layout from "@/wigets/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TradesPage = lazy(() => import("@/pages/trades-page"));
const ApartsPage = lazy(() => import("@/pages/aparts-page"));
const MigrationPage = lazy(() => import("@/pages/migration-page"));

const App: FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setisMobile();
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={ROUTE.TRADES} element={<TradesPage />} />
              <Route path={ROUTE.APARTS} element={<ApartsPage />} />
              <Route path={ROUTE.MIGRATION} element={<MigrationPage />} />
              <Route path="/" element={<Navigate to={ROUTE.TRADES} />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
