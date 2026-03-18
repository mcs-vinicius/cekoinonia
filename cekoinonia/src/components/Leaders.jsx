import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Leaders = () => {
  // Dados fictícios para a equipa de liderança. 
  // Pode substituir os links das imagens e os textos mais tarde.
  const leadersData = [
    {
      name: 'Pr. Marcos Silva',
      role: 'PASTOR SÉNIOR',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Pr. Tiago Mendes',
      role: 'PASTOR AUXILIAR',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'Ana Rodrigues',
      role: 'MINISTÉRIO DE LOUVOR',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: 'João Pedro',
      role: 'LÍDER DE JOVENS',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <Box className="bg-church-dark">
      
      {/* 1. BANNER DE TRANSIÇÃO (Parallax) */}
      <div 
        className="relative py-24 bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=2000&auto=format&fit=crop')" }}
      >
        {/* Filtro escuro sobre a imagem */}
        <div className="absolute inset-0 bg-black/80"></div>
        
        <Box className="relative z-10 text-center px-4 max-w-3xl">
          <Typography 
            variant="h4" 
            className="text-white font-serif tracking-wider uppercase mb-4"
          >
            A Fé Vem Pelo Ouvir
          </Typography>
          <Typography 
            variant="body2" 
            className="text-church-gold font-sans tracking-[0.2em] uppercase text-xs"
          >
            Romanos 10:17
          </Typography>
        </Box>
      </div>

      {/* 2. SECÇÃO DA LIDERANÇA */}
      <Container maxWidth="lg" className="py-24">
        
        {/* Cabeçalho da Secção */}
        <Box className="text-center mb-20">
          <Typography 
            variant="h3" 
            className="text-church-gold font-serif mb-6"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
          >
            A Nossa Liderança
          </Typography>
          <div className="w-16 h-px bg-church-gold opacity-50 mx-auto"></div>
        </Box>

        {/* Grelha de Fotografias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {leadersData.map((leader, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              
              {/* Recipiente da Imagem com efeito de hover sutil */}
              <div className="overflow-hidden w-full aspect-3/4 mb-6 relative">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              
              {/* Nome */}
              <Typography 
                variant="h6" 
                className="text-white font-serif tracking-wide mb-1 transition-colors duration-300 group-hover:text-church-gold"
                sx={{ fontSize: '1.1rem' }}
              >
                {leader.name}
              </Typography>
              
              {/* Cargo */}
              <Typography 
                variant="caption" 
                className="text-church-gold font-sans tracking-[0.15em] uppercase"
                sx={{ fontSize: '10px' }}
              >
                {leader.role}
              </Typography>

            </div>
          ))}
        </div>
      </Container>
      
    </Box>
  );
};

export default Leaders;