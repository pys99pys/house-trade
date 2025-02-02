import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useLocationState = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
};
