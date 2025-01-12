import { useCallback, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { STORAGE_KEY } from "@/shared/consts";
import { setValue } from "@/shared/lib";

import { createSavedApartKey, parseSavedApartItem } from "../lib/calculators";
import { distinctSavedApartItem, sortSavedAparts } from "../lib/filters";
import { SavedApartsAtom } from "./stores";
import { SavedApartItem } from "./types";

export const useSavedAparts = () => {
  const savedAparts = useRecoilValue(SavedApartsAtom);

  return useMemo(() => savedAparts.map(parseSavedApartItem), [savedAparts]);
};

export const useRegistSavedApart = () => {
  const setSavedAparts = useSetRecoilState(SavedApartsAtom);

  return useCallback(
    (item: SavedApartItem) => {
      setSavedAparts((prev) => {
        const data = sortSavedAparts(distinctSavedApartItem([...prev, createSavedApartKey(item)]));
        setValue(STORAGE_KEY.SAVED_APARTS, data);

        return data;
      });
    },
    [setSavedAparts]
  );
};

export const useRemoveSavedApart = () => {
  const setSavedAparts = useSetRecoilState(SavedApartsAtom);

  return useCallback(
    (item: SavedApartItem) => {
      setSavedAparts((prev) => {
        const data = prev.filter((key) => key !== createSavedApartKey(item));
        setValue(STORAGE_KEY.SAVED_APARTS, data);

        return data;
      });
    },
    [setSavedAparts]
  );
};
