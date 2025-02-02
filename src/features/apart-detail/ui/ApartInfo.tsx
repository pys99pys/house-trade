import { FC } from "react";

import css from "./ApartInfo.module.css";
import Box from "./Box";

interface ApartInfoProps {
  apartName: string;
  address: string;
  housholdsCount: string;
  parking: string;
  floorAreaRatio: number;
  buildingCoverageRatio: number;
}

const ApartInfo: FC<ApartInfoProps> = ({
  apartName,
  address,
  housholdsCount,
  parking,
  floorAreaRatio,
  buildingCoverageRatio,
}) => {
  return (
    <Box className={css.apartInfo}>
      <h1>{apartName}</h1>
      <table>
        <tbody>
          <tr>
            <th>주소</th>
            <td>{address}</td>
          </tr>
          <tr>
            <th>세대수(동수)</th>
            <td>{housholdsCount}</td>
          </tr>
          <tr>
            <th>주차</th>
            <td>{parking}</td>
          </tr>
          <tr>
            <th>용적률/건폐율</th>
            <td>
              {floorAreaRatio}%/{buildingCoverageRatio}%
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default ApartInfo;
