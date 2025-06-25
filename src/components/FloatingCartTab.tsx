
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';

interface FloatingCartTabProps {
  onOpenCart: () => void;
}

const FloatingCartTab: React.FC<FloatingCartTabProps> = ({ onOpenCart }) => {
  const { getCartItemCount } = useShoppingCartContext();

  return (
    <div className="absolute top-full right-4 z-40">
      {/* Ribbon/Tag Style Cart Button */}
      <div className="relative">
        {/* Ribbon tail/point */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-comet-blue"></div>
        
        <Button
          onClick={onOpenCart}
          className="bg-gradient-to-r from-comet-blue to-comet-pink hover:from-comet-blue/90 hover:to-comet-pink/90 text-white relative shadow-lg rounded-t-none rounded-b-lg h-10 px-8 min-w-[140px]"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart ({getCartItemCount()})
          {getCartItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-comet-yellow text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {getCartItemCount()}
            </span>
          )}
        </Button>
        
        {/* Ribbon sides for hanging effect */}
        <div className="absolute top-0 -left-1 w-1 h-4 bg-gradient-to-b from-comet-blue/80 to-comet-blue transform -skew-y-12"></div>
        <div className="absolute top-0 -right-1 w-1 h-4 bg-gradient-to-b from-comet-pink/80 to-comet-pink transform skew-y-12"></div>
      </div>
    </div>
  );
};

export default FloatingCartTab;
