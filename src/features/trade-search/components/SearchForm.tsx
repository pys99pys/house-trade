import { FC } from "react";

import { getCityNames } from "@/entities/region";
import { Button, MonthPicker, Select } from "@/shared/ui";

import { useSavedRegion } from "../hooks/useSavedRegion";
import { useSearchForm } from "../hooks/useSearchForm";
import css from "./SearchForm.module.css";

interface SearchFormProps {}

const cityNames = getCityNames();

const SearchForm: FC<SearchFormProps> = () => {
  const { form, regions, onChangeCityName, onChangeRegionCode, onChangeYearMonth, onSubmit } = useSearchForm();
  const { isRegistered, onRegist } = useSavedRegion();

  return (
    <form
      className={css.searchForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={css.selectWrap}>
        <div className={css.cityNameSelectWrap}>
          <Select value={form.cityName} onChange={onChangeCityName}>
            {cityNames.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </Select>
        </div>
        <div className={css.regionCodeSelectWrap}>
          <Select value={form.regionCode} onChange={onChangeRegionCode}>
            {regions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className={css.monthPickerWrap}>
        <MonthPicker year={form.year} month={form.month} onChange={onChangeYearMonth} />
      </div>
      <div className={css.buttonWrap}>
        <Button type="submit" color="primary">
          검색
        </Button>
        {!isRegistered && (
          <Button color="yellow" onClick={() => onRegist(form.regionCode)}>
            즐겨찾기
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
