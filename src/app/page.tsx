import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    avatar: 'SL',
    image: 'https://picsum.photos/seed/t1/100/100',
    review:
      'The quality is amazing and the style is so unique. I feel so confident whenever I wear my Hot Ice outfit. A true gem!',
  },
  {
    name: 'Jessica M.',
    avatar: 'JM',
    image: 'https://picsum.photos/seed/t2/100/100',
    review:
      "Absolutely in love with my new dress! The fit is perfect, and I've received so many compliments. Fast shipping too!",
  },
  {
    name: 'Emily R.',
    avatar: 'ER',
    image: 'https://picsum.photos/seed/t3/100/100',
    review:
      "Hot Ice Boutique is my go-to for classy and trendy outfits. Their collections are always on point. Highly recommend!",
  },
];

export default function Home() {
  const heroImage = placeholderImages.find((img) => img.id === 'hero');
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-top"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Elevate Your Style with Classy UK Fashion
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200">
            Discover trendy, classy UK-style outfits for ladies who value quality and confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-neutral-200">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/shop">Explore Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
            <p className="text-muted-foreground mt-2">Check out the latest additions to our collection.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Best Sellers</h2>
            <p className="text-muted-foreground mt-2">Loved by our customers, discover your new favorite.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
            <p className="text-muted-foreground mt-2">We are trusted by stylish women everywhere.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">"{testimonial.review}"</p>
                </CardContent>
                <div className="flex items-center gap-4 p-6 pt-0">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Join Our Newsletter</h2>
            <p className="text-muted-foreground mt-2">
              Get exclusive access to new arrivals, special offers, and style tips delivered to your inbox.
            </p>
            <form className="mt-8 flex max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-r-none focus:ring-0"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="rounded-l-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
