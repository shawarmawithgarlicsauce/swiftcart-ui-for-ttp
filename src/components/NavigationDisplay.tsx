import { MapPin, Navigation, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Item } from '../types';
import { Progress } from './ui/progress';
import { useLanguage } from '../contexts/LanguageContext';
import storeMapImage from 'figma:asset/b1d4e042f34a067cd911dc1ee6f69d57798cbc93.png';

interface NavigationDisplayProps {
  item: Item;
  onClose: () => void;
}

// Helper function to get item location on map based on aisle
function getItemLocationOnMap(aisle: string): string {
  const aisleMap: { [key: string]: string } = {
    'Aisle 1': 'top-[45%] left-[27%]',
    'Aisle 2': 'top-[45%] left-[37%]',
    'Aisle 3': 'top-[45%] left-[47%]',
    'Aisle 4': 'top-[45%] left-[57%]',
    'Aisle 5': 'top-[45%] left-[67%]',
    'Dairy Section': 'top-[18%] left-[40%]',
    'Meat & Poultry': 'top-[18%] left-[60%]',
    'Bakery Section': 'top-[25%] left-[12%]',
    'Seafood Section': 'top-[25%] right-[8%]',
    'Produce Section': 'top-[40%] left-[8%]',
    'Flowers Section': 'bottom-[42%] left-[8%]',
  };
  return aisleMap[aisle] || 'top-[45%] left-[47%]'; // Default to center
}

// Helper function to get directions based on aisle
function getDirections(aisle: string): string {
  const directionsMap: { [key: string]: string } = {
    'Aisle 1': 'entrance, then turn left to Aisle 1',
    'Aisle 2': 'entrance, head straight to Aisle 2',
    'Aisle 3': 'entrance, head to center Aisle 3',
    'Aisle 4': 'entrance, turn slightly right to Aisle 4',
    'Aisle 5': 'entrance, turn right to Aisle 5',
    'Dairy Section': 'entrance, head to the Dairy section at the top',
    'Meat & Poultry': 'entrance, head to Meat & Poultry section at the top right',
    'Bakery Section': 'entrance, turn left to the Bakery section',
    'Seafood Section': 'entrance, head to the right for Seafood section',
    'Produce Section': 'entrance, turn left to the Produce area',
    'Flowers Section': 'entrance, turn left to the Flowers section',
  };
  return directionsMap[aisle] || 'entrance to your destination';
}

// Helper function to estimate distance
function getDistance(aisle: string): number {
  const distanceMap: { [key: string]: number } = {
    'Aisle 1': 35,
    'Aisle 2': 40,
    'Aisle 3': 45,
    'Aisle 4': 50,
    'Aisle 5': 55,
    'Dairy Section': 50,
    'Meat & Poultry': 60,
    'Bakery Section': 30,
    'Seafood Section': 55,
    'Produce Section': 25,
    'Flowers Section': 40,
  };
  return distanceMap[aisle] || 45;
}

export function NavigationDisplay({ 
  item, 
  onClose
}: NavigationDisplayProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="tablet-container">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Navigation className="w-6 h-6 text-primary" />
              <h2>{t('navigation_active')}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="tablet-container space-y-5">
        {/* Item Info Card */}
        <Card className="p-7 shadow-sm border-gray-200">
          <div className="mb-4">
            <h2 className="mb-2">{item.name}</h2>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline" className="border-primary text-primary">{item.brand}</Badge>
              <Badge variant="secondary">{item.category}</Badge>
              <span className="text-gray-700">RM {item.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{item.location}</span>
          </div>
        </Card>

        {/* Store Map */}
        <Card className="p-7 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-sm">
          <h3 className="mb-4">{t('store_map')}</h3>
          
          <div className="bg-white rounded-lg p-4 mb-4 relative">
            {/* Store Map Image */}
            <img 
              src={storeMapImage} 
              alt="Store Layout Map"
              className="w-full rounded-lg"
            />
            
            {/* Aisle Labels Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Aisle 1 */}
              <div className="absolute top-[32%] left-[27%] bg-primary text-white px-3 py-1 rounded-full text-sm shadow-lg border-2 border-white">
                Aisle 1
              </div>
              
              {/* Aisle 2 */}
              <div className="absolute top-[32%] left-[37%] bg-primary text-white px-3 py-1 rounded-full text-sm shadow-lg border-2 border-white">
                Aisle 2
              </div>
              
              {/* Aisle 3 */}
              <div className="absolute top-[32%] left-[47%] bg-primary text-white px-3 py-1 rounded-full text-sm shadow-lg border-2 border-white">
                Aisle 3
              </div>
              
              {/* Aisle 4 */}
              <div className="absolute top-[32%] left-[57%] bg-primary text-white px-3 py-1 rounded-full text-sm shadow-lg border-2 border-white">
                Aisle 4
              </div>
              
              {/* Aisle 5 */}
              <div className="absolute top-[32%] left-[67%] bg-primary text-white px-3 py-1 rounded-full text-sm shadow-lg border-2 border-white">
                Aisle 5
              </div>

              {/* Current Item Location Marker */}
              <div className={`absolute ${getItemLocationOnMap(item.aisle)} animate-bounce`}>
                <div className="relative">
                  <MapPin className="w-9 h-9 text-rose-600 fill-rose-500 drop-shadow-lg" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                    {item.name}
                  </div>
                </div>
              </div>

              {/* Your Location (Entrance) */}
              <div className="absolute bottom-[12%] left-[35%]">
                <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm shadow-lg border-2 border-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  You are here
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 mb-5 shadow-sm">
            <h4 className="mb-4">{t('turn_by_turn')}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p>{t('you_are_here')} - {t('entrance')}</p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-dashed border-gray-300 h-8"></div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <p>{t('walk_straight')} {getDirections(item.aisle)}</p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-dashed border-gray-300 h-8"></div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p>{t('find_item_at')} {item.name} at {item.location}</p>
                  <p className="text-sm text-gray-500">{item.aisle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>{t('estimated_distance')}</span>
              <span className="text-primary">~{getDistance(item.aisle)} {t('meters')}</span>
            </div>
            <Progress value={33} className="h-2" />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Card className="p-5 bg-primary/5 border-primary/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-3 rounded-full">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <p className="text-primary">
                {t('follow_arrows')}
              </p>
            </div>
          </Card>

          <Button 
            className="w-full bg-primary hover:bg-primary/90" 
            size="lg"
            onClick={onClose}
          >
            {t('item_found')}
          </Button>
        </div>
      </div>
    </div>
  );
}
