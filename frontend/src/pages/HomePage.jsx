import React from 'react';
import Hero from '../components/ui/Hero';
import FeaturedProperties from '../components/ui/FeaturedProperties';
import Features from '../components/ui/Features';
import Testimonials from '../components/ui/Testimonials';
import CallToAction from '../components/ui/CallToAction';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
