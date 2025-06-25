
import React from 'react';
import NightSkyBackground from '../components/NightSkyBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoBridge from '@/components/VideoBridge';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import CTAPlayful from '@/components/CTAPlayful';
import Footer from '@/components/Footer';

const Index = () => {
  React.useEffect(() => {
    document.title = "CometCopters - LED Slingshot Helicopters | Up to 150+ Feet High";
  }, []);

  return (
    <>
      {/* Animated Night Sky Background */}
      <NightSkyBackground />
      
      {/* Content Overlay - positioned relative to appear above background */}
      <div className="min-h-screen relative z-10">
        <Navbar />
        <Hero />
        <VideoBridge />
        <Features />
        <Pricing />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <FAQ />
        <CTAPlayful />
        <Footer />
      </div>
    </>
  );
};

export default Index;
