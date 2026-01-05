
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Royal Velvet Sherwani', category: 'Sherwani', variety: 'Embroidered Velvet', price: 24999, image: 'https://picsum.photos/seed/sher1/400/500' },
  { id: '2', name: 'Classic Silk Sherwani', category: 'Sherwani', variety: 'Pure Silk', price: 18500, image: 'https://picsum.photos/seed/sher2/400/500' },
  { id: '3', name: 'Slim-Fit Tuxedo', category: 'Coat Suit', variety: 'Italian Wool', price: 12999, image: 'https://picsum.photos/seed/coat1/400/500' },
  { id: '4', name: 'Double Breasted Suit', category: 'Coat Suit', variety: 'Business Formal', price: 8500, image: 'https://picsum.photos/seed/coat2/400/500' },
  { id: '5', name: 'Cotton Linen Kurta', category: 'Kurta Pajama', variety: 'Summer Collection', price: 2999, image: 'https://picsum.photos/seed/kurta1/400/500' },
  { id: '6', name: 'Tussar Silk Kurta', category: 'Kurta Pajama', variety: 'Festive Wear', price: 5499, image: 'https://picsum.photos/seed/kurta2/400/500' },
  { id: '7', name: 'Formal Shirt & Trouser', category: 'Shirt Pant', variety: 'Office Casual', price: 3499, image: 'https://picsum.photos/seed/sp1/400/500' },
  { id: '8', name: 'Designer Shirt & Chinos', category: 'Shirt Pant', variety: 'Evening Wear', price: 4200, image: 'https://picsum.photos/seed/sp2/400/500' },
  { id: '9', name: 'Imperial Bandhgala', category: 'Jodhpuri', variety: 'Royal Cut', price: 15999, image: 'https://picsum.photos/seed/jod1/400/500' },
  { id: '10', name: 'Modern Jodhpuri Set', category: 'Jodhpuri', variety: 'Fusion Wear', price: 11500, image: 'https://picsum.photos/seed/jod2/400/500' },
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
