import { useRecoilValue, useSetRecoilState } from "recoil";

import { filterAtom, pageAtom } from "./stores";

export const useFilterState = () => useRecoilValue(filterAtom);
export const useSetFilterState = () => useSetRecoilState(filterAtom);

export const usePageState = () => useRecoilValue(pageAtom);
export const useSetPageState = () => useSetRecoilState(pageAtom);
