import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import css from "./FormItem.module.css";

interface FormItemProps {
  label: string;
}

const FormItem: FC<PropsWithChildren<FormItemProps>> = ({ label, children }) => {
  return (
    <dl className={classNames(css.formItem, "flex direction-column")}>
      <dt className="font-bold">{label}</dt>
      <dd>{children}</dd>
    </dl>
  );
};

export default FormItem;
