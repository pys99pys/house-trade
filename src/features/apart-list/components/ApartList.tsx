import classNames from "classnames";
import { FC } from "react";

import { getCityNameFromRegionCode, getRegionNameFromRegionCode } from "@/entities/region";
import { Label } from "@/shared/ui";

import { useApartList } from "../hooks/useApartList";
import css from "./ApartList.module.css";

interface ApartListProps {}

const ApartList: FC<ApartListProps> = () => {
  const { apartItems, onClick, onRemove } = useApartList();

  return (
    <div className={classNames(css.apartList, "flex direction-column")}>
      {apartItems.map((item) => (
        <dl key={item.regionCode}>
          <dt className="font-bold">
            {getCityNameFromRegionCode(item.regionCode)} {getRegionNameFromRegionCode(item.regionCode)} (
            <span>{item.children.length})</span>
          </dt>
          <dd className="box flex wrap">
            {item.children.map((_item) => (
              <Label key={JSON.stringify(_item)} onClick={() => onClick(_item)} onRemove={() => onRemove(_item)}>
                {_item.apartName}
              </Label>
            ))}
          </dd>
        </dl>
      ))}
    </div>
  );
};

export default ApartList;
