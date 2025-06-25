
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
      {/* Tag Style Cart Button */}
      <div className="relative">
        {/* String/attachment point - always visible */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-slate-400"></div>
        
        {/* Collapsed state - gray indicator - make it more visible */}
        {!isHovered && (
          <div className="mt-3 cursor-pointer">
            <div className="bg-slate-400 hover:bg-slate-300 transition-colors shadow-lg rounded-sm h-4 w-16 mx-auto border-2 border-slate-300"></div>
          </div>
        )}
        
        {/* Expanded state - full tag */}
        {isHovered && (
          <div className="relative mt-2 animate-fade-in">
            <Button
              onClick={onOpenCart}
              className="bg-slate-700 hover:bg-slate-600 text-white shadow-lg rounded-sm h-8 px-4 min-w-[120px] text-sm border border-slate-600"
              size="sm"
            >
              <ShoppingCart className="w-3 h-3 mr-1.5" />
              Cart ({getCartItemCount()})
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {getCartItemCount()}
                </span>
              )}
            </Button>
            
            {/* Tag hole */}
            <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full border border-slate-500 bg-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingCartTab;
