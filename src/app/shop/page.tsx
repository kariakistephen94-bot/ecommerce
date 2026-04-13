import { products } from "@/lib/products";
import ShopClient from "./components/ShopClient";

export default function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : 'All';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Shop Collection</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find your next favorite outfit from our curated collection.</p>
      </div>
      <ShopClient products={products} initialCategory={category} />
    </div>
  );
}
