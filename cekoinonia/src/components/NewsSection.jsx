import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Dialog, IconButton, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const NewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [progressKey, setProgressKey] = useState(0);
  
  const newsRef = useRef(null);

  const newsData = [
    {
      id: 1,
      dateDay: '22',
      dateMonth: 'OUT',
      title: 'Culto Especial de Ação de Graças',
      excerpt: 'Junte-se a nós para uma noite inesquecível de louvor e gratidão pelas bênçãos deste ano.',
      fullDesc: 'O Culto de Ação de Graças é um dos momentos mais aguardados do nosso calendário. Este ano, teremos a participação especial do nosso coral principal e uma mensagem poderosa sobre a provisão divina. Prepare o seu coração para uma noite onde o foco principal será simplesmente agradecer por tudo o que Deus tem feito na nossa comunidade e nas nossas famílias. Após o culto, teremos um momento de comunhão no salão anexo.',
      details: 'Sexta-feira às 19:30 • Templo Principal',
      image: 'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1920&auto=format&fit=crop',
    },
    {
      id: 2,
      dateDay: '15',
      dateMonth: 'NOV',
      title: 'Seminário de Casais: Construindo sobre a Rocha',
      excerpt: 'Um fim de semana dedicado ao fortalecimento do matrimónio com palestras e dinâmicas.',
      fullDesc: 'O casamento é a base da família e da igreja. Neste seminário intensivo de dois dias, vamos abordar temas cruciais como comunicação, finanças à luz da Bíblia, e intimidade. Contaremos com a presença de preletores convidados, especialistas em aconselhamento familiar. O valor da inscrição inclui material de apoio, coffee breaks e um jantar romântico no sábado à noite.',
      details: 'Sábado e Domingo • Auditório Koinonia',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1920&auto=format&fit=crop',
    },
    {
      id: 3,
      dateDay: '05',
      dateMonth: 'DEZ',
      title: 'Retiro de Jovens: O Despertar',
      excerpt: 'Três dias de imersão espiritual, louvor e fogueira. Longe do ruído, perto de Deus.',
      fullDesc: 'Chegou o momento de desligar os ecrãs e ligar-se ao Criador. O "Despertar" não é apenas um acampamento, é uma experiência de transformação. Teremos gincanas, momentos profundos de adoração à volta da fogueira, oficinas de propósito e muito mais. As vagas são limitadas, por isso garante já o teu lugar falando com a liderança dos jovens no final dos cultos de domingo.',
      details: 'Feriado Prolongado • Acampamento Vale das Águias',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1920&auto=format&fit=crop',
    }
  ];

  // GSAP: Animação de Entrada Sequencial (Timeline)
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: newsRef.current,
          start: "top 60%", // Antes era "top 75%"
          once: true 
        },
        delay: 0.3 // NOVO: Dá tempo para o utilizador chegar e focar os olhos
      });

      // 1. O Subtítulo cai de cima
      tl.fromTo('.news-subtitle', 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      
      // 2. O Título entra pelos lados
      .fromTo('.news-word-left', 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
        "-=0.5"
      )
      .fromTo('.news-word-right', 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
        "-=1"
      )
      
      // 3. O Carrossel inteiro sobe graciosamente
      .fromTo('.news-carousel', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
        "-=0.5"
      );

    }, newsRef);

    return () => ctx.revert();
  }, []);

  // Temporizador do Carrossel (Autoplay)
  useEffect(() => {
    if (modalOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsData.length);
      setProgressKey((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex, modalOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsData.length);
    setProgressKey(k => k + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? newsData.length - 1 : prev - 1));
    setProgressKey(k => k + 1);
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
    setProgressKey(k => k + 1);
  };

  const currentItem = newsData[currentIndex];

  return (
    <Box ref={newsRef} className="bg-[#050505] py-32 relative overflow-hidden border-t border-white/5">
      <Container maxWidth="xl">
        
        {/* TÍTULO DA SECÇÃO */}
        <Box className="text-center mb-16 news-title-container overflow-hidden py-4">
          <Typography variant="h6" className="news-subtitle inline-block text-church-gold tracking-[0.4em] font-serif mb-4 uppercase text-sm">
            Fique por Dentro
          </Typography>
          <Typography variant="h3" className="text-white font-serif tracking-widest uppercase flex justify-center gap-4 flex-wrap" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            <span className="news-word-left inline-block">Próximos</span>
            <span className="text-church-gold italic news-word-right inline-block">Eventos</span>
          </Typography>
        </Box>

        {/* CARROSSEL DE EVENTOS (Classe 'news-carousel' adicionada para animar) */}
        <Box className="news-carousel max-w-6xl mx-auto relative group">
          
          <div className="flex flex-col md:flex-row bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl">
            
            <div className="w-full md:w-[15%] flex md:flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10 shrink-0 bg-linear-to-b from-[#0a0a0a] to-[#050505]">
              <Typography variant="h2" className="text-church-gold font-serif leading-none drop-shadow-md">
                {currentItem.dateDay}
              </Typography>
              <Typography variant="subtitle1" className="text-white font-sans tracking-[0.3em] uppercase mt-2">
                {currentItem.dateMonth}
              </Typography>
            </div>

            <div 
              key={currentIndex} 
              className="w-full md:w-[85%] aspect-video md:aspect-21/9 relative overflow-hidden cursor-pointer animate-fade-in"
              onClick={() => handleOpenModal(currentItem)}
            >
              <img 
                src={currentItem.image} 
                alt={currentItem.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 ease-linear hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <Typography variant="h4" className="text-white font-serif mb-3 tracking-wide drop-shadow-lg" sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
                  {currentItem.title}
                </Typography>
                <Typography variant="body1" className="text-gray-300 font-sans max-w-2xl mb-6 hidden sm:block drop-shadow-md">
                  {currentItem.excerpt}
                </Typography>
                <span className="inline-flex items-center gap-2 text-church-gold font-sans text-xs tracking-[0.2em] uppercase border border-church-gold/40 px-6 py-3 hover:bg-church-gold hover:text-black transition-all duration-300 backdrop-blur-sm">
                  Ler Conteúdo Completo
                </span>
              </div>
            </div>
          </div>

          {!modalOpen && (
            <div className="w-full h-1 bg-white/5 absolute bottom-0 left-0 z-20">
              <div key={progressKey} className="h-full bg-church-gold" style={{ animation: 'growRight 10s linear forwards' }}></div>
            </div>
          )}

          <div className="absolute top-1/2 -translate-y-1/2 w-full justify-between px-4 md:-mx-16 pointer-events-none md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 hidden md:flex">
            <IconButton onClick={handlePrev} className="pointer-events-auto" sx={{ backgroundColor: 'rgba(10,10,10,0.8)', color: 'white', border: '1px solid rgba(212,175,55,0.3)', '&:hover': { backgroundColor: 'var(--color-church-gold)', color: 'black' } }}>
              <ArrowBackIosNewOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleNext} className="pointer-events-auto" sx={{ backgroundColor: 'rgba(10,10,10,0.8)', color: 'white', border: '1px solid rgba(212,175,55,0.3)', '&:hover': { backgroundColor: 'var(--color-church-gold)', color: 'black' } }}>
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </div>
          
        </Box>

        <div className="flex justify-center gap-6 mt-8 md:hidden">
          <IconButton onClick={handlePrev} sx={{ color: 'var(--color-church-gold)', border: '1px solid rgba(212,175,55,0.3)' }}><ArrowBackIosNewOutlinedIcon fontSize="small" /></IconButton>
          <IconButton onClick={handleNext} sx={{ color: 'var(--color-church-gold)', border: '1px solid rgba(212,175,55,0.3)' }}><ArrowForwardIosOutlinedIcon fontSize="small" /></IconButton>
        </div>

      </Container>

      {/* MODAL DO EVENTO */}
      <Dialog open={modalOpen} TransitionComponent={Transition} keepMounted onClose={handleCloseModal} maxWidth="md" fullWidth PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none' } }} slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)' } } }}>
        {selectedEvent && (
          <div className="relative flex flex-col w-full max-h-[90vh] bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl">
            <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', right: 16, top: 16, color: 'white', zIndex: 50, backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': { color: 'var(--color-church-gold)' } }}>
              <CloseIcon />
            </IconButton>

            <div className="w-full h-62.5 md:h-87.5 relative shrink-0">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent"></div>
            </div>

            <div className="w-full overflow-y-auto p-8 md:px-12 md:pb-12 md:-mt-10 relative z-10 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                 <div className="bg-church-gold text-black px-4 py-1 rounded-sm flex items-center gap-2">
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption" className="font-bold tracking-widest uppercase">{selectedEvent.dateDay} DE {selectedEvent.dateMonth}</Typography>
                 </div>
                 <Typography variant="caption" className="text-gray-400 font-sans tracking-widest uppercase">Evento Especial</Typography>
              </div>

              <Typography variant="h3" className="text-white font-serif mb-4" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>{selectedEvent.title}</Typography>
              <Typography variant="subtitle1" className="text-church-gold font-sans mb-8 tracking-wide">📍 {selectedEvent.details}</Typography>
              <div className="w-full h-px bg-white/10 mb-8"></div>
              <Typography variant="body1" className="text-gray-300 font-sans leading-loose text-justify text-[15px]">{selectedEvent.fullDesc}</Typography>
            </div>
          </div>
        )}
      </Dialog>
    </Box>
  );
};

export default NewsSection;