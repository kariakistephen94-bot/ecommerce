import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Gem, Target, Users } from 'lucide-react';

export default function AboutPage() {
  const aboutImage = placeholderImages.find((img) => img.id === 'about');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Our Story</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
            For the Confident, Modern Woman
          </h1>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Founded by two friends with a shared passion for fashion, <strong>Hot Ice Boutique</strong> was born from a desire to bring trendy, classy UK-style outfits to women who aren't afraid to stand out. As a women-owned business, we understand the power of a great outfit and its ability to inspire confidence.
            </p>
            <p>
              We believe that luxury should be accessible and that every woman deserves to have a wardrobe she loves. That's why we meticulously curate our collections, focusing on premium quality fabrics, impeccable tailoring, and timeless designs with a modern twist.
            </p>
          </div>
          <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={1200}
                height={800}
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>

        <div className="mt-20 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="mt-2 text-muted-foreground">
                To help women upgrade their wardrobes confidently with high-quality, stylish pieces that empower them to express their unique personality.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent mb-4">
                <Gem className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Our Values</h2>
              <p className="mt-2 text-muted-foreground">
                We are committed to quality, style, and customer satisfaction. We believe in fashion that lasts, both in craftsmanship and in design.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Women-Owned</h2>
              <p className="mt-2 text-muted-foreground">
                Proudly founded and run by women, we champion female empowerment in every aspect of our business, from design to delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
