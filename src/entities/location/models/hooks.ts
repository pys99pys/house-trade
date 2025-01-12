import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LocationState } from "./types";

export const useLocationStateChangeEffect = (func: (state: LocationState) => void): void => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.regionCode || location.state?.apartName) {
      func({
        regionCode: location.state.regionCode,
        apartName: location.state.apartName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);
};

export const useChangeLocationState = (): ((path: string, state: LocationState) => void) => {
  const navigate = useNavigate();

  return useCallback(
    (path: string, state: LocationState) => {
      navigate(path, { state });
    },
    [navigate]
  );
};
