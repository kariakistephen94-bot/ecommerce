"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { QuantitySelector } from '@/components/QuantitySelector';
import { placeholderImages } from '@/lib/placeholder-images';
import { X } from 'lucide-react';

export default function CartClient() {
  const { state, dispatch, totalPrice, cartCount } = useCart();
  const { items } = state;

  if (items.length === 0) {
    return (
      <div className="text-center py-20 border-dashed border-2 rounded-lg">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2">Looks like you haven't added anything yet.</p>
        <Button asChild className="mt-6">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };
  
  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => {
          const image = placeholderImages.find(p => p.id === item.product.images[0]);
          return (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex items-center p-4 gap-4">
                <div className="w-24 h-32 aspect-[3/4] bg-card rounded-md overflow-hidden flex-shrink-0">
                  {image && (
                     <Image
                      src={image.imageUrl}
                      alt={item.product.name}
                      width={100}
                      height={133}
                      className="w-full h-full object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
                <div className="flex-grow">
                  <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  <p className="text-sm text-muted-foreground mt-2">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <QuantitySelector 
                    quantity={item.quantity} 
                    setQuantity={(q) => handleUpdateQuantity(item.id, q)}
                  />
                  <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-4 self-start" onClick={() => handleRemoveItem(item.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="lg:col-span-1 sticky top-20">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Subtotal</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Shipping</p>
            <p>Calculated at next step</p>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild size="lg" className="w-full">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
