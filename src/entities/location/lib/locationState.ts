import { Location } from "react-router-dom";

import { LocationState } from "../models/types";

export const getLocationState = (state: Location["state"]): LocationState | null => {
  if (!state) {
    return null;
  }

  return {
    regionCode: state.regionCode ?? undefined,
    apartName: state.apartName ?? undefined,
  };
};

export const createLocationState = (state: Partial<LocationState>): LocationState => {
  return {
    regionCode: state.regionCode ?? "",
    apartName: state.apartName ?? "",
  };
};

export const hasLocationState = (state: Location["state"], key: keyof LocationState): boolean => {
  return !!state?.[key];
};
