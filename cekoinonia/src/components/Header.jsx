import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Box, Container, 
  Drawer, List, ListItem 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // <-- Novo ícone para fechar o menu
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // <-- Estado para controlar se o menu mobile está aberto
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const headerBackground = (scrolled || !isHomePage) ? 'var(--color-church-dark)' : 'transparent';
  const headerElevation = (scrolled || !isHomePage) ? 4 : 0;
  const headerPadding = (scrolled || !isHomePage) ? '5px' : '15px';

  const navLinks = [
    { title: 'Página Inicial', path: '/' },
    { title: 'Sobre Nós', path: '/sobre' },
  ];

  // Função para abrir/fechar o menu mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Conteúdo visual do Menu Lateral (Mobile)
  const drawer = (
    <Box className="bg-church-dark h-full flex flex-col pt-6 px-4" sx={{ width: 280 }}>
      {/* Topo do Menu Mobile (Logo + Botão Fechar) */}
      <div className="flex justify-between items-center mb-10 pl-2">
        <Typography variant="h6" className="font-serif text-church-gold tracking-widest">
          KOINONIA
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </div>
      
      {/* Lista de Links Mobile */}
      <List className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <ListItem key={link.title} disablePadding>
            <Link 
              to={link.path} 
              onClick={handleDrawerToggle} // Fecha o menu logo após clicar!
              className="w-full text-white font-sans tracking-[0.15em] uppercase text-[13px] py-3 border-b border-white/10 hover:text-church-gold transition-colors"
            >
              {link.title}
            </Link>
          </ListItem>
        ))}
        {/* Links âncora */}
        <ListItem disablePadding>
          <a href="/#ministerios" onClick={handleDrawerToggle} className="w-full text-white font-sans tracking-[0.15em] uppercase text-[13px] py-3 border-b border-white/10 hover:text-church-gold transition-colors">
            Ministérios
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a href="/#eventos" onClick={handleDrawerToggle} className="w-full text-white font-sans tracking-[0.15em] uppercase text-[13px] py-3 border-b border-white/10 hover:text-church-gold transition-colors">
            Eventos
          </a>
        </ListItem>
      </List>

      {/* Botão no fundo do menu mobile */}
      <div className="mt-auto mb-8 pt-8 flex justify-center border-t border-white/10">
        <Button 
          variant="outlined" 
          fullWidth
          sx={{ 
            color: 'var(--color-church-gold)', 
            borderColor: 'var(--color-church-gold)',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            borderRadius: '0', 
            padding: '12px',
          }}
        >
          FALE CONOSCO
        </Button>
      </div>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={headerElevation} 
        sx={{ 
          backgroundColor: headerBackground,
          transition: 'all 0.4s ease-in-out',
          paddingY: headerPadding, 
          borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.1)' : '1px solid transparent'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="flex justify-between items-center">
            
            <Box className="flex items-center cursor-pointer">
              <Link to="/">
                <Typography 
                  variant="h5" 
                  className="font-serif font-bold text-white tracking-widest"
                  sx={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
                >
                  KOINONIA
                </Typography>
              </Link>
            </Box>

            {/* Menu Desktop */}
            <Box className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.title} 
                  to={link.path}
                  className="text-[12px] text-gray-300 hover:text-church-gold transition-colors font-sans tracking-[0.2em] uppercase font-medium"
                >
                  {link.title}
                </Link>
              ))}
              <a href="/#ministerios" className="text-[12px] text-gray-300 hover:text-church-gold transition-colors font-sans tracking-[0.2em] uppercase font-medium">Ministérios</a>
              <a href="/#eventos" className="text-[12px] text-gray-300 hover:text-church-gold transition-colors font-sans tracking-[0.2em] uppercase font-medium">Eventos</a>
            </Box>

            <Box className="hidden md:flex items-center">
               <Button 
                variant="outlined" 
                sx={{ 
                  color: 'var(--color-church-gold)', 
                  borderColor: 'var(--color-church-gold)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  borderRadius: '0', 
                  padding: '8px 24px',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'var(--color-church-gold)',
                    color: 'var(--color-church-dark)',
                    borderColor: 'var(--color-church-gold)',
                  }
                }}
              >
                FALE CONOSCO
              </Button>
            </Box>

            {/* Ícone Menu Mobile (Só aparece em ecrãs pequenos) */}
            <Box className="md:hidden">
              <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon sx={{ color: 'var(--color-church-gold)' }} />
              </IconButton>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      {/* Componente "Gaveta" do Material UI que desliza da direita */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { backgroundColor: 'var(--color-church-dark)' } // Fundo escuro
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;