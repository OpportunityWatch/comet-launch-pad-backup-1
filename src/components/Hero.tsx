import React, { useCallback, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

// Create reusable background stars to avoid regenerating on each render
const BackgroundStars = React.memo(() => {
  // Pre-compute random positions and sizes for stars to prevent re-randomization on render
  const starPositions = React.useMemo(() => {
    // Create an array of 80 stars with different properties
    return Array(80).fill(0).map(() => {
      const size = Math.random() * 2 + 0.5; // Random sizes from 0.5px to 2.5px
      const brightness = Math.random() * 0.7 + 0.3; // Varied brightness
      
      return {
        top: `${Math.random() * 95}%`,
        left: `${Math.random() * 95}%`,
        size,
        opacity: brightness,
        // Larger stars pulse more visibly
        pulse: size > 1.5,
        delay: Math.random() * 5, // Different animation delays
      };
    });
  }, []);

  return (
    <>
      {starPositions.map((pos, i) => (
        <div 
          key={`star-${i}`}
          className={`absolute rounded-full bg-white ${pos.pulse ? 'animate-pulse-glow' : ''}`}
          style={{
            top: pos.top,
            left: pos.left,
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            opacity: pos.opacity,
            animationDelay: `${pos.delay}s`,
            zIndex: 1
          }}
        />
      ))}
    </>
  );
});

BackgroundStars.displayName = 'BackgroundStars';

// Improved shooting star component with curved path
const ShootingStar = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ startX: 0, delay: 0 });

  useEffect(() => {
    // Function to show a shooting star with curved path
    const showShootingStar = () => {
      // Start position in the lower left area (5% to 15% of screen width)
      const startXPosition = Math.random() * 10 + 5;
      // Random delay for animation
      const animationDelay = Math.random() * 0.5;
      
      setPosition({ startX: startXPosition, delay: animationDelay });
      setIsVisible(true);
      
      // Hide the star after animation completes
      setTimeout(() => {
        setIsVisible(false);
      }, 10000); // 10 seconds duration
    };
    
    // Show initial shooting star
    showShootingStar();
    
    // Set up repeating interval with random timing
    const intervalId = setInterval(() => {
      // Random interval between 2-7 seconds
      const nextInterval = Math.random() * 5000 + 2000;
      
      setTimeout(() => {
        showShootingStar();
      }, nextInterval);
    }, 12000); // Interval matches animation duration
    
    return () => clearInterval(intervalId);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="absolute z-10 animate-curved-star-path"
      style={{
        left: `${position.startX}%`,
        bottom: '5%', // Start from slightly above the bottom
        animationDelay: `${position.delay}s`,
      }}
    >
      <div className="relative">
        {/* Star head - 3px as requested */}
        <div className="w-3 h-3 rounded-full bg-comet-blue shadow-lg shadow-comet-blue/70"></div>
        
        {/* Star tail - 2px width as requested */}
        <div className="absolute top-1/2 left-1/2">
          <div className="w-2 h-48 bg-gradient-to-t from-transparent via-comet-blue/70 to-comet-blue absolute -translate-x-1/2 translate-y-0 origin-top"></div>
        </div>
      </div>
    </div>
  );
});

ShootingStar.displayName = 'ShootingStar';

const Hero = () => {
  console.log('Hero Component Rendered');

  // Use useCallback to prevent recreating functions on each render
  const scrollToFeatures = useCallback(() => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden space-bg flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundStars />
        <ShootingStar />
      </div>

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
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToFeatures} aria-label="Scroll to features">
            <ArrowDown className="h-8 w-8 text-white/70" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
