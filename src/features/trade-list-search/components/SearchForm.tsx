import { FC } from "react";

import { getCityNames, getRegionsFromCityName } from "@/entities/region";
import { useIsMobile } from "@/shared/models";
import { Button, MonthPicker, Select } from "@/shared/ui";

import { Form, OnChangeFormHandler, OnRegistRegionHandler, OnSubmitHandler } from "../models/types";
import css from "./SearchForm.module.css";

interface SearchFormProps {
  form: Form;
  savedRegions: string[];
  onChangeForm: OnChangeFormHandler;
  onRegistRegion: OnRegistRegionHandler;
  onSubmit: OnSubmitHandler;
}

const cityNames = getCityNames();

const SearchForm: FC<SearchFormProps> = ({ form, savedRegions, onChangeForm, onRegistRegion, onSubmit }) => {
  const isMobile = useIsMobile();

  const regions = getRegionsFromCityName(form.cityName);
  const isRegistered = savedRegions.includes(form.regionCode);

  return (
    <form
      className={css.searchForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={css.selectWrap}>
        <Select
          value={form.cityName}
          onChange={(cityName) => onChangeForm({ cityName, regionCode: getRegionsFromCityName(cityName)[0].code })}
        >
          {cityNames.map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </Select>
        <Select value={form.regionCode} onChange={(regionCode) => onChangeForm({ regionCode })}>
          {regions.map((region) => (
            <option key={region.code} value={region.code}>
              {region.name}
            </option>
          ))}
        </Select>
      </div>
      <div className={css.monthPickerWrap}>
        <MonthPicker year={form.year} month={form.month} onChange={(year, month) => onChangeForm({ year, month })} />
      </div>
      <div className={css.buttonWrap}>
        <Button type="submit" color="primary">
          검색
        </Button>
        {!isRegistered && (
          <Button color="yellow" onClick={() => onRegistRegion(form.regionCode)}>
            즐겨찾기
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
