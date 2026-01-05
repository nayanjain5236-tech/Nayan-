
export type Category = 'Sherwani' | 'Coat Suit' | 'Shirt Pant' | 'Kurta Pajama' | 'Jodhpuri';

export interface Product {
  id: string;
  name: string;
  category: Category;
  variety: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  customizationNotes?: string;
}

export type View = 'dashboard' | 'billing' | 'orders' | 'inventory' | 'customers';
