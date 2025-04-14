
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden space-bg flex items-center">
      {/* Fewer floating dots - reduced from 5 to 3 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${i * 0.5}s`,
              zIndex: 1
            }}
          >
            <div className="w-4 h-4 rounded-full bg-comet-blue animate-pulse-glow shadow-lg shadow-comet-blue/50"></div>
          </div>
        ))}
        
        {/* More prominent streaking comets - increased size and count from 3 to 5 */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-gradient-to-r from-transparent to-comet-blue opacity-80 animate-slow-shooting-star"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 50}%`,
              animationDelay: `${i * 4 + Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
              transform: `rotate(${-50 + Math.random() * 100}deg)`, // More varied angles including upward
              height: `${1.2 + Math.random() * 0.8}px`, // Varied heights between 1.2-2px
              width: `${24 + Math.random() * 12}px`,   // Varied widths between 24-36px
              borderRadius: "4px"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tighter animate-fade-in">
              <span className="animated-gradient bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]">CometCopters</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-white/90 max-w-xl font-semibold animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
              LED Slingshot Helicopters that soar up to <span className="font-bold text-comet-blue text-glow">150+ feet</span> into the night sky like a shooting star!
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.4s' }}>
              Perfect for outdoor events, family gatherings, and creating spectacular light shows anywhere
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button className="bg-gradient-to-r from-comet-blue to-comet-green hover:from-comet-blue/90 hover:to-comet-green/90 text-white text-lg py-6 px-8 font-semibold shadow-lg shadow-comet-blue/30">
                Get Your CometCopters
              </Button>
              <Button variant="outline" className="border-comet-blue text-comet-blue hover:bg-comet-blue/10 text-lg py-6 px-8 font-semibold shadow-md">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <img 
              src="/lovable-uploads/07954634-62b1-4700-8373-c7b4fee01733.png"
              alt="CometCopter in action" 
              className="w-full max-w-md mx-auto animate-float"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-comet-blue/30 via-comet-pink/20 to-comet-green/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#features">
            <ArrowDown className="h-8 w-8 text-white/70" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
