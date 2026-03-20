import React, { useState } from 'react';
import { Box, Container, Typography, Dialog, IconButton, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const Leaders = () => {
  const [open, setOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);

  const leadersData = [
    {
      id: 1,
      name: 'Pr. Marcos Silva',
      role: 'Pastor Presidente',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
      formation: 'Bacharel em Teologia pela Faculdade XYZ, Especialista em Aconselhamento Pastoral.',
      shortDesc: 'Dedicado ao ensino da Palavra e ao pastoreio da comunidade com amor e sabedoria.',
      fullDesc: 'O Pastor Marcos Silva fundou a Koinonia com a visão de criar uma comunidade acolhedora e enraizada nas Escrituras. Com mais de 20 anos de ministério, a sua paixão é ver famílias restauradas e vidas transformadas pelo poder do Evangelho. Além do púlpito, ele dedica o seu tempo ao aconselhamento e à formação de novos líderes dentro da igreja. Nosso objetivo sempre será proclamar as boas novas e cuidar daqueles que Deus nos confiou.'
    },
    {
      id: 2,
      name: 'Pra. Helena Silva',
      role: 'Pastora & Ministério de Mulheres',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
      formation: 'Formada em Psicologia e Pós-Graduada em Ministério Familiar.',
      shortDesc: 'Lidera o ministério feminino e foca-se na restauração emocional das famílias.',
      fullDesc: 'A Pastora Helena é uma conselheira nata. A sua formação em Psicologia aliada à sua fé inabalável permite-lhe ajudar mulheres e casais a encontrarem cura e propósito. Ela é a força motriz por trás dos retiros femininos da Koinonia e acredita firmemente que uma família forte é o alicerce de uma igreja saudável.'
    }
  ];

  const handleOpen = (leader) => {
    setSelectedLeader(leader);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedLeader(null), 300);
  };

  return (
    <Box className="bg-[#050505] py-32 relative border-t border-white/5">
      <Container maxWidth="lg">
        
        <Box className="text-center mb-24 relative z-10">
          <Typography variant="h6" className="text-church-gold tracking-[0.4em] font-serif mb-4 uppercase text-sm">
            Nossa Liderança
          </Typography>
          <Typography variant="h3" className="text-white font-serif mb-6 tracking-widest uppercase" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Pastores e <span className="text-church-gold italic">Líderes</span>
          </Typography>
          <div className="w-24 h-px bg-church-gold opacity-50 mx-auto"></div>
        </Box>

        <div className="flex flex-wrap justify-center gap-8 px-4">
          {leadersData.map((leader) => (
            <div 
              key={leader.id} 
              className="flex-none w-full sm:w-[320px] md:w-85 group cursor-pointer relative overflow-hidden border border-white/5 bg-[#0a0a0a] transition-all duration-500 hover:border-church-gold/30"
              onClick={() => handleOpen(leader)}
            >
              <div className="relative aspect-4/5 overflow-hidden z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${leader.image})` }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <div className="absolute z-20 bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Typography variant="h5" className="text-white font-serif tracking-widest uppercase mb-1 drop-shadow-md">
                  {leader.name}
                </Typography>
                <Typography variant="subtitle2" className="text-church-gold font-sans tracking-[0.2em] uppercase text-[10px] mb-4">
                  {leader.role}
                </Typography>
                
                <div className="flex items-center gap-2 text-white/50 group-hover:text-church-gold transition-colors duration-300 opacity-0 group-hover:opacity-100">
                  <AddOutlinedIcon fontSize="small" />
                  <Typography variant="caption" className="font-sans tracking-[0.2em] uppercase text-[9px]">
                    Ler Biografia
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* =========================================================================
          MODAL A PROVA DE FALHAS (Flexbox puro com Tailwind)
          ========================================================================= */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'transparent', // Fundo transparente para o Tailwind controlar
            boxShadow: 'none',
          }
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)', 
              backdropFilter: 'blur(8px)', 
            }
          }
        }}
      >
        {selectedLeader && (
          // Container Principal do Modal: 600px de altura cravados no desktop
          <div className="relative flex flex-col md:flex-row w-full max-h-[90vh] md:h-150 bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden">
            
            {/* Botão de Fechar Absoluto */}
            <IconButton 
              onClick={handleClose} 
              sx={{ position: 'absolute', right: 16, top: 16, color: 'var(--color-church-gold)', zIndex: 50, backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <CloseIcon />
            </IconButton>

            {/* LADO ESQUERDO: A FOTO (Fixa, nunca colapsa) */}
            <div className="w-full md:w-5/12 h-87.5 md:h-full shrink-0 relative">
              <img 
                src={selectedLeader.image} 
                alt={selectedLeader.name}
                className="w-full h-full object-cover object-center grayscale"
              />
            </div>

            {/* LADO DIREITO: TEXTOS COM SCROLL INTERNO */}
            {/* A classe overflow-y-auto garante a barra de rolagem! */}
            <div className="w-full md:w-7/12 h-auto md:h-full overflow-y-auto p-8 md:p-14 flex flex-col">
              
              <div className="mt-auto mb-auto"> {/* Centraliza verticalmente se o texto for curto */}
                <Typography variant="subtitle2" className="text-church-gold font-sans tracking-[0.3em] uppercase text-[10px] mb-3">
                  {selectedLeader.role}
                </Typography>
                
                <Typography variant="h4" className="text-white font-serif tracking-widest uppercase mb-6" sx={{ fontSize: '1.8rem' }}>
                  {selectedLeader.name}
                </Typography>

                <div className="w-12 h-px bg-church-gold opacity-50 mb-8"></div>

                <Typography variant="subtitle1" className="text-white font-sans font-medium tracking-wide text-sm mb-3 uppercase">
                  Formação & Histórico
                </Typography>
                <Typography variant="body2" className="text-gray-400 font-sans leading-relaxed mb-8 text-[13px]">
                  {selectedLeader.formation}
                </Typography>

                <Typography variant="subtitle1" className="text-white font-sans font-medium tracking-wide text-sm mb-3 uppercase">
                  Biografia
                </Typography>
                <Typography variant="body2" className="text-gray-400 font-sans leading-relaxed text-[13px] text-justify">
                  {selectedLeader.fullDesc}
                </Typography>
              </div>

            </div>
          </div>
        )}
      </Dialog>
    </Box>
  );
};

export default Leaders;