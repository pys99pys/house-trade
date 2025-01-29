import { useNavigate } from "react-router-dom";

import { useRegistSavedApart } from "@/entities/apart";
import { useRemoveSavedApart } from "@/entities/apart/models/hooks";
import { TradeItem, useTradesQueryKey } from "@/entities/trade";
import { ROUTE } from "@/shared/consts";
import { notification } from "@/shared/lib";

interface Return {
  onSelectApart: (item: TradeItem) => void;
  onSaveApart: (item: TradeItem) => void;
  onRemoveApart: (item: TradeItem) => void;
}

export const useApartItem = (): Return => {
  const navigate = useNavigate();
  const tradesQueryKey = useTradesQueryKey();

  const registSavedApart = useRegistSavedApart();
  const removeSavedApart = useRemoveSavedApart();

  const onSelectApart = (item: TradeItem) => {
    navigate(`${ROUTE.APART}/${tradesQueryKey.cityCode}/${item.apartName}`);
  };

  const onSaveApart = (item: TradeItem) => {
    registSavedApart({
      regionCode: tradesQueryKey.cityCode,
      address: item.address,
      apartName: item.apartName,
    });

    notification("저장 완료", `[${item.apartName}] 저장 목록에 추가되었습니다.`);
  };

  const onRemoveApart = (item: TradeItem) => {
    removeSavedApart({
      regionCode: tradesQueryKey.cityCode,
      address: item.address,
      apartName: item.apartName,
    });

    notification("삭제 완료", `[${item.apartName}] 저장 목록에서 삭제되었습니다.`);
  };

  return { onSelectApart, onSaveApart, onRemoveApart };
};
