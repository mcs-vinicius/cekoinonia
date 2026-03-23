import React, { useState, useEffect, useRef } from 'react';
import { 
  AppBar, Toolbar, Typography, IconButton, Box, Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

// Importando a foto do logo
import logoImg from '../assets/logok.png'; 

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

  useEffect(() => {
    const checkLiveStatus = () => {
      const now = new Date();
      const day = now.getDay(); 
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeInMinutes = hours * 60 + minutes;

      let isServiceTime = false;

      if (day === 4) {
        isServiceTime = timeInMinutes >= 1200 && timeInMinutes <= 1260;
      } 
      else if (day === 0) {
        const isMorning = timeInMinutes >= 540 && timeInMinutes <= 630;
        const isEvening = timeInMinutes >= 1080 && timeInMinutes <= 1260;
        isServiceTime = isMorning || isEvening;
      }

      setIsLive(isServiceTime);
    };

    checkLiveStatus();
    const intervalId = setInterval(checkLiveStatus, 60 * 1000); 
    return () => clearInterval(intervalId);
  }, []);

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

  const handleNavigation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mobileOpen) setMobileOpen(false);
  };

  const isHomePage = location.pathname === '/';
  const headerBackground = mobileOpen ? 'transparent' : ((scrolled || !isHomePage) ? 'rgba(5, 5, 5, 0.85)' : 'transparent');
  const headerBackdrop = mobileOpen ? 'none' : ((scrolled || !isHomePage) ? 'blur(16px) saturate(180%)' : 'none');
  const headerPadding = (scrolled || !isHomePage) ? '10px 0' : '20px 0';
  const headerBorder = mobileOpen ? '1px solid transparent' : ((scrolled || !isHomePage) ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent');
  const headerShadow = mobileOpen ? 'none' : ((scrolled || !isHomePage) ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none');

  const navLinks = [
    { title: 'Início', path: '/' },
    { title: 'Sobre Nós', path: '/sobre' },
    { title: 'Ministérios', path: '/ministerios' },
    { title: 'Doações', path: '/doacoes' },
  ];

  const youtubeLink = "https://www.youtube.com/@cekoinonia1522/live";

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
          <Toolbar disableGutters className="w-full flex justify-between items-center min-h-12 relative">
            
            <Box className="flex items-center">
               <Link to="/" onClick={handleNavigation} className="group flex items-center">
                 <img 
                    src={logoImg} 
                    alt="Logo Koinonia" 
                    className="h-15 md:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                 />
               </Link>
            </Box>

            <Box className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-row items-center space-x-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.title} 
                    to={link.path}
                    onClick={handleNavigation}
                    className={`relative text-[11px] font-sans tracking-[0.2em] uppercase font-bold transition-all duration-300 py-2 group ${
                      isActive ? 'text-[#d4af37]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.title}
                    
                    {/* Alterado de h-[2px] para h-0.5 */}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-white'
                    }`}></span>
                  </Link>
                );
              })}
            </Box>

            <a 
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex items-center gap-3 px-6 py-2 rounded-full border transition-all duration-500 group ${
                isLive 
                  ? 'border-[#d4af37]/50 bg-[#d4af37]/5 hover:bg-[#d4af37] hover:border-[#d4af37]'
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5' 
              }`}
            >
              {isLive ? (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75 group-hover:bg-black"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37] group-hover:bg-black transition-colors"></span>
                </span>
              ) : (
                <YouTubeIcon sx={{ fontSize: 18 }} className="text-gray-400 group-hover:text-white transition-colors" />
              )}
              
              <Typography variant="button" className={`text-[10px] tracking-[0.2em] uppercase font-sans font-bold transition-colors ${
                isLive ? 'text-[#d4af37] group-hover:text-black' : 'text-gray-400 group-hover:text-white'
              }`}>
                {isLive ? 'Ao Vivo' : 'Canal'}
              </Typography>
            </a>

            <Box className="flex md:hidden z-50">
              <IconButton 
                size="large" 
                onClick={() => setMobileOpen(!mobileOpen)}
                disableRipple
                sx={{ color: mobileOpen ? 'white' : '#d4af37' }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <Box 
        ref={menuRef}
        style={{ zIndex: 1200 }}
        className="fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-center px-8 opacity-0 pointer-events-none md:hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-[#d4af37]/5 blur-[100px] pointer-events-none rounded-full"></div>

        <ul className="flex flex-col gap-8 w-full relative z-10 text-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.title} ref={addToRefs}>
                <Link 
                  to={link.path} 
                  onClick={handleNavigation}
                  className={`font-serif text-3xl tracking-widest uppercase transition-colors inline-block ${
                    isActive ? 'text-[#d4af37]' : 'text-white hover:text-[#d4af37]'
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}

          <li ref={addToRefs} className="w-16 h-px bg-white/20 mx-auto my-4"></li>

          <li ref={addToRefs} className="w-full max-w-75 mx-auto">
            <a 
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavigation}
              className={`w-full flex items-center justify-center gap-4 py-4 rounded-full border transition-all duration-300 group ${
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

              <span className="font-sans tracking-[0.25em] uppercase text-[12px] font-bold">
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