import { useState } from "react";

import { getFirstCityName, getFirstRegionCode } from "@/entities/region";

import { Form, OnChangeFormHandler } from "../models/types";

interface Return {
  form: Form;
  onChangeForm: OnChangeFormHandler;
}

export const useSearchForm = (): Return => {
  const [form, setForm] = useState<Form>({
    cityName: getFirstCityName(),
    regionCode: getFirstRegionCode(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const onChangeForm: OnChangeFormHandler = (nextForm) => {
    setForm((prev) => ({ ...prev, ...nextForm }));
  };

  return { form, onChangeForm };
};
