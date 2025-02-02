import { FC, useState } from "react";

import { STORAGE_KEY } from "@/shared/consts";
import { getValue, setValue } from "@/shared/lib";
import { Button } from "@/shared/ui";

import { parseSavedData, validateSavedDataFormat } from "../services/validators";
import FormItem from "../ui/FormItem";
import css from "./MigrationForm.module.css";

interface MigrationFormProps {}

const MigrationForm: FC<MigrationFormProps> = () => {
  const [data, onChangeData] = useState("");

  const onCopy = async () => {
    getValue(STORAGE_KEY.SAVED_REGIONS);
    getValue(STORAGE_KEY.SAVED_APARTS);

    JSON.stringify({
      savedRegions: getValue(STORAGE_KEY.SAVED_REGIONS) ?? [],
      savedAparts: getValue(STORAGE_KEY.SAVED_APARTS) ?? [],
    });
  };

  const onSave = () => {
    const isValidData = validateSavedDataFormat(data);

    if (isValidData) {
      const parsedData = parseSavedData(data);

      setValue(STORAGE_KEY.SAVED_REGIONS, parsedData.savedRegions);
      setValue(STORAGE_KEY.SAVED_APARTS, parsedData.savedAparts);
    }
  };

  return (
    <form className={css.migrationForm}>
      <FormItem label="데이터 복사">
        <Button color="primary" onClick={onCopy}>
          데이터 복사
        </Button>
      </FormItem>
      <FormItem label="데이터 저장">
        <textarea className={css.textarea} value={data} onChange={(e) => onChangeData(e.target.value)} />
        <Button className={css.saveButton} color="primary" onClick={onSave}>
          데이터 저장
        </Button>
      </FormItem>
    </form>
  );
};

export default MigrationForm;
