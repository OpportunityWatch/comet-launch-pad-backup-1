
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  total
}) => {
  return (
    <div className="space-y-6">
      {/* Cart Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.quantity}x {item.name}</span>
              <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
            </div>
          ))}
          
          <div className="border-t pt-2 space-y-1">
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
