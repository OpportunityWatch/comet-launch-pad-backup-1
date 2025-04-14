
import React from 'react';
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-comet-darkblue to-comet-space">
      {/* Background effects - updated with larger size and slow movement */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-slow-drift"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              height: "1.15px",  // 15% larger than 1px
              width: "1.15px",   // 15% larger than 1px
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${20 + Math.random() * 30}s`
            }}
          />
        ))}
      </div>
      
      {/* Colorful comet trail effects */}
      <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-comet-blue via-comet-pink to-transparent blur-sm transform -rotate-12" />
      <div className="absolute top-3/4 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-comet-green to-comet-yellow blur-sm transform rotate-12" />
      
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
