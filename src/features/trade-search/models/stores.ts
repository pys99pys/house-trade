import { atom } from "recoil";

import { getFirstCityName, getFirstRegionCode } from "@/entities/region";
import { STORAGE_KEY } from "@/shared/consts";
import { getValue } from "@/shared/lib";

import { SearchForm } from "./types";

export const searchFormAtom = atom<SearchForm>({
  key: "searchFormAtom",
  default: {
    cityName: getFirstCityName(),
    regionCode: getFirstRegionCode(),
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
});

export const savedRegionAtom = atom<string[]>({
  key: "savedRegionAtom",
  default: getValue(STORAGE_KEY.SAVED_REGIONS) ?? [],
});
