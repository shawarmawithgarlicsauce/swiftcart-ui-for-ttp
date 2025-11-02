import { ChevronLeft, TrendingDown, Tag, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Item } from '../types';

interface BrandComparisonProps {
  items: Item[];
  category: string;
  onBack: () => void;
  onNavigateToItem: (item: Item) => void;
}

export function BrandComparison({ items, category, onBack, onNavigateToItem }: BrandComparisonProps) {
  // Group items by similar products
  const groupedItems = items.reduce((acc, item) => {
    const key = item.name.toLowerCase().includes('milk') ? 'Milk Products' :
                item.name.toLowerCase().includes('bread') ? 'Bread Products' :
                item.name.toLowerCase().includes('juice') || item.name.toLowerCase().includes('orange') ? 'Juice Products' :
                'Other Products';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  const getLowestPrice = (group: Item[]) => {
    return Math.min(...group.map(item => item.price));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2>Brand Comparison</h2>
              <p className="text-gray-600 text-sm">{category} - Compare prices & promotions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p>Compare similar products from different brands to find the best deal!</p>
              <p className="text-blue-700">Items with promotions are highlighted in purple.</p>
            </div>
          </div>
        </Card>

        {Object.entries(groupedItems).map(([groupName, groupItems]) => {
          const lowestPrice = getLowestPrice(groupItems);
          
          return (
            <div key={groupName}>
              <h3 className="mb-3">{groupName}</h3>
              <div className="grid gap-3">
                {groupItems.map(item => {
                  const isLowestPrice = item.price === lowestPrice;
                  const hasPromotion = !!item.promotion;
                  
                  return (
                    <Card 
                      key={item.id}
                      className={`p-4 ${hasPromotion ? 'border-purple-300 bg-purple-50' : ''} ${isLowestPrice ? 'border-green-300 bg-green-50' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="mb-1">{item.name}</h4>
                              <Badge variant="outline">{item.brand}</Badge>
                            </div>
                            <div className="text-right">
                              {item.promotion?.originalPrice && (
                                <p className="text-gray-400 line-through text-sm">
                                  RM {item.promotion.originalPrice.toFixed(2)}
                                </p>
                              )}
                              <p className="text-2xl">
                                RM {item.price.toFixed(2)}
                              </p>
                              {isLowestPrice && (
                                <Badge className="mt-1 bg-green-600">
                                  Lowest Price
                                </Badge>
                              )}
                            </div>
                          </div>

                          {hasPromotion && (
                            <div className="flex items-center gap-2 p-2 bg-purple-100 rounded-lg mb-2">
                              <TrendingDown className="w-4 h-4 text-purple-600" />
                              <span className="text-sm text-purple-900">
                                {item.promotion?.description}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <p className="text-gray-500 text-sm">{item.location}</p>
                            <Button 
                              size="sm"
                              onClick={() => onNavigateToItem(item)}
                            >
                              <Navigation className="w-4 h-4 mr-1" />
                              Navigate
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
