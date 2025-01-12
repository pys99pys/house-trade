import { atom } from "recoil";

import { STORAGE_KEY } from "@/shared/consts";
import { getValue } from "@/shared/lib";

export const SavedApartsAtom = atom<string[]>({
  key: "SavedApartsAtom",
  default: getValue(STORAGE_KEY.SAVED_APARTS) ?? [],
});
