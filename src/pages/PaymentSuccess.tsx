
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-comet-darkblue to-comet-space flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">Payment Successful!</h1>
        
        <p className="text-white/80 mb-6">
          Thank you for your purchase! Your CometCopters are on their way. You'll receive a confirmation email shortly with tracking information.
        </p>
        
        {sessionId && (
          <p className="text-sm text-white/60 mb-6">
            Order ID: {sessionId.slice(-12)}
          </p>
        )}
        
        <div className="space-y-4">
          <div className="bg-comet-blue/20 rounded-lg p-4 border border-comet-blue/30">
            <h3 className="font-semibold text-white mb-2">What's Next?</h3>
            <ul className="text-sm text-white/80 space-y-1 text-left">
              <li>• Confirmation email sent to your inbox</li>
              <li>• Your order will ship within 1-2 business days</li>
              <li>• Tracking information will be provided</li>
              <li>• Enjoy your amazing CometCopters!</li>
            </ul>
          </div>
          
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-comet-blue hover:bg-comet-blue/80"
          >
            Back to Home <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
