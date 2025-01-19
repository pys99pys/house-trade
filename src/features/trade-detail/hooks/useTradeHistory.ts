import { useMemo } from "react";

import { TradeQueryResponse } from "@/entities/trade";

import { useTradeDetail } from "./useTradeDetail";

interface Return {
  items: { year: string; items: TradeQueryResponse["tradeItems"] }[];
}

export const useTradeHistory = (): Return => {
  const { data } = useTradeDetail();

  const years = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.tradeItems.reduce((acc: string[], item: { tradeDate: string }) => {
      const year = item.tradeDate.slice(0, 4);

      if (acc.includes(year)) {
        return acc;
      } else {
        return [...acc, year];
      }
    }, []);
  }, [data]);

  const items = useMemo(() => {
    return years.map((year) => ({
      year,
      items: data?.tradeItems.filter((item) => item.tradeDate.startsWith(year)) ?? [],
    }));
  }, [years, data]);

  return { items };
};
