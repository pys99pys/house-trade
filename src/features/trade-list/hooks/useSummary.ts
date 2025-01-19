import { useMemo } from "react";

import { calculateFlatSize } from "@/entities/trade";

import { useFilteredList } from "./useFilteredList";

interface Return {
  totalCount: number;
  averageAmount: number;
}

export const useSummary = (): Return => {
  const { filteredList } = useFilteredList();

  const totalCount = filteredList.length;
  const averageAmount = useMemo(() => {
    const averageAmount = filteredList.reduce((acc, item) => {
      const platSize = calculateFlatSize(item.size);

      return acc + (platSize === 0 ? 0 : Math.floor(item.tradeAmount / platSize));
    }, 0);

    return averageAmount / filteredList.length;
  }, [filteredList]);

  return { totalCount, averageAmount };
};
