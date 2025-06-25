
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';

interface SlidingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const SlidingCart: React.FC<SlidingCartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, getCartTotal, getCartItemCount, removeFromCart, updateQuantity } = useShoppingCartContext();

  const handleCheckout = () => {
    onCheckout();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* Sliding Cart Panel */}
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md bg-[#1a1a2e] border-l border-comet-blue/30 text-white overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart ({getCartItemCount()} items)
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-white/70">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
              <p className="text-sm mt-2">Add some CometCopters to get started!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white/10 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-white/70 text-sm">
                          ${(item.price / 100).toFixed(2)} each
                          {item.coptersIncluded && ` • ${item.coptersIncluded} copters per pack`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-white font-semibold">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Total and Checkout */}
              <div className="border-t border-white/20 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-lg">Total:</span>
                  <span className="text-white font-bold text-xl">
                    ${(getCartTotal() / 100).toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-comet-blue hover:bg-comet-blue/80 text-white py-3 text-lg font-semibold"
                >
                  Checkout Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SlidingCart;
