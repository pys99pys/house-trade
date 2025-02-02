import { GetTradesResponseListItem } from "@/entities/trade";

export type TradeItem = GetTradesResponseListItem & {
  isSaved: boolean;
};

export interface FilterType {
  apartName: string;
  onlySavedApart: boolean;
  onlyBaseSize: boolean;
}
export type OnChangeFilterHandler = (nextFilter: Partial<FilterType>) => void;

export type OrderType = [orderKey: keyof GetTradesResponseListItem, orderDirection: "asc" | "desc"];
