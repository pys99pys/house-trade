import { useNavigate } from "react-router-dom";

import { useRegistSavedApart } from "@/entities/apart";
import { useRemoveSavedApart } from "@/entities/apart/models/hooks";
import { TradeItem, TradesQueryRequest } from "@/entities/trade";
import { ROUTE } from "@/shared/consts";
import { notification } from "@/shared/lib";

interface Params {
  queryKey: TradesQueryRequest;
}

interface Return {
  onSelectApart: (item: TradeItem) => void;
  onSaveApart: (item: TradeItem) => void;
  onRemoveApart: (item: TradeItem) => void;
}

export const useApartItem = ({ queryKey }: Params): Return => {
  const navigate = useNavigate();

  const registSavedApart = useRegistSavedApart();
  const removeSavedApart = useRemoveSavedApart();

  const onSelectApart = (item: TradeItem) => {
    navigate(`${ROUTE.APART}/${queryKey.cityCode}/${item.apartName}`);
  };

  const onSaveApart = (item: TradeItem) => {
    registSavedApart({
      regionCode: queryKey.cityCode,
      address: item.address,
      apartName: item.apartName,
    });

    notification("저장 완료", `[${item.apartName}] 저장 목록에 추가되었습니다.`);
  };

  const onRemoveApart = (item: TradeItem) => {
    removeSavedApart({
      regionCode: queryKey.cityCode,
      address: item.address,
      apartName: item.apartName,
    });

    notification("삭제 완료", `[${item.apartName}] 저장 목록에서 삭제되었습니다.`);
  };

  return { onSelectApart, onSaveApart, onRemoveApart };
};
