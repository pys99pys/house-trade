import { FC } from "react";

import { GetApartRequest, useGetApartQuery } from "@/entities/apart";
import { IconBox } from "@/shared/ui";

import ApartInfo from "../ui/ApartInfo";
import TradeChart from "../ui/TradeChart";
import TradeHistory from "../ui/TradeHistory";
import css from "./ApartDetail.module.css";

interface ApartDetailProps {
  queryKey: GetApartRequest;
}

const ApartDetail: FC<ApartDetailProps> = ({ queryKey }) => {
  const { isLoading, data } = useGetApartQuery(queryKey);

  if (isLoading || !data) {
    return <IconBox type="loading" />;
  }

  return (
    <div className={css.apartDetail}>
      <ApartInfo
        apartName={queryKey.apartName}
        address={data.address}
        housholdsCount={data.housholdsCount}
        parking={data.parking}
        floorAreaRatio={data.floorAreaRatio}
        buildingCoverageRatio={data.buildingCoverageRatio}
      />
      <TradeChart tradeItems={data.tradeItems} />
      <TradeHistory tradeItems={data.tradeItems} />
    </div>
  );
};

export default ApartDetail;
