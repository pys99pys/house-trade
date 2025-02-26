import { FC } from "react";

import { GetTradesRequest } from "@/entities/trade";

import { useSavedRegions } from "../hooks/useSavedRegions";
import { useSearchForm } from "../hooks/useSearchForm";
import { OnSubmitHandler } from "../models/types";
import SavedRegion from "./SavedRegion";
import SearchForm from "./SearchForm";
import css from "./TradeListSearch.module.css";

interface TradeListSearchProps {
  setQueryKey: (queryKey: GetTradesRequest) => void;
}

const TradeListSearch: FC<TradeListSearchProps> = ({ setQueryKey }) => {
  const { form, onChangeForm } = useSearchForm();
  const { savedRegions, onRegistRegion, onRemoveRegion } = useSavedRegions();

  const onSubmit: OnSubmitHandler = (nextForm) => {
    const mergedForm = { ...form, ...nextForm };

    onChangeForm(mergedForm);
    setQueryKey({
      regionCode: mergedForm.regionCode,
      yearMonth: mergedForm.year + mergedForm.month.toString().padStart(2, "0"),
    });
  };

  return (
    <div className={css.tradeListSearch}>
      <div>
        <SearchForm
          savedRegions={savedRegions}
          form={form}
          onChangeForm={onChangeForm}
          onRegistRegion={onRegistRegion}
          onSubmit={onSubmit}
        />
      </div>
      <div>
        <SavedRegion savedRegions={savedRegions} onRemoveRegion={onRemoveRegion} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default TradeListSearch;
