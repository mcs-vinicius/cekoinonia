import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const OnlineGiving = () => {
  return (
    <Box 
      className="relative py-32 bg-fixed bg-center bg-cover flex items-center justify-center"
      // Imagem de fundo temporária (pode substituir por uma foto do altar ou momento de louvor da vossa igreja)
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2069&auto=format&fit=crop')" }}
    >
      {/* Filtro escuro para garantir que o texto seja legível */}
      <div className="absolute inset-0 bg-black/85"></div>

      <Container maxWidth="md" className="relative z-10 text-center px-4">
        
        {/* Título */}
        <Typography 
          variant="h3" 
          className="text-church-gold font-serif mb-6"
          sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
        >
          Doações Online
        </Typography>
        
        {/* Linha Divisória Dourada */}
        <div className="w-16 h-px bg-church-gold opacity-50 mx-auto mb-8"></div>
        
        {/* Texto Inspiracional */}
        <Typography 
          variant="body1" 
          className="text-gray-300 font-sans tracking-wide mb-12"
          sx={{ 
            fontSize: { xs: '13px', md: '15px' },
            lineHeight: 2.2 
          }}
        >
          "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." — 2 Coríntios 9:7.<br/><br/>
          A sua generosidade permite-nos continuar a nossa missão, apoiar os projetos sociais da comunidade e expandir o Reino de Deus. Faça a sua contribuição de forma rápida e segura.
        </Typography>
        
        {/* Botão de Ação Destacado */}
        <button 
          className="bg-church-gold text-church-dark px-10 py-4 
                     font-sans text-[12px] tracking-[0.2em] uppercase font-bold
                     hover:bg-white hover:text-church-dark 
                     transition-all duration-300"
        >
          Doar Agora
        </button>

      </Container>
    </Box>
  );
};

export default OnlineGiving;