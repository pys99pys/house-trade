import { FC } from "react";

import { getCityNameFromRegionCode, getRegionNameFromRegionCode } from "@/entities/region";
import { Box, Label } from "@/shared/ui";

import { useApartList } from "../hooks/useApartList";
import css from "./ApartList.module.css";

interface ApartListProps {}

const ApartList: FC<ApartListProps> = () => {
  const { apartItems, onClick, onRemove } = useApartList();

  return (
    <div className={css.apartList}>
      {apartItems.map((item) => (
        <div key={item.regionCode}>
          <h2>
            {getCityNameFromRegionCode(item.regionCode)} {getRegionNameFromRegionCode(item.regionCode)} (
            <span>{item.children.length})</span>
          </h2>
          <Box className={css.list}>
            {item.children.map((_item) => (
              <Label key={JSON.stringify(_item)} onClick={() => onClick(_item)} onRemove={() => onRemove(_item)}>
                {_item.apartName}
              </Label>
            ))}
          </Box>
        </div>
      ))}
    </div>
  );
};

export default ApartList;
