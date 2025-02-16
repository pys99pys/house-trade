import classNames from "classnames";
import { FC, Fragment, MouseEvent, useRef } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { GetApartResponseTradeItem } from "@/entities/apart";
import { calculateAreaSize, calculateFlatSize, calculateTradeAmountFormat } from "@/entities/trade";
import { Box as BaseBox } from "@/shared/ui";

import { useTradeHistoryData } from "../hooks/useTradeHistoryData";
import Box from "../ui/Box";
import css from "./TradeHistory.module.css";

interface TradeHistoryProps {
  tradeItems: GetApartResponseTradeItem[];
}

const TradeHistory: FC<TradeHistoryProps> = ({ tradeItems: originTradeItems }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { tradeItems } = useTradeHistoryData({ originTradeItems });

  const onClickToTop = () => {
    scrollContainerRef.current!.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onClickToBottom = () => {
    scrollContainerRef.current!.scrollTo({
      top: scrollContainerRef.current!.scrollHeight,
      behavior: "smooth",
    });
  };

  const onClickYear = (e: MouseEvent<HTMLHeadingElement>) => {
    let calculatedScrollTop = 0;
    const beforeElement = e.currentTarget.previousElementSibling;

    if (beforeElement) {
      const containerTop = scrollContainerRef.current!.getBoundingClientRect().top;
      const beforeElementTop = beforeElement.getBoundingClientRect().top;

      calculatedScrollTop = beforeElementTop - containerTop + scrollContainerRef.current!.scrollTop;
    } else {
      calculatedScrollTop = 0;
    }

    scrollContainerRef.current!.scrollTo({
      top: calculatedScrollTop,
      behavior: "smooth",
    });
  };

  return (
    <Box title="전체 거래 목록">
      <div className={css.tradeHistory}>
        <div className={classNames(css.header, css.row, "box")}>
          <span className={css.cell}>
            <strong>거래일</strong>
          </span>
          <span className={css.cell}>
            <strong>평수</strong>
          </span>
          <span className={css.cell}>
            <strong>층</strong>
          </span>
          <span className={css.cell}>
            <strong>거래금액</strong>
          </span>
        </div>
        <div className={css.body}>
          <button className={classNames(css.button, css.top)} onClick={onClickToTop}>
            <FaArrowUp />
          </button>
          <div ref={scrollContainerRef} className={css.container}>
            {tradeItems.map((item, index) => (
              <Fragment key={item.year}>
                <h2
                  className={css.year}
                  style={{ top: index === 0 ? "2px" : `${index * 24 + 2}px` }}
                  onClick={onClickYear}
                >
                  {item.year}년({item.items.length})
                </h2>
                {item.items.map((_item, _index) => (
                  <BaseBox key={_index} className={css.row}>
                    <span className={css.cell}>{_item.tradeDate}</span>
                    <span className={css.cell}>
                      {calculateFlatSize(_item.size)}평<small>({calculateAreaSize(_item.size)}㎡)</small>
                    </span>
                    <span className={css.cell}>{_item.floor}층</span>
                    <span className={css.cell}>
                      <strong>{calculateTradeAmountFormat(_item.tradeAmount)}</strong>
                    </span>
                  </BaseBox>
                ))}
              </Fragment>
            ))}
          </div>
          <button className={classNames(css.button, css.top)} onClick={onClickToBottom}>
            <FaArrowDown />
          </button>
        </div>
      </div>
    </Box>
  );
};

export default TradeHistory;
