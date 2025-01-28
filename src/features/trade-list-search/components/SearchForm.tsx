import classNames from "classnames";
import { FC } from "react";

import { getCityNames, getRegionsFromCityName } from "@/entities/region";
import { Button, MonthPicker, Select } from "@/shared/ui";

import { distinctRegionCodes, setRegionsToStorage, sortRegionCodes } from "../lib/regionUtils";
import { Form, SetForm, SetQueryKey, SetSavedRegions } from "../models/types";
import css from "./SearchForm.module.css";

interface SearchFormProps {
  form: Form;
  savedRegions: string[];
  setForm: SetForm;
  setSavedRegions: SetSavedRegions;
  setQueryKey: SetQueryKey;
}

const cityNames = getCityNames();

const SearchForm: FC<SearchFormProps> = ({ form, savedRegions, setForm, setSavedRegions, setQueryKey }) => {
  const regions = getRegionsFromCityName(form.cityName);
  const isRegistered = savedRegions.includes(form.regionCode);

  const onChangeForm = (nextForm: Partial<Form>) => {
    setForm((prev) => ({ ...prev, ...nextForm }));
  };

  const onRegist = (regionCode: string) => {
    setSavedRegions((prev) => {
      const nextSavedRegions = sortRegionCodes(distinctRegionCodes([...prev, regionCode]));
      setRegionsToStorage(nextSavedRegions);

      return nextSavedRegions;
    });
  };

  const onSubmit = () => {
    setQueryKey({ regionCode: form.regionCode, year: form.year, month: form.month });
  };

  return (
    <form
      className={classNames(css.searchForm, "flex default-gap")}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={classNames(css.selectWrap, "flex default-gap")}>
        <div className={css.cityNameSelectWrap}>
          <Select
            value={form.cityName}
            onChange={(cityName) =>
              onChangeForm({
                cityName,
                regionCode: getRegionsFromCityName(cityName)[0].code,
              })
            }
          >
            {cityNames.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </Select>
        </div>
        <div className={css.regionCodeSelectWrap}>
          <Select value={form.regionCode} onChange={(regionCode) => onChangeForm({ regionCode })}>
            {regions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className={css.monthPickerWrap}>
        <MonthPicker year={form.year} month={form.month} onChange={(year, month) => onChangeForm({ year, month })} />
      </div>
      <div className={classNames(css.buttonWrap, "flex default-gap")}>
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
