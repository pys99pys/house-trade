import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import { FaTimes } from "react-icons/fa";

import Button from "../button";
import css from "./Label.module.css";

interface LabelProps {
  onClick?: () => void;
  onRemove?: () => void;
}

const Label: FC<PropsWithChildren<LabelProps>> = ({ children, onClick, onRemove }) => {
  return (
    <Button className={classNames(css.label, "flex align-items-center")} size="xsmall" onClick={onClick}>
      {children}
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <FaTimes />
        </span>
      )}
    </Button>
  );
};

export default Label;
