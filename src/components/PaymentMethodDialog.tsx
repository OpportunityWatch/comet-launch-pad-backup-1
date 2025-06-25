
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOrderCalculations } from "@/hooks/useOrderCalculations";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import PaymentForm from "./PaymentForm";
import PaymentButton from "./PaymentButton";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    quantity: number;
    coptersIncluded?: number;
  };
}

const PaymentMethodDialog: React.FC<PaymentMethodDialogProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const {
    email,
    setEmail,
    discountCode,
    setDiscountCode,
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    quantity,
    handleQuantityChange,
    handleStripePayment,
    handleAlternativePayment
  } = usePaymentForm();

  const { baseAmount, discount, shipping, total } = useOrderCalculations({
    basePrice: product.price,
    quantity,
    discountCode
  });

  const handlePayment = async () => {
    let success = false;
    
    if (paymentMethod === 'stripe') {
      success = await handleStripePayment(product, total);
    } else {
      success = await handleAlternativePayment(product, baseAmount, discount, total);
    }
    
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Choose Payment Method</DialogTitle>
        </DialogHeader>
        
        <PaymentForm
          product={product}
          email={email}
          onEmailChange={setEmail}
          discountCode={discountCode}
          onDiscountCodeChange={setDiscountCode}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          baseAmount={baseAmount}
          discount={discount}
          shipping={shipping}
          total={total}
        />

        <PaymentButton
          paymentMethod={paymentMethod}
          total={total}
          isProcessing={isProcessing}
          disabled={isProcessing || !email}
          onPayment={handlePayment}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
