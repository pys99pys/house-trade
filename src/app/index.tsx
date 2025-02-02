import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import "@/shared/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

const Index: FC = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default Index;
