
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { cartItems, getCartTotal, getCartItemCount, removeFromCart, updateQuantity } = useShoppingCartContext();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white/10 rounded-lg p-4 text-white/70 text-center">
        <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart ({getCartItemCount()} items)
        </h3>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white/5 rounded p-3">
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm">{item.name}</h4>
              <p className="text-white/70 text-xs">
                ${(item.price / 100).toFixed(2)} each
                {item.coptersIncluded && ` • ${item.coptersIncluded} copters per pack`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-white/70 hover:text-white"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-white/70 hover:text-white"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/20 pt-3">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white font-semibold">Total:</span>
          <span className="text-white font-bold text-lg">
            ${(getCartTotal() / 100).toFixed(2)}
          </span>
        </div>
        
        <Button 
          onClick={onCheckout}
          className="w-full bg-comet-blue hover:bg-comet-blue/80 text-white"
        >
          Checkout Cart
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
