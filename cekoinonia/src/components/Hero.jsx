import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Typography, Box } from '@mui/material';
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

  // Lógica da Transição Circular (Os Discos que giram)
  useGSAP(() => {
    if (baseIndex === nextIndex) return;

    const masks = masksRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        setBaseIndex(nextIndex);
        gsap.set(masks, { autoAlpha: 0 });
      }
    });

    // Configuração inicial dos discos (escondidos e rotacionados)
    tl.set(masks, { 
      autoAlpha: 0, 
      scale: 1.1, 
      rotation: (i) => (i % 2 === 0 ? -120 : 120) 
    });

    // Animação de revelação circular
    tl.to(masks, {
      duration: 3,
      autoAlpha: 1,
      scale: 1,
      rotation: 0,
      ease: "power2.inOut",
      stagger: { each: 0.15, from: "center" }
    });

  }, { dependencies: [nextIndex], scope: containerRef });

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Box ref={containerRef} className="atmospheric-hero relative w-full h-screen overflow-hidden bg-black">
      
      {/* CAMADA 1: Imagem Base (A que está saindo) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${images[baseIndex]})`, zIndex: 1 }}
      />

      {/* CAMADA 2: Os 4 Discos de Transição (A que está entrando) */}
      {[...Array(4)].map((_, i) => (
        <div 
          key={i}
          ref={el => masksRef.current[i] = el}
          className="absolute inset-0 opacity-0"
          style={{ 
            backgroundImage: `url(${images[nextIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 10,
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

      {/* CAMADA 3: Elementos Decorativos "Umbra" */}
      <div className="geometric-bg" style={{ zIndex: 15 }}>
        <div className="geo-circle"></div>
        <div className="geo-circle"></div>
        <div className="geo-circle"></div>
      </div>

      <div className="diamond-ornament" style={{ zIndex: 20 }}></div>
      <div className="diamond-ornament" style={{ zIndex: 20 }}></div>
      <div className="diamond-ornament" style={{ zIndex: 20 }}></div>
      <div className="diamond-ornament" style={{ zIndex: 20 }}></div>

      <div className="vertical-divider" style={{ zIndex: 20 }}></div>
      <div className="vertical-divider" style={{ zIndex: 20 }}></div>

      <div className="dust-particles" style={{ zIndex: 25 }}>
        {[...Array(8)].map((_, i) => <div key={i} className="dust"></div>)}
      </div>

      <div className="ink-drop" style={{ zIndex: 25 }}></div>
      <div className="ink-drop" style={{ zIndex: 25 }}></div>
      
      <div className="fog" style={{ zIndex: 30 }}></div>

      {/* CAMADA 4: Conteúdo Central */}
      <div className="hero-content" style={{ zIndex: 50 }}>
        <div className="top-symbol">❋</div>
        <p className="pre-title">Igreja Evangélica</p>
        <Typography variant="h1" sx={{ 
          fontFamily: 'Cinzel', 
          fontSize: { xs: '3.5rem', md: '7rem' },
          letterSpacing: '0.2em',
          fontWeight: 700,
          color: '#fff',
          textShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
        }}>
          KOINONIA
        </Typography>
        <div className="accent-line"></div>
        <p className="hero-description">
          We Are The People...
        </p>
        <div className="bottom-symbol">⚜</div>
      </div>
    </Box>
  );
};

export default Hero;