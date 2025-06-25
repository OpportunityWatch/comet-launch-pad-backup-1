
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
      {/* Tag Style Cart Button */}
      <div className="relative">
        {/* String/attachment point */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-slate-600"></div>
        
        {/* Tag body */}
        <div className="relative mt-2">
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
      </div>
    </div>
  );
};

export default FloatingCartTab;
