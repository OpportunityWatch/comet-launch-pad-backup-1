
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, DollarSign, Send } from "lucide-react";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  onPaymentMethodChange
}) => {
  return (
    <div>
      <Label>Select Payment Method</Label>
      <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange} className="mt-2">
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
  );
};

export default PaymentMethodSelector;
