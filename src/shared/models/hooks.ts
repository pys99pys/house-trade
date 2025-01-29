import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isMobileAtom = atom<boolean>({
  key: "isMobileAtom",
  default: window && window.innerWidth <= 640,
});

export const useIsMobile = () => useRecoilValue(isMobileAtom);
export const useSetisMobile = () => useSetRecoilState(isMobileAtom);
