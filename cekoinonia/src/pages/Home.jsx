import React from 'react';
import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import LocationSection from '../components/LocationSection'; 
import NewsSection from '../components/NewsSection';

const Home = () => {
  return (
    <>
      <Hero />
      <Schedule />
      <NewsSection />
      <LocationSection />
      
    </>
  );
};

export default Home;