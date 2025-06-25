
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOrderCalculations } from "@/hooks/useOrderCalculations";
import { useCartPaymentForm } from "@/hooks/useCartPaymentForm";
import CartPaymentForm from "./CartPaymentForm";
import PaymentButton from "./PaymentButton";
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

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Checkout Cart</DialogTitle>
        </DialogHeader>
        
        <CartPaymentForm
          cartItems={cartItems}
          email={email}
          onEmailChange={setEmail}
          discountCode={discountCode}
          onDiscountCodeChange={setDiscountCode}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          baseAmount={baseAmount}
          discount={discount}
          shipping={shipping}
          total={total}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
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

export default CartCheckoutDialog;
