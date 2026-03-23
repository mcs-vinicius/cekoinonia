import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SplashScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Esconde o scroll da página enquanto carrega
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'unset'; 
          setIsVisible(false);
          if (onComplete) onComplete();
        }
      });

      // 1. Configuração inicial: escondemos as linhas usando strokeDashoffset e removemos o preenchimento
      // Aumentei o dasharray para garantir que cubra as letras maiores
      gsap.set('.koinonia-text', { strokeDasharray: 2000, strokeDashoffset: 2000, fill: 'transparent' });

      // 2. A Coreografia: escrita contínua seguida de preenchimento
      tl.to('.koinonia-text', { 
          strokeDashoffset: 0, 
          duration: 2.5, // Duração ligeiramente maior para uma escrita mais graciosa
          ease: 'power1.inOut' // Início e fim suaves, velocidade constante no meio
        })
        .to('.koinonia-text', { 
          fill: '#d4af37', // Preenche com o dourado
          duration: 1, 
          ease: 'power2.out' 
        }, "-=0.5") // Começa o preenchimento pouco antes da escrita terminar
        .to({}, { duration: 1 }) // Pausa para apreciação da marca
        .to('.loader-container', { opacity: 0, duration: 0.6, ease: 'power2.in' }) // Desvanece
        .to(containerRef.current, { yPercent: -100, duration: 0.9, ease: 'power3.inOut' }); // Sobe a cortina
      
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-9999 bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Importação da fonte cursiva elegante */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
          
          .koinonia-text {
            font-family: 'Great Vibes', cursive;
          }
        `}
      </style>

      {/* Luz dourada de fundo (Glow) centralizado no texto */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-[#d4af37]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="loader-container relative z-10 w-full max-w-5xl flex justify-center items-center px-6">
        
        {/* SVG focado apenas no texto, ajustado para o tamanho maior */}
        {/* Mudei o viewBox para centralizar melhor o texto grande */}
        <svg viewBox="0 0 1000 300" className="w-full h-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">
          
          {/* TEXTO: KOINONIA (Cursiva, desenhada progressivamente) */}
          <text 
            className="koinonia-text" 
            x="500" y="160" // Centralizado verticalmente no novo viewbox
            fontSize="180" // AUMENTADO SIGNIFICATIVAMENTE (era 90)
            textAnchor="middle" 
            stroke="#d4af37" 
            strokeWidth="2.5" // Espessura do traço ajustada para o tamanho maior
          >
            Koinonia
          </text>

        </svg>
      </div>
    </div>
  );
};

export default SplashScreen;