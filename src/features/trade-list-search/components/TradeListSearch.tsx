import { FC } from "react";

import { TradesQueryRequest } from "@/entities/trade";

import { useSavedRegions } from "../hooks/useSavedRegions";
import { useSearchForm } from "../hooks/useSearchForm";
import { OnSubmitHandler } from "../models/types";
import SavedRegion from "./SavedRegion";
import SearchForm from "./SearchForm";

interface TradeListSearchProps {
  setQueryKey: (queryKey: TradesQueryRequest) => void;
}

const TradeListSearch: FC<TradeListSearchProps> = ({ setQueryKey }) => {
  const { form, onChangeForm } = useSearchForm();
  const { savedRegions, onRegistRegion, onRemoveRegion } = useSavedRegions();

  const onSubmit: OnSubmitHandler = (nextForm) => {
    const mergedForm = { ...form, ...nextForm };

    onChangeForm(mergedForm);
    setQueryKey({
      cityCode: mergedForm.regionCode,
      yearMonth: mergedForm.year + mergedForm.month.toString().padStart(2, "0"),
    });
  };

  return (
    <>
      <div>
        <SearchForm
          savedRegions={savedRegions}
          form={form}
          onChangeForm={onChangeForm}
          onRegistRegion={onRegistRegion}
          onSubmit={onSubmit}
        />
      </div>
      <div className="default-mt">
        <SavedRegion savedRegions={savedRegions} onRemoveRegion={onRemoveRegion} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default TradeListSearch;
