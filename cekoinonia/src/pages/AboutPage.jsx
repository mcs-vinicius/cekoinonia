import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import About from '../components/About';
import Leaders from '../components/Leaders';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animação do Banner Inicial
      const tlBanner = gsap.timeline({ delay: 0.2 });
      tlBanner.fromTo('.banner-element', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      // 2. Animação da Secção de História
      gsap.fromTo('.history-element',
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.3, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.history-section',
            start: 'top 70%'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    // Adicionado pt-24 para a Navbar não sobrepor a imagem
    <div ref={pageRef} className="bg-[#050505] min-h-screen pt-24">
      
      {/* =====================================================================
          1. BANNER DE TOPO DA PÁGINA
          ===================================================================== */}
      <Box className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Fundo de Imagem Ajustado (bg-top ajuda a não cortar os rostos) */}
        <div 
          className="absolute inset-0 bg-cover bg-top filter grayscale"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1920&auto=format&fit=crop)' }}
        ></div>
        
        {/* Degradê */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/70 to-[#050505]/30"></div>
        
        {/* Conteúdo do Banner */}
        <div className="relative z-10 text-center px-4 mt-10">
          <Typography variant="h6" className="banner-element text-church-gold tracking-[0.4em] font-serif mb-4 uppercase text-sm opacity-0">
            A Nossa Essência
          </Typography>
          <Typography variant="h2" className="banner-element text-white font-serif tracking-widest uppercase mb-6 opacity-0" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' } }}>
            Nossa <span className="text-church-gold italic">História</span>
          </Typography>
          <div className="banner-element w-24 h-px bg-church-gold opacity-0 mx-auto"></div>
        </div>
      </Box>

      {/* =====================================================================
          2. SECÇÃO DE HISTÓRIA
          ===================================================================== */}
      <Box className="history-section py-24 relative border-b border-white/5">
        <Container maxWidth="md">
          
          <Box className="text-center mb-16 history-element opacity-0">
            <span className="text-church-gold text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">✟</span>
          </Box>

          <Typography variant="body1" className="history-element opacity-0 text-gray-300 font-sans leading-loose text-justify md:text-center text-[15px] mb-8">
            A Igreja Evangélica Koinonia nasceu de um sonho colocado por Deus no coração de um pequeno grupo de irmãos que se reuniam em casas para orar e estudar a Palavra. O que começou como uma simples reunião de oração, rapidamente se transformou numa comunidade vibrante, unida pelo desejo de viver o verdadeiro sentido da palavra grega <em className="text-church-gold">Koinonia</em>: comunhão, partilha e vida em comum.
          </Typography>
          
          <Typography variant="body1" className="history-element opacity-0 text-gray-300 font-sans leading-loose text-justify md:text-center text-[15px] mb-20">
            Ao longo dos anos, enfrentámos desafios e celebramos vitórias, mas a nossa essência nunca mudou. Continuamos a ser uma igreja centrada em Cristo, apaixonada pelas Escrituras e dedicada a amar o próximo. A nossa missão é ser um farol de esperança na cidade, um lugar onde os feridos encontram cura, os perdidos encontram direção, e todos encontram uma verdadeira família.
          </Typography>
          
        </Container>
      </Box>

      {/* =====================================================================
          3. OS COMPONENTES ORIGINAIS
          ===================================================================== */}
      <Leaders />
      <About />
      
    </div>
  );
};

export default AboutPage;