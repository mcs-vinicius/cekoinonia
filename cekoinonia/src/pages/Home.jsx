import React from 'react';
import Hero from '../components/Hero';
import OurStory from '../components/OurStory';
import About from '../components/About';
import Leaders from '../components/Leaders';
import Schedule from '../components/Schedule';
import LocationSection from '../components/LocationSection';
import NewsSection from '../components/NewsSection';

/* A ordem responde às perguntas de quem chega, nesta sequência: quem são vocês,
   quem conduz, quando posso ir, o que vem por aí, onde fica. Antes a página
   pulava direto para os horários. */
const Home = ({ ready = true }) => {
  return (
    <>
      <Hero ready={ready} />
      {/* Os Pilares vão dentro da cena: a túnica termina de descer e eles
          aparecem sobre ela, para as duas coisas lerem como uma peça só. */}
      <OurStory>
        <About bare />
      </OurStory>
      <Leaders />
      <Schedule />
      <NewsSection />
      <LocationSection />
    </>
  );
};

export default Home;
