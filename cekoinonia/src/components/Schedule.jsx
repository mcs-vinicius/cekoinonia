import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Schedule = () => {
  // Lista de horários/eventos da igreja
  const scheduleData = [
    {
      day: 'Domingo',
      time: '09:00 & 18:00',
      title: 'Culto da Familia',
      description: (
        <>
          Todo 1° Domingo: Culto de Jovens.<br />
          Todo 2° Domingo: Culto de Ceia.
        </>
      ),
      highlighted: true
    },
    {
      day: 'Segunda-FEIRA',
      time: '20:00',
      title: 'Reunião de Oração',
      description: 'Reunião dedicada a oração, intercessão e estudo bíblico para fortalecer nossa fé e comunhão.',
      highlighted: false
    },
    {
      day: 'QUINTA-FEIRA',
      time: '20:00',
      title: 'Culto DE ESTUDO',
      description: 'Um encontro focado no estudo aprofundado da Bíblia, onde exploramos as Escrituras para crescer em conhecimento e fé.',
      highlighted: false
    }
  ];

  return (
    <Box className="bg-church-dark py-24 relative">
      <Container maxWidth="lg">
        
        {/* Cabeçalho da Secção */}
        <Box className="text-center mb-20 max-w-3xl mx-auto px-4">
          <Typography 
            variant="h3" 
            className="text-church-gold font-serif mb-6"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
          >
            Nossos Horários
          </Typography>
          <Typography 
            variant="body1" 
            className="text-gray-300 font-sans tracking-[0.15em] uppercase mb-6"
            sx={{ fontSize: { xs: '11px', md: '13px' }, lineHeight: 2.2 }}
          >
            Junte-se a nós semanalmente para adorar a Deus e aprender mais da Sua Palavra.
          </Typography>
          <div className="w-16 h-px bg-church-gold opacity-50 mx-auto"></div>
        </Box>

        {/* Estrutura da Timeline */}
        <div className="relative max-w-4xl mx-auto px-4">
          
          {/* A Linha Vertical Central (visível apenas em Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-church-gold/30 -translate-x-1/2"></div>

          {scheduleData.map((item, index) => {
            // Alterna os lados em ecrãs grandes (índices pares à esquerda, ímpares à direita)
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center justify-between mb-12 ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Espaço vazio para empurrar o conteúdo para o lado correto no Desktop */}
                <div className="hidden md:block w-5/12"></div>

                {/* Marcador Central (O "ponto" na linha) */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-church-gold border-4 border-church-dark -translate-x-1/2 z-10 hidden md:block"></div>

                {/* Conteúdo do Cartão */}
                <div className="w-full md:w-5/12 pl-8 md:pl-0">
                  <div 
                    className={`p-8 border transition-all duration-300 ${
                      item.highlighted 
                        ? 'bg-church-gold border-church-gold text-church-dark' 
                        : 'bg-transparent border-church-gold/20 text-white hover:border-church-gold/50'
                    }`}
                  >
                    {/* Linha com Dia e Hora */}
                    <div className="flex justify-between items-center mb-4 border-b border-current pb-2 opacity-80">
                      <Typography 
                        variant="overline" 
                        className="font-sans font-bold tracking-widest"
                      >
                        {item.day}
                      </Typography>
                      <Typography 
                        variant="overline" 
                        className="font-sans font-bold"
                      >
                        {item.time}
                      </Typography>
                    </div>
                    
                    {/* Título do Evento */}
                    <Typography 
                      variant="h6" 
                      className="font-serif tracking-wide mb-3 uppercase"
                      sx={{ fontSize: '1.1rem' }}
                    >
                      {item.title}
                    </Typography>
                    
                    {/* Descrição */}
                    <Typography 
                      variant="body2" 
                      className={`font-sans leading-relaxed ${item.highlighted ? 'text-church-dark/80' : 'text-gray-400'}`}
                      sx={{ fontSize: '13px' }}
                    >
                      {item.description}
                    </Typography>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </Box>
  );
};

export default Schedule;