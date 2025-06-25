
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  disabled?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  disabled = false
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleDecrease}
        disabled={disabled || quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleIncrease}
        disabled={disabled}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
