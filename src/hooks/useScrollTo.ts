
import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToThreePack = useCallback(() => {
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
  }, []);

  return {
    scrollToElement,
    scrollToThreePack
  };
};
