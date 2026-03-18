import React from 'react';
import { Box, Container, Typography } from '@mui/material';

// Vamos reutilizar os componentes que já criámos!
import About from '../components/About';
import Leaders from '../components/Leaders';

const AboutPage = () => {
  return (
    <Box className="bg-church-dark min-h-screen">
      
      {/* 1. Banner de Topo da Página */}
      <div 
        className="relative pt-40 pb-32 bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548625361-ec85d88f8d55?q=80&w=2000&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        
        <Box className="relative z-10 text-center px-4 max-w-3xl mt-10">
          <Typography 
            variant="h2" 
            className="text-white font-serif tracking-widest uppercase mb-6"
            sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            Sobre Nós
          </Typography>
          <div className="w-24 h-px bg-church-gold opacity-70 mx-auto"></div>
        </Box>
      </div>

      {/* 2. Secção de História (Conteúdo Exclusivo desta página) */}
      <Box className="py-24 border-b border-white/5">
        <Container maxWidth="md" className="text-center">
          <Typography variant="h4" className="text-church-gold font-serif mb-8">
            A Nossa História
          </Typography>
          <Typography variant="body1" className="text-gray-300 font-sans leading-relaxed mb-6 tracking-wide">
            Fundada com o propósito de ser um farol de esperança na cidade, a Igreja Evangélica Koinonia começou como um pequeno grupo de oração. Ao longo dos anos, pela graça de Deus, crescemos e tornámo-nos numa comunidade vibrante, focada no ensino profundo da Palavra e no amor prático ao próximo.
          </Typography>
          <Typography variant="body1" className="text-gray-300 font-sans leading-relaxed tracking-wide">
            Acreditamos que a igreja não é apenas um edifício onde nos reunimos ao domingo, mas sim um corpo vivo. Cada membro é uma peça vital da nossa missão: partilhar as boas novas do evangelho, transformar vidas e servir a nossa comunidade através do poder de Jesus Cristo.
          </Typography>
        </Container>
      </Box>

      {/* 3. Reutilizamos a secção dos 3 cartões */}
      <About />

      {/* 4. Reutilizamos a secção de Líderes */}
      <Leaders />

    </Box>
  );
};

export default AboutPage;