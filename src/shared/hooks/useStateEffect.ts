import { useEffect } from "react";

export const useStateEffect = (effectFn: () => void, flags: unknown[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectFn, [...flags.map((flag) => JSON.stringify(flag))]);
};
