import { atom } from "recoil";

import { TradesQueryRequest } from "./types";

export const tradesQueryKeyAtom = atom<TradesQueryRequest>({
  key: "tradesQueryKeyAtom",
  default: { cityCode: "", yearMonth: "" },
});
