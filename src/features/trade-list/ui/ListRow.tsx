import classNames from "classnames";
import { FC } from "react";

import { calculateFlatSize, calculateTradeAmountFormat } from "@/entities/trade";
import { TextButton } from "@/shared/ui";

import { Item } from "../models/types";
import { calculateApartInfo } from "../services/calculators";
import css from "./ListRow.module.css";

interface ListRowProps {
  item: Item;
  onClick: () => void;
  onSave: () => void;
  onRemove: () => void;
}

const ListRow: FC<ListRowProps> = ({ item, onClick, onSave, onRemove }) => {
  const apartInfo = calculateApartInfo(item);

  return (
    <div
      className={classNames(css.listRow, "box activable flex justify-content-between", {
        active: item.isSaved,
      })}
      onClick={onClick}
    >
      <div className={classNames(css.apartInfoWrap, "flex direction-column")}>
        <span className="font-bold">
          {item.apartName}({calculateFlatSize(item.size)}평)
        </span>
        <span>{item.address}</span>
        {apartInfo && <small className="font-small">{apartInfo}</small>}
        <span className="font-small">{item.tradeDate}</span>
      </div>
      <div className="flex direction-column justify-content-between">
        <div className={classNames(css.priceInfoWrap, "flex direction-column align-items-end")}>
          <span className="font-bold text-primary">
            {calculateTradeAmountFormat(item.tradeAmount)}
            {item.isNewRecord && item.maxTradeAmount > 0 && "(신)"}
          </span>
          {item.maxTradeAmount > 0 && <span>{calculateTradeAmountFormat(item.maxTradeAmount)}</span>}
        </div>
        <div className="flex justify-content-end">
          {item.isSaved && (
            <TextButton color="red" onClick={onRemove}>
              삭제
            </TextButton>
          )}
          {!item.isSaved && (
            <TextButton color="primary" onClick={onSave}>
              저장
            </TextButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListRow;
