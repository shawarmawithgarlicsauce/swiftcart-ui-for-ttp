import { Item } from '../types';

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Fresh Milk Full Cream',
    price: 8.90,
    category: 'Dairy',
    location: 'Dairy Section, Top Shelf',
    aisle: 'Dairy Section',
    barcode: '1234567890123',
    brand: 'Farm Fresh',
    image: 'https://images.unsplash.com/photo-1641320487573-479720290849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2FydG9ufGVufDF8fHx8MTc2MTk0MTM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'discount',
      originalPrice: 10.90,
      description: '20% OFF - Special Weekend Deal'
    }
  },
  {
    id: '1b',
    name: 'Full Cream Fresh Milk',
    price: 9.50,
    category: 'Dairy',
    location: 'Dairy Section, Top Shelf',
    aisle: 'Dairy Section',
    barcode: '1234567890124',
    brand: 'Dutch Lady',
    image: 'https://images.unsplash.com/photo-1641320487573-479720290849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2FydG9ufGVufDF8fHx8MTc2MTk0MTM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '1c',
    name: 'UHT Full Cream Milk',
    price: 7.90,
    category: 'Dairy',
    location: 'Dairy Section, Top Shelf',
    aisle: 'Dairy Section',
    barcode: '1234567890125',
    brand: 'Marigold',
    image: 'https://images.unsplash.com/photo-1641320487573-479720290849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2FydG9ufGVufDF8fHx8MTc2MTk0MTM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'bundle',
      description: 'Buy 2 Get 1 Free'
    }
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    price: 4.50,
    category: 'Bakery',
    location: 'Bakery Section, Fresh Goods',
    aisle: 'Bakery Section',
    barcode: '2234567890123',
    brand: 'Gardenia',
    image: 'https://images.unsplash.com/photo-1537200275355-4f0c0714f777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMHdoZWF0JTIwYnJlYWR8ZW58MXx8fHwxNzYxOTE1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2b',
    name: 'Wholemeal Bread',
    price: 4.20,
    category: 'Bakery',
    location: 'Bakery Section, Fresh Goods',
    aisle: 'Bakery Section',
    barcode: '2234567890124',
    brand: 'Massimo',
    image: 'https://images.unsplash.com/photo-1537200275355-4f0c0714f777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aG9sZSUyMHdoZWF0JTIwYnJlYWR8ZW58MXx8fHwxNzYxOTE1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'special',
      description: 'Fresh Daily Baked'
    }
  },
  {
    id: '3',
    name: 'Grade A Eggs',
    price: 12.90,
    category: 'Dairy',
    location: 'Dairy Section, Refrigerated',
    aisle: 'Dairy Section',
    barcode: '3234567890123',
    brand: 'Farm Fresh',
    image: 'https://images.unsplash.com/photo-1585355611444-06154f329e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2dzJTIwY2FydG9ufGVufDF8fHx8MTc2MTkxOTk1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '4',
    name: 'Orange Juice',
    price: 11.50,
    category: 'Beverages',
    location: 'Aisle 2, Left Side',
    aisle: 'Aisle 2',
    barcode: '4234567890123',
    brand: 'Minute Maid',
    image: 'https://images.unsplash.com/photo-1640213505284-21352ee0d76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBqdWljZSUyMGJvdHRsZXxlbnwxfHx8fDE3NjE5Nzc2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'discount',
      originalPrice: 13.90,
      description: 'Save RM2.40!'
    }
  },
  {
    id: '4b',
    name: 'Freshly Squeezed Orange',
    price: 10.90,
    category: 'Beverages',
    location: 'Aisle 2, Left Side',
    aisle: 'Aisle 2',
    barcode: '4234567890124',
    brand: 'Tropicana',
    image: 'https://images.unsplash.com/photo-1640213505284-21352ee0d76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBqdWljZSUyMGJvdHRsZXxlbnwxfHx8fDE3NjE5Nzc2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '5',
    name: 'Chicken Breast',
    price: 18.90,
    category: 'Meat',
    location: 'Meat & Poultry, Chilled',
    aisle: 'Meat & Poultry',
    barcode: '5234567890123',
    brand: 'Ayamas',
    image: 'https://images.unsplash.com/photo-1633096013004-e2cb4023b560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnJlYXN0JTIwbWVhdHxlbnwxfHx8fDE3NjE5ODgzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '6',
    name: 'Cavendish Bananas',
    price: 5.90,
    category: 'Produce',
    location: 'Produce Section, Fresh Fruits',
    aisle: 'Produce Section',
    barcode: '6234567890123',
    brand: 'Local Farm',
    image: 'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmFzJTIwZnJlc2h8ZW58MXx8fHwxNzYxOTE5OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '7',
    name: 'Cherry Tomatoes',
    price: 6.90,
    category: 'Produce',
    location: 'Produce Section, Vegetables',
    aisle: 'Produce Section',
    barcode: '7234567890123',
    brand: 'Cameron Highlands',
    image: 'https://images.unsplash.com/photo-1570543375343-63fe3d67761b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjB0b21hdG9lc3xlbnwxfHx8fDE3NjE5MDI5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '8',
    name: 'Spaghetti Pasta',
    price: 5.50,
    category: 'Pantry',
    location: 'Aisle 4, Pasta Section',
    aisle: 'Aisle 4',
    barcode: '8234567890123',
    brand: 'San Remo',
    image: 'https://images.unsplash.com/photo-1635264685671-739e75e73e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHNwYWdoZXR0aXxlbnwxfHx8fDE3NjE5ODgzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '9',
    name: 'Extra Virgin Olive Oil',
    price: 24.90,
    category: 'Pantry',
    location: 'Aisle 4, Cooking Oils',
    aisle: 'Aisle 4',
    barcode: '9234567890123',
    brand: 'Bertolli',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMG9pbCUyMGJvdHRsZXxlbnwxfHx8fDE3NjE5MDQxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'discount',
      originalPrice: 29.90,
      description: 'RM5 OFF Premium Quality'
    }
  },
  {
    id: '10',
    name: 'Cornflakes',
    price: 12.90,
    category: 'Breakfast',
    location: 'Aisle 3, Cereals',
    aisle: 'Aisle 3',
    barcode: '1034567890123',
    brand: "Kellogg's",
    image: 'https://images.unsplash.com/photo-1564149504534-40d664642e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuZmxha2VzJTIwY2VyZWFsfGVufDF8fHx8MTc2MTk4ODMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '11',
    name: 'Chocolate Milk',
    price: 9.90,
    category: 'Dairy',
    location: 'Dairy Section, Refrigerated',
    aisle: 'Dairy Section',
    barcode: '1134567890123',
    brand: 'Dutch Lady',
    image: 'https://images.unsplash.com/photo-1641320487573-479720290849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwY2FydG9ufGVufDF8fHx8MTc2MTk0MTM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'bundle',
      description: 'Buy 3 for RM25'
    }
  },
  {
    id: '12',
    name: 'Instant Noodles',
    price: 8.50,
    category: 'Pantry',
    location: 'Aisle 1, Quick Meals',
    aisle: 'Aisle 1',
    barcode: '1234567890126',
    brand: 'Maggi',
    image: 'https://images.unsplash.com/photo-1684707878393-02606f779d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwbm9vZGxlc3xlbnwxfHx8fDE3NjE4OTkxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'bundle',
      description: '5-Pack Bundle Deal'
    }
  },
  {
    id: '13',
    name: 'Fresh Curry Leaves',
    price: 0.05,
    category: 'Produce',
    location: 'Produce Section, Herbs & Spices',
    aisle: 'Produce Section',
    barcode: '1334567890123',
    brand: 'Local Farm',
    image: 'https://images.unsplash.com/photo-1623048839784-a5608f7a7097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJyeSUyMGxlYXZlc3xlbnwxfHx8fDE3NjE5ODgzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'special',
      description: 'Priced per gram - RM0.05/g'
    }
  },
  {
    id: '14',
    name: 'Red Chili Fresh',
    price: 0.08,
    category: 'Produce',
    location: 'Produce Section, Herbs & Spices',
    aisle: 'Produce Section',
    barcode: '1434567890123',
    brand: 'Cameron Highlands',
    image: 'https://images.unsplash.com/photo-1603144930059-6c7f3ccfaf0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjaGlsaSUyMHBlcHBlcnN8ZW58MXx8fHwxNzYxOTg4MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    promotion: {
      type: 'special',
      description: 'Priced per gram - RM0.08/g'
    }
  }
];

export const categories = Array.from(new Set(mockItems.map(item => item.category)));
export const brands = Array.from(new Set(mockItems.map(item => item.brand)));
