
import React from 'react';
import { Button } from "@/components/ui/button";
import AmericanFlag from './AmericanFlag';
import { useScrollTo } from '@/hooks/useScrollTo';

interface CTAProps {
  variant?: 'default' | 'playful';
}

const CTA: React.FC<CTAProps> = ({ variant = 'default' }) => {
  const { scrollToThreePack } = useScrollTo();

  const descriptions = {
    default: "Join thousands of satisfied customers who have made their events unforgettable with CometCopters",
    playful: "Your friends will think you've discovered alien technology when they see these bad boys soar 150+ feet into the night sky!"
  };

  const buttonTexts = {
    default: "Get Your CometCopters Now",
    playful: "Launch Into Fun Now!"
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
          {descriptions[variant]}
        </p>
        <Button 
          onClick={scrollToThreePack}
          className="bg-gradient-to-r from-comet-blue to-comet-pink hover:from-comet-blue/90 hover:to-comet-pink/90 text-white text-lg py-6 px-8 font-semibold shadow-lg shadow-comet-blue/30"
        >
          {buttonTexts[variant]}
        </Button>
      </div>
    </section>
  );
};

export default CTA;
