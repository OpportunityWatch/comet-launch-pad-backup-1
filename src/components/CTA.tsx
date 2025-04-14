
import React from 'react';
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-comet-darkblue to-comet-space">
      {/* Background effects - fewer dots, more prominent comets */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Reduced number of background dots from 20 to 8 */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-slow-drift"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.3,
              height: "1.15px",
              width: "1.15px",
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${20 + Math.random() * 30}s`
            }}
          />
        ))}
        
        {/* Added prominent streaking comets - enhanced with vertical motion */}
        {[...Array(6)].map((_, i) => {
          // Randomize angles between -15 to 15 degrees for vertical movement
          const angle = -15 + Math.random() * 30;
          // Randomize grouping by creating "waves" of comets
          const waveGroup = Math.floor(i / 2); // Groups of 2 comets
          // Random delay within each wave group
          const groupDelay = waveGroup * 5 + Math.random() * 3;
          
          return (
            <div 
              key={`comet-${i}`} 
              className="absolute bg-gradient-to-r from-transparent to-comet-blue opacity-80 animate-fast-shooting-star"
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${groupDelay}s`,
                animationDuration: `${3 + Math.random() * 3}s`, // Faster animation: 3-6s
                transform: `rotate(${90 + angle}deg)`, // Vertical (90deg) +/- angle
                height: `${3 + Math.random() * 2}px`, // Doubled height: 3-5px (was 1.5-2.5px)
                width: `${56 + Math.random() * 32}px`,  // Doubled width: 56-88px (was 28-44px)
                borderRadius: "4px",
                zIndex: 5
              }}
            />
          );
        })}
      </div>
      
      {/* Colorful comet trail effects - made more prominent and vertical */}
      <div className="absolute top-1/4 left-0 w-full h-2 bg-gradient-to-r from-comet-blue via-comet-pink to-transparent blur-sm transform rotate-80" />
      <div className="absolute top-3/4 right-0 w-full h-2 bg-gradient-to-r from-transparent via-comet-green to-comet-yellow blur-sm transform rotate-100" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready for Your <span className="animated-gradient bg-clip-text text-transparent font-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]">CometCopters</span> Adventure?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Transform your outdoor evenings into spectacular light shows that will amaze family and friends. Order today and get free extra batteries with every purchase!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-gradient-to-r from-comet-blue via-comet-pink to-comet-green hover:opacity-90 text-white text-lg py-6 px-8">
              Get Your CometCopters Now
            </Button>
            <p className="text-white/60 text-sm mt-4 sm:mt-0 sm:ml-2">
              Free shipping on orders over $17
            </p>
          </div>
          
          {/* Product image */}
          <div className="mt-12 relative max-w-md mx-auto">
            <img 
              src="/lovable-uploads/15cb9498-bdda-4451-a15c-2ec1fa36ea2d.png"
              alt="CometCopters 3-pack" 
              className="w-full rounded-lg shadow-2xl shadow-comet-blue/20 border border-white/10"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-comet-darkblue/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 text-center">
              <span className="inline-block bg-gradient-to-r from-comet-pink to-comet-red text-white px-4 py-2 rounded-full text-sm font-bold mb-2 animate-pulse-glow">
                Free Bonus!
              </span>
              <p className="text-white text-lg">Extra CometCopter with every 3-Pack</p>
              <p className="text-white/80 text-sm mt-1">And extra set of batteries for extended play</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
