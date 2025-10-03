export interface Product {
  id: string;
  name: string;
  category: 'mobiles' | 'laptops' | 'headphones' | 'smart-devices' | 'accessories';
  price: number;
  image: string;
  description: string;
  specifications: { [key: string]: string };
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
