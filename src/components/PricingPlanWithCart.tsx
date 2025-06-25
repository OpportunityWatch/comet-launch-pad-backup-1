
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus } from "lucide-react";
import { useShoppingCartContext } from '@/contexts/ShoppingCartContext';
import { useToast } from '@/hooks/use-toast';

interface PricingPlanWithCartProps {
  id: string;
  title: string;
  price: string;
  priceInCents: number;
  description: string;
  features: string[];
  popular?: boolean;
  image: string;
  quantity: string;
  coptersIncluded?: number;
  className?: string;
  onOpenCart?: () => void;
}

const PricingPlanWithCart: React.FC<PricingPlanWithCartProps> = ({
  id,
  title,
  price,
  priceInCents,
  description,
  features,
  popular,
  image,
  quantity,
  coptersIncluded,
  className = "",
  onOpenCart
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addToCart } = useShoppingCartContext();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price: priceInCents,
      coptersIncluded
    }, selectedQuantity);

    toast({
      title: "Added to Cart!",
      description: `${selectedQuantity}x ${title} added to your cart`,
      duration: 5000,
      action: onOpenCart ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenCart}
          className="bg-white text-black hover:bg-gray-100"
        >
          View Cart
        </Button>
      ) : undefined
    });
  };

  const isThreePack = title.includes('3-Pack');
  
  return (
    <div 
      className={`relative rounded-xl overflow-hidden transition-transform hover:scale-105 ${
        popular ? "border-2 border-comet-blue shadow-xl shadow-comet-blue/20" : "border border-white/10"
      } ${className}`}
      data-plan={isThreePack ? "3-pack" : undefined}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-comet-blue to-comet-pink text-white py-1 px-4 text-sm font-medium z-10">
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
          
          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-2">Quantity:</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-white font-medium">{selectedQuantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-6 pt-0">
          <Button 
            onClick={handleAddToCart}
            className={`w-full py-6 ${
              popular 
                ? "bg-comet-blue hover:bg-comet-blue/80 text-white" 
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlanWithCart;
