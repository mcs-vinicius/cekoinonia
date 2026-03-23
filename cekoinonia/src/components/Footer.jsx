import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // <-- NOVO IMPORT
import { Box, Container, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const crossHaloRef = useRef(null);
  const location = useLocation(); // <-- DETETA A MUDANÇA DE PÁGINA

  const verseText = "Oh! quão bom e quão suave é que os irmãos vivam em união.";

  const splitTextIntoSpans = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="v-char opacity-0 inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    // O GSAP Context garante que a animação é limpa antes de reiniciar
    const ctx = gsap.context(() => {
      
      // Reset CSS manual para garantir que o halo perde a animação antiga
      if (crossHaloRef.current) {
        crossHaloRef.current.classList.remove('animate-halo-pulse');
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", 
          once: true 
        },
        delay: 0.2
      });

      tl.fromTo('.footer-cross', 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'back.out(1.7)',
          onComplete: () => {
            if (crossHaloRef.current) {
              crossHaloRef.current.classList.add('animate-halo-pulse');
            }
          }
        }
      )
      .to('.v-char', {
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        duration: 0.1
      }, "-=0.2")
      .fromTo('.footer-verse-ref',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo('.footer-fade-up',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
        "-=0.3"
      );

    }, footerRef);

    return () => ctx.revert(); 
  }, [location.pathname]); // <-- O SEGREDO: A animação refaz-se sempre que a rota muda!

  return (
    <Box component="footer" ref={footerRef} className="bg-[#050505] pt-32 pb-10 relative border-t border-white/5 overflow-hidden flex flex-col items-center">
      
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-75 md:w-150 h-75 bg-[#d4af37]/10 blur-[120px] pointer-events-none rounded-full"></div>

      <Container maxWidth="md" className="relative z-10 flex flex-col items-center text-center">
        
        <div className="mb-10 relative footer-cross-container flex items-center justify-center">
           <div ref={crossHaloRef} className="absolute w-12 h-12 border-2 border-[#d4af37] rounded-full opacity-0 pointer-events-none"></div>
           <Typography variant="h1" className="footer-cross text-[#d4af37] font-serif filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] relative z-10" sx={{ fontSize: '3rem' }}>
             ✟
           </Typography>
        </div>
        
        <Typography variant="h4" className="text-white font-serif italic leading-relaxed mb-6 px-4 footer-verse" sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
          {splitTextIntoSpans(verseText)}
        </Typography>
        
        <Typography variant="subtitle2" className="footer-verse-ref text-[#d4af37] font-sans tracking-[0.3em] uppercase text-xs mb-20 opacity-0">
          Salmos 133:1
        </Typography>

        <div className="footer-fade-up w-full max-w-sm h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-5 mt-1 opacity-0"></div>

        <Typography variant="h6" className="footer-fade-up font-serif text-white tracking-[0.4em] uppercase mb-8 opacity-0 relative">
          Redes Sociais
        </Typography>

        <div className="footer-fade-up flex gap-9  mt-1 opacity-0">
          <a href="https://www.instagram.com/cekoinonia" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#d4af37] duration-300 transition-transform hover:scale-[1.4]">
            <InstagramIcon fontSize="large" />
          </a>
          <a href="https://www.youtube.com/@cekoinonia1522/live" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#d4af37] duration-300 transition-transform hover:scale-[1.4]">
            <YouTubeIcon fontSize="large" />
          </a>
          <a href="https://www.facebook.com/cekoinoniacultos" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#d4af37] duration-300 transition-transform hover:scale-[1.4]">
            <FacebookIcon fontSize="large" />
          </a>
        </div>

        <div className="footer-fade-up w-full flex flex-col items-center gap-3 pt-8 border-t border-white/5 opacity-0 mt-8">
          <Typography variant="caption" className="text-gray-600 font-sans tracking-[0.2em] text-[9px] uppercase text-center">
            © {new Date().getFullYear()} COMUNIDADE EVANGÉLICA KOINONIA. TODOS OS DIREITOS RESERVADOS.
          </Typography>
          <Typography variant="caption" className="text-gray-600 font-sans tracking-[0.2em] text-[9px] uppercase flex items-center gap-1">
            Feito por: <a href="https://viniciusmonteiro.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-white transition-colors duration-300 font-bold">V.Monteiro</a>
          </Typography>
        </div>

      </Container>

      <style>{`
        @keyframes haloPulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .animate-halo-pulse {
          animation: haloPulse 2s infinite ease-out;
        }
      `}</style>
    </Box>
  );
};

export default Footer;