import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm">
              Classy UK-style outfits for the modern woman.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/shop?category=Dresses" className="text-muted-foreground hover:text-primary">Dresses</Link></li>
              <li><Link href="/shop?category=Tops" className="text-muted-foreground hover:text-primary">Tops</Link></li>
              <li><Link href="/shop?category=Sets" className="text-muted-foreground hover:text-primary">Sets</Link></li>
              <li><Link href="/shop?category=Accessories" className="text-muted-foreground hover:text-primary">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">About Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Wuse 2, Abuja</li>
              <li>0812 826 1466</li>
              <li>support@hotice.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hot Ice Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
