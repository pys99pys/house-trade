import { useLocation, useParams } from "react-router-dom";

import { TradeQueryResponse, useTradeQuery } from "@/entities/trade";

interface Return {
  apartName: string;
  data: TradeQueryResponse | null;
}

export const useTradeDetail = (): Return => {
  const { regionCode, apartName } = useParams<{ regionCode: string; apartName: string }>();

  const { data } = useTradeQuery({ apartName: apartName ?? "", cityCode: regionCode ?? "" });

  return { apartName: apartName ?? "", data: data ?? null };
};
