import { useState, useEffect, useRef } from 'react';
import { CheckCircle, CreditCard, Smartphone, DollarSign, QrCode, ChevronLeft, X, ChevronDown, ChevronUp, Package, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { CartItem } from '../types';
import QRCodeLib from 'qrcode';

interface PaymentScreenProps {
  scannedItems: CartItem[];
  totalPrice: number;
  onConfirmPayment: () => void;
  onCancel: () => void;
}

export function PaymentScreen({
  scannedItems,
  totalPrice,
  onConfirmPayment,
  onCancel
}: PaymentScreenProps) {
  const [showCashQR, setShowCashQR] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const subtotal = totalPrice;
  const tax = subtotal * 0.06; // 6% SST in Malaysia
  const total = subtotal + tax;
  const totalItems = scannedItems.reduce((sum, item) => sum + item.quantity, 0);

  // Generate QR code when cash payment is selected
  useEffect(() => {
    if (showCashQR && canvasRef.current) {
      const transactionData = {
        transactionId: `TXN${Date.now()}`,
        timestamp: new Date().toISOString(),
        items: scannedItems.map(item => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        currency: 'MYR',
        paymentMethod: 'CASH'
      };

      const qrData = JSON.stringify(transactionData);
      
      QRCodeLib.toCanvas(canvasRef.current, qrData, {
        width: 400,
        margin: 2,
        color: {
          dark: '#16a34a',
          light: '#ffffff'
        }
      });
    }
  }, [showCashQR, scannedItems, subtotal, tax, total]);

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="tablet-container">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1>Payment</h1>
        </div>

        {/* Order Summary */}
        <Card className="p-7 mb-5 shadow-sm border-gray-200">
          <div className="flex items-center justify-between mb-5">
            <h3>Order Summary</h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <ShoppingBag className="w-4 h-4 mr-1" />
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          
          {/* Collapsible Items List */}
          <Collapsible open={showAllItems} onOpenChange={setShowAllItems}>
            <div className="mb-4">
              {/* Preview: Show first 3 items or all if expanded */}
              <div className="space-y-3 mb-3">
                {(showAllItems ? scannedItems : scannedItems.slice(0, 3)).map(item => (
                  <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-1 text-sm truncate">{item.name}</h4>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{item.brand}</Badge>
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            RM {item.price.toFixed(2)} each
                          </span>
                          <span className="text-green-600">
                            RM {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show more/less button */}
              {scannedItems.length > 3 && (
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full text-sm"
                  >
                    {showAllItems ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        View All {scannedItems.length} Items
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              )}
            </div>

            <CollapsibleContent>
              {/* Additional content when expanded - already showing all items above */}
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>RM {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>SST (6%)</span>
              <span>RM {tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-xl">
              <span>Total</span>
              <span className="text-green-600">RM {total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6 mb-4">
          <h3 className="mb-4">Payment Method</h3>
          
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={onConfirmPayment}
            >
              <CreditCard className="w-5 h-5 mr-3" />
              <div className="text-left">
                <p>Credit/Debit Card</p>
                <p className="text-gray-500 text-sm">Tap your card on the reader</p>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={onConfirmPayment}
            >
              <Smartphone className="w-5 h-5 mr-3" />
              <div className="text-left">
                <p>Mobile Payment</p>
                <p className="text-gray-500 text-sm">Apple Pay, Google Pay, etc.</p>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => setShowCashQR(true)}
            >
              <DollarSign className="w-5 h-5 mr-3" />
              <div className="text-left flex-1">
                <p>Cash Payment</p>
                <p className="text-gray-500 text-sm">Generate QR code for counter scan</p>
              </div>
              <QrCode className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={onConfirmPayment}>
            Confirm Payment
          </Button>
        </div>
      </div>

      {/* Cash QR Code Modal */}
      {showCashQR && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <QrCode className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-green-900">Cash Payment QR Code</h2>
                    <p className="text-sm text-gray-600">Show this code at the checkout counter</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowCashQR(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Instructions */}
              <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
                <h4 className="text-blue-900 mb-2">Instructions:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Proceed to the checkout counter with your SwiftCart</li>
                  <li>Show this QR code to the cashier</li>
                  <li>The cashier will scan to get your items and total</li>
                  <li>Pay in cash and receive your receipt</li>
                </ol>
              </Card>

              {/* QR Code Display */}
              <div className="bg-white p-6 rounded-xl border-4 border-green-600 mb-6">
                <div className="flex flex-col items-center">
                  <canvas 
                    ref={canvasRef}
                    className="rounded-lg shadow-lg mb-4"
                  />
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                    <p className="text-xs font-mono bg-gray-100 px-3 py-1 rounded">
                      TXN{Date.now().toString().slice(-8)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction Summary */}
              <Card className="p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4>Transaction Summary</h4>
                  <span className="text-sm text-gray-600">
                    {scannedItems.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  {scannedItems.slice(0, 3).map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span>RM {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {scannedItems.length > 3 && (
                    <p className="text-sm text-gray-500">
                      +{scannedItems.length - 3} more items
                    </p>
                  )}
                </div>

                <Separator className="my-3" />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total Amount</span>
                  <span className="text-2xl text-green-600">RM {total.toFixed(2)}</span>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCashQR(false)}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Payment
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={onConfirmPayment}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Proceed to Counter
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
