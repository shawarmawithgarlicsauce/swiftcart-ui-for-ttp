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
    brand: 'Dutch Lady'
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
    brand: 'Gardenia'
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
    brand: 'Farm Fresh'
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
    brand: 'Tropicana'
  },
  {
    id: '5',
    name: 'Chicken Breast',
    price: 18.90,
    category: 'Meat',
    location: 'Meat & Poultry, Chilled',
    aisle: 'Meat & Poultry',
    barcode: '5234567890123',
    brand: 'Ayamas'
  },
  {
    id: '6',
    name: 'Cavendish Bananas',
    price: 5.90,
    category: 'Produce',
    location: 'Produce Section, Fresh Fruits',
    aisle: 'Produce Section',
    barcode: '6234567890123',
    brand: 'Local Farm'
  },
  {
    id: '7',
    name: 'Cherry Tomatoes',
    price: 6.90,
    category: 'Produce',
    location: 'Produce Section, Vegetables',
    aisle: 'Produce Section',
    barcode: '7234567890123',
    brand: 'Cameron Highlands'
  },
  {
    id: '8',
    name: 'Spaghetti Pasta',
    price: 5.50,
    category: 'Pantry',
    location: 'Aisle 4, Pasta Section',
    aisle: 'Aisle 4',
    barcode: '8234567890123',
    brand: 'San Remo'
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
    brand: "Kellogg's"
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
    promotion: {
      type: 'special',
      description: 'Priced per gram - RM0.08/g'
    }
  }
];

export const categories = Array.from(new Set(mockItems.map(item => item.category)));
export const brands = Array.from(new Set(mockItems.map(item => item.brand)));
