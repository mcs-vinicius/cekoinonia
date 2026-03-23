import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Schedule = () => {
  const [activePanel, setActivePanel] = useState(1);
  const sectionRef = useRef(null);
  
  // Ref para abortar a demonstração automática se o utilizador clicar
  const userOverride = useRef(false);

  const scheduleData = [
    {
      id: 1,
      day: 'DOMINGO',
      time: '09:00 & 18:00',
      title: 'Culto da Família',
      description: 'Todo 1° Domingo: Culto de Jovens.\nTodo 2° Domingo: Culto de Ceia.\nTodo 3° e 4° Domingo: Culto da Familia.',
      image: 'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      day: 'SEGUNDA-FEIRA',
      time: '20:00',
      title: 'Reunião de Oração',
      description: 'Reunião semanal de oração e intercessão.',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      day: 'QUINTA-FEIRA',
      time: '20:00',
      title: 'Culto de Estudo',
      description: 'Estudo profundo da Palavra de Deus para o crescimento espiritual e edificação da igreja.',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  useEffect(() => {
    let demoTimeouts = [];

    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Antes era "top 75%" - agora espera a secção subir mais
        },
        delay: 0.3, // NOVO: Espera 0.3 segundos antes de começar a animar
        onComplete: () => {
          if (userOverride.current) return;
          
          // Efeito de Demonstração Suave
          demoTimeouts.push(setTimeout(() => { if (!userOverride.current) setActivePanel(2); }, 2500));
          demoTimeouts.push(setTimeout(() => { if (!userOverride.current) setActivePanel(3); }, 4000));
          demoTimeouts.push(setTimeout(() => { if (!userOverride.current) setActivePanel(1); }, 7000));
        }
      });

      // 1. Título Menor (Programe-se)
      tl.fromTo('.schedule-subtitle', 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      
      // 2. Palavras Principais
      .fromTo('.schedule-word-left', 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
        "-=0.5"
      )
      .fromTo('.schedule-word-right', 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
        "-=1"
      )
      
      // 3. Cartões (fromTo é mais seguro no React para evitar que fiquem invisíveis)
      .fromTo('.schedule-card', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, 
        "-=0.5"
      );

    }, sectionRef);

    // Limpeza para evitar vazamento de memória e conflitos
    return () => {
      ctx.revert();
      demoTimeouts.forEach(clearTimeout);
    };
  }, []);

  const handleManualClick = (id) => {
    userOverride.current = true;
    setActivePanel(id);
  };

  return (
    <Box ref={sectionRef} className="bg-[#050505] flex flex-col justify-center py-32 relative border-t border-white/5 overflow-hidden">
      <Container maxWidth="xl" className="w-full">
        
        <Box className="text-center mb-10 md:mb-16 relative z-10 schedule-title-container overflow-hidden py-4">
          <Typography variant="h6" className="schedule-subtitle inline-block text-church-gold tracking-[0.4em] font-serif mb-4 uppercase text-sm">
            Programe-se
          </Typography>
          <Typography variant="h3" className="text-white font-serif tracking-widest uppercase flex justify-center gap-4 flex-wrap" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            <span className="schedule-word-left inline-block">Nossos</span>
            <span className="text-church-gold italic schedule-word-right inline-block">Horários</span>
          </Typography>
        </Box>

        <div className="flex flex-col md:flex-row w-full h-[65vh] md:h-150 gap-2 md:gap-4 px-4 mx-auto max-w-7xl">
          {scheduleData.map((item) => {
            const isActive = activePanel === item.id;
            
            return (
              <div
                key={item.id}
                onClick={() => handleManualClick(item.id)}
                className={`schedule-card relative overflow-hidden border border-white/10 flex-none md:flex-auto cursor-pointer ${
                  isActive ? 'h-1/2 md:h-full md:w-[50%]' : 'h-1/4 md:h-full md:w-[25%]'
                }`}
                style={{
                  // SOLUÇÃO DO CONFLITO: Bloqueamos o CSS para animar APENAS a largura e a altura.
                  // Assim o GSAP tem liberdade total sobre a transparência e a posição de entrada!
                  transitionProperty: 'width, height, flex-grow, flex-basis',
                  transitionDuration: '900ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Imagem de Fundo Dinâmica */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${isActive ? 'scale-105 filter grayscale-50' : 'filter grayscale opacity-50'}`}
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                
                <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/80 to-black/30 pointer-events-none"></div>

                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none">
                  <div className="flex items-center gap-3 md:gap-4 mb-2">
                    <AccessTimeOutlinedIcon className={isActive ? 'text-church-gold' : 'text-white/50'} />
                    <Typography variant="h4" className="text-white font-serif tracking-widest drop-shadow-lg" sx={{ fontSize: { xs: '1.5rem', md: '2.1rem' } }}>
                      {item.time}
                    </Typography>
                  </div>
                  
                  <Typography variant="subtitle2" className="text-church-gold font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4">
                    {item.day}
                  </Typography>

                  <div 
                    className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
                  >
                    <div className="w-12 h-px bg-white/30 mb-4"></div>
                    <Typography variant="h6" className="text-white font-sans tracking-[0.15em] uppercase text-xs md:text-sm mb-2 font-bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-300 font-sans leading-relaxed text-[12px] md:text-[13px] md:max-w-md">
                    {item.description.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
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