import classNames from "classnames";
import { FC } from "react";

import { Button } from "@/shared/ui";

import { useMigration } from "../hooks/useMigration";
import FormItem from "../ui/FormItem";
import css from "./MigrationForm.module.css";

interface MigrationFormProps {}

const MigrationForm: FC<MigrationFormProps> = () => {
  const { data, onCopy, onSave, onChangeData } = useMigration();

  return (
    <form className={classNames(css.migrationForm, "flex direction-column")}>
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
