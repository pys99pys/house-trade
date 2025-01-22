import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { SavedApartItem, useSavedAparts } from "@/entities/apart";
import { useRemoveSavedApart } from "@/entities/apart/models/hooks";
import { ROUTE } from "@/shared/consts";

import { Item } from "../models/types";

interface Return {
  apartItems: Item[];
  onClick: (item: SavedApartItem) => void;
  onRemove: (item: SavedApartItem) => void;
}

export const useApartList = (): Return => {
  const navigate = useNavigate();

  const removeSavedApart = useRemoveSavedApart();

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
    navigate(`${ROUTE.APART}/${item.regionCode}/${item.apartName}`);
  };

  return { apartItems, onClick, onRemove };
};
