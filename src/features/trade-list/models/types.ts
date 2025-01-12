import { TradeItem } from "@/entities/trade";

export type Item = TradeItem & {
  isSaved: boolean;
};

export type OrderType = [orderKey: keyof TradeItem, orderDirection: "asc" | "desc"];

export interface FilterType {
  apartName: string;
  onlySavedApart: boolean;
  onlyBaseSize: boolean;
}
