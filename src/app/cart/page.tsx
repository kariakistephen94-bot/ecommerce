import CartClient from "./components/CartClient";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">Review your items and proceed to checkout.</p>
      </div>
      <CartClient />
    </div>
  );
}
