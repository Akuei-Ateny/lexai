import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureSection />
        <TestimonialSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
