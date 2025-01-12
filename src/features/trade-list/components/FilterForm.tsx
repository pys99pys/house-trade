import { FC } from "react";

import { parseToNumberFormat } from "@/shared/lib";
import { Button } from "@/shared/ui";
import Input from "@/shared/ui/input/Input";

import { useFilterState } from "../hooks/useFilterAtom";
import { useFilterForm } from "../hooks/useFilterForm";
import { useSummary } from "../hooks/useSummary";
import { calaulateAverageAmountFormat } from "../services/calculators";
import css from "./FilterForm.module.css";

interface FilterFormProps {}

const FilterForm: FC<FilterFormProps> = () => {
  const filter = useFilterState();

  const { totalCount, averageAmount } = useSummary();
  const { onChangeApartName, onClickBaseSize, onClickSavedApart } = useFilterForm();

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
          <Input size="small" placeholder="아파트명" value={filter.apartName} onChange={onChangeApartName} />
        </div>
        <div className={css.buttonWrap}>
          <Button size="small" color={filter.onlyBaseSize ? "primary" : "default"} onClick={onClickBaseSize}>
            국민 평수
          </Button>
          <Button size="small" color={filter.onlySavedApart ? "primary" : "default"} onClick={onClickSavedApart}>
            저장 목록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
