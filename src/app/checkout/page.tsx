import CheckoutClient from "./components/CheckoutClient";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Checkout</h1>
      </div>
      <CheckoutClient />
    </div>
  );
}
