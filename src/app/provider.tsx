import { FC, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProviderProps {}

const Provider: FC<PropsWithChildren<ProviderProps>> = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        <BrowserRouter>{children}</BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default Provider;
