
import React from 'react';
import { Button } from "@/components/ui/button";

const CTA = () => {
  console.log('CTA Component Rendered');

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-comet-darkblue to-comet-space">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background stars/dots */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-pulse-glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.3,
              height: "3px",
              width: "3px",
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
        
        {/* Reduced number of vertical comet trails with slight angle - now flying upward */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={`cta-comet-${i}`}
            className="absolute"
            style={{
              left: `${25 + (i * 20)}%`,
              bottom: '-20px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 0 20px 5px rgba(255,255,255,0.9)',
              zIndex: 10,
              animation: `vertical-angled-fall-up ${4 + Math.random() * 3}s linear infinite`,
              animationDelay: `${i * 0.9}s`
            }}
          >
            {/* Long visible comet tail - now properly positioned below the head */}
            <div 
              style={{
                position: 'absolute',
                top: '10px', // Changed from bottom to top
                left: '5px',
                width: '3px',
                height: '150px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(0,160,228,0.6), transparent)', // Changed direction
                boxShadow: '0 0 10px 3px rgba(0,160,228,0.6)',
                transform: 'translateX(-50%) rotate(12deg)',
                transformOrigin: 'top center' // Changed from bottom to top
              }}
            ></div>
          </div>
        ))}
        
        {/* Add keyframe animation directly in the component */}
        <style>
          {`
            @keyframes vertical-angled-fall-up {
              0% {
                transform: translateY(50px) translateX(0) rotate(12deg);
                opacity: 0;
              }
              10% {
                opacity: 1;
              }
              90% {
                opacity: 1;
              }
              100% {
                transform: translateY(-100vh) translateX(-20vw) rotate(12deg);
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
      
      {/* Colorful comet trail effects */}
      <div className="absolute top-1/4 left-0 w-2 h-full bg-gradient-to-b from-comet-blue via-transparent to-transparent blur-sm transform -rotate-10" />
      <div className="absolute top-3/4 right-0 w-2 h-full bg-gradient-to-b from-comet-green via-comet-yellow to-transparent blur-sm transform rotate-10" />
      
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
