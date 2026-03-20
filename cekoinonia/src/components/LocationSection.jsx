import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import RoomIcon from '@mui/icons-material/Room'; // O Ícone do Pino Gigante
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LocationSection = () => {
  const [isMapInteractive, setIsMapInteractive] = useState(false);
  const locationRef = useRef(null);

  // Lógica do GSAP para a secção de Localização
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Textos da Esquerda aparecem em Cascata (Stagger)
      gsap.from('.location-reveal', {
        scrollTrigger: {
          trigger: locationRef.current,
          start: 'top 75%', 
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Atraso entre cada elemento
        ease: 'power3.out'
      });

      // 2. A Surpresa do Mapa: O mapa foca-se e clareia
      gsap.fromTo('.map-iframe', 
        { filter: 'invert(100%) hue-rotate(180deg) grayscale(100%) blur(10px) contrast(80%)' },
        { 
          filter: 'invert(100%) hue-rotate(180deg) grayscale(85%) blur(0px) contrast(120%)',
          duration: 2,
          scrollTrigger: { trigger: locationRef.current, start: 'top 60%' },
          ease: 'power2.out'
        }
      );

      // 3. A Surpresa do Pino: Cai do céu e "quica" no mapa
      gsap.from('.giant-pin', {
        scrollTrigger: {
          trigger: locationRef.current,
          start: 'top 60%',
        },
        y: -300,        // Vem de 300px acima
        opacity: 0,
        duration: 1.5,
        ease: 'bounce.out', // O famoso efeito de "quique"
        delay: 0.5      // Espera um pouco antes de cair
      });

      // Onda gerada pelo pino (Ripple)
      gsap.from('.pin-ripple', {
        scrollTrigger: { trigger: locationRef.current, start: 'top 60%' },
        scale: 0,
        opacity: 0.8,
        duration: 1,
        ease: 'power2.out',
        delay: 1.8 // Acontece logo depois de o pino bater no chão
      });
      gsap.to('.pin-ripple', {
        scrollTrigger: { trigger: locationRef.current, start: 'top 60%' },
        scale: 4,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 1.8,
        repeat: -1, // Repete a onda eternamente
        repeatDelay: 2
      });

    }, locationRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={locationRef} className="flex flex-col md:flex-row w-full min-h-[75vh] bg-[#080808] border-t border-white/5 relative overflow-hidden">
      
      {/* ========================================================
          LADO ESQUERDO: TEXTOS E DADOS (Classes 'location-reveal' adicionadas)
          ======================================================== */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-10 md:p-16 lg:p-24 z-10 relative">
        
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 0% 0%, var(--color-church-gold) 0%, transparent 60%)' }}
        ></div>

        <div className="mb-4 location-reveal">
          <span className="text-church-gold text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">✟</span>
        </div>
        
        <Typography 
          variant="h3" 
          className="text-church-gold font-serif mb-4 tracking-[0.15em] uppercase location-reveal"
          sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}
        >
          Onde Estamos
        </Typography>
        
        <Typography 
          variant="h4" 
          className="text-white font-serif mb-8 tracking-widest uppercase location-reveal"
          sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
        >
          Visite a Nossa <span className="text-church-gold italic">Comunidade</span>
        </Typography>

        <div className="w-16 h-px bg-church-gold opacity-30 mb-12 location-reveal"></div>

        <div className="flex flex-col gap-10 mb-16 location-reveal">
          <div className="flex items-start gap-5 group">
            <div className="p-3 border border-white/10 rounded-full group-hover:border-church-gold/50 transition-colors duration-500">
              <LocationOnOutlinedIcon className="text-church-gold" />
            </div>
            <div className="mt-1">
              <Typography variant="subtitle2" className="text-white font-sans tracking-[0.2em] uppercase mb-2 text-xs">
                Localização
              </Typography>
              <Typography variant="body2" className="text-gray-400 font-sans tracking-wide text-[13px] leading-relaxed">
                R. Carmine Monetti, 471<br/>
                Jardim das Oliveiras, São Paulo - SP<br/>
                CEP: 08111-160
              </Typography>
            </div>
          </div>
        </div>

        <div className="location-reveal">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("R. Carmine Monetti, 471, Jardim das Oliveiras, São Paulo, SP, 08111-160")}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-3 border border-church-gold/40 text-church-gold px-8 py-4 font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-church-gold hover:text-black transition-all duration-500"
          >
            <DirectionsOutlinedIcon fontSize="small" />
            Como Chegar
          </a>
        </div>
      </div>

      {/* ========================================================
          LADO DIREITO: MAPA COM A SURPRESA ANIMADA
          ======================================================== */}
      <div 
        className="w-full md:w-1/2 relative min-h-112.5 md:min-h-full flex items-center justify-center overflow-hidden"
        onMouseLeave={() => setIsMapInteractive(false)} 
      >
        
        {/* A SURPRESA: O Pino Gigante e a Onda */}
        {!isMapInteractive && (
          <div className="absolute z-20 pointer-events-none flex flex-col items-center justify-center">
             <div className="relative">
               {/* A onda que se expande quando o pino toca no chão */}
               <div className="pin-ripple absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-4 border-2 border-church-gold rounded-[100%]"></div>
               
               {/* O Pino Gigante */}
               <RoomIcon className="giant-pin text-church-gold drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" sx={{ fontSize: 90 }} />
             </div>
          </div>
        )}

        {/* Camada Invisível de Interação */}
        {!isMapInteractive && (
          <div 
            className="absolute inset-0 z-30 flex items-center justify-center cursor-pointer bg-transparent hover:bg-black/50 transition-all duration-500 group"
            onClick={() => setIsMapInteractive(true)}
          >
            <div className="opacity-0 group-hover:opacity-100 mt-24 flex items-center gap-2 bg-[#080808] border border-church-gold/40 text-church-gold px-6 py-3 font-sans text-[10px] tracking-[0.2em] uppercase shadow-2xl transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <TouchAppOutlinedIcon fontSize="small" />
              Clique para explorar
            </div>
          </div>
        )}

        <iframe 
          src="https://maps.google.com/maps?q=R.+Carmine+Monetti,+471,+Jardim+das+Oliveiras,+São+Paulo&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          className={`map-iframe absolute inset-0 w-full h-full ${!isMapInteractive ? 'pointer-events-none' : ''}`}
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        {/* Sombras Gradient */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-[#080808] via-[#080808]/20 to-transparent z-10"></div>
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#080808] via-transparent to-transparent opacity-50 md:hidden z-10"></div>
      </div>

    </section>
  );
};

export default LocationSection;