import classNames from "classnames";
import { FC } from "react";

import Box from "../ui/Box";
import TradeHistory from "../ui/TradeHistory";
import TradeInfo from "../ui/TradeInfo";
import css from "./TradeDetail.module.css";

interface TradeDetailProps {}

const TradeDetail: FC<TradeDetailProps> = () => {
  return (
    <div className={classNames(css.tradeDetail, "flex direction-column")}>
      <h1 className="box font-bold">미사강변한신더휴</h1>
      <Box title="아파트 정보">
        <TradeInfo
          items={[
            {
              title: "주소",
              content: "서울특별시 강남구 삼성동 78-4(영동대로128길 5)",
            },
            {
              title: "세대수(동수)",
              content: "9,510세대(기타임대 1,401세대 포함, 총84동)",
            },
            {
              title: "주차",
              content: "12,602대(세대당 1.32대)",
            },
            {
              title: "용적률/건폐율",
              content: "285.0%/19.0%",
            },
          ]}
        />
      </Box>
      <Box title="실거래가">
        <TradeHistory />
      </Box>
    </div>
  );
};

export default TradeDetail;
