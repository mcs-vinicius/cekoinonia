import React from 'react';
import OurStory from '../components/OurStory';
import About from '../components/About';
import Leaders from '../components/Leaders';
import Schedule from '../components/Schedule';
import NewsSection from '../components/NewsSection';
import LocationSection from '../components/LocationSection';

/* A mesma sequência da Home, sem a Hero. O banner de topo saiu junto: era uma
   foto de banco de imagens que destoava das fotos reais da igreja, e a cruz de
   OurStory abre a página melhor do que ele abria. */
const AboutPage = () => {
  return (
    <div className="bg-church-dark min-h-screen">
      <OurStory variant="static" />
      <About />
      <Leaders />
      <Schedule />
      <NewsSection />
      <LocationSection />
    </div>
  );
};

export default AboutPage;
