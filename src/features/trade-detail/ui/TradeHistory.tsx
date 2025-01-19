import classNames from "classnames";
import { FC } from "react";

import css from "./TradeHistory.module.css";

interface TradeHistoryProps {}

const TradeHistory: FC<TradeHistoryProps> = () => {
  return (
    <div className={css.tradeHistory}>
      <div className={classNames(css.header, css.row, "box")}>
        <span className="font-bold">거래일</span>
        <span className="font-bold">평수</span>
        <span className="font-bold">층</span>
        <span className="font-bold">거래금액</span>
      </div>
      <div className={classNames(css.body, "flex direction-column")}>
        <div className="flex direction-column">
          <h2 className="box font-bold">2025년</h2>
          <div className={classNames(css.row, "box")}>
            <span>2025-01-15</span>
            <span>37평(93.07㎡)</span>
            <span>31층</span>
            <span className="font-bold">10.6억원</span>
          </div>
          <div className={classNames(css.row, "box")}>
            <span>2025-01-15</span>
            <span>37평(93.07㎡)</span>
            <span>31층</span>
            <span className="font-bold">10.6억원</span>
          </div>
        </div>
        <div className="flex direction-column">
          <h2 className="box font-bold">2024년</h2>
          <div className={classNames(css.row, "box")}>
            <span>2025-01-15</span>
            <span>37평(93.07㎡)</span>
            <span>31층</span>
            <span className="font-bold">10.6억원</span>
          </div>
          <div className={classNames(css.row, "box")}>
            <span>2025-01-15</span>
            <span>37평(93.07㎡)</span>
            <span>31층</span>
            <span className="font-bold">10.6억원</span>
          </div>
          <div className={classNames(css.row, "box")}>
            <span>2025-01-15</span>
            <span>37평(93.07㎡)</span>
            <span>31층</span>
            <span className="font-bold">10.6억원</span>
          </div>
          <div className={classNames(css.row, "box")}>
            <span>2025-01-15</span>
            <span>37평(93.07㎡)</span>
            <span>31층</span>
            <span className="font-bold">10.6억원</span>
          </div>
          <div className={classNames(css.row, "box")}>
            <span>2025-01-15</span>
            <span>37평(93.07㎡)</span>
            <span>31층</span>
            <span className="font-bold">10.6억원</span>
          </div>
          <div className={classNames(css.row, "box")}>
            <span>2025-01-15</span>
            <span>37평(93.07㎡)</span>
            <span>31층</span>
            <span className="font-bold">10.6억원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeHistory;
