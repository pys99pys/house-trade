import classNames from "classnames";
import { FC } from "react";

import { calculateAreaSize, calculateFlatSize, calculateTradeAmountFormat } from "@/entities/trade";
import { TextButton } from "@/shared/ui";

import { Item } from "../models/types";
import { calculateApartInfo } from "../services/calculators";
import css from "./TableRow.module.css";

interface TableRowProps {
  item: Item;
  onClick: () => void;
  onSave: () => void;
  onRemove: () => void;
}

const TableRow: FC<TableRowProps> = ({ item, onClick, onSave, onRemove }) => {
  const apartInfo = calculateApartInfo(item);

  return (
    <div className={classNames(css.tableRow, { [css.active]: item.isSaved })} onClick={onClick}>
      <div className={css.cell}>{item.tradeDate}</div>
      <div className={css.cell}>{item.address}</div>
      <div className={css.cell}>
        {item.apartName}
        {apartInfo && <small>{apartInfo}</small>}
      </div>
      <div className={css.cell}>
        {calculateFlatSize(item.size)}평{item.size && <small>({calculateAreaSize(item.size)}㎡)</small>}
      </div>
      <div className={css.cell}>
        <span className={classNames({ [css.highlight]: item.isNewRecord && item.maxTradeAmount > 0 })}>
          {calculateTradeAmountFormat(item.tradeAmount)}
          {item.isNewRecord && item.maxTradeAmount > 0 && "(신)"}
        </span>
      </div>
      <div className={css.cell}>
        {item.maxTradeAmount > 0 && <>{calculateTradeAmountFormat(item.maxTradeAmount)}</>}
      </div>
      <div className={css.cell}>
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
  );
};

export default TableRow;
