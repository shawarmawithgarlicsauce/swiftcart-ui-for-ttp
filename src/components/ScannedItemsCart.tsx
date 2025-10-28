import { ChevronLeft, ShoppingCart, Trash2, Plus, Minus, Package, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CartItem } from '../types';

interface ScannedItemsCartProps {
  onBack: () => void;
  scannedItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToPayment: () => void;
}

export function ScannedItemsCart({ 
  onBack, 
  scannedItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToPayment
}: ScannedItemsCartProps) {
  const totalItems = scannedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = scannedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.06; // 6% SST in Malaysia
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center gap-3 mb-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-white">Shopping Cart</h2>
              <p className="text-green-100 text-sm">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} detected
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Quick Total */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-green-100 text-sm mb-1">Cart Total</p>
            <p className="text-2xl">RM {total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-32">
        {scannedItems.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-full">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h3 className="mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">
              Items will be automatically detected when you place them in your SwiftCart trolley
            </p>
            <Button onClick={onBack}>Continue Shopping</Button>
          </Card>
        ) : (
          <>
            {/* Detection Status */}
            <Card className="p-4 mb-4 bg-green-50 border-green-200">
              <div className="flex items-start gap-3">
                <div className="bg-green-600 p-2 rounded-full">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-green-900">
                    All items have been automatically detected and verified by smart sensors
                  </p>
                </div>
              </div>
            </Card>

            {/* Items List */}
            <div className="space-y-3 mb-6">
              {scannedItems.map(item => (
                <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Item Image Placeholder */}
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 truncate">{item.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">{item.brand}</Badge>
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        {item.weight && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            {item.weight.toFixed(2)} kg
                          </Badge>
                        )}
                      </div>
                      
                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600">RM {item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">
                            Total: RM {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              if (item.quantity > 1) {
                                onUpdateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Price Breakdown */}
            <Card className="p-6 mb-6">
              <h3 className="mb-4">Price Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>RM {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>SST (6%)</span>
                  <span>RM {tax.toFixed(2)}</span>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total Amount</span>
                  <span className="text-2xl text-green-600">RM {total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Fixed Checkout Button */}
      {scannedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
          <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl text-green-600">RM {total.toFixed(2)}</p>
              </div>
              <Button 
                size="lg"
                onClick={onProceedToPayment}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 shadow-lg"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
