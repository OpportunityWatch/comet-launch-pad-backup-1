
import React from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useScrollTo } from '@/hooks/useScrollTo';
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';
import SlidingCart from './SlidingCart';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { scrollToThreePack } = useScrollTo();
  const { getCartItemCount } = useShoppingCartContext();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScrollToThreePack = () => {
    scrollToThreePack();
    setMobileMenuOpen(false);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-[#1a1a2e]/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/lovable-uploads/4e3425ae-5ea4-4ed5-9c53-bd25805743f0.png"
                alt="CometCopters Logo"
                className="h-10 md:h-12"
              />
            </a>
          </div>

          {isMobile ? (
            <>
              <div className="flex items-center gap-2">
                {/* Mobile Cart Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleOpenCart}
                  className="text-white hover:bg-comet-blue/20 relative"
                >
                  <ShoppingCart size={20} />
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-comet-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMobileMenu}
                  className="text-white hover:bg-comet-blue/20"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
              
              {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[#1a1a2e]/95 backdrop-blur-md p-4 animate-fade-in border-b border-comet-blue/20">
                  <div className="flex flex-col space-y-4">
                    <a href="#features" className="text-white hover:text-comet-pink py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#pricing" className="text-white hover:text-comet-green py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                    <a href="#faq" className="text-white hover:text-comet-yellow py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                    <Button 
                      onClick={handleScrollToThreePack}
                      className="bg-gradient-to-r from-comet-blue to-comet-pink hover:from-comet-blue/90 hover:to-comet-pink/90 text-white w-full"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="text-white hover:text-comet-pink transition-colors">Features</a>
                <a href="#pricing" className="text-white hover:text-comet-green transition-colors">Pricing</a>
                <a href="#faq" className="text-white hover:text-comet-yellow transition-colors">FAQ</a>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button 
                  onClick={scrollToThreePack}
                  className="bg-gradient-to-r from-comet-blue to-comet-pink hover:from-comet-blue/90 hover:to-comet-pink/90 text-white"
                >
                  Buy Now
                </Button>
                
                {/* Desktop Cart Tab */}
                <Button
                  onClick={handleOpenCart}
                  variant="outline"
                  size="sm"
                  className="bg-comet-blue/20 border-comet-blue/30 text-white hover:bg-comet-blue/30 text-xs px-3 py-1 h-7 relative"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Cart ({getCartItemCount()})
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-comet-pink text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Modal */}
      <SlidingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          // Handle checkout - you can add navigation logic here
        }} 
      />
    </>
  );
};

export default Navbar;
