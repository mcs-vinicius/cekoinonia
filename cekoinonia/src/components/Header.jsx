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
  
  // Refs para as animações GSAP do Menu Mobile
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Para testar, mude para false
    const TESTE_MODO_LIVE = true; 
    setIsLive(TESTE_MODO_LIVE); 
  }, []);

  // Animação GSAP para abrir/fechar o Menu Mobile FullScreen
  useEffect(() => {
    if (!menuRef.current) return;

    if (mobileOpen) {
      // Animação de Entrada
      gsap.to(menuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.inOut'
      });

      // Animação dos Links e Botões em Cascata (Stagger)
      gsap.fromTo(linksRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      // Animação de Saída
      gsap.to(menuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power2.inOut'
      });
    }
  }, [mobileOpen]);

  // Função para adicionar os links ao Ref Array do GSAP
  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  const isHomePage = location.pathname === '/';
  
  const headerBackground = (scrolled || !isHomePage) ? 'rgba(15, 15, 15, 0.65)' : 'transparent';
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
          zIndex: 1300 // Garante que a navbar fica acima de tudo
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="w-full flex justify-between md:justify-center items-center min-h-12.5 relative">
            
            {/* MOBILE: Logo à Esquerda (Nova adição para equilíbrio visual) */}
            <Box className="flex md:hidden items-center ml-2">
               <Typography variant="h6" className="font-serif text-church-gold tracking-widest text-sm">
                 KOINONIA
               </Typography>
            </Box>

            {/* MOBILE: Ícone Hamburger/Close à Direita */}
            <Box className="flex md:hidden mr-2 z-50">
              <IconButton 
                size="large" 
                onClick={handleDrawerToggle}
                disableRipple
                sx={{ color: mobileOpen ? 'white' : 'var(--color-church-gold)' }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>

            {/* DESKTOP: Links mapeados e atualizados (Centralizados) */}
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

            {/* DESKTOP: Botão Assista Já (Posicionado à direita absoluta) */}
            <a 
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex absolute right-2 lg:right-4 items-center gap-3 px-5 py-2.5 border transition-all duration-500 group ${
                isLive 
                  ? 'border-church-gold/40 hover:bg-church-gold'
                  : 'border-white/10 hover:border-white/30' 
              }`}
            >
              {isLive ? (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-church-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-church-gold group-hover:bg-black transition-colors"></span>
                </span>
              ) : (
                <YouTubeIcon sx={{ fontSize: 16 }} className="text-gray-400 group-hover:text-white transition-colors" />
              )}
              
              <Typography variant="button" className={`text-[10px] tracking-[0.2em] uppercase font-sans font-bold transition-colors ${
                isLive ? 'text-church-gold group-hover:text-black' : 'text-gray-400 group-hover:text-white'
              }`}>
                {isLive ? 'Estamos Ao Vivo' : 'Nosso Canal'}
              </Typography>
            </a>

          </Toolbar>
        </Container>
      </AppBar>

      {/* ==========================================================
          MENU MOBILE FULLSCREEN (Substitui o Drawer)
          ========================================================== */}
      <Box 
        ref={menuRef}
        className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col justify-center px-8 z-1200 opacity-0 pointer-events-none md:hidden"
      >
        {/* Luz decorativa de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-church-gold/5 blur-[100px] pointer-events-none rounded-full"></div>

        <ul className="flex flex-col gap-8 w-full relative z-10 text-center">
          {navLinks.map((link) => (
            <li key={link.title} ref={addToRefs}>
              <Link 
                to={link.path} 
                onClick={handleDrawerToggle}
                className="text-white font-serif text-3xl tracking-widest uppercase hover:text-church-gold transition-colors inline-block"
              >
                {link.title}
              </Link>
            </li>
          ))}

          {/* Linha separadora */}
          <li ref={addToRefs} className="w-16 h-px bg-white/20 mx-auto my-4"></li>

          {/* BOTÃO YOUTUBE GIGANTE (MOBILE) */}
          <li ref={addToRefs} className="w-full max-w-300px mx-auto">
            <a 
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDrawerToggle}
              className={`w-full flex items-center justify-center gap-4 py-5 border transition-all duration-300 group ${
                isLive 
                  ? 'border-church-gold bg-church-gold/10 text-church-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                  : 'border-white/20 text-gray-400 hover:border-white/50'
              }`}
            >
              {isLive ? (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-church-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-church-gold"></span>
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
        
        {/* Rodapé do Menu Mobile */}
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