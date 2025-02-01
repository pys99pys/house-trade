import { SavedApartItem } from "@/entities/apart";
import { TradeItem } from "@/entities/trade";
import { CONFIG } from "@/shared/consts";

import { FilterType, OrderType } from "../models/types";

export const compareSavedApart = (savedAparts: Omit<SavedApartItem, "regionCode">[], item: TradeItem): boolean => {
  return savedAparts.some(
    (savedApart) => savedApart.address === item.address && savedApart.apartName === item.apartName
  );
};

export const filterApartName = (item: TradeItem, filter: FilterType) => {
  if (!item.apartName) {
    return true;
  }
  return item.apartName.includes(filter.apartName);
};

export const filterBaseSize = (item: TradeItem, filter: FilterType) => {
  if (!filter.onlyBaseSize) {
    return true;
  }

  if (!item.size) {
    return false;
  }

  return item.size > CONFIG.BASE_SIZE_MIN && item.size < CONFIG.BASE_SIZE_MAX;
};

export const filterSavedApart = (item: TradeItem, filter: FilterType, savedAparts: SavedApartItem[]) => {
  if (!filter.onlySavedApart) {
    return true;
  }

  return compareSavedApart(savedAparts, item);
};

export const sortItems = (items: TradeItem[], order: OrderType): TradeItem[] => {
  return items.sort((a, b) => {
    if ((a[order[0]] ?? "") > (b[order[0]] ?? "")) {
      return order[1] === "asc" ? 1 : -1;
    }

    return order[1] === "asc" ? -1 : 1;
  });
};

export const sliceItems = (
  items: TradeItem[],
  params: {
    page: number;
    perPage: number;
  }
) => {
  return items.slice((params.page - 1) * params.perPage, params.page * params.perPage);
};
