import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/* Cruz latina reta, centrada em (500, 500) do viewBox. Não é um objeto em cena:
   é o recorte por onde a home aparece. O painel preto cobre tudo e esta forma
   cresce do centro para fora até engolir a tela. */
const CROSS_PATH =
  'M 480 380 L 520 380 L 520 450 L 590 450 L 590 490 L 520 490 L 520 620 ' +
  'L 480 620 L 480 490 L 410 490 L 410 450 L 480 450 Z';

// Quanto a cruz cresce até o recorte cobrir a tela inteira, com folga para
// telas muito largas.
const REVEAL_SCALE = 60;

const SplashScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'unset';
          setIsVisible(false);
          if (onComplete) onComplete();
        }
      });

      // Estado inicial
      gsap.set('.koinonia-outline', {
        strokeDasharray: 2000,
        strokeDashoffset: 2000
      });
      gsap.set('.koinonia-fill', { opacity: 0 });
      /* svgOrigin, e não transformOrigin: a origem precisa ser o ponto (500,500)
         do espaço de coordenadas do viewBox. Com transformOrigin o crescimento
         acontecia a partir do canto (0,0) e a cruz ampliada saía inteira da área
         visível — a tela simplesmente ficava preta. */
      gsap.set('.reveal-cross', { scale: 0, svgOrigin: '500 500' });

      tl
        // 1. A escrita do nome
        .to('.koinonia-outline', {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power1.inOut'
        })

        // 2. O preenchimento dourado em relevo toma conta das letras e o
        //    contorno se apaga, deixando só o metal.
        .to('.koinonia-fill', {
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out'
        }, '-=0.2')
        .to('.koinonia-outline', {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out'
        }, '<')

        // 3. Meio segundo parado, para a marca assentar
        .to({}, { duration: 0.5 })

        // 4. O nome se apaga aos poucos e a tela fica totalmente preta
        .to('.koinonia-word', {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        })
        .to('.splash-glow', {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        }, '<')

        // 5. A abertura em cruz: o preto se rasga do centro para fora e a home
        //    aparece por dentro da forma.
        /* Ease de aceleração, e não inOut: como a escala cresce de 0 a 60, um
           ritmo linear já cobriria meia tela no primeiro quinto do tempo e a
           forma de cruz mal apareceria. Começando devagar, o desenho fica
           legível antes de a abertura se lançar para fora. */
        .to('.reveal-cross', {
          scale: REVEAL_SCALE,
          duration: 1.1,
          ease: 'power2.in'
        });
    }, containerRef);

    return () => {
      document.body.style.overflow = 'unset';
      ctx.revert();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    /* Sem fundo próprio de propósito: quem cobre a página é o retângulo
       recortado do SVG abaixo. Se o container fosse opaco, a abertura em cruz
       não teria o que revelar. */
    <div ref={containerRef} className="fixed inset-0 z-9999 overflow-hidden">

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* 0..1000 basta: com preserveAspectRatio="slice" o viewBox sempre
              cobre a viewport, então o retângulo já preenche a tela toda. Um
              retângulo maior que isso só faria o navegador rasterizar uma
              superfície enorme a cada quadro da máscara animada. */}
          <mask id="cross-reveal">
            <rect width="1000" height="1000" fill="white" />
            {/* Preto na máscara = buraco no painel */}
            <path className="reveal-cross" d={CROSS_PATH} fill="black" />
          </mask>
        </defs>

        <rect
          width="1000"
          height="1000"
          fill="#050505"
          mask="url(#cross-reveal)"
        />
      </svg>

      {/* Halo dourado por trás da marca */}
      <div className="splash-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-church-gold/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* O nome da igreja */}
      <div className="koinonia-word absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
        <svg
          viewBox="0 0 1000 300"
          className="w-full max-w-5xl h-auto"
        >
          <defs>
            {/* Gradiente do ouro: das sombras quentes ao brilho quase branco e
                de volta, que é o que dá a leitura de metal polido. */}
            <linearGradient id="gold-metal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6b4f10" />
              <stop offset="18%"  stopColor="#c9a132" />
              <stop offset="38%"  stopColor="#fbf0bd" />
              <stop offset="52%"  stopColor="#e8c86a" />
              <stop offset="70%"  stopColor="#a67c1c" />
              <stop offset="88%"  stopColor="#e3c266" />
              <stop offset="100%" stopColor="#7a5a14" />
            </linearGradient>

            {/* Relevo: desfoca o recorte da letra para usar como mapa de altura,
                aplica luz especular e recompõe por cima do metal. É isso que dá
                o volume, sem precisar de geometria 3D de verdade. */}
            <filter id="gold-bevel" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="alturaBorrada" />
              <feSpecularLighting
                in="alturaBorrada"
                surfaceScale="5"
                specularConstant="1.15"
                specularExponent="22"
                lightingColor="#fff8dd"
                result="brilho"
              >
                <feDistantLight azimuth="235" elevation="58" />
              </feSpecularLighting>
              <feComposite in="brilho" in2="SourceAlpha" operator="in" result="brilhoRecortado" />
              <feComposite
                in="SourceGraphic"
                in2="brilhoRecortado"
                operator="arithmetic"
                k1="0" k2="1" k3="1" k4="0"
              />
            </filter>
          </defs>

          {/* Camada 1: o traço que se desenha */}
          <text
            className="koinonia-text koinonia-outline"
            x="500" y="160"
            fontSize="180"
            textAnchor="middle"
            fill="none"
            stroke="#d4af37"
            strokeWidth="2.5"
          >
            Koinonia
          </text>

          {/* Camada 2: o metal, que entra por cima quando a escrita termina */}
          <text
            className="koinonia-text koinonia-fill"
            x="500" y="160"
            fontSize="180"
            textAnchor="middle"
            fill="url(#gold-metal)"
            filter="url(#gold-bevel)"
          >
            Koinonia
          </text>
        </svg>
      </div>
    </div>
  );
};

export default SplashScreen;
