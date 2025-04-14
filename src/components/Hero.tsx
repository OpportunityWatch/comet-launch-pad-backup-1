import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  console.log('Hero Component Rendered');

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
        
        {/* Completely redesigned comet trails to ensure vertical orientation */}
        {[...Array(8)].map((_, i) => {
          // Create different groups of comets with staggered timing
          const waveGroup = Math.floor(i / 3);
          const groupDelay = waveGroup * 6 + Math.random() * 2;
          
          // Generate random positions and sizes for variety
          const leftPosition = Math.random() * 80;
          const trailLength = 40 + Math.random() * 30; // Length of the comet trail
          
          console.log(`Comet ${i} - Position: ${leftPosition}%, Delay: ${groupDelay}`);

          return (
            <div 
              key={`comet-${i}`} 
              className="absolute"
              style={{
                left: `${leftPosition}%`,
                top: '-50px', // Start above the viewport
                animationDelay: `${groupDelay}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animation: `vertical-shooting-star ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${groupDelay}s`,
                zIndex: 5,
              }}
            >
              {/* Head of comet - bright dot */}
              <div className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_10px_4px_rgba(255,255,255,0.8)] z-10"></div>
              
              {/* Vertical trail of comet */}
              <div 
                className="absolute"
                style={{
                  top: '0',
                  left: '1px',
                  width: '1px',
                  height: `${trailLength}px`,
                  background: 'linear-gradient(to top, transparent, #00A0E4)',
                  boxShadow: '0 0 8px 1px rgba(0,160,228,0.6)',
                  transform: 'translateX(0)', // Center the trail relative to the head
                }}
              ></div>
            </div>
          );
        })}
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
