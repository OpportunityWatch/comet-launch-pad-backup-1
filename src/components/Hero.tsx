
import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Star } from "lucide-react";

const Hero = () => {
  console.log('Hero Component Rendered');

  // Use useCallback to prevent recreating functions on each render
  const scrollToFeatures = useCallback(() => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative h-screen pt-16 overflow-hidden flex items-center">
      {/* Star background layer - behind everything */}
      
      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
        <div className="flex flex-col items-center text-center -mt-20 md:-mt-24">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tighter animate-fade-in">
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
        
        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-bounce">
          <button onClick={scrollToFeatures} aria-label="Scroll to features">
            <ArrowDown className="h-8 w-8 text-white/70" />
          </button>
        </div>

        {/* 4th of July Sale CTA */}
        <div className="absolute bottom-[-4rem] left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="relative bg-gradient-to-r from-red-600 via-white to-blue-600 p-1 rounded-xl shadow-2xl max-w-sm mx-4">
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
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                <span className="text-yellow-300 font-bold text-sm tracking-wide">4TH OF JULY SPECIAL</span>
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
              </div>
              <div className="text-2xl font-black text-white mb-1">
                🇺🇸 25% OFF 🇺🇸
              </div>
              <div className="text-xs text-white/90 font-semibold">
                Limited Time Only!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
