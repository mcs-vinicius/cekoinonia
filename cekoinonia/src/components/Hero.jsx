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

  // Separamos o estado: a base (o que está fixo) e a próxima (o que vai animar)
  const [baseIndex, setBaseIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  
  const containerRef = useRef(null);
  const foregroundRef = useRef(null);
  const masksRef = useRef([]);

  const nextSlide = useCallback(() => {
    // Aciona a mudança apenas para a variável da animação
    setNextIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // 1. ANIMAÇÃO DO TEXTO (Corre apenas UMA VEZ e fica fixo)
  useGSAP(() => {
    gsap.fromTo(foregroundRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.8, ease: "power3.out", delay: 0.5 }
    );
  }, { scope: containerRef }); 

  // 2. ANIMAÇÃO DOS DISCOS (A Mágica da Transição)
  useGSAP(() => {
    // Evita rodar no primeiro carregamento da página
    if (baseIndex === nextIndex) return;

    const masks = masksRef.current;
    if (!masks.length) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // O segredo está aqui: A imagem base só é atualizada DEPOIS que a animação termina
        setBaseIndex(nextIndex);
      }
    });

    // Estado inicial: Os discos começam invisíveis, levemente ampliados e rotacionados
    tl.set(masks, { 
      autoAlpha: 0, 
      scale: 1.15, 
      rotation: (i) => (i % 2 === 0 ? -180 : 180) 
    });

    // A Animação em si: Os discos aparecem revelando a nova imagem
    tl.to(masks, {
      duration: 3.8, // Duração longa para leveza
      autoAlpha: 1,  // Revela a imagem enquanto gira
      scale: 1, 
      rotation: 0, 
      ease: "expo.out", // Desaceleração muito suave no final
      stagger: {
        each: 0.25, 
        from: "center" 
      }
    });

  }, { dependencies: [nextIndex], scope: containerRef }); 

  useEffect(() => {
    // Ajustei o timer para 8 segundos para dar tempo de contemplar a imagem
    const timer = setInterval(nextSlide, 8000); 
    return () => clearInterval(timer); 
  }, [nextSlide]);

  return (
    <Box 
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen w-full bg-church-dark overflow-hidden"
    >
      {/* CAMADA BASE: Mostra a imagem estática antiga */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{ backgroundImage: `url(${images[baseIndex]})` }}
      />
      
      {/* CAMADA DE ANIMAÇÃO: Os 4 discos com a NOVA imagem que vão sobrepor a camada base */}
      {[...Array(4)].map((_, i) => (
        <div 
          key={i}
          ref={el => masksRef.current[i] = el}
          // Opacity 0 inicial no Tailwind para evitar piscar antes da animação
          className="absolute inset-0 z-20 pointer-events-none opacity-0"
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

      {/* Sobreposição escura (Filtro) para destacar o texto */}
      <div className="absolute inset-0 bg-black/75 z-30 pointer-events-none" />

      {/* CONTEÚDO FIXO NA FRENTE */}
      <Box ref={foregroundRef} className="relative z-40 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        <Typography 
          variant="overline" 
          className="text-church-gold tracking-[0.3em] mb-4 font-sans font-medium"
        >
          IGREJA EVANGÉLICA KOINONIA
        </Typography>

        <Typography 
          variant="h1" 
          className="text-white font-serif drop-shadow-2xl"
          sx={{ 
            fontSize: { xs: '3.5rem', md: '6rem', lg: '7.5rem' },
            fontWeight: 400,
            letterSpacing: '0.05em',
            lineHeight: 1.1,
            textTransform: 'uppercase'
          }}
        >
          We Are The <br/> <span className="text-church-gold italic">People</span>
        </Typography>

      </Box>
    </Box>
  );
};

export default Hero;