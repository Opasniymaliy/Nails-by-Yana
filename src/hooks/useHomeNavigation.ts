import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Для Link на главную: на странице "/" без перехода по роутеру
 * прокручивает наверх и сбрасывает hash — иначе Link to="/" «молчит».
 */
export function useHomeNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const onHomeLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname !== "/") return;
      e.preventDefault();
      if (location.hash) {
        navigate("/", { replace: true });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [location.pathname, location.hash, navigate]
  );

  return { onHomeLinkClick };
}
