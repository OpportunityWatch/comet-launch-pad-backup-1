
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useOrderCalculations } from "@/hooks/useOrderCalculations";
import OrderSummary from "./OrderSummary";
import PaymentMethodSelector from "./PaymentMethodSelector";

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
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('venmo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const { baseAmount, discount, shipping, total } = useOrderCalculations({
    basePrice: product.price,
    quantity,
    discountCode
  });

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleStripePayment = async () => {
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
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAlternativePayment = async () => {
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

      toast({
        title: "Order Created!",
        description: `Please send $${total.toFixed(2)} via ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}. Check your email for payment instructions.`,
        duration: 8000
      });

      onClose();
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: "Order Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Choose Payment Method</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <OrderSummary
            productName={product.name}
            coptersIncluded={product.coptersIncluded}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
              placeholder="Enter JULY4 for 25% off"
            />
            {discountCode === 'JULY4' && (
              <p className="text-green-600 text-sm mt-1">✓ 25% off + Free shipping applied!</p>
            )}
          </div>

          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />

          {/* Payment Button */}
          <div className="space-y-2">
            {paymentMethod === 'stripe' ? (
              <Button 
                onClick={handleStripePayment} 
                disabled={isProcessing || !email}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : `Pay $${(total / 100).toFixed(2)} with Card`}
              </Button>
            ) : (
              <Button 
                onClick={handleAlternativePayment} 
                disabled={isProcessing || !email}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : `Create Order - $${(total / 100).toFixed(2)}`}
              </Button>
            )}
            
            <p className="text-xs text-gray-500 text-center">
              {paymentMethod !== 'stripe' ? 
                'Payment instructions will be sent to your email' : 
                'You will be redirected to secure checkout'
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
