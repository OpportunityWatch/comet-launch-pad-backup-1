
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from "lucide-react";
import { CartItem } from '@/hooks/useShoppingCart';

interface CartOrderFormProps {
  cartItems: CartItem[];
  email: string;
  onEmailChange: (email: string) => void;
  discountCode: string;
  onDiscountCodeChange: (code: string) => void;
  baseAmount: number;
  discount: number;
  shipping: number;
  total: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  onConfirmOrder: () => void;
  canConfirm: boolean;
}

const CartOrderForm: React.FC<CartOrderFormProps> = ({
  cartItems,
  email,
  onEmailChange,
  discountCode,
  onDiscountCodeChange,
  baseAmount,
  discount,
  shipping,
  total,
  onUpdateQuantity,
  onRemoveFromCart,
  onConfirmOrder,
  canConfirm
}) => {
  return (
    <div className="space-y-4">
      {/* Cart Summary - Increased font sizes */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <h3 className="font-semibold mb-2 text-base">Order Summary</h3>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-b-0">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-gray-600 text-sm">
                  ${(item.price / 100).toFixed(2)} each
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 ml-1"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-14 text-right">
                  ${((item.price * item.quantity) / 100).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          
          {/* Order Totals - Increased font sizes */}
          <div className="border-t pt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${(baseAmount / 100).toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount (25%):</span>
                <span>-${(discount / 100).toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `$${(shipping / 100).toFixed(2)}`}</span>
            </div>
            
            <div className="flex justify-between font-bold border-t pt-1 text-base">
              <span>Total:</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information - Increased font sizes */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="your@email.com"
            required
            className="mt-1 text-base"
          />
        </div>

        <div>
          <Label htmlFor="discount" className="text-sm font-medium">Discount Code (Optional)</Label>
          <Input
            id="discount"
            value={discountCode}
            onChange={(e) => onDiscountCodeChange(e.target.value.toUpperCase())}
            placeholder="Enter JULY4 for 25% off"
            className="mt-1 text-base"
          />
          {discountCode === 'JULY4' && (
            <p className="text-green-600 text-sm mt-1">✓ 25% off + Free shipping applied!</p>
          )}
        </div>

        <Button 
          onClick={onConfirmOrder}
          disabled={!canConfirm}
          className="w-full mt-4 text-base py-3"
        >
          Confirm Order - ${(total / 100).toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default CartOrderForm;
