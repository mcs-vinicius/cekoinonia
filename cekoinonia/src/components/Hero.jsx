import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const images = [
    "https://ik.imagekit.io/wzl99vhez/Koinonia/WhatsApp%20Image%202026-03-18%20at%2010.57.06.jpeg",
    "https://ik.imagekit.io/wzl99vhez/Koinonia/WhatsApp%20Image%202026-03-18%20at%2010.57.04.jpeg",
    "https://ik.imagekit.io/wzl99vhez/Koinonia/WhatsApp%20Image%202026-03-18%20at%2010.57.05.jpeg"
  ];

  const [baseIndex, setBaseIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const containerRef = useRef(null);
  const masksRef = useRef([]);

  const nextSlide = useCallback(() => {
    setNextIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Lógica da Transição Circular com a CORREÇÃO DO PISCAR
  useGSAP(() => {
    if (baseIndex === nextIndex) return;

    const masks = masksRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        setBaseIndex(nextIndex); // Atualiza a imagem de base
        
        // O pequeno atraso (100ms) garante que o React tenha tempo de 
        // carregar a nova imagem de fundo ANTES das máscaras sumirem, evitando o "piscar".
        setTimeout(() => {
          gsap.set(masks, { autoAlpha: 0 }); 
        }, 100);
      }
    });

    tl.set(masks, { 
      autoAlpha: 0, 
      scale: 1.1, 
      rotation: (i) => (i % 2 === 0 ? -90 : 90) 
    });

    tl.to(masks, {
      duration: 2.8,
      autoAlpha: 1,
      scale: 1,
      rotation: 0,
      ease: "power2.inOut",
      stagger: { each: 0.15, from: "center" }
    });

  }, { dependencies: [nextIndex], scope: containerRef });

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000); 
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div ref={containerRef} className="atmospheric-hero relative w-full h-screen overflow-hidden bg-black">
      
      {/* WRAPPER DE IMAGENS */}
      <div className="absolute inset-0 z-1 transition-opacity duration-300" style={{ opacity: 0.35 }}>
        
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[baseIndex]})` }}
        />

        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            ref={el => masksRef.current[i] = el}
            className="absolute inset-0 opacity-0"
            style={{ 
              backgroundImage: `url(${images[nextIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitMaskImage: `radial-gradient(circle at center, ${
                i === 0 ? 'black 20%, transparent 20.1%' : 
                i === 1 ? 'transparent 20%, black 20.1%, black 40%, transparent 40.1%' : 
                i === 2 ? 'transparent 40%, black 40.1%, black 70%, transparent 70.1%' : 
                'transparent 70%, black 70.1%' 
              })`,
              maskImage: `radial-gradient(circle at center, ${
                i === 0 ? 'black 20%, transparent 20.1%' :
                i === 1 ? 'transparent 20%, black 20.1%, black 40%, transparent 40.1%' :
                i === 2 ? 'transparent 40%, black 40.1%, black 70%, transparent 70.1%' :
                'transparent 70%, black 70.1%'
              })`
            }}
          />
        ))}
      </div>

      {/* ELEMENTOS DECORATIVOS "UMBRA" */}
      <div className="geometric-bg" style={{ zIndex: 10 }}>
        <div className="geo-circle"></div>
        <div className="geo-circle"></div>
        <div className="geo-circle"></div>
      </div>

      <div className="diamond-ornament" style={{ zIndex: 15 }}></div>
      <div className="diamond-ornament" style={{ zIndex: 15 }}></div>
      <div className="diamond-ornament" style={{ zIndex: 15 }}></div>
      <div className="diamond-ornament" style={{ zIndex: 15 }}></div>

      <div className="vertical-divider" style={{ zIndex: 15 }}></div>
      <div className="vertical-divider" style={{ zIndex: 15 }}></div>

      <div className="dust-particles" style={{ zIndex: 20 }}>
        {[...Array(8)].map((_, i) => <div key={i} className="dust"></div>)}
      </div>

      <div className="ink-drop" style={{ zIndex: 20 }}></div>
      <div className="ink-drop" style={{ zIndex: 20 }}></div>
      <div className="fog" style={{ zIndex: 25 }}></div>

      {/* CONTEÚDO CENTRAL CORRIGIDO E ALINHADO */}
      <div className="hero-content" style={{ zIndex: 50 }}>
        
        {/* Cruz (Símbolo de Topo) */}
        <div className="top-symbol"style={{ fontSize: '45px'}}>✟</div>
        
        <p className="pre-title">Igreja Evangélica</p>
        
        {/* Correção de Centralização: margin-right anula o letter-spacing invisível do final */}
        <h1 style={{ marginRight: '-18px' }}>KOINONIA</h1>
        
        <div className="accent-line"></div>
        
        <p className="hero-description" style={{ marginRight: '-1px' }}>
          Vivendo em comunhão...
        </p>

        {/* Coração (Símbolo de Fundo) */}
        <div className="bottom-symbol" style={{ fontSize: '45px' }}>♥</div>
        
      </div>
    </div>
  );
};

export default Hero;