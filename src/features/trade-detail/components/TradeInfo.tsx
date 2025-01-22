import { FC } from "react";

import { useTradeDetail } from "../hooks/useTradeDetail";
import Box from "../ui/Box";
import css from "./TradeInfo.module.css";

interface TradeInfoProps {}

const TradeInfo: FC<TradeInfoProps> = () => {
  const { apartName, data } = useTradeDetail();

  if (!data) {
    return null;
  }

  return (
    <Box className={css.tradeInfo}>
      <Box.Title>
        <h1>{apartName}</h1>
      </Box.Title>
      <Box.Content>
        <table>
          <tbody>
            <tr>
              <th className="text-left font-bold">주소</th>
              <td>{data.address}</td>
            </tr>
            <tr>
              <th className="text-left font-bold">세대수(동수)</th>
              <td>{data.housholdsCount}</td>
            </tr>
            <tr>
              <th className="text-left font-bold">주차</th>
              <td>{data.parking}</td>
            </tr>
            <tr>
              <th className="text-left font-bold">용적률/건폐율</th>
              <td>
                {data.floorAreaRatio}%/{data.buildingCoverageRatio}%
              </td>
            </tr>
          </tbody>
        </table>
      </Box.Content>
    </Box>
  );
};

export default TradeInfo;
