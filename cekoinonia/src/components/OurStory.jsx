import React, { useRef } from 'react';
import { Container } from '@mui/material';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

import cenaImg from '../assets/cena-koinonia.jpg';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

/* Os tempos alternam de lado para caber nos vãos escuros que a foto deixa. */
const beats = [
  {
    side: 'left',
    greek: 'κοινωνία',
    lead: 'Do grego: comunhão. Entrega, e vida repartida entre irmãos.',
    body: 'Foi essa a palavra que um pequeno grupo escolheu quando ainda se reunia em casas para orar e estudar a Palavra. Ela virou o nome da igreja porque já era o jeito de viver.'
  },
  {
    side: 'right',
    heading: 'Do círculo de oração à comunidade',
    body: 'O que começou como uma reunião simples se tornou uma igreja que canta, ensina e cuida. Atravessamos anos difíceis e celebramos vitórias pelo caminho — a essência nunca mudou.'
  },
  {
    side: 'left',
    heading: 'No centro, Cristo',
    body: 'Seguimos centrados n’Ele, apaixonados pelas Escrituras e dedicados a amar o próximo. Um lugar onde quem chega ferido encontra cura, quem chega perdido encontra direção, e todos encontram família.'
  }
];

/* A cena é uma foto só (1536 × 2752): cruz e túnica na mesma imagem. O viewBox
   segue a proporção dela para nada esticar. */
const SCENE_W = 1000;
const SCENE_H = 1792;

/* O caminho que o pano percorre, medido na própria foto: em 33 alturas foi
   calculado onde o tecido está, e os pontos viraram uma curva suave.

   Começa no nó do travessão, abre para a esquerda pegando o pano ao vento,
   volta e desce. É esta curva que o DrawSVG percorre — por isso a túnica
   parece estar sendo construída a partir da cruz, e não simplesmente
   aparecendo. */
const CLOTH_PATH =
  'M 781 247 C 744.2 248.3, 623.5 251.5, 560 255 C 496.5 258.5, 438.3 256.8, 400 268' +
  ' C 361.7 279.2, 325 301.3, 330 322 C 335 342.7, 381.7 373.7, 430 392' +
  ' C 478.3 410.3, 564.7 421.5, 620 432 C 675.3 442.5, 731.3 448.8, 762 455' +
  ' C 792.7 461.2, 797.3 458, 804 469 C 810.7 480, 812.7 503.7, 802 521' +
  ' C 791.3 538.3, 766.8 555.7, 740 573 C 713.2 590.3, 666.3 607.7, 641 625' +
  ' C 615.7 642.3, 604.8 659.7, 588 677 C 571.2 694.3, 556.7 711.7, 540 729' +
  ' C 523.3 746.3, 520.3 763.7, 488 781 C 455.7 798.3, 365.2 815.7, 346 833' +
  ' C 326.8 850.3, 364.3 867.7, 373 885 C 381.7 902.3, 384.7 919.5, 398 937' +
  ' C 411.3 954.5, 438.7 972.5, 453 990 C 467.3 1007.5, 473.2 1024.7, 484 1042' +
  ' C 494.8 1059.3, 506.2 1076.7, 518 1094 C 529.8 1111.3, 541 1128.7, 555 1146' +
  ' C 569 1163.3, 586.5 1180.7, 602 1198 C 617.5 1215.3, 633.2 1232.7, 648 1250' +
  ' C 662.8 1267.3, 683.8 1284.7, 691 1302 C 698.2 1319.3, 693.7 1336.7, 691 1354' +
  ' C 688.3 1371.3, 681.2 1388.7, 675 1406 C 668.8 1423.3, 662.2 1440.7, 654 1458' +
  ' C 645.8 1475.3, 648.2 1492.7, 626 1510 C 603.8 1527.3, 551.5 1544.7, 521 1562' +
  ' C 490.5 1579.3, 457.3 1596.7, 443 1614 C 428.7 1631.3, 437.5 1648.7, 435 1666' +
  ' C 432.5 1683.3, 430.5 1697, 428 1718 C 425.5 1739, 421.3 1779.7, 420 1792';

/**
 * A seção "Nossa História".
 *
 * A cruz fica de pé desde o começo. A túnica cresce dela conforme a rolagem,
 * descendo em zigue-zague pelos textos até chegar à posição final da foto.
 *
 * `children` entra depois dos três tempos, ainda dentro da cena: é onde os
 * Pilares ficam na Home, para a seção ler como uma peça só em vez de duas.
 *
 * `static` (/sobre) mostra a cena já inteira, sem a construção — o espetáculo
 * continua sendo exclusivo da Home.
 */
const OurStory = ({ variant = 'cinematic', children }) => {
  const sectionRef = useRef(null);
  const actsRef = useRef(null);
  const shroudRef = useRef(null);
  const clothRef = useRef(null);
  const isCinematic = variant === 'cinematic';

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)'
      },
      (ctx) => {
        const { motion } = ctx.conditions;
        const reveals = gsap.utils.toArray('.story-reveal');

        // Sem movimento: a cena nasce inteira e iluminada. Esconder a túnica
        // puniria quem pediu menos movimento — a foto é conteúdo, não enfeite.
        if (!motion) {
          gsap.set(shroudRef.current, { opacity: 0 });
          gsap.set(reveals, { opacity: 1, y: 0 });
          gsap.set(clothRef.current, { drawSVG: '100%' });
          return;
        }

        // A luz nascendo sobre a cruz, antes de o pano começar a crescer.
        gsap.fromTo(
          shroudRef.current,
          { opacity: 0.94 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 15%',
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          }
        );

        // A túnica sendo construída. `ease: 'none'` porque quem dita o ritmo é
        // a rolagem: qualquer ease faria o pano acelerar sozinho e descolar do
        // dedo de quem rola. Sendo `scrub`, ela desfaz sozinha quando a página
        // sobe — o pano recolhe pelo mesmo caminho por onde cresceu.
        if (isCinematic) {
          gsap.fromTo(
            clothRef.current,
            { drawSVG: '0%' },
            {
              drawSVG: '100%',
              ease: 'none',
              scrollTrigger: {
                trigger: actsRef.current,
                start: 'top 30%',
                end: 'bottom bottom',
                scrub: 0.9,
                invalidateOnRefresh: true
              }
            }
          );
        } else {
          gsap.set(clothRef.current, { drawSVG: '100%' });
        }

        // `toggleActions: play none none reverse` é o que faz o texto refazer o
        // caminho de volta: entra ao descer e sai ao subir, em vez de tocar uma
        // única vez e ficar. Sem isso o padrão é `play none none none`.
        reveals.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      },
      // O escopo vai aqui, e não no useGSAP: gsap.matchMedia() cria o próprio
      // contexto e não herda o escopo do hook. Sem isto os seletores ficavam
      // globais e o revert da limpeza não alcançava as animações — no
      // StrictMode, que monta duas vezes, sobravam duas animações disputando o
      // mesmo elemento, e o desenho do pano pulava e zerava no meio da rolagem.
      sectionRef
    );

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [variant], revertOnUpdate: true });

  return (
    <section
      ref={sectionRef}
      className={`story ${isCinematic ? '' : 'story--static'}`}
      aria-labelledby="nossa-historia"
    >
      <svg
        className="story-scene"
        viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Uma cruz de madeira com a coroa de espinhos e um manto vermelho que desce em ondas."
      >
        <defs>
          {/* A cruz fica de pé desde o início: esta máscara é um halo suave em
              volta do madeiro, sem borda dura, para o pano parecer sair de
              dentro dessa luz em vez de surgir ao lado dela. */}
          <radialGradient id="crossHalo" gradientUnits="userSpaceOnUse" cx="735" cy="300" r="430">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.42" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="crossMask" maskUnits="userSpaceOnUse" x="0" y="0" width={SCENE_W} height={SCENE_H}>
            <rect x="0" y="0" width={SCENE_W} height={SCENE_H} fill="url(#crossHalo)" />
          </mask>

          {/* É o traço desta máscara que o DrawSVG desenha. A foto não se move
              nem se deforma: ela vai sendo revelada ao longo da curva do pano.
              O traço é muito mais largo que o tecido de propósito — como o fundo
              da foto é preto igual ao da página, tudo que sobra revelado é
              invisível, e a máscara não precisa ser precisa. */}
          <mask id="clothMask" maskUnits="userSpaceOnUse" x="-500" y="-500" width={SCENE_W + 1000} height={SCENE_H + 1000}>
            <path ref={clothRef} d={CLOTH_PATH} className="cloth-mask" />
          </mask>

          {/* Apaga o pé da cena, para o pano se dissolver no preto da página em
              vez de ser cortado na borda da seção. */}
          <linearGradient id="sceneFoot" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={SCENE_H}>
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="0.6" stopColor="#000" stopOpacity="0" />
            <stop offset="0.74" stopColor="#000" stopOpacity="0.38" />
            <stop offset="0.86" stopColor="#000" stopOpacity="0.72" />
            {/* Preto pleno na última parada: parando em 0,88 sobrava um fio de
                tecido na borda da seção, e ele virava um corte reto contra o
                fundo da seção seguinte. */}
            <stop offset="1" stopColor="#000" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Nenhum `filter` aqui: um blur SVG sobre algo redesenhado a cada quadro
            refaz o filtro inteiro toda vez e derruba os 60fps. */}
        <g mask="url(#crossMask)">
          <image href={cenaImg} x="0" y="0" width={SCENE_W} height={SCENE_H} preserveAspectRatio="none" />
        </g>
        <g mask="url(#clothMask)">
          {/* Só esta cópia avisa o ScrollTrigger: as posições dos gatilhos são
              medidas antes de a foto chegar, e sem o refresh elas ficam presas
              a um layout que ainda ia mudar. */}
          <image
            href={cenaImg}
            x="0"
            y="0"
            width={SCENE_W}
            height={SCENE_H}
            preserveAspectRatio="none"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </g>

        <rect x="0" y="0" width={SCENE_W} height={SCENE_H} fill="url(#sceneFoot)" />
      </svg>

      {/* O 0.94 inicial vem do CSS, não de um style inline: GSAP anima o style
          inline, e um re-render do React o sobrescreveria de volta. */}
      <div ref={shroudRef} className="story-shroud" />

      <div className="story-copy-track">
        <div ref={actsRef} className="story-acts">
          <Container maxWidth="lg">
            {beats.map((beat, i) => (
              <div key={i} className={`story-beat story-beat--${beat.side}`}>
                <div className="story-copy story-reveal">
                  {i === 0 && (
                    <p
                      id="nossa-historia"
                      className="font-serif text-church-gold uppercase text-[11px] tracking-[0.45em] mb-8"
                    >
                      Nossa História
                    </p>
                  )}
                  {beat.greek && <p className="story-greek mb-6">{beat.greek}</p>}
                  {beat.heading && <h2 className="story-heading mb-7">{beat.heading}</h2>}
                  {beat.lead && (
                    <p className="story-heading mb-7" style={{ fontStyle: 'italic' }}>
                      {beat.lead}
                    </p>
                  )}
                  <p className="story-body">{beat.body}</p>
                </div>
              </div>
            ))}
          </Container>
        </div>

        {children && <div className="story-coda">{children}</div>}
      </div>
    </section>
  );
};

export default OurStory;
