import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Hero = ({ ready = true }) => {
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

  /* Entrada do conteúdo. Antes eram animações CSS com delay fixo, que rodavam
     escondidas atrás do splash e já tinham terminado quando ele saía. Agora
     esperam o sinal de `ready` para começar. */
  useGSAP(() => {
    if (!ready) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-cross',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1.1 }
      )
      .fromTo('.pre-title',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1 },
        '-=0.7'
      )
      .fromTo('.hero-title',
        { autoAlpha: 0, y: 40, scale: 0.96, filter: 'blur(14px)' },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'expo.out'
        },
        '-=0.6'
      )
      // scaleX em vez de width: assim a linha respeita a largura definida no
      // CSS em cada breakpoint (220px no desktop, 150px no mobile).
      .fromTo('.accent-line',
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, duration: 1.2, transformOrigin: 'center center' },
        '-=1.1'
      )
      .fromTo('.hero-description',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1.2 },
        '-=0.8'
      );

  }, { dependencies: [ready], scope: containerRef });

  return (
    <div ref={containerRef} className="atmospheric-hero relative w-full h-screen overflow-hidden bg-black">

      {/* WRAPPER DE IMAGENS */}
      <div className="absolute inset-0 z-1 transition-opacity duration-300" style={{ opacity: 0.5 }}>

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

      {/* ATMOSFERA: apenas poeira e vinheta. Os círculos, losangos, divisores
          verticais e manchas de tinta saíram — competiam com o texto e com a
          foto sem acrescentar nada. */}
      <div className="dust-particles" style={{ zIndex: 20 }}>
        {[...Array(8)].map((_, i) => <div key={i} className="dust"></div>)}
      </div>

      <div className="fog" style={{ zIndex: 25 }}></div>

      {/* CONTEÚDO CENTRAL */}
      <div className="hero-content" style={{ zIndex: 50 }}>

        <svg
          className="hero-cross invisible"
          viewBox="0 0 24 34"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 0h4v10h10v4H14v20h-4V14H0v-4h10z" />
        </svg>

        <p className="pre-title tracking-balanced invisible">
          Igreja Evangélica
        </p>

        <h1 className="hero-title tracking-balanced invisible">
          KOINONIA
        </h1>

        <div className="accent-line invisible"></div>

        <p className="hero-description invisible">
          Vivendo em comunhão
        </p>

      </div>
    </div>
  );
};

export default Hero;
