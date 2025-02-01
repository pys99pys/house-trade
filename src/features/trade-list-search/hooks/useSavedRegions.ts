import { useState } from "react";

import { STORAGE_KEY } from "@/shared/consts";
import { getValue, setValue } from "@/shared/lib";

import { distinctRegionCodes, sortRegionCodes } from "../lib/regionUtils";
import { OnRegistRegionHandler, OnRemoveRegionHandler } from "../models/types";

interface Return {
  savedRegions: string[];
  onRegistRegion: OnRegistRegionHandler;
  onRemoveRegion: OnRemoveRegionHandler;
}

export const useSavedRegions = (): Return => {
  const [savedRegions, setSavedRegions] = useState<string[]>(getValue(STORAGE_KEY.SAVED_REGIONS) ?? []);

  const onRegistRegion: OnRegistRegionHandler = (regionCode) => {
    setSavedRegions((prev) => {
      const nextSavedRegions = sortRegionCodes(distinctRegionCodes([...prev, regionCode]));
      setValue(STORAGE_KEY.SAVED_REGIONS, nextSavedRegions);

      return nextSavedRegions;
    });
  };

  const onRemoveRegion: OnRemoveRegionHandler = (regionCode) => {
    setSavedRegions((prev) => {
      const nextSavedRegions = prev.filter((code) => code !== regionCode);
      setValue(STORAGE_KEY.SAVED_REGIONS, nextSavedRegions);

      return nextSavedRegions;
    });
  };

  return { savedRegions, onRegistRegion, onRemoveRegion };
};
