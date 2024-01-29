import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    // Fungsi ini akan dipanggil setiap kali route berubah
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null; // Komponen ini tidak merender apa-apa, hanya untuk efek samping
};

export default ScrollToTopOnRouteChange;
