import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Ministries from '../components/Ministries';

const MinistriesPage = () => {
  return (
    <Box className="bg-church-dark min-h-screen pt-32">
      <Container maxWidth="lg" className="text-center mb-8">
         <Typography variant="h2" className="text-white font-serif tracking-widest uppercase mb-6" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Comunidade
         </Typography>
         <div className="w-24 h-px bg-church-gold opacity-70 mx-auto mb-8"></div>
         <Typography variant="body1" className="text-gray-300 font-sans tracking-wide max-w-2xl mx-auto">
            Descubra o seu lugar no corpo de Cristo. Cada ministério é uma oportunidade de servir, crescer e transformar vidas com o amor prático de Deus.
         </Typography>
      </Container>
      
      {/* O componente que contém os cartões e a paginação entra aqui */}
      <Ministries />
    </Box>
  );
};

export default MinistriesPage;