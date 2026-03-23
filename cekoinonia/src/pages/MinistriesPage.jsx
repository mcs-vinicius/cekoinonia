import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Ministries from '../components/Ministries';
import gsap from 'gsap';

const MinistriesPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tlBanner = gsap.timeline({ delay: 0.2 });
      
      tlBanner.fromTo('.banner-element', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out' }
      )
      // Animação da Nova Descrição (Mais lenta e suave)
      .fromTo('.page-intro-element',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.3, ease: 'power2.out' },
        "-=0.8"
      );

    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#050505] min-h-screen pt-24">
      
      {/* =====================================================================
          1. BANNER DE TOPO
          ===================================================================== */}
      <Box className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale opacity-60"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1920&auto=format&fit=crop)' }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/70 to-[#050505]/30"></div>
        
        <div className="relative z-10 text-center px-4 mt-10">
          <Typography variant="h6" className="banner-element text-[#d4af37] tracking-[0.4em] font-serif mb-4 uppercase text-sm opacity-0">
            A Nossa Família
          </Typography>
          <Typography variant="h2" className="banner-element text-white font-serif tracking-widest uppercase mb-6 opacity-0" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' } }}>
            Nossos <span className="text-[#d4af37] italic">Ministérios</span>
          </Typography>
          <div className="banner-element w-24 h-px bg-white/20 opacity-0 mx-auto"></div>
        </div>
      </Box>

      {/* =====================================================================
          2. SECÇÃO: INTRODUÇÃO (Agora Limpa, Centralizada e Elegante)
          ===================================================================== */}
      <Box className="py-24 md:py-32 bg-[#050505] relative z-10 flex flex-col items-center justify-center">
        <Container maxWidth="md" className="text-center flex flex-col items-center">
          
          <Box className="mb-10 page-intro-element opacity-0">
            <span className="text-[#d4af37] text-3xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">✟</span>
          </Box>

          {/* Texto Único, Grande e Centralizado (Sem mistura de fontes) */}
          <Typography 
            variant="h5" 
            className="page-intro-element opacity-0 text-gray-300 font-sans leading-loose text-center px-4" 
            sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, fontWeight: 300 }}
          >
            "Acreditamos que cada pessoa foi dotada por Deus com talentos e paixões únicas. Na Koinonia, os nossos ministérios são canais vivos onde a fé se traduz em ação, serviço e comunhão genuína."
          </Typography>
          
          <div className="page-intro-element w-24 h-px bg-[#d4af37]/30 opacity-0 mx-auto mt-12"></div>
          
        </Container>
      </Box>

      {/* =====================================================================
          3. OS CARTÕES DE MINISTÉRIOS
          ===================================================================== */}
      <Ministries />
      
    </div>
  );
};

export default MinistriesPage;