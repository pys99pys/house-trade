import { FC, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        <BrowserRouter>{children}</BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default RootProvider;
