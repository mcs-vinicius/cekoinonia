import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const News = () => {
  const newsData = [
    {
      dateDay: '22',
      dateMonth: 'OUT',
      title: 'Culto Especial de Ação de Graças',
      excerpt: 'Junte-se a nós para uma noite inesquecível de louvor e adoração para agradecer a Deus por todas as bênçãos deste ano. Teremos a participação especial do coral.',
      image: 'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=800&auto=format&fit=crop',
      isVideo: false
    },
    {
      dateDay: '15',
      dateMonth: 'OUT',
      title: 'Seminário de Casais: Construindo sobre a Rocha',
      excerpt: 'Um fim de semana dedicado ao fortalecimento do matrimônio com palestras, dinâmicas e momentos de comunhão para casais de todas as idades.',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop',
      isVideo: true 
    }
  ];

  return (
    <Box className="bg-church-dark py-24 relative">
      <Container maxWidth="md">
        
        <Box className="text-center mb-20">
          <Typography 
            variant="h3" 
            className="text-church-gold font-serif mb-6"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
          >
            Últimas Notícias
          </Typography>
          <div className="w-16 h-px bg-church-gold opacity-50 mx-auto"></div>
        </Box>

        <div className="flex flex-col gap-16">
          {newsData.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group">
              
              {/* Bloco da Data com a correção min-w-20 */}
              <div className="flex flex-col items-center justify-center min-w-20 pt-2">
                <Typography variant="h3" className="text-church-gold font-serif leading-none">
                  {item.dateDay}
                </Typography>
                <Typography variant="caption" className="text-gray-400 font-sans tracking-widest uppercase mt-2">
                  {item.dateMonth}
                </Typography>
              </div>

              <div className="hidden md:block w-px bg-church-gold/20 self-stretch"></div>

              <div className="flex flex-col sm:flex-row gap-6 w-full">
                
                <div className="w-full sm:w-2/5 aspect-video overflow-hidden relative cursor-pointer">
                   <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                   
                   {item.isVideo && (
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/20">
                        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                          {/* Triângulo com a correção border-l-10 */}
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-10 border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                     </div>
                   )}
                </div>

                <div className="w-full sm:w-3/5 flex flex-col justify-center">
                  <Typography variant="h6" className="text-white font-serif mb-3 transition-colors group-hover:text-church-gold cursor-pointer" sx={{ fontSize: '1.2rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400 font-sans leading-relaxed mb-6" sx={{ fontSize: '13px' }}>
                    {item.excerpt}
                  </Typography>
                  
                  <button className="self-start text-church-gold font-sans text-[11px] tracking-widest uppercase border-b border-church-gold/30 hover:border-church-gold pb-1 transition-colors">
                    Ler Mais
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
           <button className="border border-church-gold/50 text-church-gold px-8 py-3 font-sans text-[11px] tracking-widest uppercase hover:bg-church-gold hover:text-church-dark transition-all duration-300">
              Ver Todas as Notícias
           </button>
        </div>

      </Container>
    </Box>
  );
};

export default News;