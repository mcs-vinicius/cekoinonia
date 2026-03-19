import React from 'react';
import { Box, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';

const LocationSection = () => {
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[75vh] bg-[#080808] border-t border-white/5 relative">
      
      {/* ========================================================
          LADO ESQUERDO: TEXTOS E DADOS
          ======================================================== */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-10 md:p-16 lg:p-24 z-10 relative">
        
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 0% 0%, var(--color-church-gold) 0%, transparent 60%)' }}
        ></div>

        <div className="mb-4">
          <span className="text-church-gold text-2xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">✟</span>
        </div>
        
        <Typography 
          variant="h3" 
          className="text-church-gold font-serif mb-4 tracking-[0.15em] uppercase"
          sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }}
        >
          Onde Estamos
        </Typography>
        
        <Typography 
          variant="h4" 
          className="text-white font-serif mb-8 tracking-widest uppercase"
          sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
        >
          Visite a Nossa <span className="text-church-gold italic">Comunidade</span>
        </Typography>

        <div className="w-16 h-px bg-church-gold opacity-30 mb-12"></div>

        <div className="flex flex-col gap-10 mb-16">
          
          {/* Bloco Endereço */}
          <div className="flex items-start gap-5 group">
            <div className="p-3 border border-white/10 rounded-full group-hover:border-church-gold/50 transition-colors duration-500">
              <LocationOnOutlinedIcon className="text-church-gold" />
            </div>
            <div className="mt-1">
              <Typography variant="subtitle2" className="text-white font-sans tracking-[0.2em] uppercase mb-2 text-xs">
                Localização
              </Typography>
              <Typography variant="body2" className="text-gray-400 font-sans tracking-wide text-[13px] leading-relaxed">
                R. Carmine Monetti, 471<br/>
                Jardim das Oliveiras, São Paulo - SP<br/>
                CEP: 08111-160
              </Typography>
            </div>
          </div>
          
          
        </div>

        {/* Botão Como Chegar */}
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("R. Carmine Monetti, 471, Jardim das Oliveiras, São Paulo, SP, 08111-160")}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="self-start inline-flex items-center gap-3 border border-church-gold/40 text-church-gold px-8 py-4 font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-church-gold hover:text-black transition-all duration-500"
        >
          <DirectionsOutlinedIcon fontSize="small" />
          Como Chegar
        </a>
      </div>

      {/* ========================================================
          LADO DIREITO: MAPA (Com o seu Iframe Exato)
          ======================================================== */}
      <div className="w-full md:w-1/2 relative min-h-112.5 md:min-h-full">
        
        <iframe 
          src="https://www.google.com/maps/embed?pb=!4v1773949232290!6m8!1m7!1sDai2Htua4TrIpGJmGs4fvg!2m2!1d-23.49095619315468!2d-46.38196483761757!3f322.99222739692703!4f6.610014054074995!5f0.7820865974627469" 
          className="absolute inset-0 w-full h-full"
          style={{ 
            border: 0, 
            filter: 'invert(100%) hue-rotate(180deg) grayscale(85%) contrast(120%) brightness(75%)' 
          }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        {/* Sombras Gradient para misturar o mapa com a secção preta */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-[#080808] via-[#080808]/40 to-transparent"></div>
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#080808] via-transparent to-transparent opacity-50 md:hidden"></div>
      </div>

    </section>
  );
};

export default LocationSection;