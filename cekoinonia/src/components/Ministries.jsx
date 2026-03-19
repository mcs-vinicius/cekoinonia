import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';

const Ministries = () => {
  // Estado para controlar qual categoria está ativa no momento
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Categorias disponíveis para o filtro
  const filters = ['Todos', 'Louvor', 'Jovens', 'Infantil', 'Ação Social'];

  // Dados dos ministérios (com imagens de exemplo do Unsplash)
  const ministriesData = [
    {
      id: 1,
      title: 'Ministério de Louvor',
      category: 'Louvor',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Grupo de Jovens',
      category: 'Jovens',
      image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Escola Dominical Infantil',
      category: 'Infantil',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Coral da Igreja',
      category: 'Louvor',
      image: 'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Distribuição de Alimentos',
      category: 'Ação Social',
      image: 'https://images.unsplash.com/photo-1593113563332-61426425d6fb?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Retiro de Jovens',
      category: 'Jovens',
      image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop'
    }
  ];

  // Filtra os dados com base na categoria selecionada
  const filteredMinistries = activeFilter === 'Todos' 
    ? ministriesData 
    : ministriesData.filter(item => item.category === activeFilter);

  return (
    <Box className="bg-church-dark py-24 relative">
      <Container maxWidth="lg">
        
        {/* Cabeçalho da Secção */}
        <Box className="text-center mb-16 px-4">
          <Typography 
            variant="h3" 
            className="text-church-gold font-serif mb-6"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
          >
            Nossos Ministérios
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-300 font-sans tracking-widest mb-6 max-w-2xl mx-auto"
            sx={{ fontSize: { xs: '13px', md: '14px' }, lineHeight: 1.8 }}
          >
            Encontre o seu propósito servindo na casa de Deus. Temos vários grupos e atividades 
            desenhados para edificar a sua vida e abençoar a comunidade.
          </Typography>
          <div className="w-16 h-px bg-church-gold opacity-50 mx-auto mb-12"></div>
          
          {/* Botões de Filtro */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 pb-1 border-b-2 ${
                  activeFilter === filter 
                    ? 'text-church-gold border-church-gold' 
                    : 'text-gray-500 border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Box>

        {/* Grelha de Imagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {filteredMinistries.map((ministry) => (
            <div 
              key={ministry.id} 
              className="relative overflow-hidden group aspect-video cursor-pointer"
            >
              {/* Imagem */}
              <img 
                src={ministry.image} 
                alt={ministry.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Sobreposição Escura (Aparece no hover) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center">
                
                {/* Texto e Borda que surgem */}
                <div className="border border-church-gold/50 p-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <Typography 
                    variant="h6" 
                    className="text-church-gold font-serif mb-2"
                    sx={{ fontSize: '1.2rem' }}
                  >
                    {ministry.title}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    className="text-white font-sans tracking-[0.2em] uppercase"
                  >
                    {ministry.category}
                  </Typography>
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </Container>
    </Box>
  );
};

export default Ministries;






