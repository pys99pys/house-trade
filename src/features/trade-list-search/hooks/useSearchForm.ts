import { useState } from "react";

import { getCityNameFromRegionCode, getFirstCityName, getFirstRegionCode } from "@/entities/region";
import { STORAGE_KEY } from "@/shared/consts";
import { getValue, setValue } from "@/shared/lib";

import { Form, OnChangeFormHandler } from "../models/types";

interface Return {
  form: Form;
  onChangeForm: OnChangeFormHandler;
}

export const useSearchForm = (): Return => {
  const [form, setForm] = useState<Form>(
    getValue(STORAGE_KEY.LAST_TRADE_LIST_SEARCH) ?? {
      cityName: getFirstCityName(),
      regionCode: getFirstRegionCode(),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    }
  );

  const onChangeForm: OnChangeFormHandler = (nextForm) => {
    const mergedForm = {
      ...form,
      ...nextForm,
      ...(nextForm.regionCode && {
        cityName: getCityNameFromRegionCode(nextForm.regionCode),
      }),
    };

    setForm(mergedForm);
    setValue(STORAGE_KEY.LAST_TRADE_LIST_SEARCH, mergedForm);
  };

  return { form, onChangeForm };
};
