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

export const pageAtom = atom<number>({
  key: "pageAtom",
  default: 1,
});
