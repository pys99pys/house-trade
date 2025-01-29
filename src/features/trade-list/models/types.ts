import { TradeItem as BaseTradeItem } from "@/entities/trade";

export type TradeItem = BaseTradeItem & {
  isSaved: boolean;
};

export type OrderType = [orderKey: keyof BaseTradeItem, orderDirection: "asc" | "desc"];

export interface FilterType {
  apartName: string;
  onlySavedApart: boolean;
  onlyBaseSize: boolean;
}
