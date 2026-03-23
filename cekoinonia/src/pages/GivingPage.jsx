import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import SyncAltIcon from '@mui/icons-material/SyncAlt'; // Ícone de rotação
import gsap from 'gsap';

const GivingPage = () => {
  const pageRef = useRef(null);
  
  // Estado para controlar a rotação 3D do cartão
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  // GSAP: Animação de Entrada
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.fromTo('.anim-item', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
      )
      // O Cartão 3D entra a flutuar de baixo
      .fromTo('.flip-card-container',
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'back.out(1.2)' },
        "-=0.8"
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("dizimos@cekoinonia.com.br");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div ref={pageRef} className="bg-[#050505] min-h-screen pt-32 pb-32 relative overflow-hidden flex flex-col items-center">
      
      {/* Halo Dourado de Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#d4af37]/5 blur-[150px] pointer-events-none rounded-full z-0"></div>

      <Container maxWidth="md" className="relative z-10 flex flex-col items-center">
        
        {/* =====================================================================
            1. CABEÇALHO 
            ===================================================================== */}
        <Box className="text-center mb-16 px-4">
          <Typography variant="h6" className="anim-item text-[#d4af37] tracking-[0.4em] font-serif mb-4 uppercase text-sm opacity-0">
            Adoração em Ação
          </Typography>
          <Typography variant="h2" className="anim-item text-white font-serif tracking-widest uppercase mb-8 opacity-0" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Dízimos & <span className="text-[#d4af37] italic">Ofertas</span>
          </Typography>
          <div className="anim-item w-24 h-px bg-[#d4af37]/30 opacity-0 mx-auto mb-8"></div>
          <Typography variant="body1" className="anim-item opacity-0 text-gray-400 font-sans tracking-wide max-w-xl mx-auto leading-relaxed" sx={{ fontSize: { xs: '13px', md: '14px' } }}>
            A sua generosidade permite-nos continuar a nossa missão e expandir o Reino. Utilize o nosso cartão interativo abaixo para encontrar os dados de contribuição.
          </Typography>
        </Box>

        {/* =====================================================================
            2. O CARTÃO 3D ("THE BLACK CARD")
            ===================================================================== */}
        {/* Container com perspectiva para dar profundidade ao 3D */}
        <div className="flip-card-container opacity-0 relative w-full max-w-[420px] h-[520px] perspective-[1500px] mb-12">
          
          {/* Brilho de fundo (Halo) dinâmico que acompanha o cartão */}
          <div className="absolute -inset-4 bg-linear-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 rounded-3xl blur-2xl opacity-70 pointer-events-none"></div>

          {/* O Cartão em si (Onde a rotação acontece) */}
          <div 
            className="w-full h-full relative"
            style={{ 
              transformStyle: 'preserve-3d', 
              transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)', 
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
            }}
          >
            
            {/* -----------------------------------------------------------------
                LADO DA FRENTE (PIX)
                ----------------------------------------------------------------- */}
            <Box 
              className="absolute inset-0 w-full h-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Textura de ruído / luxo (Opcional, usando gradient) */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>

              {/* Topo do Cartão Frontal */}
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30">
                  <QrCode2OutlinedIcon sx={{ color: '#d4af37' }} />
                </div>
                <Typography variant="overline" sx={{ color: 'white' }} className="font-sans tracking-widest text-[10px] uppercase font-bold bg-white/10 px-3 py-1 rounded-full">
                  Instantâneo
                </Typography>
              </div>

              {/* Meio: O QR Code Fake (Representativo) */}
              <div className="flex flex-col items-center justify-center my-6 relative z-10">
                <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
                  {/* Padrão estilo QR simplificado */}
                  <div className="absolute inset-4 border-2 border-[#d4af37]/30 rounded flex items-center justify-center">
                    <QrCode2OutlinedIcon sx={{ fontSize: 60, color: '#d4af37', opacity: 0.8 }} />
                  </div>
                </div>
              </div>

              {/* Base do Cartão Frontal: Chave Copiável */}
              <div className="relative z-10 w-full">
                <Typography variant="caption" sx={{ color: '#9ca3af' }} className="font-sans tracking-widest uppercase text-[10px] block mb-2 text-center">
                  Chave E-mail Oficial
                </Typography>
                <button 
                  onClick={handleCopyPix}
                  className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                    copied ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'bg-white/5 border-white/10 hover:border-[#d4af37]/50 text-white hover:bg-white/10'
                  }`}
                >
                  <Typography variant="body1" className="font-sans tracking-widest text-sm font-bold">
                    {copied ? 'Chave Copiada!' : 'dizimos@cekoinonia.com.br'}
                  </Typography>
                  {!copied && <ContentCopyOutlinedIcon fontSize="small" sx={{ opacity: 0.7 }} />}
                </button>
              </div>
            </Box>

            {/* -----------------------------------------------------------------
                LADO DE TRÁS (CONTA BANCÁRIA)
                ----------------------------------------------------------------- */}
            <Box 
              className="absolute inset-0 w-full h-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-[#d4af37]/30 rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(212,175,55,0.1)]"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {/* Topo do Cartão Traseiro */}
              <div className="flex justify-between items-start relative z-10">
                <Typography variant="h5" sx={{ color: 'white' }} className="font-serif tracking-widest uppercase">
                  TED / DOC
                </Typography>
                <AccountBalanceOutlinedIcon sx={{ color: '#d4af37', fontSize: 28 }} />
              </div>

              {/* Meio: Os Dados Bancários */}
              <div className="flex flex-col gap-5 my-auto relative z-10 bg-black/40 p-6 rounded-2xl border border-white/5">
                
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <Typography variant="caption" sx={{ color: '#6b7280' }} className="font-sans tracking-widest uppercase text-[9px] font-bold">Banco</Typography>
                  <Typography variant="body2" sx={{ color: 'white' }} className="font-sans tracking-wider text-sm">000 - Nome</Typography>
                </div>

                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <Typography variant="caption" sx={{ color: '#6b7280' }} className="font-sans tracking-widest uppercase text-[9px] font-bold">Agência</Typography>
                  <Typography variant="body2" sx={{ color: 'white' }} className="font-sans tracking-wider text-sm">0001</Typography>
                </div>

                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <Typography variant="caption" sx={{ color: '#6b7280' }} className="font-sans tracking-widest uppercase text-[9px] font-bold">Conta Corrente</Typography>
                  <Typography variant="body2" sx={{ color: '#d4af37' }} className="font-sans tracking-wider text-sm font-bold">1234567-8</Typography>
                </div>

              </div>

              {/* Base do Cartão Traseiro */}
              <div className="relative z-10 mt-4 border-l-2 border-[#d4af37] pl-4">
                <Typography variant="caption" sx={{ color: '#9ca3af' }} className="font-sans tracking-widest uppercase text-[9px] mb-1 block">Titular da Conta</Typography>
                <Typography variant="body2" sx={{ color: 'white' }} className="font-sans tracking-widest text-[11px] uppercase mb-1">
                  Igreja Evangélica Koinonia
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }} className="font-sans tracking-widest text-[10px]">
                  CNPJ: 00.000.000/0001-00
                </Typography>
              </div>
            </Box>

          </div>
        </div>

        {/* =====================================================================
            3. BOTÃO DE VIRAR O CARTÃO
            ===================================================================== */}
        <button 
          onClick={() => setIsFlipped(!isFlipped)}
          className="anim-item opacity-0 flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d4af37]/50 text-white transition-all duration-300 shadow-xl group"
        >
          <SyncAltIcon className="group-hover:text-[#d4af37] transition-colors group-hover:rotate-180 duration-700" />
          <Typography variant="button" className="font-sans tracking-[0.2em] uppercase text-xs font-bold">
            {isFlipped ? 'Ver Chave PIX' : 'Ver Dados Bancários'}
          </Typography>
        </button>

      </Container>
    </div>
  );
};

export default GivingPage;