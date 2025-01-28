import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isMobileAtom = atom<boolean>({
  key: "isMobileAtom",
  default: false,
});

export const useIsMobile = () => useRecoilValue(isMobileAtom);
export const useSetisMobile = () => useSetRecoilState(isMobileAtom);
