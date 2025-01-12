import { useMemo } from "react";

import { SavedApartItem, useSavedAparts } from "@/entities/apart";
import { useRemoveSavedApart } from "@/entities/apart/models/hooks";
import { useChangeLocationState } from "@/entities/location";
import { ROUTE } from "@/shared/consts";

import { Item } from "../models/types";

interface Return {
  apartItems: Item[];
  onClick: (item: SavedApartItem) => void;
  onRemove: (item: SavedApartItem) => void;
}

export const useApartList = (): Return => {
  const removeSavedApart = useRemoveSavedApart();
  const changeLocationState = useChangeLocationState();
  const savedAparts = useSavedAparts();

  const apartItems = useMemo(() => {
    const items: Item[] = [];

    savedAparts.forEach((savedApart) => {
      const parentItem = items.find((item) => item.regionCode === savedApart.regionCode);

      if (parentItem) {
        parentItem.children.push(savedApart);
      } else {
        items.push({ regionCode: savedApart.regionCode, children: [savedApart] });
      }
    });

    return items;
  }, [savedAparts]);

  const onRemove = (item: SavedApartItem) => {
    removeSavedApart(item);
  };

  const onClick = (item: SavedApartItem) => {
    changeLocationState(ROUTE.TRADES, { regionCode: item.regionCode, apartName: item.apartName });
  };

  return { apartItems, onClick, onRemove };
};
