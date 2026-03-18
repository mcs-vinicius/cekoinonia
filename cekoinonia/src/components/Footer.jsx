import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Footer = () => {
  return (
    <Box className="bg-[#111111] pt-20 pb-8 border-t border-white/5 relative">
      <Container maxWidth="lg">
        
        {/* Parte Superior do Rodapé: Grelha de Links e Contactos */}
        <Grid container spacing={8} className="mb-16">
          
          {/* Coluna 1: Sobre a Igreja */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              className="text-white font-serif tracking-widest uppercase mb-6"
            >
              KOINONIA
            </Typography>
            <Typography 
              variant="body2" 
              className="text-gray-400 font-sans leading-relaxed mb-6"
              sx={{ fontSize: '13px' }}
            >
              Uma comunidade dedicada a viver o evangelho de forma prática, 
              amando a Deus sobre todas as coisas e ao próximo como a nós mesmos.
            </Typography>
            {/* Redes Sociais */}
            <div className="flex gap-2">
              <IconButton sx={{ color: 'var(--color-church-gold)' }} aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: 'var(--color-church-gold)' }} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: 'var(--color-church-gold)' }} aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </div>
          </Grid>

          {/* Coluna 2: Links Rápidos */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              className="text-white font-serif mb-6 uppercase tracking-widest"
              sx={{ fontSize: '1rem' }}
            >
              Links Rápidos
            </Typography>
            <ul className="flex flex-col gap-3">
              {['Página Inicial', 'Quem Somos', 'Nossos Ministérios', 'Eventos e Notícias', 'Doações Online'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-church-gold font-sans text-[13px] transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Grid>

          {/* Coluna 3: Contacto e Localização */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              className="text-white font-serif mb-6 uppercase tracking-widest"
              sx={{ fontSize: '1rem' }}
            >
              Visite-nos
            </Typography>
            
            <div className="flex flex-col gap-4">
              {/* Morada */}
              <div className="flex items-start gap-3">
                <LocationOnOutlinedIcon sx={{ color: 'var(--color-church-gold)', fontSize: 20, mt: 0.5 }} />
                <Typography variant="body2" className="text-gray-400 font-sans leading-relaxed" sx={{ fontSize: '13px' }}>
                  Avenida da Fé, 1234<br/>
                  Bairro Central, São Paulo - SP<br/>
                  CEP: 00000-000
                </Typography>
              </div>
              
              {/* Telefone */}
              <div className="flex items-center gap-3">
                <PhoneOutlinedIcon sx={{ color: 'var(--color-church-gold)', fontSize: 20 }} />
                <Typography variant="body2" className="text-gray-400 font-sans" sx={{ fontSize: '13px' }}>
                  +55 (11) 99999-9999
                </Typography>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <EmailOutlinedIcon sx={{ color: 'var(--color-church-gold)', fontSize: 20 }} />
                <Typography variant="body2" className="text-gray-400 font-sans" sx={{ fontSize: '13px' }}>
                  contato@cekoinonia.com.br
                </Typography>
              </div>
            </div>
          </Grid>

        </Grid>

        {/* Linha Divisória Inferior */}
        <div className="w-full h-px bg-white/10 mb-8"></div>

        {/* Parte Inferior: Copyright */}
        <Box className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <Typography 
            variant="caption" 
            className="text-gray-500 font-sans tracking-widest uppercase"
            sx={{ fontSize: '10px' }}
          >
            &copy; {new Date().getFullYear()} Igreja Evangélica Koinonia. Todos os direitos reservados.
          </Typography>
          
          <Typography 
            variant="caption" 
            className="text-gray-500 font-sans tracking-widest uppercase"
            sx={{ fontSize: '10px' }}
          >
            Desenvolvido por V. Monteiro
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;