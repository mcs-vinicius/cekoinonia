import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Dialog, DialogContent, IconButton } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Ministries = () => {
  const sectionRef = useRef(null);
  
  // A "Fechadura" mágica: Garante que a animação de filtro só rode após um CLIQUE real
  const shouldAnimateFilter = useRef(false);
  
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = ['Todos', 'Louvor', 'Jovens', 'Infantil', 'Ação Social'];

  const ministriesData = [
    { id: 1, title: 'Louvor', category: 'Louvor', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop', desc: 'Conduzindo a igreja a um ambiente de adoração.', fullDesc: 'O Ministério de Louvor Koinonia é o coração da nossa adoração musical. Mais do que tocar instrumentos ou cantar bem, o nosso objetivo é criar uma atmosfera onde a congregação possa ter um encontro real e íntimo com Deus através da música.', leader: 'Pr. António Silva', schedule: 'Ensaios: Quintas-feiras, 19:30' },
    { id: 2, title: 'Jovens', category: 'Jovens', image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop', desc: 'Uma geração apaixonada e focada no discipulado.', fullDesc: 'A juventude Koinonia é um espaço vibrante e acolhedor para jovens e adolescentes. Realizamos encontros semanais focados num estudo bíblico prático, adoração intensa e na construção de amizades que duram para a vida toda.', leader: 'Pr. Carlos Santos', schedule: 'Culto Jovem: Sábados, 20:00' },
    { id: 3, title: 'Infantil', category: 'Infantil', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop', desc: 'Semeando a Palavra no coração das crianças.', fullDesc: 'O Koinonia Kids oferece um ambiente seguro e divertido para que as crianças aprendam sobre o amor de Jesus. Utilizamos uma linguagem lúdica, currículos dinâmicos e muita criatividade para formar a próxima geração de discípulos.', leader: 'Pra. Ana Costa', schedule: 'Escola Dominical: Domingos, 09:00 e 18:00' },
    { id: 4, title: 'Coral', category: 'Louvor', image: 'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1200&auto=format&fit=crop', desc: 'Vozes unidas em harmonia para exaltar o Senhor.', fullDesc: 'O Coral da Igreja Evangélica Koinonia une vozes de todas as idades para louvar a Deus através de hinos clássicos e arranjos contemporâneos. Uma verdadeira celebração de harmonia e unidade vocal no corpo de Cristo.', leader: 'Maestro João Mendes', schedule: 'Ensaios: Terças-feiras, 20:00' },
    { id: 5, title: 'Ação Social', category: 'Ação Social', image: 'https://images.unsplash.com/photo-1593113563332-61426425d6fb?q=80&w=1200&auto=format&fit=crop', desc: 'Amor em ação apoiando a comunidade local.', fullDesc: 'Fé sem obras é morta. Este ministério leva o amor prático de Jesus às ruas, através da distribuição de cestas básicas, visitas a asilos e hospitais, e apoio a famílias em situação de vulnerabilidade na nossa cidade.', leader: 'Diácono Paulo Sousa', schedule: 'Ações de Rua: 2º Sábado do Mês, 15:00' }
  ];

  const filteredMinistries = activeFilter === 'Todos' 
    ? ministriesData 
    : ministriesData.filter(item => item.category === activeFilter);

  // ==============================================================================
  // 1. GSAP: SEQUÊNCIA RIGOROSA DE ENTRADA NA PÁGINA (Acontece 1 única vez)
  // ==============================================================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 70%",
          once: true // Para nunca repetir ao subir a página
        } 
      });
      
      // Passo 1: A Navbar entra primeiro
      tl.fromTo('.min-filter', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      // Passo 2: Os cartões (que estão invisíveis) entram APENAS APÓS a Navbar
      .fromTo('.accordion-item', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5,
          stagger: 0.25,
          ease: 'power3.out'
        }, 
        "+=0.2" // O delay vital que os obriga a esperar
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ==============================================================================
  // 2. GSAP: ANIMAÇÃO APENAS QUANDO CLICA NAS ABAS
  // ==============================================================================
  useEffect(() => {
    // Se a "fechadura" estiver trancada (carregamento inicial da página), não faz nada!
    if (!shouldAnimateFilter.current) return;

    gsap.fromTo('.accordion-item', 
      { opacity: 0, scale: 0.98 }, 
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: 'power3.out'
        // Sem "clearProps" para manter a estabilidade do hover
      }
    );
    
    // Tranca a fechadura de novo após a animação
    shouldAnimateFilter.current = false;
  }, [activeFilter]);

  // Função para controlar os cliques reais nas abas
  const handleFilterClick = (filter) => {
    if (filter !== activeFilter) {
      shouldAnimateFilter.current = true; // Destranca a animação
      setActiveFilter(filter); // Muda a aba
    }
  };

  const handleOpenModal = (ministry) => {
    setSelectedMinistry(ministry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box ref={sectionRef} className="bg-[#050505] pb-32 pt-10 relative overflow-hidden flex flex-col justify-center">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#d4af37]/5 blur-[150px] pointer-events-none rounded-full z-0"></div>

      <Container maxWidth="xl" className="relative z-10">
        
        <Box className="text-center mb-16 px-4 min-filter opacity-0">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-full w-max mx-auto max-w-full shadow-2xl relative z-20">
            {filters.map((filter) => (
              <button
                key={filter}
                // Usando a nossa função customizada ao invés de setActiveFilter direto
                onClick={() => handleFilterClick(filter)}
                className={`font-sans text-[10px] md:text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-[#d4af37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Box>

        <div className="accordion-container w-full h-[65vh] md:h-[70vh] flex flex-col md:flex-row gap-2 px-2 md:px-0">
          
          {filteredMinistries.map((ministry) => (
            <div 
              key={ministry.id} 
              // OPACITY-0: Garante que estão escondidos ao iniciar a página!
              className="accordion-item opacity-0 group relative overflow-hidden rounded-sm cursor-pointer flex-1 hover:flex-4 border border-white/5 hover:border-[#d4af37]/50"
              onClick={() => handleOpenModal(ministry)}
              // O bloqueio de transição CSS (para não sumir ao passar o rato)
              style={{
                transitionProperty: 'flex-grow, flex-basis, border-color, background-color',
                transitionDuration: '700ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              <div className="absolute inset-0 bg-cover bg-center filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" style={{ backgroundImage: `url(${ministry.image})` }}></div>
              <div className="absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <Typography variant="h5" className="text-white font-serif tracking-widest uppercase whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180 drop-shadow-2xl" sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
                  {ministry.title}
                </Typography>
              </div>

              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end items-start opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-8 group-hover:translate-y-0">
                <Typography variant="caption" className="bg-[#d4af37]/20 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] font-sans tracking-[0.2em] uppercase px-3 py-1 rounded-sm text-[8px] mb-4">
                  {ministry.category}
                </Typography>
                <Typography variant="h3" sx={{ color: 'white' }} className="font-serif tracking-widest uppercase mb-4 leading-none drop-shadow-lg" style={{ fontSize: '2.5rem' }}>
                  {ministry.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#d1d5db' }} className="font-sans leading-relaxed max-w-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                  {ministry.desc}
                </Typography>
                <button className="flex items-center gap-3 text-white group/btn">
                  <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-[#d4af37] group-hover/btn:border-[#d4af37] transition-all duration-300">
                    <ArrowOutwardIcon sx={{ fontSize: 18 }} className="group-hover/btn:text-black transition-colors" />
                  </span>
                  <Typography variant="overline" className="font-sans tracking-widest text-[10px] uppercase font-bold group-hover/btn:text-[#d4af37] transition-colors">
                    Saber Mais
                  </Typography>
                </button>
              </div>
            </div>
          ))}
          
        </div>
      </Container>

      {/* MODAL DETALHES */}
      {selectedMinistry && (
        <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth PaperProps={{ sx: { backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.7)', p: 0 } }}>
          <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', right: 16, top: 16, color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#d4af37' }, zIndex: 1300 }} ><CloseIcon /></IconButton>
          <DialogContent className="p-0 overflow-hidden" sx={{ backgroundColor: '#050505' }}>
            <div className="flex flex-col md:flex-row w-full relative z-10" style={{ minHeight: '450px' }}>
              <div className="w-full md:w-5/12 relative shrink-0" style={{ minHeight: '300px' }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedMinistry.image})` }} ></div>
                <div className="absolute inset-0 bg-linear-to-t from-[#050505] to-transparent md:hidden"></div>
                <div className="absolute top-6 left-6 bg-[#050505]/60 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] font-sans tracking-[0.2em] uppercase px-3 py-1 rounded-sm text-[9px]">
                  {selectedMinistry.category}
                </div>
              </div>
              <div className="w-full md:w-7/12 p-10 md:p-14 flex flex-col justify-center items-start">
                <Typography variant="h3" sx={{ color: 'white' }} className="font-serif uppercase tracking-widest mb-6 leading-tight" style={{ fontSize: '2rem' }}>
                  {selectedMinistry.title}
                </Typography>
                <div className="w-16 h-px bg-[#d4af37]/50 mb-8"></div>
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex items-start gap-4 mb-2">
                    <InfoOutlinedIcon sx={{ fontSize: 22, color: '#d4af37' }} />
                    <Box>
                      <Typography variant="overline" sx={{ color: '#d4af37', lineHeight: 1 }} className="font-sans tracking-widest text-[10px] uppercase font-bold block mb-1">Sobre o Ministério</Typography>
                      <Typography variant="body2" sx={{ color: '#d1d5db' }} className="font-sans text-[13px] leading-relaxed max-w-sm">{selectedMinistry.fullDesc}</Typography>
                    </Box>
                  </div>
                  <div className="flex items-center gap-4">
                    <PersonOutlineIcon sx={{ fontSize: 22, color: '#d4af37' }} />
                    <Box>
                      <Typography variant="overline" sx={{ color: '#d4af37', lineHeight: 1 }} className="font-sans tracking-widest text-[10px] uppercase font-bold block mb-1">Liderança</Typography>
                      <Typography variant="body2" sx={{ color: '#d1d5db' }} className="font-sans text-[13px]">{selectedMinistry.leader}</Typography>
                    </Box>
                  </div>
                  <div className="flex items-center gap-4">
                    <AccessTimeIcon sx={{ fontSize: 22, color: '#d4af37' }} />
                    <Box>
                      <Typography variant="overline" sx={{ color: '#d4af37', lineHeight: 1 }} className="font-sans tracking-widest text-[10px] uppercase font-bold block mb-1">Encontros</Typography>
                      <Typography variant="body2" sx={{ color: '#d1d5db' }} className="font-sans text-[13px]">{selectedMinistry.schedule}</Typography>
                    </Box>
                  </div>
                </div>
                <button className="mt-10 px-8 py-3 bg-[#d4af37] hover:bg-white text-black transition-colors duration-300 font-sans tracking-[0.2em] uppercase text-[10px] font-bold shadow-lg">Quero Fazer Parte</button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Ministries;