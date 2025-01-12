import cx from "classnames";
import classNames from "classnames";
import { FC } from "react";

import { FormSizeType } from "@/shared/models/types";

import styles from "./Pagination.module.css";

interface PaginationProps {
  perPage: number;
  perBlock: number;
  totalCount: number;
  currentPage: number;
  onChange: (page: number) => void;

  size?: FormSizeType;
}

const Pagination: FC<PaginationProps> = ({
  perPage,
  perBlock,
  totalCount,
  currentPage,
  onChange,
  size = "default",
}) => {
  const last = Math.ceil(totalCount / perPage);
  const start = Math.floor((currentPage - 1) / perBlock) * perBlock + 1;
  const end = Math.min(start + perBlock - 1, last);
  const pageArray = new Array(end - start + 1).fill(null).map((_, i) => start + i);

  return (
    <ul className={classNames(styles.pagination, { [styles.small]: size === "small" })}>
      {start > perBlock && (
        <>
          <li>
            <button onClick={() => onChange(1)}>1</button>
          </li>
          <li>
            <button onClick={() => onChange(start - 1)}>...</button>
          </li>
        </>
      )}

      {pageArray.map((page) => (
        <li key={page}>
          <button className={cx({ [styles.active]: page === currentPage })} onClick={() => onChange(page)}>
            {page}
          </button>
        </li>
      ))}

      {end !== last && (
        <>
          <li>
            <button onClick={() => onChange(end + 1)}>...</button>
          </li>
          <li>
            <button onClick={() => onChange(last)}>{last}</button>
          </li>
        </>
      )}
    </ul>
  );
};

export default Pagination;
