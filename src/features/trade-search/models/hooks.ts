import { useRecoilValue, useSetRecoilState } from "recoil";

import { savedRegionAtom, searchFormAtom } from "./stores";

export const useSearchFormState = () => useRecoilValue(searchFormAtom);
export const useSetSearchForm = () => useSetRecoilState(searchFormAtom);

export const useSavedRegionState = () => useRecoilValue(savedRegionAtom);
export const useSetSavedRegion = () => useSetRecoilState(savedRegionAtom);
