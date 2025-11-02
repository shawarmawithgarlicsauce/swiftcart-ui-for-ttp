import { useState } from 'react';
import { History, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { CartItem } from '../types';

interface PurchaseHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock purchase history data with detailed items
interface PurchaseHistory {
  id: number;
  date: string;
  time: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  pointsEarned: number;
}

const mockPurchaseHistory: PurchaseHistory[] = [
  {
    id: 1,
    date: '2025-10-30',
    time: '14:35',
    total: 45.50,
    paymentMethod: 'Credit Card',
    pointsEarned: 45,
    items: [
      {
        id: '1',
        name: 'Fresh Milk Full Cream',
        price: 8.90,
        category: 'Dairy',
        location: 'Dairy Section',
        aisle: 'Dairy Section',
        barcode: '1234567890123',
        brand: 'Farm Fresh',
        quantity: 2
      },
      {
        id: '2',
        name: 'Whole Wheat Bread',
        price: 4.50,
        category: 'Bakery',
        location: 'Bakery Section',
        aisle: 'Bakery Section',
        barcode: '2234567890123',
        brand: 'Gardenia',
        quantity: 1
      },
      {
        id: '3',
        name: 'Free Range Eggs (10pcs)',
        price: 12.90,
        category: 'Eggs',
        location: 'Refrigerated Section',
        aisle: 'Aisle 2',
        barcode: '3234567890123',
        brand: 'Sunshine',
        quantity: 1
      },
      {
        id: '4',
        name: 'Red Chili',
        price: 0.45,
        category: 'Fresh Produce',
        location: 'Vegetable Section',
        aisle: 'Fresh Produce',
        barcode: '4234567890123',
        brand: 'Local Farm',
        quantity: 1,
        weight: 150
      },
      {
        id: '5',
        name: 'Basmati Rice 5kg',
        price: 18.90,
        category: 'Grains',
        location: 'Dry Goods',
        aisle: 'Aisle 3',
        barcode: '5234567890123',
        brand: 'India Gate',
        quantity: 1
      }
    ]
  },
  {
    id: 2,
    date: '2025-10-28',
    time: '16:20',
    total: 28.90,
    paymentMethod: 'E-Wallet',
    pointsEarned: 28,
    items: [
      {
        id: '6',
        name: 'Orange Juice 1L',
        price: 9.90,
        category: 'Beverages',
        location: 'Drinks Section',
        aisle: 'Aisle 4',
        barcode: '6234567890123',
        brand: 'Minute Maid',
        quantity: 1
      },
      {
        id: '7',
        name: 'Cheddar Cheese 200g',
        price: 14.50,
        category: 'Dairy',
        location: 'Dairy Section',
        aisle: 'Dairy Section',
        barcode: '7234567890123',
        brand: 'Kraft',
        quantity: 1
      },
      {
        id: '2',
        name: 'Whole Wheat Bread',
        price: 4.50,
        category: 'Bakery',
        location: 'Bakery Section',
        aisle: 'Bakery Section',
        barcode: '2234567890123',
        brand: 'Gardenia',
        quantity: 1
      }
    ]
  },
  {
    id: 3,
    date: '2025-10-25',
    time: '11:15',
    total: 67.20,
    paymentMethod: 'Cash',
    pointsEarned: 67,
    items: [
      {
        id: '8',
        name: 'Chicken Breast 1kg',
        price: 18.90,
        category: 'Meat',
        location: 'Meat Section',
        aisle: 'Aisle 1',
        barcode: '8234567890123',
        brand: 'Fresh',
        quantity: 2
      },
      {
        id: '9',
        name: 'Curry Leaf',
        price: 0.25,
        category: 'Fresh Produce',
        location: 'Vegetable Section',
        aisle: 'Fresh Produce',
        barcode: '9234567890123',
        brand: 'Local Farm',
        quantity: 1,
        weight: 50
      },
      {
        id: '1',
        name: 'Fresh Milk Full Cream',
        price: 8.90,
        category: 'Dairy',
        location: 'Dairy Section',
        aisle: 'Dairy Section',
        barcode: '1234567890123',
        brand: 'Farm Fresh',
        quantity: 1
      },
      {
        id: '10',
        name: 'Tomatoes',
        price: 1.20,
        category: 'Fresh Produce',
        location: 'Vegetable Section',
        aisle: 'Fresh Produce',
        barcode: '1034567890123',
        brand: 'Cameron Highlands',
        quantity: 1,
        weight: 500
      },
      {
        id: '11',
        name: 'Cooking Oil 2L',
        price: 16.90,
        category: 'Cooking',
        location: 'Cooking Essentials',
        aisle: 'Aisle 3',
        barcode: '1134567890123',
        brand: 'Knife',
        quantity: 1
      },
      {
        id: '12',
        name: 'Soy Sauce 500ml',
        price: 5.90,
        category: 'Condiments',
        location: 'Condiments Section',
        aisle: 'Aisle 3',
        barcode: '1234567890124',
        brand: 'Kikkoman',
        quantity: 1
      }
    ]
  },
  {
    id: 4,
    date: '2025-10-22',
    time: '10:45',
    total: 35.80,
    paymentMethod: 'Debit Card',
    pointsEarned: 35,
    items: [
      {
        id: '13',
        name: 'Instant Noodles 5-Pack',
        price: 7.90,
        category: 'Instant Food',
        location: 'Dry Goods',
        aisle: 'Aisle 5',
        barcode: '1334567890123',
        brand: 'Maggi',
        quantity: 2
      },
      {
        id: '14',
        name: 'Green Tea 25 Bags',
        price: 12.50,
        category: 'Beverages',
        location: 'Drinks Section',
        aisle: 'Aisle 4',
        barcode: '1434567890123',
        brand: 'Lipton',
        quantity: 1
      },
      {
        id: '15',
        name: 'Biscuits Assorted',
        price: 7.50,
        category: 'Snacks',
        location: 'Snacks Section',
        aisle: 'Aisle 5',
        barcode: '1534567890123',
        brand: "Jacob's",
        quantity: 1
      }
    ]
  }
];

export function PurchaseHistoryDialog({ 
  open, 
  onOpenChange 
}: PurchaseHistoryDialogProps) {
  const { t } = useLanguage();
  const [expandedPurchase, setExpandedPurchase] = useState<number | null>(null);

  const toggleExpand = (purchaseId: number) => {
    setExpandedPurchase(expandedPurchase === purchaseId ? null : purchaseId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col p-0 gap-0 bg-[#5C1A1A]/5">
        <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-[#5C1A1A] to-[#8B2E2E] text-white rounded-t-lg flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-white">
            <History className="w-5 h-5" />
            {t('purchase_history')}
          </DialogTitle>
          <DialogDescription className="text-white/90">
            {t('view_history')}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="px-6 py-4">
            {mockPurchaseHistory.length > 0 ? (
              <div className="space-y-4">
                {mockPurchaseHistory.map((purchase) => (
                  <div 
                    key={purchase.id} 
                    className="border rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    {/* Purchase Summary Header */}
                    <button
                      onClick={() => toggleExpand(purchase.id)}
                      className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div>
                          <div className="font-medium text-gray-900">
                            {purchase.date} - {purchase.time}
                          </div>
                          <div className="text-sm text-gray-600">
                            {purchase.items.length} {t('items')} • {purchase.paymentMethod} • +{purchase.pointsEarned} {t('points')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            RM {purchase.total.toFixed(2)}
                          </div>
                        </div>
                        {expandedPurchase === purchase.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Items Detail */}
                    {expandedPurchase === purchase.id && (
                      <div className="border-t">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{t('item_name')}</TableHead>
                              <TableHead>{t('brand')}</TableHead>
                              <TableHead className="text-center">{t('qty')}</TableHead>
                              <TableHead className="text-right">{t('price')}</TableHead>
                              <TableHead className="text-right">{t('subtotal')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {purchase.items.map((item, index) => (
                              <TableRow key={`${purchase.id}-${item.id}-${index}`}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{item.name}</div>
                                    {item.weight && (
                                      <div className="text-xs text-gray-500">
                                        {item.weight}g @ RM {item.price.toFixed(2)}/100g
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-gray-600">
                                  {item.brand}
                                </TableCell>
                                <TableCell className="text-center">
                                  {item.quantity}
                                </TableCell>
                                <TableCell className="text-right">
                                  RM {item.weight 
                                    ? ((item.price * item.weight) / 100).toFixed(2)
                                    : item.price.toFixed(2)
                                  }
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  RM {item.weight
                                    ? ((item.price * item.weight * item.quantity) / 100).toFixed(2)
                                    : (item.price * item.quantity).toFixed(2)
                                  }
                                </TableCell>
                              </TableRow>
                            ))}
                            {/* Total Row */}
                            <TableRow className="bg-gray-50">
                              <TableCell colSpan={4} className="text-right font-semibold">
                                {t('total')}:
                              </TableCell>
                              <TableCell className="text-right font-semibold text-primary">
                                RM {purchase.total.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('no_purchase_history')}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end px-6 pb-6 pt-4 border-t bg-white flex-shrink-0">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
