import { parseToNumberFormat } from "@/shared/lib";

export const calculateFlatSize = (areaSize: number | null): number => {
  if (!areaSize) {
    return 0;
  }

  const area = areaSize * 0.3025;
  const addtionalSize = areaSize < 84 ? 8 : 9;

  return Math.floor(area + addtionalSize);
};

export const calculateAreaSize = (originSize: number): number => {
  return Math.round(originSize * 100) / 100;
};

export const calculateTradeAmountFormat = (amount: number): string => {
  return `${Math.floor((amount / 100000000) * 100) / 100}억원`;
};

export const calaulateAverageAmountFormat = (amount: number): string => {
  const billion = Math.floor(amount / 100000000);
  const million = Math.floor((amount % 100000000) / 10000);

  return `${billion > 0 ? `${parseToNumberFormat(billion)}억` : ``}${parseToNumberFormat(million)}만원`;
};
