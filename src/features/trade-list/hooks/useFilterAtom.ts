import { useRecoilValue, useSetRecoilState } from "recoil";

import { filterAtom } from "../models/stores";

export const useFilterState = () => useRecoilValue(filterAtom);
export const useSetFilter = () => useSetRecoilState(filterAtom);
