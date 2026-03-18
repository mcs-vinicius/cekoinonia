import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Leaders from '../components/Leaders';
import Schedule from '../components/Schedule';
import OnlineGiving from '../components/OnlineGiving';
import Ministries from '../components/Ministries';
import News from '../components/News'; // Agora com a importação perfeitamente alinhada

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Leaders />
      <Schedule />
      <OnlineGiving />
      <Ministries />
      <News />
    </>
  );
};

export default Home;