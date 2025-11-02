import { useState } from 'react';
import { ChevronLeft, ScanBarcode, Camera, Scale, Package, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { CartItem } from '../types';
import { mockItems } from '../data/mockItems';

interface BarcodeScannerScreenProps {
  onBack: () => void;
  scannedItems: CartItem[];
  onAddScannedItem: (item: CartItem) => void;
  onRemoveScannedItem: (itemId: string) => void;
  totalPrice: number;
}

export function BarcodeScannerScreen({
  onBack,
  scannedItems,
  onAddScannedItem,
  onRemoveScannedItem,
  totalPrice
}: BarcodeScannerScreenProps) {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scanMode, setScanMode] = useState<'barcode' | 'camera' | 'weight'>('barcode');

  const handleScan = () => {
    if (!barcodeInput) return;

    const foundItem = mockItems.find(item => item.barcode === barcodeInput);
    
    if (foundItem) {
      const existingItem = scannedItems.find(item => item.id === foundItem.id);
      
      if (existingItem) {
        onAddScannedItem({ 
          ...existingItem, 
          quantity: existingItem.quantity + 1 
        });
      } else {
        onAddScannedItem({ 
          ...foundItem, 
          quantity: 1,
          weight: Math.random() * 2 + 0.5 // Mock weight
        });
      }
      
      setBarcodeInput('');
    }
  };

  const simulateCameraScan = () => {
    // Simulate camera detecting an item
    const randomItem = mockItems[Math.floor(Math.random() * mockItems.length)];
    const existingItem = scannedItems.find(item => item.id === randomItem.id);
    
    if (existingItem) {
      onAddScannedItem({ 
        ...existingItem, 
        quantity: existingItem.quantity + 1 
      });
    } else {
      onAddScannedItem({ 
        ...randomItem, 
        quantity: 1,
        weight: Math.random() * 2 + 0.5
      });
    }
  };

  const simulateWeightScan = () => {
    // Simulate weight sensor detecting an item
    const randomItem = mockItems[Math.floor(Math.random() * mockItems.length)];
    const weight = Math.random() * 2 + 0.5;
    
    const existingItem = scannedItems.find(item => item.id === randomItem.id);
    
    if (existingItem) {
      onAddScannedItem({ 
        ...existingItem, 
        quantity: existingItem.quantity + 1,
        weight: existingItem.weight ? existingItem.weight + weight : weight
      });
    } else {
      onAddScannedItem({ 
        ...randomItem, 
        quantity: 1,
        weight
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h2>Scan Items</h2>
              <p className="text-gray-600 text-sm">Add items to your cart</p>
            </div>
          </div>

          {/* Total Display */}
          <Card className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">Current Total</p>
                <p className="text-2xl">RM {totalPrice.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-green-100">Items</p>
                <p className="text-2xl">{scannedItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Scan Method Selection */}
        <Card className="p-4">
          <h3 className="mb-3">Scan Method</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={scanMode === 'barcode' ? 'default' : 'outline'}
              className="flex flex-col h-auto py-3"
              onClick={() => setScanMode('barcode')}
            >
              <ScanBarcode className="w-5 h-5 mb-1" />
              <span className="text-xs">Barcode</span>
            </Button>
            <Button
              variant={scanMode === 'camera' ? 'default' : 'outline'}
              className="flex flex-col h-auto py-3"
              onClick={() => setScanMode('camera')}
            >
              <Camera className="w-5 h-5 mb-1" />
              <span className="text-xs">Camera</span>
            </Button>
            <Button
              variant={scanMode === 'weight' ? 'default' : 'outline'}
              className="flex flex-col h-auto py-3"
              onClick={() => setScanMode('weight')}
            >
              <Scale className="w-5 h-5 mb-1" />
              <span className="text-xs">Weight</span>
            </Button>
          </div>
        </Card>

        {/* Scanner Interface */}
        <Card className="p-6">
          {scanMode === 'barcode' && (
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <ScanBarcode className="w-16 h-16 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter barcode manually..."
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                />
                <Button onClick={handleScan}>Scan</Button>
              </div>
              <p className="text-gray-500 text-sm text-center">
                Use barcodes from the item list (e.g., 1234567890123)
              </p>
            </div>
          )}

          {scanMode === 'camera' && (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-12 flex items-center justify-center">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              <Button className="w-full" onClick={simulateCameraScan}>
                Simulate Camera Detection
              </Button>
              <p className="text-gray-500 text-sm text-center">
                Camera automatically detects items added to trolley
              </p>
            </div>
          )}

          {scanMode === 'weight' && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-12 flex items-center justify-center">
                <Scale className="w-16 h-16 text-blue-600" />
              </div>
              <Button className="w-full" onClick={simulateWeightScan}>
                Simulate Weight Detection
              </Button>
              <p className="text-gray-500 text-sm text-center">
                Weight sensor detects items placed in trolley
              </p>
            </div>
          )}
        </Card>

        {/* Scanned Items List */}
        {scannedItems.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3>Scanned Items</h3>
              <Badge>{scannedItems.length}</Badge>
            </div>

            {scannedItems.map(item => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">{item.name}</h4>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">Qty: {item.quantity}</Badge>
                      <span className="text-gray-600">RM {item.price.toFixed(2)} each</span>
                    </div>
                    {item.weight && (
                      <p className="text-gray-500 text-sm">Weight: {item.weight.toFixed(2)}kg</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="mb-2">RM {(item.price * item.quantity).toFixed(2)}</p>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onRemoveScannedItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
