import { useEffect, useRef } from "react";

import { useSetisMobile } from "@/shared/models";

export const useSetMobileState = () => {
  const timer = useRef(0);
  const setIsMobile = useSetisMobile();

  const setIsMobileState = () => {
    clearTimeout(timer.current);

    timer.current =
      window &&
      window.setTimeout(() => {
        setIsMobile(window && window.innerWidth <= 640);
      }, 50);
  };

  const setIsMobileStateEvent = () => {
    window.addEventListener("resize", setIsMobileState);
  };

  const removeIsMobileStateEvent = () => {
    window.removeEventListener("resize", setIsMobileState);
  };

  useEffect(() => {
    setIsMobileStateEvent();

    return () => {
      removeIsMobileStateEvent();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
