
import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  console.log('Hero Component Rendered');

  // Use useCallback to prevent recreating functions on each render
  const scrollToFeatures = useCallback(() => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden flex items-center">
      <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tighter animate-fade-in">
            <span className="animated-gradient bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]">CometCopters</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-white/90 max-w-xl font-semibold animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            LED Slingshot Helicopters that soar up to <span className="font-bold text-comet-blue text-glow">150+ feet</span> into the night sky like a shooting star!
          </p>
          <p className="text-lg mb-8 text-white/80 max-w-xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.4s' }}>
            Perfect for outdoor events, family gatherings, and creating spectacular light shows anywhere
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button className="bg-gradient-to-r from-comet-blue to-comet-green hover:from-comet-blue/90 hover:to-comet-green/90 text-white text-lg py-6 px-8 font-semibold shadow-lg shadow-comet-blue/30">
              Get Your CometCopters
            </Button>
            <Button variant="outline" className="border-comet-blue text-comet-blue hover:bg-comet-blue/10 text-lg py-6 px-8 font-semibold shadow-md">
              Watch Demo
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToFeatures} aria-label="Scroll to features">
            <ArrowDown className="h-8 w-8 text-white/70" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
