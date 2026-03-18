import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Detecta quando o utilizador rola a página para mudar o fundo do menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lista de links do menu
  const navLinks = ['Página Inicial', 'Sobre Nós', 'Ministérios', 'Eventos', 'Doações'];

  return (
    <AppBar 
      position="fixed" 
      elevation={scrolled ? 4 : 0} 
      sx={{ 
        backgroundColor: scrolled ? 'var(--color-church-dark)' : 'transparent',
        transition: 'all 0.4s ease-in-out',
        paddingY: scrolled ? '5px' : '15px', 
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.1)' : '1px solid transparent'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between items-center">
          
          {/* Logo / Nome da Igreja */}
          <Box className="flex items-center cursor-pointer">
            <Typography 
              variant="h5" 
              className="font-serif font-bold text-white tracking-widest"
              sx={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}
            >
              KOINONIA
            </Typography>
          </Box>

          {/* Menu Desktop */}
          <Box className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '-')}`} 
                className="text-[12px] text-gray-300 hover:text-church-gold transition-colors font-sans tracking-[0.2em] uppercase font-medium"
              >
                {link}
              </a>
            ))}
          </Box>

          {/* Botão de Contato (Desktop) */}
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

          {/* Menu Mobile (Hambúrguer) */}
          <Box className="md:hidden">
            <IconButton size="large" edge="end" color="inherit" aria-label="menu">
              <MenuIcon sx={{ color: 'var(--color-church-gold)' }} />
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;