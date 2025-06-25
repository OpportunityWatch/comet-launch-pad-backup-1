
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CartPaymentSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  total: number;
  isProcessing: boolean;
  onPayment: () => void;
}

const CartPaymentSection: React.FC<CartPaymentSectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  total,
  isProcessing,
  onPayment
}) => {
  return (
    <div className="space-y-4 p-1">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-base">Choose Payment Method</h3>
        <p className="text-sm text-gray-600 mt-1">Total: ${(total / 100).toFixed(2)}</p>
      </div>

      <div className="space-y-3">
        {/* Credit Card Option */}
        <Card 
          className={`cursor-pointer transition-colors ${
            paymentMethod === 'stripe' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onPaymentMethodChange('stripe')}
        >
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                checked={paymentMethod === 'stripe'}
                onChange={() => onPaymentMethodChange('stripe')}
                className="text-blue-500"
              />
              <div>
                <h4 className="font-medium text-sm">Credit/Debit Card</h4>
                <p className="text-sm text-gray-600">Secure payment via Stripe</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Venmo Option */}
        <Card 
          className={`cursor-pointer transition-colors ${
            paymentMethod === 'venmo' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onPaymentMethodChange('venmo')}
        >
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                checked={paymentMethod === 'venmo'}
                onChange={() => onPaymentMethodChange('venmo')}
                className="text-blue-500"
              />
              <div>
                <h4 className="font-medium text-sm">Venmo</h4>
                <p className="text-sm text-gray-600">Payment instructions sent to email</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PayPal Option */}
        <Card 
          className={`cursor-pointer transition-colors ${
            paymentMethod === 'paypal' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onPaymentMethodChange('paypal')}
        >
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                checked={paymentMethod === 'paypal'}
                onChange={() => onPaymentMethodChange('paypal')}
                className="text-blue-500"
              />
              <div>
                <h4 className="font-medium text-sm">PayPal</h4>
                <p className="text-sm text-gray-600">Payment instructions sent to email</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CashApp Option */}
        <Card 
          className={`cursor-pointer transition-colors ${
            paymentMethod === 'cashapp' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onPaymentMethodChange('cashapp')}
        >
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                checked={paymentMethod === 'cashapp'}
                onChange={() => onPaymentMethodChange('cashapp')}
                className="text-blue-500"
              />
              <div>
                <h4 className="font-medium text-sm">CashApp</h4>
                <p className="text-sm text-gray-600">Payment instructions sent to email</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={onPayment}
        disabled={isProcessing}
        className="w-full mt-4 text-base py-3"
      >
        {isProcessing ? 'Processing...' : 
         paymentMethod === 'stripe' ? 
         `Pay $${(total / 100).toFixed(2)} with Card` : 
         `Create Order - $${(total / 100).toFixed(2)}`
        }
      </Button>
      
      <p className="text-sm text-gray-500 text-center mt-2">
        {paymentMethod !== 'stripe' ? 
          'Payment instructions and QR codes will be sent to your email' : 
          'You will be redirected to secure checkout'
        }
      </p>
    </div>
  );
};

export default CartPaymentSection;
