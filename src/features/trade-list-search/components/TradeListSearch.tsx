import { FC, useState } from "react";

import { getFirstCityName, getFirstRegionCode } from "@/entities/region";
import { useSetTradesQueryKey } from "@/entities/trade";
import { STORAGE_KEY } from "@/shared/consts";
import { getValue } from "@/shared/lib";

import { Form, SavedRegions, SetQueryKey } from "../models/types";
import SavedRegion from "./SavedRegion";
import SearchForm from "./SearchForm";

const TradeListSearch: FC = () => {
  const setTradesQueryKey = useSetTradesQueryKey();

  const [form, setForm] = useState<Form>({
    cityName: getFirstCityName(),
    regionCode: getFirstRegionCode(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const [savedRegions, setSavedRegions] = useState<SavedRegions>(getValue(STORAGE_KEY.SAVED_REGIONS) ?? []);

  const setQueryKey: SetQueryKey = ({ regionCode, year, month }) => {
    const yearMonth = year + month.toString().padStart(2, "0");

    setForm((prev) => ({ ...prev, regionCode, year, month }));
    setTradesQueryKey({ cityCode: regionCode, yearMonth });
  };

  return (
    <>
      <div>
        <SearchForm
          savedRegions={savedRegions}
          form={form}
          setForm={setForm}
          setSavedRegions={setSavedRegions}
          setQueryKey={setQueryKey}
        />
      </div>
      <div className="default-mt">
        <SavedRegion
          form={form}
          savedRegions={savedRegions}
          setSavedRegions={setSavedRegions}
          setQueryKey={setQueryKey}
        />
      </div>
    </>
  );
};

export default TradeListSearch;
