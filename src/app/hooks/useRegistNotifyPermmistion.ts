import { useEffect } from "react";

import { registNotifyPermission } from "@/shared/lib";

export const useRegistNotifyPermmistion = () => {
  useEffect(() => {
    registNotifyPermission();
  }, []);
};
