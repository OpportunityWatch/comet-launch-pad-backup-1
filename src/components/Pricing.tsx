import React, { useState, useEffect } from 'react';
import PaymentMethodDialog from './PaymentMethodDialog';
import PricingPlan from './PricingPlan';
import ProductGuarantee from './ProductGuarantee';
import AmericanFlag from './AmericanFlag';

const Pricing = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  // Handle browser back button for dialog
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#checkout' && !isPaymentDialogOpen) {
        // Hash indicates checkout should be open but dialog is closed
        // This shouldn't happen in normal flow, so we'll clear the hash
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);
      } else if (hash !== '#checkout' && isPaymentDialogOpen) {
        // Hash doesn't indicate checkout but dialog is open (back button was pressed)
        setIsPaymentDialogOpen(false);
        setSelectedProduct(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isPaymentDialogOpen]);

  const handleBuyNow = (productData: any) => {
    setSelectedProduct(productData);
    setIsPaymentDialogOpen(true);
    // Add hash to URL for back button handling
    window.history.pushState('', '', '#checkout');
  };

  const handleCloseDialog = () => {
    setIsPaymentDialogOpen(false);
    setSelectedProduct(null);
    // Remove hash from URL
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
  };

  return (
    <section id="pricing" className="py-20 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Package</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Select the perfect CometCopters package for your next adventure
          </p>
          <div className="mt-4 p-4 bg-comet-blue/20 rounded-lg border border-comet-blue/30 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2">
              <p className="text-comet-blue font-semibold flex items-center gap-2">
                <AmericanFlag size="md" />
                Use code <span className="text-yellow-300">JULY4</span> for <span className="text-yellow-300">25%</span> off + Free Shipping!
                <AmericanFlag size="md" />
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-16 max-w-6xl mx-auto">
          <PricingPlan
            title="Single CometCopter"
            price="$6.95"
            quantity="per copter"
            description="Perfect for trying out the CometCopter experience"
            image="/lovable-uploads/abf91c70-a4a3-4ca1-ad37-411309ed353a.png"
            features={[
              "1 CometCopter with launcher",
              "Batteries included",
              "Extra set of batteries",
              "Easy setup instructions",
              "$4.95 shipping & handling"
            ]}
            buttonText="Buy Now"
            onBuyNow={() => handleBuyNow({
              name: "Single CometCopter",
              price: 695,
              quantity: 1
            })}
            className="border border-white/20 backdrop-blur-sm"
          />
          
          <PricingPlan
            title="3-Pack + 1 FREE"
            price="$15.95"
            quantity="($3.99 each)"
            description="Our most popular package with bonus CometCopter"
            image="/lovable-uploads/f9bc0aba-1ac0-44fd-bb47-179144f982c7.png"
            features={[
              "3 CometCopters + 1 FREE",
              "4 launchers included",
              "Batteries included",
              "4 extra sets of batteries",
              "FREE shipping & handling"
            ]}
            buttonText="Buy Now"
            popular={true}
            onBuyNow={() => handleBuyNow({
              name: "3-Pack + 1 FREE CometCopters",
              price: 1595,
              quantity: 4
            })}
          />
          
          <PricingPlan
            title="9-Pack Party Bundle"
            price="$39.95"
            quantity="($3.33 each)"
            description="Perfect for parties and large gatherings"
            image="/lovable-uploads/1e565c7f-c0a0-45fe-a4f6-bf2ddc7e5d53.png"
            features={[
              "9 CometCopters + 3 FREE",
              "12 launchers included",
              "Batteries included",
              "12 extra sets of batteries",
              "FREE shipping & handling"
            ]}
            buttonText="Buy Now"
            onBuyNow={() => handleBuyNow({
              name: "9-Pack Party Bundle CometCopters",
              price: 3995,
              quantity: 12
            })}
            className="md:col-span-2 md:max-w-sm md:mx-auto lg:col-span-1 lg:max-w-none border border-white/20 backdrop-blur-sm"
          />
        </div>
        
        <ProductGuarantee />
      </div>

      {selectedProduct && (
        <PaymentMethodDialog
          isOpen={isPaymentDialogOpen}
          onClose={handleCloseDialog}
          product={selectedProduct}
        />
      )}
    </section>
  );
};

export default Pricing;
