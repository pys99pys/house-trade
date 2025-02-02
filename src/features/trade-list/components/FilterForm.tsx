import { FC, useMemo } from "react";

import { GetTradesResponseListItem, calculateFlatSize } from "@/entities/trade";
import { parseToNumberFormat } from "@/shared/lib";
import { Button } from "@/shared/ui";
import Input from "@/shared/ui/input/Input";

import { FilterType, OnChangeFilterHandler } from "../models/types";
import { calaulateAverageAmountFormat } from "../services/calculators";
import css from "./FilterForm.module.css";

interface FilterFormProps {
  tradeItems: GetTradesResponseListItem[];
  filter: FilterType;
  onChangeFilter: OnChangeFilterHandler;
}

const FilterForm: FC<FilterFormProps> = ({ tradeItems, filter, onChangeFilter }) => {
  const totalCount = useMemo(() => {
    return tradeItems.length;
  }, [tradeItems]);

  const averageAmount = useMemo(() => {
    const averageAmount = tradeItems.reduce((acc, item) => {
      const platSize = calculateFlatSize(item.size);

      return acc + (platSize === 0 ? 0 : Math.floor(item.tradeAmount / platSize));
    }, 0);

    return averageAmount / tradeItems.length;
  }, [tradeItems]);

  return (
    <div className={css.filterForm}>
      <div className={css.summry}>
        <span>
          검색 결과 <strong>{parseToNumberFormat(totalCount)}건</strong>
        </span>
        {averageAmount > 0 && (
          <>
            <span>·</span>
            <span>
              평단가 <strong>{calaulateAverageAmountFormat(averageAmount)}</strong>
            </span>
          </>
        )}
      </div>
      <div className={css.form}>
        <div className={css.inputWrap}>
          <Input
            size="small"
            placeholder="아파트명"
            value={filter.apartName}
            onChange={(apartName) => onChangeFilter({ apartName })}
          />
        </div>
        <div className={css.buttonWrap}>
          <Button
            size="small"
            color={filter.onlyBaseSize ? "primary" : "default"}
            onClick={() => onChangeFilter({ onlyBaseSize: !filter.onlyBaseSize })}
          >
            국민 평수
          </Button>
          <Button
            size="small"
            color={filter.onlySavedApart ? "primary" : "default"}
            onClick={() => onChangeFilter({ onlySavedApart: !filter.onlySavedApart })}
          >
            저장 목록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
