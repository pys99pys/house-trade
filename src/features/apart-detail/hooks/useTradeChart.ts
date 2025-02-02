import { useMemo } from "react";

import { GetApartResponseTradeItem } from "@/entities/apart";

interface Params {
  tradeItems: GetApartResponseTradeItem[];
}

interface Return {
  months: string[];
  tradeAmounts: number[];
}

export const useTradeChart = ({ tradeItems }: Params): Return => {
  const monthlyTotalTradeAmount = useMemo(() => {
    return tradeItems
      .reverse()
      .reduce((acc: { month: string; totalAmounts: number[] }[], item: { tradeDate: string; tradeAmount: number }) => {
        const yearMonth = item.tradeDate.substring(0, 7);
        const currentMonthItem = acc.find((accItem) => accItem.month === yearMonth);

        if (currentMonthItem) {
          currentMonthItem.totalAmounts.push(item.tradeAmount);
        } else {
          acc.push({ month: yearMonth, totalAmounts: [item.tradeAmount] });
        }

        return acc;
      }, []);
  }, [tradeItems]);

  const monthlyAverageTradeAmount = useMemo(() => {
    return monthlyTotalTradeAmount.map((item) => ({
      month: item.month,
      averageAmount: item.totalAmounts.reduce((acc, cur) => acc + cur, 0) / item.totalAmounts.length / 1000000,
    }));
  }, [monthlyTotalTradeAmount]);

  const months = useMemo(() => {
    return monthlyAverageTradeAmount.map((item) => item.month);
  }, [monthlyAverageTradeAmount]);

  const tradeAmounts = useMemo(() => {
    return monthlyAverageTradeAmount.map((item) => item.averageAmount);
  }, [monthlyAverageTradeAmount]);

  return { months, tradeAmounts };
};
