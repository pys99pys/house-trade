import { GetTradesListItem } from "@/entities/trade";

export type TradeItem = GetTradesListItem & {
  isSaved: boolean;
};

export interface FilterType {
  apartName: string;
  onlySavedApart: boolean;
  onlyBaseSize: boolean;
}
export type OnChangeFilterHandler = (nextFilter: Partial<FilterType>) => void;

export type OrderType = [orderKey: keyof GetTradesListItem, orderDirection: "asc" | "desc"];
