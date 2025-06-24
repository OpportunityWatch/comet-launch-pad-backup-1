
import React from 'react';
import { Button } from "@/components/ui/button";
import AmericanFlag from './AmericanFlag';

const CTA = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 space-bg border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8 p-4 bg-comet-blue/20 rounded-lg border border-comet-blue/30 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2">
            <p className="text-comet-blue font-semibold flex items-center gap-2">
              <AmericanFlag size="md" />
              Use code JULY4 for 25% off + Free Shipping!
              <AmericanFlag size="md" />
            </p>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Light Up the Night?
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have made their events unforgettable with CometCopters
        </p>
        <Button 
          onClick={scrollToPricing}
          className="bg-gradient-to-r from-comet-blue to-comet-green hover:from-comet-blue/90 hover:to-comet-green/90 text-white text-lg py-6 px-8 font-semibold shadow-lg shadow-comet-blue/30"
        >
          Get Your CometCopters Now
        </Button>
      </div>
    </section>
  );
};

export default CTA;
