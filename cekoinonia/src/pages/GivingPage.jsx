import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import OnlineGiving from '../components/OnlineGiving';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';

const GivingPage = () => {
  return (
    <Box className="bg-church-dark min-h-screen pt-20">
       
       {/* Reutilizamos o Banner de doação que já existia */}
       <OnlineGiving /> 
       
       {/* Nova Secção com Informações Adicionais */}
       <Container maxWidth="lg" className="py-24">
          <Typography variant="h4" className="text-church-gold font-serif mb-12 text-center uppercase tracking-widest">
            Outras Formas de Contribuir
          </Typography>
          
          <Grid container spacing={8}>
            {/* Bloco Transferência */}
            <Grid item xs={12} md={6}>
              <Box className="border border-white/10 p-10 text-center h-full bg-[#0a0a0a] hover:border-church-gold/40 transition-all duration-500">
                <AccountBalanceOutlinedIcon sx={{ fontSize: 50, color: 'var(--color-church-gold)', mb: 3 }} />
                <Typography variant="h6" className="text-white font-serif mb-4 tracking-widest uppercase">
                  Transferência Bancária
                </Typography>
                <Typography variant="body2" className="text-gray-400 font-sans leading-relaxed">
                  Banco: 000 - Nome do Banco<br/>
                  Agência: 0000<br/>
                  Conta: 00000-0<br/>
                  Igreja Evangélica Koinonia<br/>
                  CNPJ: 00.000.000/0001-00
                </Typography>
              </Box>
            </Grid>
            
            {/* Bloco PIX */}
            <Grid item xs={12} md={6}>
              <Box className="border border-white/10 p-10 text-center h-full bg-[#0a0a0a] hover:border-church-gold/40 transition-all duration-500">
                <QrCode2OutlinedIcon sx={{ fontSize: 50, color: 'var(--color-church-gold)', mb: 3 }} />
                <Typography variant="h6" className="text-white font-serif mb-4 tracking-widest uppercase">
                  PIX Instantâneo
                </Typography>
                <Typography variant="body2" className="text-gray-400 font-sans leading-relaxed mb-6">
                  Faça a sua contribuição de forma rápida e segura através do nosso PIX oficial.
                </Typography>
                <Typography variant="body1" className="text-church-gold font-sans font-bold tracking-widest bg-church-gold/10 py-3 rounded">
                  Chave: dizimos@cekoinonia.com.br
                </Typography>
              </Box>
            </Grid>
          </Grid>
       </Container>
    </Box>
  );
};

export default GivingPage;