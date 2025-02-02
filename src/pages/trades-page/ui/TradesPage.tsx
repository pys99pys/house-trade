import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { GetTradesRequest } from "@/entities/trade";
import { TradeList } from "@/features/trade-list";
import { TradeListSearch } from "@/features/trade-list-search";

import css from "./TradesPage.module.css";

interface TradesPageProps {}

const TradesPage: FC<TradesPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [queryKey, setQueryKey] = useState<GetTradesRequest>(
    location.state?.queryKey ?? { regionCode: "", yearMonth: "" }
  );

  useEffect(() => {
    // TODO: 검색폼, 목록 페이지 초기화용 state를 삭제하는 로직 - 개선 필요
    if (location.state) {
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className={css.tradesPage}>
      <div>
        <TradeListSearch setQueryKey={setQueryKey} />
      </div>
      <div>
        <TradeList queryKey={queryKey} />
      </div>
    </div>
  );
};

export default TradesPage;
