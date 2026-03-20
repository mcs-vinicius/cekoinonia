import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const crossHaloRef = useRef(null); // Ref para a aura pulsante

  // O Texto do Versículo para processamento
  const verseText = "Oh! quão bom e quão suave é que os irmãos vivam em união.";

  // Função auxiliar para dividir o texto em spans (para o efeito typewriter)
  const splitTextIntoSpans = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="v-char opacity-0 inline-block">
        {char === " " ? "\u00A0" : char} {/* Trata espaços vazios */}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%", // Aqui podemos deixar 75% por ser o fim da página
          once: true 
        },
        delay: 0.4 // NOVO: Atraso de quase meio segundo para o clímax da animação
      });

      // 1. ANIMAÇÃO DA CRUZ (Cresce de um pontinho)
      tl.fromTo('.footer-cross', 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'back.out(1.7)', // Efeito elástico ao final
          onComplete: () => {
            // Quando a cruz termina de crescer, ativa o pulsar da aura (CSS)
            if (crossHaloRef.current) {
              crossHaloRef.current.classList.add('animate-halo-pulse');
            }
          }
        }
      )
      
      // 2. ANIMAÇÃO TYPEWRITER (Versículo)
      .to('.v-char', {
        opacity: 1,
        stagger: 0.04, // Velocidade de "digitação" (atraso entre letras)
        ease: 'none',
        duration: 0.1
      }, "-=0.2") // Começa um pouco antes da cruz terminar

      // Animação da Referência (Fade-in simples)
      .fromTo('.footer-verse-ref',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )

      // 3. ANIMAÇÃO FADE-UP (Redes Sociais, Títulos e Créditos)
      .fromTo('.footer-fade-up',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2, // Cascata suave entre os elementos
          ease: 'power3.out' 
        },
        "-=0.3" // Começa logo após a referência
      );

    }, footerRef);

    return () => ctx.revert(); // Limpeza
  }, []);

  return (
    <Box component="footer" ref={footerRef} className="bg-[#050505] pt-32 pb-10 relative border-t border-white/5 overflow-hidden flex flex-col items-center">
      
      {/* Luz Dourada de Fundo Centralizada (Efeito Halo Estático de Fundo) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-75 md:w-150 h-75 bg-church-gold/10 blur-[120px] pointer-events-none rounded-full"></div>

      <Container maxWidth="md" className="relative z-10 flex flex-col items-center text-center">
        
        {/* Símbolo / Cruz Superior (Com Aura Pulsante) */}
        <div className="mb-10 relative footer-cross-container flex items-center justify-center">
           {/* AURA PULSANTE (Ativada via GSAP onComplete) */}
           <div ref={crossHaloRef} className="absolute w-12 h-12 border-2 border-church-gold rounded-full opacity-0 pointer-events-none"></div>
           
           {/* A Cruz */}
           <Typography variant="h1" className="footer-cross text-church-gold font-serif filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] relative z-10" sx={{ fontSize: '3rem' }}>
             ✟
           </Typography>
        </div>
        
        {/* A Palavra Central (Efeito Typewriter aplicado aqui) */}
        <Typography variant="h4" className="text-white font-serif italic leading-relaxed mb-6 px-4 footer-verse" sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
          {splitTextIntoSpans(verseText)}
        </Typography>
        
        <Typography variant="subtitle2" className="footer-verse-ref text-church-gold font-sans tracking-[0.3em] uppercase text-xs mb-20 opacity-0">
          Salmos 133:1
        </Typography>

        {/* Linha Fina Separadora */}
        <div className="footer-fade-up w-full max-w-sm h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-5 mt-1 opacity-0"></div>

        {/* Título Redes Sociais */}
        <Typography variant="h6" className="footer-fade-up font-serif text-white tracking-[0.4em] uppercase mb-8 opacity-0 relative">
          Redes Sociais
        </Typography>

        {/* Redes Sociais Ícones */}
        <div className="footer-fade-up flex gap-9  mt-1 opacity-0">
          <a 
            href="https://www.instagram.com/cekoinonia" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-church-gold duration-300 transition-transform hover:scale-[1.4]"
          >
            <InstagramIcon fontSize="large" />
          </a>
          <a 
            href="https://www.youtube.com/@cekoinonia1522/live" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-church-gold duration-300 transition-transform hover:scale-[1.4]"
          >
            <YouTubeIcon fontSize="large" />
          </a>
          <a 
            href="https://www.facebook.com/cekoinoniacultos" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-church-gold duration-300 transition-transform hover:scale-[1.4]"
          >
            <FacebookIcon fontSize="large" />
          </a>
        </div>

        {/* Rodapé Final & Assinatura (Agrupados para Fade Up) */}
        <div className="footer-fade-up w-full flex flex-col items-center gap-3 pt-8 border-t border-white/5 opacity-0 mt-8">
          <Typography variant="caption" className="text-gray-600 font-sans tracking-[0.2em] text-[9px] uppercase text-center">
            © {new Date().getFullYear()} COMUNIDADE EVANGÉLICA KOINONIA. TODOS OS DIREITOS RESERVADOS.
          </Typography>
          
          <Typography variant="caption" className="text-gray-600 font-sans tracking-[0.2em] text-[9px] uppercase flex items-center gap-1">
            Feito por: 
            <a 
              href="https://viniciusmonteiro.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-church-gold hover:text-white transition-colors duration-300 font-bold"
            >
              V.Monteiro
            </a>
          </Typography>
        </div>

      </Container>

      {/* Estilos CSS Inline para a animação do Halo Pulsante (Efeito Sonar) */}
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