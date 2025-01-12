import { atom } from "recoil";

import { FilterType } from "./types";

export const filterAtom = atom<FilterType>({
  key: "filterAtom",
  default: {
    apartName: "",
    onlySavedApart: false,
    onlyBaseSize: false,
  },
});
