import { GetTradesListItem } from "@/entities/trade";
import { parseToNumberFormat } from "@/shared/lib";

export const calculateApartInfo = (item: GetTradesListItem): string => {
  const subTexts: string[] = [];

  if (item.floor !== null) subTexts.push(`${item.floor}층`);
  if (item.buildedYear !== null) subTexts.push(`${item.buildedYear}년식`);
  if (item.householdsNumber !== null) subTexts.push(`${item.householdsNumber}세대`);

  return subTexts.length > 0 ? `(${subTexts.join("/")})` : "";
};

export const calaulateAverageAmountFormat = (amount: number): string => {
  const billion = Math.floor(amount / 100000000);
  const million = Math.floor((amount % 100000000) / 10000);

  return `${billion > 0 ? `${parseToNumberFormat(billion)}억` : ``}${parseToNumberFormat(million)}만원`;
};
