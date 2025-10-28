import { Search, Sparkles, Camera, ScanLine, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import mydinLogo from 'figma:asset/2af9bee171db9b0ae5e950480bb980a2fd82f9b9.png';
import storeBackground from 'figma:asset/c6a2b06ef266249fd599d8d502cc881ba5d4614e.png';
import sumbanganLogo from 'figma:asset/62718357894a974ad5ce8de312e3122b87cf0706.png';

interface HomeScreenProps {
  onNavigateToSearch: () => void;
  onNavigateToScannedCart: () => void;
  onQuickViewCart: () => void;
  scannedItemsCount: number;
  totalPrice: number;
  onSimulateScan: () => void;
}

export function HomeScreen({
  onNavigateToSearch,
  onNavigateToScannedCart,
  onQuickViewCart,
  scannedItemsCount,
  totalPrice,
  onSimulateScan
}: HomeScreenProps) {
  const { t } = useLanguage();
  
  return (
    <div className="relative min-h-screen p-6 overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${storeBackground})`,
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Light overlay for better contrast */}
      <div className="absolute inset-0 bg-white/40" />
      
      {/* Content */}
      <div className="tablet-container relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div>
            <h1 className="mb-1">SwiftCart</h1>
            <p className="text-gray-600">Your smart shopping companion</p>
          </div>
          <img 
            src={mydinLogo} 
            alt="MYDIN" 
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* Cart Summary */}
        <Card className="p-8 mb-6 bg-gradient-to-r from-primary to-[#8B2E2E] text-white shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-white/80 mb-1">{t('total_amount')}</p>
                  <p className="text-4xl">RM {totalPrice.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 mb-1">{t('items_detected')}</p>
                  <p className="text-4xl">{scannedItemsCount}</p>
                </div>
              </div>
            </div>
            {scannedItemsCount > 0 && (
              <Button
                variant="secondary"
                onClick={onQuickViewCart}
                className="ml-6 flex-shrink-0 bg-white text-primary hover:bg-white/90"
              >
                <Eye className="w-4 h-4 mr-2" />
                {t('quick_view')}
              </Button>
            )}
          </div>
        </Card>

        {/* Auto Detection Info */}
        <Card className="p-5 mb-6 bg-emerald-50 border-emerald-200 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-green-600 p-2 rounded-full">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-green-900">{t('auto_detect')}</h4>
              <p className="text-sm text-green-800 mb-3">
                {t('auto_detect_desc')}
              </p>
              <Button 
                onClick={onSimulateScan}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <ScanLine className="w-4 h-4 mr-2" />
                {t('simulate_scan')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Actions */}
        <div className="grid md:grid-cols-1 gap-5">
          <Card 
            className="p-7 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.01] border-gray-200"
            onClick={onNavigateToSearch}
          >
            <div className="flex items-center gap-5">
              <div className="bg-primary/10 p-4 rounded-xl">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">{t('find_items')}</h3>
                <p className="text-gray-600 text-sm">{t('find_items_desc')}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* View Cart Button */}
        {scannedItemsCount > 0 && (
          <Card 
            className="p-7 mt-5 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.01] bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
            onClick={onNavigateToScannedCart}
          >
            <div className="flex items-center gap-5">
              <div className="bg-emerald-600 p-4 rounded-xl relative">
                <ShoppingCart className="w-8 h-8 text-white" />
                <Badge className="absolute -top-2 -right-2 bg-white text-emerald-600 border-2 border-emerald-600">
                  {scannedItemsCount}
                </Badge>
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-emerald-900">{t('shopping_cart')}</h3>
                <p className="text-emerald-700 text-sm">
                  {scannedItemsCount} {t('items')} • RM {totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-emerald-600 text-xl">
                →
              </div>
            </div>
          </Card>
        )}

        {/* Promotions Banner */}
        <Card className="p-5 mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-1 text-amber-900">Active Promotions</h4>
              <p className="text-sm text-amber-800">
                Farm Fresh Milk 20% OFF • Marigold Buy 2 Get 1 • Dutch Lady Bundle RM25
              </p>
            </div>
          </div>
        </Card>

        {/* MyKasih Payment Disclaimer */}
        <Card className="p-4 mt-4 bg-blue-50 border-blue-200 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-blue-600 p-1.5 rounded-full flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">{t('mykasih_disclaimer')}</span> {t('mykasih_instruction')} <span className="font-semibold">"{t('cash_option')}"</span> {t('mykasih_continuation')}
                </p>
              </div>
            </div>
            <img 
              src={sumbanganLogo} 
              alt="Sumbangan Asas Rahmah" 
              className="h-10 object-contain flex-shrink-0"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
