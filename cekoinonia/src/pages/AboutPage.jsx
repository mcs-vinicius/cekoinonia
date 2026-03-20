import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import About from '../components/About';
import Leaders from '../components/Leaders';

const AboutPage = () => {
  return (
    <div className="bg-[#050505] min-h-screen">
      
      {/* =====================================================================
          1. BANNER DE TOPO DA PÁGINA (Cinematográfico)
          ===================================================================== */}
      <Box className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Fundo de Imagem Escurecido */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1920&auto=format&fit=crop)' }}
        ></div>
        
        {/* Degradê para fundir a imagem com o fundo preto do site */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/70 to-transparent"></div>
        
        {/* Conteúdo do Banner */}
        <div className="relative z-10 text-center px-4 mt-20 animate-fade-in">
          <Typography variant="h6" className="text-church-gold tracking-[0.4em] font-serif mb-4 uppercase text-sm">
            A Nossa Essência
          </Typography>
          <Typography variant="h2" className="text-white font-serif tracking-widest uppercase mb-6" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' } }}>
            Quem <span className="text-church-gold italic">Somos</span>
          </Typography>
          <div className="w-24 h-px bg-church-gold opacity-50 mx-auto"></div>
        </div>
      </Box>

      {/* =====================================================================
          2. SECÇÃO DE HISTÓRIA (Conteúdo Exclusivo desta Página)
          ===================================================================== */}
      <Box className="py-24 relative border-b border-white/5">
        <Container maxWidth="md">
          
          <Box className="text-center mb-16">
            <span className="text-church-gold text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">✟</span>
          </Box>

          <Typography variant="body1" className="text-gray-300 font-sans leading-loose text-justify md:text-center text-[15px] mb-8">
            A Igreja Evangélica Koinonia nasceu de um sonho colocado por Deus no coração de um pequeno grupo de irmãos que se reuniam em casas para orar e estudar a Palavra. O que começou como uma simples reunião de oração, rapidamente se transformou numa comunidade vibrante, unida pelo desejo de viver o verdadeiro sentido da palavra grega <em className="text-church-gold">Koinonia</em>: comunhão, partilha e vida em comum.
          </Typography>
          
          <Typography variant="body1" className="text-gray-300 font-sans leading-loose text-justify md:text-center text-[15px] mb-20">
            Ao longo dos anos, enfrentámos desafios e celebramos vitórias, mas a nossa essência nunca mudou. Continuamos a ser uma igreja centrada em Cristo, apaixonada pelas Escrituras e dedicada a amar o próximo. A nossa missão é ser um farol de esperança na cidade, um lugar onde os feridos encontram cura, os perdidos encontram direção, e todos encontram uma verdadeira família.
          </Typography>

          
        </Container>
      </Box>

      {/* =====================================================================
          3. OS COMPONENTES ORIGINAIS
          ===================================================================== */}
       {/* A secção da Liderança que preparamos e afinamos */}
      <Leaders />
      
      {/* O componente "About" servirá aqui como uma extensão da cultura da igreja */}
      <About />
      
     

    </div>
  );
};

export default AboutPage;