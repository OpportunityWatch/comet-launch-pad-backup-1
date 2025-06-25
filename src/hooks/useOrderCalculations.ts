
import { useMemo } from 'react';

interface UseOrderCalculationsProps {
  basePrice: number;
  quantity: number;
  discountCode: string;
}

interface OrderCalculations {
  baseAmount: number;
  discount: number;
  shipping: number;
  total: number;
}

export const useOrderCalculations = ({ 
  basePrice, 
  quantity, 
  discountCode 
}: UseOrderCalculationsProps): OrderCalculations => {
  return useMemo(() => {
    const baseAmount = basePrice * quantity;
    const discount = discountCode === 'JULY4' ? baseAmount * 0.25 : 0;
    const shipping = (discountCode === 'JULY4' || baseAmount >= 1795) ? 0 : 495; // Free shipping for JULY4 or orders $17.95+
    const total = baseAmount - discount + shipping;

    return {
      baseAmount,
      discount,
      shipping,
      total
    };
  }, [basePrice, quantity, discountCode]);
};
