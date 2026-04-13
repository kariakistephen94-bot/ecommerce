"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Landmark } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(5, "Please enter a valid address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  paymentMethod: z.enum(["card", "transfer"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutClient() {
  const { state, totalPrice, dispatch } = useCart();
  const { items } = state;
  const router = useRouter();
  const { toast } = useToast();
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      paymentMethod: "card",
    },
  });

  useEffect(() => {
    if (items.length === 0 && !isOrderSuccess) {
      toast({
        title: "Your cart is empty",
        description: "Redirecting you to the shop.",
        variant: "destructive"
      });
      router.push("/shop");
    }
  }, [items.length, isOrderSuccess, router, toast]);

  if (items.length === 0 && !isOrderSuccess) {
    return null;
  }

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Order placed:", data);
    setIsOrderSuccess(true);
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Contact & Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Fashion Ave, Style City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0812 826 1466" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <CreditCard className="h-5 w-5 mr-2" />
                            <FormLabel className="font-normal">
                              Credit/Debit Card
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="transfer" />
                            </FormControl>
                             <Landmark className="h-5 w-5 mr-2" />
                            <FormLabel className="font-normal">
                              Bank Transfer
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full">
                  Place Order
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => {
                  const image = placeholderImages.find(p => p.id === item.product.images[0]);
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-20 bg-card rounded-md overflow-hidden flex-shrink-0">
                         {image && <Image src={image.imageUrl} alt={item.product.name} fill className="object-cover" data-ai-hint={image.imageHint}/>}
                         <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{item.quantity}</span>
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  );
                })}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                 <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>{formatPrice(totalPrice)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Shipping</p>
                    <p>{formatPrice(0)}</p>
                  </div>
                   <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>{formatPrice(totalPrice)}</p>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={isOrderSuccess} onOpenChange={setIsOrderSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order Placed Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your purchase. You will receive an email confirmation shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push('/shop')}>
              Continue Shopping
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
