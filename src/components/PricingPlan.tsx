import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingPlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  image: string;
  quantity: string;
  onBuyNow: () => void;
  className?: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  popular,
  image,
  quantity,
  onBuyNow,
  className = ""
}) => {
  const isThreePack = title.includes('3-Pack');
  
  return (
    <div 
      className={`relative rounded-xl overflow-hidden transition-transform hover:scale-105 ${
        popular ? "border-2 border-comet-blue shadow-xl shadow-comet-blue/20" : "border border-white/10"
      } ${className}`}
      data-plan={isThreePack ? "3-pack" : undefined}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-comet-blue text-white py-1 px-4 text-sm font-medium z-10">
          Best Value
        </div>
      )}
      <div className="bg-white/5 h-full flex flex-col">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <div className="flex items-end mb-4">
            <span className="text-3xl font-bold text-white">{price}</span>
            <span className="text-white/70 ml-1 mb-1">{quantity}</span>
          </div>
          <p className="text-white/70 mb-6">{description}</p>
          <img 
            src={image}
            alt={title}
            className="w-full aspect-square object-contain mb-6 rounded-lg bg-gradient-to-b from-transparent to-comet-blue/10 p-2"
          />
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-comet-blue shrink-0 mr-2" />
                <span className="text-white/80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto p-6 pt-0">
          <Button 
            onClick={onBuyNow}
            className={`w-full py-6 ${
              popular 
                ? "bg-comet-blue hover:bg-comet-blue/80 text-white" 
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
