import { FC } from "react";

import css from "./TradeInfo.module.css";

interface TradeInfoProps {
  items: { title: string; content: string }[];
}

const TradeInfo: FC<TradeInfoProps> = ({ items }) => {
  return (
    <table className={css.tradeInfo}>
      {items.map((item, i) => {
        return (
          <tr key={i}>
            <th className="text-left font-bold">{item.title}</th>
            <td>{item.content}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default TradeInfo;
