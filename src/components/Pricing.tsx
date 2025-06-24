
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
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  popular,
  image,
  quantity
}) => {
  return (
    <div className={`relative rounded-xl overflow-hidden transition-transform hover:scale-105 ${
      popular ? "border-2 border-comet-blue shadow-xl shadow-comet-blue/20" : "border border-white/10"
    }`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-comet-blue text-white py-1 px-4 text-sm font-medium">
          Best Value
        </div>
      )}
      <div className="bg-white/5 backdrop-blur-sm h-full flex flex-col">
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

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-comet-space to-comet-darkblue relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Package</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Select the perfect CometCopters package for your next adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingPlan
            title="Single CometCopter"
            price="$6.95"
            quantity="per copter"
            description="Perfect for trying out the CometCopter experience"
            image="/lovable-uploads/abf91c70-a4a3-4ca1-ad37-411309ed353a.png"
            features={[
              "1 CometCopter with launcher",
              "Batteries included",
              "Extra set of batteries",
              "Easy setup instructions",
              "$4.95 shipping & handling"
            ]}
            buttonText="Buy Now"
          />
          
          <PricingPlan
            title="3-Pack + 1 FREE"
            price="$15.95"
            quantity="($3.99 each)"
            description="Our most popular package with bonus CometCopter"
            image="/lovable-uploads/f9bc0aba-1ac0-44fd-bb47-179144f982c7.png"
            features={[
              "3 CometCopters + 1 FREE",
              "4 launchers included",
              "Batteries included",
              "4 extra sets of batteries",
              "FREE shipping & handling"
            ]}
            buttonText="Buy Now"
            popular={true}
          />
          
          <PricingPlan
            title="9-Pack Party Bundle"
            price="$39.95"
            quantity="($3.33 each)"
            description="Perfect for parties and large gatherings"
            image="/lovable-uploads/1e565c7f-c0a0-45fe-a4f6-bf2ddc7e5d53.png"
            features={[
              "9 CometCopters + 3 FREE",
              "12 launchers included",
              "Batteries included",
              "12 extra sets of batteries",
              "FREE shipping & handling"
            ]}
            buttonText="Buy Now"
          />
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mt-16 border border-white/10 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-6">
              <div className="w-16 h-16 bg-comet-blue/20 rounded-full flex items-center justify-center text-comet-blue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-white/70">
                We're confident you'll love your CometCopters. If you're not completely satisfied with your purchase, contact us within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
