import classNames from "classnames";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";

import styles from "./MonthPicker.module.css";

interface MonthPickerProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
}

const MonthPicker: FC<MonthPickerProps> = ({ year, month, onChange }) => {
  const [isShow, setIsShow] = useState(false);

  const pickerCloseEvent = useCallback((e: MouseEvent) => {
    const isInPicker = !!(e.target as HTMLElement).closest(`.${styles.monthPicker}`);

    if (!isInPicker) {
      setIsShow(false);
    }
  }, []);

  const onClickPicker = () => {
    setIsShow(true);
  };

  const onClickPrevMonth = () => {
    setIsShow(false);
    onChange(month === 1 ? year - 1 : year, month === 1 ? 12 : month - 1);
  };

  const onClickNextMonth = () => {
    setIsShow(false);
    onChange(month === 12 ? year + 1 : year, month === 12 ? 1 : month + 1);
  };

  const onClickPrevYear = () => {
    onChange(year - 1, month);
  };

  const onClickNextYear = () => {
    onChange(year + 1, month);
  };

  const onChangeMonth = (month: number) => {
    setIsShow(false);
    onChange(year, month);
  };

  useEffect(() => {
    if (isShow) {
      document.body.addEventListener("click", pickerCloseEvent);
    }
  }, [isShow, pickerCloseEvent]);

  return (
    <div
      className={classNames(styles.monthPicker, {
        [styles.active]: isShow,
      })}
    >
      <div className={styles.inputWrap}>
        <div className={styles.buttonWrap}>
          <button type="button" onClick={onClickPrevMonth}>
            <FaAngleLeft />
          </button>
        </div>
        <div className={styles.textWrap}>
          {year}년 {Number(month)}월
        </div>
        <div className={styles.buttonWrap}>
          <button type="button" onClick={onClickNextMonth}>
            <FaAngleRight />
          </button>
        </div>
        <div className={styles.buttonWrap}>
          <button type="button" onClick={onClickPicker}>
            <FaCalendarAlt />
          </button>
        </div>
      </div>

      {isShow && (
        <div className={styles.picker}>
          <div className={styles.yearPickerWrap}>
            <button type="button" onClick={onClickPrevYear}>
              <FaArrowLeft />
            </button>
            <span>{year}년</span>
            <button type="button" onClick={onClickNextYear}>
              <FaArrowRight />
            </button>
          </div>
          <div className={styles.monthPickerWrap}>
            <ul>
              {new Array(12).fill(null).map((_, i) => (
                <li key={i}>
                  <button type="button" onClick={() => onChangeMonth(i + 1)}>
                    {i + 1}월
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthPicker;
