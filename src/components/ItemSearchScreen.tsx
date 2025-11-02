import { useState } from 'react';
import { Search, ChevronLeft, Filter, MapPin, TrendingDown, GitCompare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Item } from '../types';
import { mockItems, categories } from '../data/mockItems';

interface ItemSearchScreenProps {
  onBack: () => void;
  onSelectItem: (item: Item) => void;
  onCompare: (category: string) => void;
}

export function ItemSearchScreen({ onBack, onSelectItem, onCompare }: ItemSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const hasPromotions = filteredItems.some(item => item.promotion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5C1A1A]/5 to-[#8B2E2E]/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5C1A1A] to-[#8B2E2E] border-b sticky top-0 z-10 shadow-sm">
        <div className="tablet-container">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h2 className="text-white">Find Items</h2>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search items or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 border-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Compare Brands Button */}
          {selectedCategory !== 'all' && (
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/5"
              onClick={() => onCompare(selectedCategory)}
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Brands in {selectedCategory}
            </Button>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="tablet-container space-y-4">
        {hasPromotions && (
          <Card className="p-5 bg-amber-50 border-amber-200 shadow-sm">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-5 h-5 text-amber-600" />
              <p className="text-amber-900">
                Items with special promotions are highlighted below
              </p>
            </div>
          </Card>
        )}

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No items found
          </div>
        ) : (
          filteredItems.map(item => {
            const hasPromotion = !!item.promotion;
            
            return (
              <Card 
                key={item.id} 
                className={`p-5 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.01] border-2 ${
                  hasPromotion ? 'border-amber-400 bg-amber-50/30' : 'border-[#5C1A1A]/30'
                }`}
                onClick={() => onSelectItem(item)}
              >
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  {item.image && (
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 truncate">{item.name}</h3>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="outline" className="border-primary text-primary">{item.brand}</Badge>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {item.promotion?.originalPrice && (
                          <p className="text-gray-400 line-through text-sm">
                            RM {item.promotion.originalPrice.toFixed(2)}
                          </p>
                        )}
                        <p className="text-xl text-primary">RM {item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {hasPromotion && (
                      <div className="flex items-center gap-2 p-3 bg-amber-100 rounded-lg mb-2">
                        <TrendingDown className="w-4 h-4 text-amber-700" />
                        <span className="text-sm text-amber-900">
                          {item.promotion?.description}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-gray-600 min-w-0">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm truncate">{item.location}</span>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 flex-shrink-0">
                        Navigate
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
