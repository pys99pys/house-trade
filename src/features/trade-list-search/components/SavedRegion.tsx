import classNames from "classnames";
import { FC } from "react";

import { getCityNameFromRegionCode, getRegionNameFromRegionCode } from "@/entities/region";
import { Label } from "@/shared/ui";

import { setRegionsToStorage } from "../lib/regionUtils";
import { Form, SavedRegions, SetQueryKey, SetSavedRegions } from "../models/types";
import css from "./SavedRegion.module.css";

interface SavedRegionProps {
  form: Form;
  savedRegions: SavedRegions;
  setSavedRegions: SetSavedRegions;
  setQueryKey: SetQueryKey;
}

const SavedRegion: FC<SavedRegionProps> = ({ form, savedRegions, setSavedRegions, setQueryKey }) => {
  const onSelect = (regionCode: string) => {
    setQueryKey({
      regionCode,
      year: form.year,
      month: form.month,
    });
  };

  const onRemove = (regionCode: string) => {
    setSavedRegions((prev) => {
      const nextSavedRegions = prev.filter((code) => code !== regionCode);
      setRegionsToStorage(nextSavedRegions);

      return nextSavedRegions;
    });
  };

  return (
    <ul className={classNames(css.savedRegion, "flex", "small-gap")}>
      {savedRegions.map((regionCode) => (
        <li key={regionCode}>
          <Label onClick={() => onSelect(regionCode)} onRemove={() => onRemove(regionCode)}>
            {getCityNameFromRegionCode(regionCode)} {getRegionNameFromRegionCode(regionCode)}
          </Label>
        </li>
      ))}
    </ul>
  );
};

export default SavedRegion;
