import classNames from "classnames";
import { FC } from "react";

import { getCityNameFromRegionCode, getRegionNameFromRegionCode } from "@/entities/region";
import { Label } from "@/shared/ui";

import { OnRemoveRegionHandler, OnSubmitHandler, SavedRegions } from "../models/types";
import css from "./SavedRegion.module.css";

interface SavedRegionProps {
  savedRegions: SavedRegions;
  onRemoveRegion: OnRemoveRegionHandler;
  onSubmit: OnSubmitHandler;
}

const SavedRegion: FC<SavedRegionProps> = ({ savedRegions, onRemoveRegion, onSubmit }) => {
  return (
    <ul className={classNames(css.savedRegion, "flex", "small-gap")}>
      {savedRegions.map((regionCode) => (
        <li key={regionCode}>
          <Label onClick={() => onSubmit({ regionCode })} onRemove={() => onRemoveRegion(regionCode)}>
            {getCityNameFromRegionCode(regionCode)} {getRegionNameFromRegionCode(regionCode)}
          </Label>
        </li>
      ))}
    </ul>
  );
};

export default SavedRegion;
