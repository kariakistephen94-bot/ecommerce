export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'Dresses' | 'Tops' | 'Sets' | 'Accessories';
  sizes: ('S' | 'M' | 'L' | 'XL')[];
};

export type CartItem = {
  id: string;
  product: Product;
  size: string;
  quantity: number;
};

export type Testimonial = {
  name: string;
  avatar: string;
  review: string;
};
