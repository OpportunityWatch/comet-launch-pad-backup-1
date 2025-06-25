
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
    <div className="fixed top-[72px] right-4 z-40">
      <Button
        onClick={onOpenCart}
        className="bg-gradient-to-r from-comet-blue to-comet-pink hover:from-comet-blue/90 hover:to-comet-pink/90 text-white relative shadow-lg"
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
    </div>
  );
};

export default FloatingCartTab;
