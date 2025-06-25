
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from './useShoppingCart';

export const useCartPaymentForm = () => {
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('venmo');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleStripePayment = async (cartItems: CartItem[], total: number) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return false;
    }

    setIsProcessing(true);
    try {
      // Create line items for Stripe
      const lineItems = cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price // Price per unit in cents
      }));

      const { data, error } = await supabase.functions.invoke('create-cart-payment', {
        body: {
          email,
          lineItems,
          discountCode: discountCode || null,
          totalAmount: total
        }
      });

      if (error) throw error;

      // Open Stripe checkout in popup
      const popup = window.open(data.url, 'stripe-checkout', 'width=600,height=600,scrollbars=yes,resizable=yes');
      
      // Monitor popup for completion
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          // Optionally refresh or check payment status here
        }
      }, 1000);

      return true; // Success
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAlternativePayment = async (cartItems: CartItem[], baseAmount: number, discount: number, total: number) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return false;
    }

    setIsProcessing(true);
    try {
      // Create order summary for alternative payment
      const productName = `Cart Order: ${cartItems.length} items (${cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ')})`;

      const { error } = await supabase
        .from('orders')
        .insert({
          email,
          product_name: productName,
          quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
          amount: baseAmount,
          discount_code: discountCode || null,
          discount_amount: discount || 0,
          final_amount: total,
          payment_method: paymentMethod,
          status: 'pending'
        });

      if (error) throw error;

      // Send email notification
      try {
        console.log("Sending email notification for alternative payment...");
        const { error: emailError } = await supabase.functions.invoke('send-order-notification', {
          body: {
            email,
            productName,
            quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            amount: baseAmount,
            finalAmount: total,
            discountCode: discountCode || null,
            paymentMethod
          }
        });

        if (emailError) {
          console.error("Email notification error:", emailError);
        } else {
          console.log("Email notification sent successfully");
        }
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }

      toast({
        title: "Order Created!",
        description: `Please send $${(total / 100).toFixed(2)} via ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}. Check your email for payment instructions.`,
        duration: 8000
      });

      return true; // Success
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: "Order Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    email,
    setEmail,
    discountCode,
    setDiscountCode,
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    handleStripePayment,
    handleAlternativePayment
  };
};
