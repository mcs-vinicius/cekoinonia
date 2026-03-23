import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Dialog, DialogContent, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Leaders = () => {
  const sectionRef = useRef(null);
  
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leadersData = [
    { 
      id: 1,
      name: 'Pr. António Silva', 
      role: 'Pastor Presidente', 
      instagram: '@pr.antoniosilva', 
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
      formacao: 'Doutor em Teologia (FAET), Mestre em Divindade (MTS)',
      descricao: 'Lidera a Koinonia com visão apostólica há 15 anos. É apaixonado por edificação de líderes e pela expansão do Reino de Deus através do ensino bíblico e da comunhão.'
    },
    { 
      id: 2,
      name: 'Pra. Maria Silva', 
      role: 'Pastora Vice-Presidente', 
      instagram: '@pra.mariasilva', 
      image: 'https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=600&auto=format&fit=crop',
      formacao: 'Mestre em Estudos Bíblicos (FAET), Pós-graduada em Aconselhamento',
      descricao: 'Coordenadora das Mulheres e Ministério da Família. Tem um coração voltado para a intercessão e para o cuidado de almas, dedicando-se à mentoria de mulheres e casais.'
    },
    { 
      id: 3,
      name: 'Pr. Carlos Santos', 
      role: 'Pastor de Jovens', 
      instagram: '@pr.carlossantos', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
      formacao: 'Bacharel em Teologia (FAET), Pós-graduado em Gestão de Pessoas',
      descricao: 'A liderança vibrante de jovens (Jovens Koinonia) é a sua marca. Foca no discipulado radical, na adoração genuína e na mobilização de jovens para o serviço cristão.'
    },
    { 
      id: 4,
      name: 'Pra. Ana Costa', 
      role: 'Pastora de Crianças', 
      instagram: '@pra.anacosta', 
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
      formacao: 'Mestre em Educação Cristã, Bacharel em Pedagogia',
      descricao: 'Coordenadora do Ministério Infantil (Koinonia Kids). Desenvolve currículos criativos, investe na formação de professores e tem uma paixão por ensinar a Palavra de Deus às crianças.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });

      tl.fromTo('.leaders-header-item', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' })
        .fromTo('.leaders-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, "-=0.5")
        .fromTo('.leader-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out' }, "-=0.7");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleOpenModal = (leader) => {
    setSelectedLeader(leader);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box ref={sectionRef} className="bg-[#050505] py-32 relative border-t border-white/5 overflow-hidden flex flex-col items-center">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-75 md:w-150 h-75 bg-[#d4af37]/10 blur-[120px] pointer-events-none rounded-full z-0"></div>

      <Container maxWidth="lg" className="relative z-10 flex flex-col items-center text-center">
        
        <Box className="text-center mb-20 max-w-3xl mx-auto px-4">
          <div className="leaders-header-item mb-4 opacity-0 flex items-center justify-center gap-2">
             <span className="text-[#d4af37] text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">✟</span>
             <span className="text-[#d4af37] text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">♥</span>
          </div>
          <Typography variant="h6" className="leaders-header-item text-[#d4af37] tracking-[0.4em] font-serif mb-4 uppercase text-sm opacity-0">Nossos Pastores</Typography>
          <Typography variant="h3" className="leaders-title text-white font-serif tracking-widest uppercase mb-8 opacity-0" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>Liderança <span className="text-[#d4af37] italic">Koinonia</span></Typography>
          <div className="leaders-header-item w-24 h-px bg-white/20 opacity-0 mx-auto"></div>
        </Box>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 w-full">
          {leadersData.map((leader) => (
            <div 
              key={leader.id} 
              className="leader-card group opacity-0 relative overflow-hidden rounded-sm cursor-pointer border border-white/5 hover:border-[#d4af37]/40 transition-colors duration-500 aspect-3/4"
              onClick={() => handleOpenModal(leader)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url(${leader.image})` }}
              ></div>
              
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90"></div>

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Typography variant="subtitle2" sx={{ color: '#d4af37' }} className="font-sans tracking-[0.2em] uppercase text-[9px] mb-2">
                  {leader.role}
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }} className="font-serif tracking-widest uppercase mb-4 leading-tight" style={{ fontSize: '1.2rem' }}>
                  {leader.name}
                </Typography>
                <div className="w-0 h-px bg-[#d4af37] group-hover:w-12 transition-all duration-700 delay-100 mb-4"></div>
                <Box className="inline-flex items-center gap-2 text-gray-400">
                  <InstagramIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" className="font-sans text-[10px] tracking-widest">{leader.instagram}</Typography>
                </Box>
              </div>
            </div>
          ))}
        </div>

      </Container>

      {/* Modal / Dialog (Cores e Alturas Forçadas para evitar conflitos) */}
      {selectedLeader && (
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: '#050505', // Fundo estritamente escuro
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
              p: 0,
            }
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: 'white' },
              zIndex: 1300,
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent className="p-0 overflow-hidden" sx={{ backgroundColor: '#050505' }}>
            <div className="flex flex-col md:flex-row w-full relative z-10" style={{ minHeight: '450px' }}>
              
              {/* Lado Esquerdo: Foto (Altura mínima forçada inline para não esmagar) */}
              <div className="w-full md:w-5/12 relative shrink-0" style={{ minHeight: '350px' }}>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedLeader.image})` }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-[#050505] to-transparent md:hidden"></div>
              </div>

              {/* Lado Direito: Informações */}
              <div className="w-full md:w-7/12 p-10 md:p-14 flex flex-col justify-center items-start">
                <Box className="mb-6">
                   <span className="text-[#d4af37] text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">✟</span>
                </Box>
                
                <Typography variant="h4" sx={{ color: 'white' }} className="font-serif uppercase tracking-widest mb-2 leading-none" style={{ fontSize: '2.2rem' }}>
                  {selectedLeader.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#d4af37' }} className="font-sans tracking-[0.3em] uppercase text-xs mb-10">
                  {selectedLeader.role}
                </Typography>

                <div className="w-16 h-px bg-[#d4af37]/50 mb-10"></div>

                <div className="flex flex-col gap-8 w-full">
                  {/* Bloco de Formação */}
                  <div className="flex items-start gap-4">
                    <SchoolIcon sx={{ fontSize: 22, color: '#d4af37' }} />
                    <Box>
                      <Typography variant="overline" sx={{ color: '#d4af37', lineHeight: 1 }} className="font-sans tracking-widest text-[10px] uppercase font-bold block mb-1">
                        Formação
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#d1d5db' }} className="font-sans text-xs md:text-[13px] leading-relaxed max-w-sm">
                        {selectedLeader.formacao}
                      </Typography>
                    </Box>
                  </div>
                  
                  {/* Bloco de Descrição */}
                  <div className="flex items-start gap-4">
                    <DescriptionIcon sx={{ fontSize: 22, color: '#d4af37' }} />
                    <Box>
                      <Typography variant="overline" sx={{ color: '#d4af37', lineHeight: 1 }} className="font-sans tracking-widest text-[10px] uppercase font-bold block mb-1">
                        Descrição
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#d1d5db' }} className="font-sans text-xs md:text-[13px] leading-relaxed max-w-sm">
                        {selectedLeader.descricao}
                      </Typography>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Leaders;