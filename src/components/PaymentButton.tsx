
import React from 'react';
import { Button } from "@/components/ui/button";

interface PaymentButtonProps {
  paymentMethod: string;
  total: number;
  isProcessing: boolean;
  disabled: boolean;
  onPayment: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  paymentMethod,
  total,
  isProcessing,
  disabled,
  onPayment
}) => {
  return (
    <div className="space-y-2">
      {paymentMethod === 'stripe' ? (
        <Button 
          onClick={onPayment} 
          disabled={disabled}
          className="w-full"
        >
          {isProcessing ? 'Processing...' : `Pay $${(total / 100).toFixed(2)} with Card`}
        </Button>
      ) : (
        <Button 
          onClick={onPayment} 
          disabled={disabled}
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
  );
};

export default PaymentButton;
