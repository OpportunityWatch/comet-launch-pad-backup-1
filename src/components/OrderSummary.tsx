
import React from 'react';
import QuantitySelector from './QuantitySelector';

interface OrderSummaryProps {
  productName: string;
  coptersIncluded?: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  baseAmount: number;
  discount: number;
  shipping: number;
  total: number;
  discountCode: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  productName,
  coptersIncluded,
  quantity,
  onQuantityChange,
  baseAmount,
  discount,
  shipping,
  total,
  discountCode
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold">{productName}</h3>
      <div className="text-sm text-gray-600 space-y-1">
        {coptersIncluded && (
          <div className="flex justify-between">
            <span>CometCopters included:</span>
            <span>{coptersIncluded} per pack</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span>Quantity:</span>
          <QuantitySelector 
            quantity={quantity}
            onQuantityChange={onQuantityChange}
          />
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
  );
};

export default OrderSummary;
