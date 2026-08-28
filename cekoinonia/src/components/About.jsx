import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ChurchOutlinedIcon from '@mui/icons-material/ChurchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ bare = false }) => {
  const sectionRef = useRef(null);

  const cardsData = [
    {
      icon: <ChurchOutlinedIcon sx={{ fontSize: 45, color: 'var(--color-church-gold)', strokeWidth: 1 }} />,
      title: 'A NOSSA VISÃO', // Alterado de QUEM SOMOS para evitar repetição
      text: 'Enxergar uma comunidade unida e fortalecida, onde cada pessoa descobre o seu propósito e vive plenamente a fé no seu dia a dia.',
      buttonText: 'LER MAIS'
    },
    {
      icon: <FavoriteBorderOutlinedIcon sx={{ fontSize: 45, color: 'var(--color-church-gold)', strokeWidth: 1 }} />,
      title: 'A NOSSA MISSÃO',
      text: 'Levar a palavra de Deus aos corações, transformar vidas através do Evangelho e servir ativamente a comunidade com dedicação, amor e muita compaixão.',
      buttonText: 'LER MAIS'
    },
    {
      icon: <MenuBookOutlinedIcon sx={{ fontSize: 45, color: 'var(--color-church-gold)', strokeWidth: 1 }} />,
      title: 'A PALAVRA',
      text: 'Acreditamos na Bíblia como a verdadeira palavra de Deus. O nosso ensino é centrado nas Escrituras para guiar e iluminar o caminho de todos os fiéis.',
      buttonText: 'LER MAIS'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          // Entra ao descer e sai ao subir, como os tempos da cena — sem isto o
          // padrão é `play none none none` e o bloco toca uma vez só.
          toggleActions: 'play none none reverse'
        }
      });

      // Animação do Título da Secção
      tl.fromTo('.about-header-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      )
      // Animação dos Cartões
      .fromTo('.about-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} className={bare ? 'relative' : 'bg-church-stone py-32 relative'}>
      <Container maxWidth="lg">
        
        {/* Cabeçalho da Secção */}
        <Box className="text-center mb-24 max-w-4xl mx-auto px-4">
          <Typography
            variant="h3"
            className="about-header-item text-church-gold font-display mb-6 opacity-0"
            sx={{ fontSize: { xs: '2.5rem', md: '3.6rem' } }}
          >
            Nossos Pilares
          </Typography>
          {/* Era uma frase inteira em caixa alta com tracking de 0.15em — bonita de
              longe, quase impossível de ler de perto. Caixa mista devolve a leitura. */}
          <Typography
            variant="body1"
            className="about-header-item text-church-parchment/75 font-sans font-light opacity-0"
            sx={{
              fontSize: { xs: '15px', md: '17px' },
              lineHeight: 1.95
            }}
          >
            A Igreja Evangélica Koinonia é um lugar de adoração, comunhão e ensino da Palavra.
            Nosso desejo é que você se sinta em casa, amado por Deus e acolhido por nós numa verdadeira família de fé.
          </Typography>
        </Box>

        {/* Grelha de 3 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 px-4">
          {cardsData.map((card, index) => (
            <div key={index} className="about-card opacity-0 flex flex-col items-center text-center">
              
              {/* Ícone */}
              <div className="mb-6">
                {card.icon}
              </div>
              
              {/* Título do Cartão */}
              <Typography 
                variant="h6" 
                className="text-white font-serif tracking-widest uppercase mb-4"
                sx={{ fontSize: '1.1rem' }}
              >
                {card.title}
              </Typography>
              
              {/* Linha Divisória Dourada */}
              <div className="w-12 h-px bg-church-gold opacity-50 mb-6"></div>
              
              {/* Texto Descritivo */}
              <Typography 
                variant="body2" 
                className="text-church-parchment/70 font-sans mb-10"
                sx={{ 
                  fontSize: '13px', 
                  lineHeight: 1.8,
                  maxWidth: '85%' 
                }}
              >
                {card.text}
              </Typography>
              
              {/* Botão Delineado Minimalista */}
              <button 
                className="border border-church-gold/50 text-church-gold px-8 py-3 
                           font-sans text-[11px] tracking-[0.2em] uppercase 
                           hover:bg-church-gold hover:text-church-dark 
                           transition-all duration-300"
              >
                {card.buttonText}
              </button>

            </div>
          ))}
        </div>

      </Container>
    </Box>
  );
};

export default About;