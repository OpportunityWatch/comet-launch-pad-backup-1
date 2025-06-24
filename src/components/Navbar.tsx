import React from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#1a1a2e]/90 backdrop-blur-sm border-b border-comet-blue/20">
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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="text-white hover:bg-comet-blue/20"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-[#1a1a2e]/95 backdrop-blur-md p-4 animate-fade-in border-b border-comet-blue/20">
                <div className="flex flex-col space-y-4">
                  <a href="#features" className="text-white hover:text-comet-pink py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
                  <a href="#pricing" className="text-white hover:text-comet-green py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                  <a href="#faq" className="text-white hover:text-comet-yellow py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                  <Button className="bg-gradient-to-r from-comet-blue to-comet-pink hover:from-comet-blue/90 hover:to-comet-pink/90 text-white w-full">
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
            <Button className="bg-gradient-to-r from-comet-blue to-comet-pink hover:from-comet-blue/90 hover:to-comet-pink/90 text-white">
              Buy Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
