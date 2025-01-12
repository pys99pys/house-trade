import { FC, PropsWithChildren } from "react";

import css from "./HeaderCell.module.css";

interface HeaderCellProps {
  order: "asc" | "desc" | null;
  onClick: () => void;
}

const HeaderCell: FC<PropsWithChildren<HeaderCellProps>> = ({ order, children, onClick }) => {
  return (
    <div className={css.headerCell}>
      <button onClick={onClick}>
        {children}
        {order !== null && <span className={css[order]}>▾</span>}
      </button>
    </div>
  );
};

export default HeaderCell;
