import { useNavigate } from "react-router-dom";

import { useRegistSavedApart } from "@/entities/apart";
import { useRemoveSavedApart } from "@/entities/apart/models/hooks";
import { GetTradesListItem, GetTradesRequest } from "@/entities/trade";
import { ROUTE } from "@/shared/consts";
import { notification } from "@/shared/lib";

interface Params {
  queryKey: GetTradesRequest;
  page: number;
}

interface Return {
  onSelectItem: (item: GetTradesListItem) => void;
  onSaveApart: (item: GetTradesListItem) => void;
  onRemoveApart: (item: GetTradesListItem) => void;
}

export const useTradeItem = ({ queryKey, page }: Params): Return => {
  const navigate = useNavigate();

  const registSavedApart = useRegistSavedApart();
  const removeSavedApart = useRemoveSavedApart();

  const onSelectItem = (item: GetTradesListItem) => {
    // 상세 -> 목록으로 돌아왔을 때 기본값 세팅을 위해 state에 저장해둠
    navigate(ROUTE.TRADES, { replace: true, state: { queryKey, page } });
    navigate(`${ROUTE.APART}/${queryKey.regionCode}/${item.apartName}`);
  };

  const onSaveApart = (item: GetTradesListItem) => {
    registSavedApart({
      regionCode: queryKey.regionCode,
      address: item.address,
      apartName: item.apartName,
    });

    notification("저장 완료", `[${item.apartName}] 저장 목록에 추가되었습니다.`);
  };

  const onRemoveApart = (item: GetTradesListItem) => {
    removeSavedApart({
      regionCode: queryKey.regionCode,
      address: item.address,
      apartName: item.apartName,
    });

    notification("삭제 완료", `[${item.apartName}] 저장 목록에서 삭제되었습니다.`);
  };

  return { onSelectItem, onSaveApart, onRemoveApart };
};
