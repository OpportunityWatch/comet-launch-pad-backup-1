
import React from 'react';
import { Button } from "@/components/ui/button";
import AmericanFlag from './AmericanFlag';

const CTAPlayful = () => {
  const scrollToThreePack = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
      // Small delay to ensure pricing section is visible, then focus on 3-pack
      setTimeout(() => {
        const threePackElement = pricingSection.querySelector('[data-plan="3-pack"]');
        if (threePackElement) {
          threePackElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  };

  return (
    <section className="py-20 space-bg border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <div 
          onClick={scrollToThreePack}
          className="mb-8 p-4 bg-comet-blue/20 rounded-lg border border-comet-blue/30 max-w-md mx-auto cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="flex items-center justify-center gap-2">
            <p className="text-comet-blue font-semibold flex items-center gap-2">
              <AmericanFlag size="md" />
              Use code <span className="text-yellow-300">JULY4</span> for <span className="text-yellow-300">25%</span> off + Free Shipping!
              <AmericanFlag size="md" />
            </p>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Light Up the Night?
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
          Your friends will think you've discovered alien technology when they see these bad boys soar 150+ feet into the night sky!
        </p>
        <Button 
          onClick={scrollToThreePack}
          className="bg-gradient-to-r from-comet-blue to-comet-green hover:from-comet-blue/90 hover:to-comet-green/90 text-white text-lg py-6 px-8 font-semibold shadow-lg shadow-comet-blue/30"
        >
          Launch Into Fun Now!
        </Button>
      </div>
    </section>
  );
};

export default CTAPlayful;
