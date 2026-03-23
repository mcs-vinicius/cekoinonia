import React, { useState, useEffect, useRef } from 'react';
import { 
  AppBar, Toolbar, Typography, IconButton, Box, Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const location = useLocation();
  
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // =========================================================================
  // VALIDAÇÃO DE HORÁRIO DE CULTO (Sem uso de API)
  // =========================================================================
  useEffect(() => {
    const checkLiveStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Domingo, 1 = Segunda ... 4 = Quinta
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      let isServiceTime = false;

      // 1. Quinta-Feira: 20:00 (1200) às 21:00 (1260)
      if (day === 4) {
        isServiceTime = timeInMinutes >= 1200 && timeInMinutes <= 1260;
      } 
      // 2. Domingo: 09:00 (540) às 10:30 (630) OU 18:00 (1080) às 21:00 (1260)
      else if (day === 0) {
        const isMorning = timeInMinutes >= 540 && timeInMinutes <= 630;
        const isEvening = timeInMinutes >= 1080 && timeInMinutes <= 1260;
        isServiceTime = isMorning || isEvening;
      }

      setIsLive(isServiceTime);
    };

    // Executa assim que o Header carrega
    checkLiveStatus();
    
    // Verifica a cada minuto para atualizar o botão em tempo real caso a pessoa deixe o site aberto
    const intervalId = setInterval(checkLiveStatus, 60 * 1000); 
    return () => clearInterval(intervalId);
  }, []);
  // =========================================================================

  useEffect(() => {
    if (!menuRef.current) return;
    if (mobileOpen) {
      gsap.to(menuRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: 'power2.inOut' });
      gsap.fromTo(linksRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      gsap.to(menuRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power2.inOut' });
    }
  }, [mobileOpen]);

  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
  };

  const isHomePage = location.pathname === '/';
  const headerBackground = (scrolled || !isHomePage) ? 'rgba(5, 5, 5, 0.85)' : 'transparent';
  const headerBackdrop = (scrolled || !isHomePage) ? 'blur(16px) saturate(180%)' : 'none';
  const headerPadding = (scrolled || !isHomePage) ? '8px 0' : '18px 0';
  const headerBorder = (scrolled || !isHomePage) ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent';
  const headerShadow = (scrolled || !isHomePage) ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none';

  const navLinks = [
    { title: 'Início', path: '/' },
    { title: 'Sobre Nós', path: '/sobre' },
    { title: 'Ministérios', path: '/ministerios' },
    { title: 'Doações', path: '/doacoes' },
  ];

  const youtubeLink = "https://www.youtube.com/@cekoinonia1522/live";

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          backgroundColor: headerBackground,
          backdropFilter: headerBackdrop,
          WebkitBackdropFilter: headerBackdrop,
          borderBottom: headerBorder,
          boxShadow: headerShadow,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: headerPadding, 
          zIndex: 1300 
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="w-full flex justify-between md:justify-center items-center min-h-12.5 relative">
            
            <Box className="flex md:hidden items-center ml-2">
               <Typography variant="h6" className="font-serif text-[#d4af37] tracking-widest text-sm">
                 KOINONIA
               </Typography>
            </Box>

            <Box className="flex md:hidden mr-2 z-50">
              <IconButton 
                size="large" 
                onClick={handleDrawerToggle}
                disableRipple
                sx={{ color: mobileOpen ? 'white' : '#d4af37' }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>

            <Box className="hidden md:flex flex-row items-center justify-center space-x-12 w-full">
              {navLinks.map((link) => (
                <Link 
                  key={link.title} 
                  to={link.path}
                  className="text-[11px] text-gray-300 hover:text-white transition-colors font-sans tracking-[0.25em] uppercase font-medium"
                >
                  {link.title}
                </Link>
              ))}
            </Box>

            <a 
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex absolute right-2 lg:right-4 items-center gap-3 px-5 py-2.5 border transition-all duration-500 group ${
                isLive 
                  ? 'border-[#d4af37]/40 hover:bg-[#d4af37]'
                  : 'border-white/10 hover:border-white/30' 
              }`}
            >
              {isLive ? (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37] group-hover:bg-black transition-colors"></span>
                </span>
              ) : (
                <YouTubeIcon sx={{ fontSize: 16 }} className="text-gray-400 group-hover:text-white transition-colors" />
              )}
              
              <Typography variant="button" className={`text-[10px] tracking-[0.2em] uppercase font-sans font-bold transition-colors ${
                isLive ? 'text-[#d4af37] group-hover:text-black' : 'text-gray-400 group-hover:text-white'
              }`}>
                {isLive ? 'Estamos Ao Vivo' : 'Nosso Canal'}
              </Typography>
            </a>
          </Toolbar>
        </Container>
      </AppBar>

      <Box 
        ref={menuRef}
        // Tailwind classes adjusted
        className="fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-center px-8 z-1200 opacity-0 pointer-events-none md:hidden"
      >
        {/* Tailwind classes adjusted */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-[#d4af37]/5 blur-[100px] pointer-events-none rounded-full"></div>

        <ul className="flex flex-col gap-8 w-full relative z-10 text-center">
          {navLinks.map((link) => (
            <li key={link.title} ref={addToRefs}>
              <Link 
                to={link.path} 
                onClick={handleDrawerToggle}
                className="text-white font-serif text-3xl tracking-widest uppercase hover:text-[#d4af37] transition-colors inline-block"
              >
                {link.title}
              </Link>
            </li>
          ))}

          <li ref={addToRefs} className="w-16 h-px bg-white/20 mx-auto my-4"></li>

          {/* Tailwind classes adjusted */}
          <li ref={addToRefs} className="w-full max-w-75 mx-auto">
            <a 
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDrawerToggle}
              className={`w-full flex items-center justify-center gap-4 py-5 border transition-all duration-300 group ${
                isLive 
                  ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'border-white/20 text-gray-400 hover:border-white/50'
              }`}
            >
              {isLive ? (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4af37]"></span>
                </span>
              ) : (
                <YouTubeIcon sx={{ fontSize: 24 }} />
              )}

              <span className="font-sans tracking-[0.25em] uppercase text-[14px] font-bold">
                {isLive ? 'Estamos Ao Vivo' : 'Nosso Canal'}
              </span>
            </a>
          </li>
        </ul>
        
        <div ref={addToRefs} className="absolute bottom-10 left-0 w-full text-center">
           <Typography variant="caption" className="text-gray-500 font-sans tracking-[0.3em] text-[9px] uppercase">
             Comunidade Koinonia
           </Typography>
        </div>
      </Box>
    </>
  );
};

export default Header;