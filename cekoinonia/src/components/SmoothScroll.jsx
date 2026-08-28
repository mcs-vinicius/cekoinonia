import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

/**
 * Envolve o conteúdo rolável e amortece a rolagem.
 *
 * A página continua rolando de verdade (o ScrollSmoother só atrasa o conteúdo
 * em relação à barra), então `window.scrollY` segue valendo — é o que o Header
 * usa para saber quando ficar opaco.
 *
 * O que fica FORA daqui: qualquer coisa `position: fixed`. O smoother move o
 * conteúdo com `transform`, e um elemento fixo dentro de um pai transformado
 * passa a se posicionar em relação a esse pai — o cabeçalho fixo iria embora
 * junto com a rolagem.
 */
const SmoothScroll = ({ children }) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        // Segundos que o conteúdo leva para alcançar a barra de rolagem.
        smooth: 1.4,
        // Deixa o ScrollTrigger acompanhar a posição amortecida, e não a real:
        // sem isto as animações disparam antes de o conteúdo chegar na tela.
        effects: true,
        // No celular a rolagem nativa já tem a inércia do sistema; amortecer por
        // cima disso dá a sensação de atraso, não de suavidade.
        smoothTouch: false
      });

      return () => smoother.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
