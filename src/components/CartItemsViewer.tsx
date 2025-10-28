import { X, Package, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { CartItem } from '../types';

interface CartItemsViewerProps {
  isOpen: boolean;
  onClose: () => void;
  scannedItems: CartItem[];
  onViewFullCart?: () => void;
}

export function CartItemsViewer({ 
  isOpen, 
  onClose, 
  scannedItems,
  onViewFullCart
}: CartItemsViewerProps) {
  if (!isOpen) return null;

  const totalItems = scannedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = scannedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.06; // 6% SST
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-green-900">Cart Items</h2>
              <p className="text-sm text-gray-600">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} • RM {total.toFixed(2)}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Items List */}
        <ScrollArea className="flex-1 p-6">
          {scannedItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 p-4 rounded-full">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <h3 className="mb-2">No items in cart</h3>
              <p className="text-gray-600">
                Items will appear here when detected
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {scannedItems.map(item => (
                <Card key={item.id} className="p-4 bg-gray-50">
                  <div className="flex items-start gap-3">
                    {/* Item Image Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-gray-500" />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 truncate">{item.name}</h4>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">{item.brand}</Badge>
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        {item.weight && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {item.weight.toFixed(2)} kg
                          </Badge>
                        )}
                      </div>
                      
                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            RM {item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-600">
                            RM {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer with total */}
        {scannedItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50 flex-shrink-0">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span>RM {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SST (6%)</span>
                <span>RM {tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="text-lg">Total</span>
                <span className="text-2xl text-green-600">RM {total.toFixed(2)}</span>
              </div>
            </div>

            {onViewFullCart && (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={onViewFullCart}
              >
                View Full Cart
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
