import { TradeItem as BaseTradeItem } from "@/entities/trade";

export type TradeItem = BaseTradeItem & {
  isSaved: boolean;
};

export interface FilterType {
  apartName: string;
  onlySavedApart: boolean;
  onlyBaseSize: boolean;
}
export type OnChangeFilterHandler = (nextFilter: Partial<FilterType>) => void;

export type OrderType = [orderKey: keyof BaseTradeItem, orderDirection: "asc" | "desc"];
