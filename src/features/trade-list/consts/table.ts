import { GetTradesListItem } from "@/entities/trade";

export const TABLE_HEADERS: { key: keyof GetTradesListItem; label: string }[] = [
  { key: "tradeDate", label: "거래일" },
  { key: "address", label: "주소지" },
  { key: "apartName", label: "아파트명" },
  { key: "size", label: "평수" },
  { key: "tradeAmount", label: "거래가격" },
  { key: "maxTradeAmount", label: "신고가" },
] as const;

export const PER_PAGE = 20;
