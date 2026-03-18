import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Leaders from '../components/Leaders';
import Schedule from '../components/Schedule';
import OnlineGiving from '../components/OnlineGiving';
import Ministries from '../components/Ministries';
import NewsSection from '../components/NewsSection';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Leaders />
      <Schedule />
      <OnlineGiving />
      <Ministries />
      <NewsSection />
    </>
  );
};

export default Home;