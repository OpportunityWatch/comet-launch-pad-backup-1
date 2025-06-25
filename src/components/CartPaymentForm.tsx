
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from "lucide-react";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { CartItem } from '@/hooks/useShoppingCart';

interface CartPaymentFormProps {
  cartItems: CartItem[];
  email: string;
  onEmailChange: (email: string) => void;
  discountCode: string;
  onDiscountCodeChange: (code: string) => void;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  baseAmount: number;
  discount: number;
  shipping: number;
  total: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
}

const CartPaymentForm: React.FC<CartPaymentFormProps> = ({
  cartItems,
  email,
  onEmailChange,
  discountCode,
  onDiscountCodeChange,
  paymentMethod,
  onPaymentMethodChange,
  baseAmount,
  discount,
  shipping,
  total,
  onUpdateQuantity,
  onRemoveFromCart
}) => {
  return (
    <div className="space-y-6">
      {/* Cart Summary with Quantity Controls */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Order Summary</h3>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-gray-600 text-xs">
                  ${(item.price / 100).toFixed(2)} each
                  {item.coptersIncluded && ` • ${item.coptersIncluded} copters per pack`}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Quantity Controls */}
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                {/* Remove Item Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                
                {/* Item Total */}
                <div className="w-16 text-right">
                  <span className="text-sm font-medium">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Order Totals */}
          <div className="border-t pt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${(baseAmount / 100).toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>JULY4 Discount (25%):</span>
                <span>-${(discount / 100).toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `$${(shipping / 100).toFixed(2)}`}</span>
            </div>
            
            <div className="flex justify-between font-bold border-t pt-1">
              <span>Total:</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Input */}
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      {/* Discount Code */}
      <div>
        <Label htmlFor="discount">Discount Code (Optional)</Label>
        <Input
          id="discount"
          value={discountCode}
          onChange={(e) => onDiscountCodeChange(e.target.value.toUpperCase())}
          placeholder="Enter JULY4 for 25% off"
        />
        {discountCode === 'JULY4' && (
          <p className="text-green-600 text-sm mt-1">✓ 25% off + Free shipping applied!</p>
        )}
      </div>

      <PaymentMethodSelector
        paymentMethod={paymentMethod}
        onPaymentMethodChange={onPaymentMethodChange}
      />
    </div>
  );
};

export default CartPaymentForm;
