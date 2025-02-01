import { TradeItem } from "@/entities/trade";

export type TradeItemType = TradeItem & {
  isSaved: boolean;
};

export interface FilterType {
  apartName: string;
  onlySavedApart: boolean;
  onlyBaseSize: boolean;
}
export type OnChangeFilterHandler = (nextFilter: Partial<FilterType>) => void;

export type OrderType = [orderKey: keyof TradeItem, orderDirection: "asc" | "desc"];
