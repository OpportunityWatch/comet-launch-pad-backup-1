
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import AmericanFlag from './AmericanFlag';
import { useScrollTo } from '@/hooks/useScrollTo';

const Hero = () => {
  const { scrollToElement, scrollToThreePack } = useScrollTo();

  const scrollToExperienceSection = () => scrollToElement('experience-magic');
  const scrollToPricing = () => scrollToElement('pricing');

  return (
    <section className="relative h-[90vh] pt-16 overflow-hidden flex items-start">
      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-20">
        <div className="flex flex-col items-center text-center">
          {/* 4th of July Sale Banner - Now Clickable */}
          <div className="mb-12 animate-fade-in">
            <div 
              onClick={scrollToThreePack}
              className="relative bg-gradient-to-r from-red-600 via-white to-blue-600 p-1 rounded-xl shadow-2xl max-w-md mx-4 cursor-pointer hover:scale-105 transition-transform"
            >
              {/* Stars decoration */}
              <div className="absolute -top-2 -left-2">
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300 animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-2">
                <Star className="h-3 w-3 text-yellow-300 fill-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="absolute -bottom-2 left-1/4">
                <Star className="h-3 w-3 text-yellow-300 fill-yellow-300 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <div className="absolute -bottom-1 right-1/4">
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300 animate-pulse" style={{ animationDelay: '1.5s' }} />
              </div>
              
              <div className="bg-gradient-to-r from-red-700 via-blue-900 to-red-700 rounded-lg px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-yellow-300 font-bold text-sm tracking-wide">4TH OF JULY SPECIAL</span>
                </div>
                <div className="text-2xl font-black text-white mb-2 flex items-center justify-center gap-2">
                  <AmericanFlag size="md" />
                  25% OFF
                  <AmericanFlag size="md" />
                </div>
                <div className="text-lg font-black text-yellow-300 mb-1">
                  Code: JULY4 at checkout!
                </div>
                <div className="text-xs text-white/90 font-semibold">
                  Limited Time Only! Click Here
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tighter animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="animated-gradient bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]">CometCopters</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 text-white/90 max-w-xl font-semibold animate-fade-in leading-relaxed" style={{ animationDelay: '0.4s' }}>
            LED Slingshot Helicopters that soar up to <span className="font-bold text-comet-blue text-glow">150+ feet</span> into the night sky like a shooting star!
          </p>
          <p className="text-lg mb-8 text-white/80 max-w-xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.6s' }}>
            Perfect for outdoor events, family gatherings, and creating spectacular light shows anywhere
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button 
              onClick={scrollToThreePack}
              className="bg-gradient-to-r from-comet-blue to-comet-green hover:from-comet-blue/90 hover:to-comet-green/90 text-white text-lg py-6 px-8 font-semibold shadow-lg shadow-comet-blue/30"
            >
              Get Your CometCopters
            </Button>
            <Button onClick={scrollToExperienceSection} variant="outline" className="border-comet-blue text-comet-blue hover:bg-comet-blue/10 text-lg py-6 px-8 font-semibold shadow-md">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
