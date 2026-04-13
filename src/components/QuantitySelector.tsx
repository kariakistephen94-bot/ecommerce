"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  min?: number;
}

export const QuantitySelector = ({ quantity, setQuantity, min = 1 }: QuantitySelectorProps) => {
  const handleDecrement = () => {
    setQuantity(Math.max(min, quantity - 1));
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center">
      <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleDecrement}>
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        className="w-16 text-center mx-2 h-9"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || min)}
        min={min}
      />
      <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleIncrement}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
