export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  location: string;
  aisle: string;
  barcode: string;
  image?: string;
  brand: string;
  promotion?: {
    type: 'discount' | 'bundle' | 'special';
    originalPrice?: number;
    description: string;
  };
}

export interface CartItem extends Item {
  quantity: number;
  weight?: number;
}

export type Screen = 
  | 'login'
  | 'home'
  | 'search'
  | 'navigation'
  | 'cart'
  | 'scannedCart'
  | 'scanner'
  | 'payment'
  | 'success'
  | 'comparison';

export type SearchMethod = 'device' | 'manual';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}
