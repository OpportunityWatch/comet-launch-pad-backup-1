
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePaymentForm = () => {
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('venmo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleStripePayment = async (product: any, total: number) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          email,
          productName: product.name,
          quantity: quantity,
          amount: Math.round(total * 100), // Convert to cents
          discountCode: discountCode || null
        }
      });

      if (error) throw error;

      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
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

  const handleAlternativePayment = async (product: any, baseAmount: number, discount: number, total: number) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Save order to database for tracking
      const { error } = await supabase
        .from('orders')
        .insert({
          email,
          product_name: product.name,
          quantity: quantity,
          amount: Math.round(baseAmount * 100),
          discount_code: discountCode || null,
          discount_amount: Math.round((discount || 0) * 100),
          final_amount: Math.round(total * 100),
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
            productName: product.name,
            quantity: quantity,
            amount: Math.round(baseAmount * 100),
            finalAmount: Math.round(total * 100),
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
        description: `Please send $${total.toFixed(2)} via ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}. Check your email for payment instructions.`,
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
    quantity,
    handleQuantityChange,
    handleStripePayment,
    handleAlternativePayment
  };
};
