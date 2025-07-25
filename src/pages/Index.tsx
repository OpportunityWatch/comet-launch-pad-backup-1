
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VideoBridge from '@/components/VideoBridge';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { ShoppingCartProvider } from '@/contexts/ShoppingCartContext';
import NightSkyBackground from '@/components/NightSkyBackground';

const Index = () => {
  React.useEffect(() => {
    document.title = "CometCopters - LED Slingshot Helicopters | Up to 150+ Feet High";
  }, []);

  // Animation toggle - enabled to restore full functionality
  const enableAnimations = true;

  return (
    <ShoppingCartProvider>
      {/* Background Layer */}
      {enableAnimations ? (
        <NightSkyBackground />
      ) : (
        <div className="fixed inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#16537e]" style={{ zIndex: 0 }} />
      )}
      
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
        <CTA variant="playful" />
        <Footer />
      </div>
    </ShoppingCartProvider>
  );
};

export default Index;
