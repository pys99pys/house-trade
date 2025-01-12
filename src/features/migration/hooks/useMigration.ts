import { useState } from "react";

import { STORAGE_KEY } from "@/shared/consts";
import { getValue, setValue } from "@/shared/lib";

import { parseSavedData, validateSavedDataFormat } from "../services/validators";

interface Return {
  data: string;
  onCopy: () => void;
  onSave: () => void;
  onChangeData: (data: string) => void;
}

export const useMigration = (): Return => {
  const [data, onChangeData] = useState("");

  const onCopy = async () => {
    getValue(STORAGE_KEY.SAVED_REGIONS);
    getValue(STORAGE_KEY.SAVED_APARTS);

    const data = JSON.stringify({
      savedRegions: getValue(STORAGE_KEY.SAVED_REGIONS) ?? [],
      savedAparts: getValue(STORAGE_KEY.SAVED_APARTS) ?? [],
    });

    const result = await navigator.clipboard.writeText(data);
  };

  const onSave = () => {
    const isValidData = validateSavedDataFormat(data);

    if (isValidData) {
      const parsedData = parseSavedData(data);

      setValue(STORAGE_KEY.SAVED_REGIONS, parsedData.savedRegions);
      setValue(STORAGE_KEY.SAVED_APARTS, parsedData.savedAparts);
    }
  };

  return { data, onCopy, onSave, onChangeData };
};
