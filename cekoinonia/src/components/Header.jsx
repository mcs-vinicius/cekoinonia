import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, IconButton, Box, Container, 
  Drawer, List, ListItem 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // O efeito de vidro é ativado logo nos primeiros 20px de scroll
      setScrolled(window.scrollY > 20); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  
  // =========================================================
  // ESTILO APPLE LIQUID-GLASS (GLASSMORPHISM)
  // =========================================================
  // Fundo levemente transparente
  const headerBackground = (scrolled || !isHomePage) ? 'rgba(15, 15, 15, 0.65)' : 'transparent';
  // O filtro que cria o desfoque cinematográfico por trás da navbar
  const headerBackdrop = (scrolled || !isHomePage) ? 'blur(16px) saturate(180%)' : 'none';
  // Altura muito mais fina (8px de padding em vez de 15/25px)
  const headerPadding = (scrolled || !isHomePage) ? '8px 0' : '18px 0';
  // Borda ultra sutil imitando o corte do vidro
  const headerBorder = (scrolled || !isHomePage) ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent';
  const headerShadow = (scrolled || !isHomePage) ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none';

  const navLinks = [
    { title: 'Página Inicial', path: '/' },
    { title: 'Sobre Nós', path: '/sobre' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box className="h-full flex flex-col pt-6 px-4" sx={{ width: 280 }}>
      <div className="flex justify-between items-center mb-10 pl-2">
        <Typography variant="h6" className="font-serif text-church-gold tracking-widest">
          KOINONIA
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </div>
      
      <List className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <ListItem key={link.title} disablePadding>
            <Link 
              to={link.path} 
              onClick={handleDrawerToggle}
              className="w-full text-white font-sans tracking-[0.15em] uppercase text-[13px] py-3 border-b border-white/10 hover:text-church-gold transition-colors text-center"
            >
              {link.title}
            </Link>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <a href="/#ministerios" onClick={handleDrawerToggle} className="w-full text-white font-sans tracking-[0.15em] uppercase text-[13px] py-3 border-b border-white/10 hover:text-church-gold transition-colors text-center">
            Ministérios
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a href="/#eventos" onClick={handleDrawerToggle} className="w-full text-white font-sans tracking-[0.15em] uppercase text-[13px] py-3 border-b border-white/10 hover:text-church-gold transition-colors text-center">
            Eventos
          </a>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0} // Remove a sombra padrão do MUI para aplicar a sombra do vidro
        sx={{ 
          backgroundColor: headerBackground,
          backdropFilter: headerBackdrop,
          WebkitBackdropFilter: headerBackdrop, // Suporte obrigatório para Safari/iPhone
          borderBottom: headerBorder,
          boxShadow: headerShadow,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // Animação mais natural, padrão Apple
          padding: headerPadding, 
        }}
      >
        <Container maxWidth="xl">
          {/* O min-h-[50px] ajuda a forçar a navbar a ficar bem fininha */}
          <Toolbar disableGutters className="w-full flex justify-center items-center min-h-12.5"> 
            
            {/* MOBILE: Ícone Hamburger Centralizado */}
            <Box className="flex md:hidden justify-center items-center w-full">
              <IconButton size="large" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: 'var(--color-church-gold)' }} />
              </IconButton>
            </Box>

            {/* DESKTOP: Links ultra minimalistas */}
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
              <a href="/#ministerios" className="text-[11px] text-gray-300 hover:text-white transition-colors font-sans tracking-[0.25em] uppercase font-medium">Ministérios</a>
              <a href="/#eventos" className="text-[11px] text-gray-300 hover:text-white transition-colors font-sans tracking-[0.25em] uppercase font-medium">Eventos</a>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="top" 
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { 
            // O menu do telemóvel agora também tem o efeito de vidro em vez de ser sólido
            backgroundColor: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
           }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;