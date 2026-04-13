"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface ShopClientProps {
  products: Product[];
  initialCategory: string;
}

const categories = ["All", "Dresses", "Tops", "Sets", "Accessories"];

export default function ShopClient({ products, initialCategory }: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 450000]);

  useEffect(() => {
     const category = searchParams.get('category');
     if (category && categories.includes(category)) {
      setActiveCategory(category);
     }
  }, [searchParams])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/shop?${params.toString()}`);
  }

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortOption) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "newest":
      default:
        return filtered; // Assuming default is newest
    }
  }, [products, activeCategory, sortOption, priceRange]);
  
  const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <div className="p-4 rounded-lg bg-card border space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <Tabs 
              value={activeCategory} 
              onValueChange={handleCategoryChange}
              orientation="vertical"
              className="w-full"
            >
              <TabsList className="h-auto flex-col items-start bg-transparent p-0">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="w-full justify-start data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Price Range</h3>
            <Slider
              min={0}
              max={maxPrice}
              step={1000}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value)}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>

          <Button className="w-full" onClick={() => {
            setActiveCategory('All');
            setPriceRange([0, maxPrice]);
            router.push('/shop');
          }}>Clear Filters</Button>

        </div>
      </aside>

      <main className="lg:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">{filteredAndSortedProducts.length} products</p>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No Products Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
