import { FC, useMemo } from "react";

import { TradeItem, calculateFlatSize } from "@/entities/trade";
import { parseToNumberFormat } from "@/shared/lib";
import { Button } from "@/shared/ui";
import Input from "@/shared/ui/input/Input";

import { useFilterState, useSetFilterState, useSetPageState } from "../models/hooks";
import { FilterType } from "../models/types";
import { calaulateAverageAmountFormat } from "../services/calculators";
import css from "./FilterForm.module.css";

interface FilterFormProps {
  items: TradeItem[];
}

const FilterForm: FC<FilterFormProps> = ({ items }) => {
  const filterState = useFilterState();
  const setFilterState = useSetFilterState();
  const setPageState = useSetPageState();

  const totalCount = useMemo(() => {
    return items.length;
  }, []);

  const averageAmount = useMemo(() => {
    const averageAmount = items.reduce((acc, item) => {
      const platSize = calculateFlatSize(item.size);

      return acc + (platSize === 0 ? 0 : Math.floor(item.tradeAmount / platSize));
    }, 0);

    return averageAmount / items.length;
  }, [items]);

  const onChangeFilter = (nextFilter: Partial<FilterType>) => {
    setPageState(1);
    setFilterState((prev) => ({ ...prev, ...nextFilter }));
  };

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
            value={filterState.apartName}
            onChange={(apartName) => onChangeFilter({ apartName })}
          />
        </div>
        <div className={css.buttonWrap}>
          <Button
            size="small"
            color={filterState.onlyBaseSize ? "primary" : "default"}
            onClick={() => onChangeFilter({ onlyBaseSize: !filterState.onlyBaseSize })}
          >
            국민 평수
          </Button>
          <Button
            size="small"
            color={filterState.onlySavedApart ? "primary" : "default"}
            onClick={() => onChangeFilter({ onlySavedApart: !filterState.onlySavedApart })}
          >
            저장 목록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
