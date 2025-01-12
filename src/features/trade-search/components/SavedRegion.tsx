import { FC } from "react";
import { FaTimes } from "react-icons/fa";

import { getCityNameFromRegionCode, getRegionNameFromRegionCode } from "@/entities/region";
import { Button, Label } from "@/shared/ui";

import { useSavedRegion } from "../hooks/useSavedRegion";
import css from "./SavedRegion.module.css";

interface SavedRegionProps {}

const SavedRegion: FC<SavedRegionProps> = () => {
  const { savedRegionCodes, onSelect, onRemove } = useSavedRegion();

  return (
    <ul className={css.savedRegion}>
      {savedRegionCodes.map((regionCode) => (
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
