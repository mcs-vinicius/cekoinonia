import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollSmoother from "gsap/ScrollSmoother";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    /* Com o ScrollSmoother ativo, um window.scrollTo direto move a barra mas
       deixa o conteúdo amortecido para trás — a página abre no meio. Quando o
       smoother existe, é ele quem manda; `false` no segundo argumento salta sem
       animar, que é o certo ao trocar de página. */
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, false);
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
