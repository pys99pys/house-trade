import { useMemo } from "react";

import { GetApartResponseTradeItem } from "@/entities/apart";

interface Params {
  originTradeItems: GetApartResponseTradeItem[];
}

interface Return {
  tradeItems: { year: string; items: GetApartResponseTradeItem[] }[];
}

export const useTradeHistoryData = ({ originTradeItems }: Params): Return => {
  const years = useMemo(() => {
    return originTradeItems.reduce((acc: string[], item: { tradeDate: string }) => {
      const year = item.tradeDate.slice(0, 4);

      if (acc.includes(year)) {
        return acc;
      } else {
        return [...acc, year];
      }
    }, []);
  }, [originTradeItems]);

  const tradeItems = useMemo(() => {
    return years.map((year) => ({
      year,
      items: originTradeItems.filter((item) => item.tradeDate.startsWith(year)) ?? [],
    }));
  }, [years, originTradeItems]);

  return { tradeItems };
};
