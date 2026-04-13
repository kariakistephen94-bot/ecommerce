import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const primaryImage = placeholderImages.find(p => p.id === product.images[0]);
  const secondaryImage = placeholderImages.find(p => p.id === product.images[1]);

  return (
    <Card className="overflow-hidden group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="overflow-hidden aspect-[3/4] relative">
          {primaryImage && (
            <Image
              src={primaryImage.imageUrl}
              alt={product.name}
              width={800}
              height={1200}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              data-ai-hint={primaryImage.imageHint}
            />
          )}
          {secondaryImage && (
             <Image
              src={secondaryImage.imageUrl}
              alt={product.name}
              width={800}
              height={1200}
              className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              data-ai-hint={secondaryImage.imageHint}
            />
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
          <p className="font-semibold mt-2">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
    </Card>
  );
};
