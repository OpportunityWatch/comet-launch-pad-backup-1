
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useOrderCalculations } from "@/hooks/useOrderCalculations";
import { useCartPaymentForm } from "@/hooks/useCartPaymentForm";
import CartOrderForm from "./CartOrderForm";
import CartPaymentSection from "./CartPaymentSection";
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';

interface CartCheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartCheckoutDialog: React.FC<CartCheckoutDialogProps> = ({
  isOpen,
  onClose
}) => {
  const { cartItems, getCartTotal, clearCart, updateQuantity, removeFromCart } = useShoppingCartContext();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  
  const {
    email,
    setEmail,
    discountCode,
    setDiscountCode,
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    handleStripePayment,
    handleAlternativePayment
  } = useCartPaymentForm();

  const baseTotal = getCartTotal();
  const { baseAmount, discount, shipping, total } = useOrderCalculations({
    basePrice: baseTotal,
    quantity: 1, // Quantity is already factored into baseTotal
    discountCode
  });

  const handleConfirmOrder = () => {
    if (email) {
      setShowPaymentOptions(true);
    }
  };

  const handlePayment = async () => {
    let success = false;
    
    if (paymentMethod === 'stripe') {
      success = await handleStripePayment(cartItems, total);
    } else {
      success = await handleAlternativePayment(cartItems, baseAmount, discount, total);
    }
    
    if (success) {
      clearCart();
      onClose();
    }
  };

  const handleBack = () => {
    if (showPaymentOptions) {
      setShowPaymentOptions(false);
    } else {
      onClose();
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-hidden flex flex-col" hideCloseButton>
        <DialogHeader className="relative flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-0 top-0 h-8 w-8 p-0"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-center">
            {showPaymentOptions ? 'Payment Options' : 'Review Order'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          {!showPaymentOptions ? (
            <CartOrderForm
              cartItems={cartItems}
              email={email}
              onEmailChange={setEmail}
              discountCode={discountCode}
              onDiscountCodeChange={setDiscountCode}
              baseAmount={baseAmount}
              discount={discount}
              shipping={shipping}
              total={total}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onConfirmOrder={handleConfirmOrder}
              canConfirm={!!email}
            />
          ) : (
            <CartPaymentSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              total={total}
              isProcessing={isProcessing}
              onPayment={handlePayment}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartCheckoutDialog;
