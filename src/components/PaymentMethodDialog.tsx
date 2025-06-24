
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Smartphone, DollarSign, Send } from "lucide-react";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    quantity: number;
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
  const { toast } = useToast();

  const calculateTotal = () => {
    const baseAmount = product.price * product.quantity;
    const discount = discountCode === 'JULY4' ? baseAmount * 0.25 : 0;
    const shipping = (discountCode === 'JULY4' || baseAmount >= 1795) ? 0 : 495; // Free shipping for JULY4 or orders $17.95+
    return {
      baseAmount,
      discount,
      shipping,
      total: baseAmount - discount + shipping
    };
  };

  const { baseAmount, discount, shipping, total } = calculateTotal();

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
          quantity: product.quantity,
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
          quantity: product.quantity,
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
          {/* Product Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">{product.name}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{product.quantity}</span>
              </div>
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

          {/* Payment Method Selection */}
          <div>
            <Label>Select Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="venmo" id="venmo" />
                <div className="flex items-center space-x-2 flex-1">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <Label htmlFor="venmo" className="font-medium">Venmo</Label>
                    <p className="text-sm text-gray-600">@robbiescramble - No fees!</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="cashapp" id="cashapp" />
                <div className="flex items-center space-x-2 flex-1">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <Label htmlFor="cashapp" className="font-medium">Cash App</Label>
                    <p className="text-sm text-gray-600">$RetroPatriot - No fees!</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="paypal" id="paypal" />
                <div className="flex items-center space-x-2 flex-1">
                  <Send className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <Label htmlFor="paypal" className="font-medium">PayPal</Label>
                    <p className="text-sm text-gray-600">paypal.me/retropatriot - Friends & Family</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="stripe" id="stripe" />
                <div className="flex items-center space-x-2 flex-1">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <Label htmlFor="stripe" className="font-medium">Credit/Debit Card</Label>
                    <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

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
