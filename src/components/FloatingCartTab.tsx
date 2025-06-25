
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';

interface FloatingCartTabProps {
  onOpenCart: () => void;
}

const FloatingCartTab: React.FC<FloatingCartTabProps> = ({ onOpenCart }) => {
  const { getCartItemCount } = useShoppingCartContext();
  const [isHovered, setIsHovered] = useState(false);
  
  console.log('FloatingCartTab render:', { 
    cartCount: getCartItemCount(), 
    isHovered,
    shouldShow: getCartItemCount() > 0 
  });
  
  // Don't show anything if cart is empty
  if (getCartItemCount() === 0) {
    return null;
  }

  return (
    <div 
      className="absolute top-full right-4 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blue Cart Tag - same width as Buy Now button */}
      <div className="relative mt-2">
        {/* String/attachment point */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-slate-400"></div>
        
        {/* Cart Tag */}
        <div className="mt-4">
          <Button
            onClick={onOpenCart}
            className="bg-comet-blue hover:bg-comet-blue/80 text-white shadow-lg rounded-md h-8 px-6 border border-slate-300 relative"
            style={{ width: '120px' }} // Match Buy Now button width more precisely
          >
            <ShoppingCart className="w-3 h-3 mr-1.5" />
            <span className="text-sm">Cart ({getCartItemCount()})</span>
            
            {/* Cart count badge */}
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
              {getCartItemCount()}
            </span>
          </Button>
          
          {/* Tag hole for realistic tag appearance */}
          <div className="absolute top-1.5 left-2.5 w-1.5 h-1.5 rounded-full border-2 border-slate-300 bg-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCartTab;
