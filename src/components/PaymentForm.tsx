
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OrderSummary from "./OrderSummary";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface PaymentFormProps {
  product: {
    name: string;
    price: number;
    quantity: number;
    coptersIncluded?: number;
  };
  email: string;
  onEmailChange: (email: string) => void;
  discountCode: string;
  onDiscountCodeChange: (code: string) => void;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  baseAmount: number;
  discount: number;
  shipping: number;
  total: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  product,
  email,
  onEmailChange,
  discountCode,
  onDiscountCodeChange,
  paymentMethod,
  onPaymentMethodChange,
  quantity,
  onQuantityChange,
  baseAmount,
  discount,
  shipping,
  total
}) => {
  return (
    <div className="space-y-6">
      <OrderSummary
        productName={product.name}
        coptersIncluded={product.coptersIncluded}
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        baseAmount={baseAmount}
        discount={discount}
        shipping={shipping}
        total={total}
        discountCode={discountCode}
      />

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

export default PaymentForm;
