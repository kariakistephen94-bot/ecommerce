"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { cn, formatPrice } from '@/lib/utils';
import OutfitSuggestions from './OutfitSuggestions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes.length > 1 ? null : product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { dispatch } = useCart();
  const { toast } = useToast();

  const productImages = product.images
    .map((id) => placeholderImages.find((p) => p.id === id))
    .filter((img): img is NonNullable<typeof img> => !!img);

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, size: selectedSize!, quantity },
    });
    toast({
      title: 'Added to cart',
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const selectedImage = productImages[selectedImageIndex];

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div className="space-y-4">
        <div className="bg-card rounded-lg overflow-hidden aspect-[3/4] border">
          {selectedImage && (
             <Image
              src={selectedImage.imageUrl}
              alt={`${product.name} image ${selectedImageIndex + 1}`}
              width={800}
              height={1200}
              className="w-full h-full object-cover"
              data-ai-hint={selectedImage.imageHint}
              priority
            />
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {productImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                'aspect-[3/4] rounded-md overflow-hidden border-2',
                index === selectedImageIndex ? 'border-primary' : 'border-transparent'
              )}
            >
              <Image
                src={img.imageUrl}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={200}
                height={300}
                className="w-full h-full object-cover"
                data-ai-hint={img.imageHint}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-accent">{product.category.toUpperCase()}</p>
          <h1 className="text-3xl lg:text-4xl font-bold mt-1">{product.name}</h1>
          <p className="text-3xl font-semibold mt-4">{formatPrice(product.price)}</p>
        </div>

        {product.sizes.length > 1 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-md">Size</h3>
            <RadioGroup
              value={selectedSize || undefined}
              onValueChange={setSelectedSize}
              className="flex gap-2"
            >
              {product.sizes.map((size) => (
                <div key={size}>
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className={cn(
                      'flex items-center justify-center rounded-md border text-sm h-10 w-10 cursor-pointer',
                      selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : 'bg-card'
                    )}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-semibold text-md">Quantity</h3>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>

        <Button size="lg" className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Product Description</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{product.description}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ai-stylist">
            <AccordionTrigger>AI Fashion Stylist</AccordionTrigger>
            <AccordionContent>
              <OutfitSuggestions product={product} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
