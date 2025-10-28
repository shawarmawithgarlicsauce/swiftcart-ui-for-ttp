import { ChevronLeft, Heart, Trash2, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Item } from '../types';

interface CartViewProps {
  onBack: () => void;
  favoriteItems: Item[];
  onRemoveFromFavorites: (itemId: string) => void;
  onNavigateToItem: (item: Item) => void;
}

export function CartView({ 
  onBack, 
  favoriteItems,
  onRemoveFromFavorites,
  onNavigateToItem
}: CartViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h2>My Favorites</h2>
              <p className="text-gray-600 text-sm">
                {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {favoriteItems.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-4">
              Add items to your favorites for quick access later
            </p>
            <Button onClick={onBack}>Browse Items</Button>
          </Card>
        ) : (
          <div className="space-y-3">
            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-purple-900">
                  <p>These items are saved for easy reference.</p>
                  <p className="text-purple-700">They are not in your physical cart yet.</p>
                </div>
              </div>
            </Card>

            {favoriteItems.map(item => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="mb-1">{item.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{item.brand}</Badge>
                      <Badge variant="secondary">{item.category}</Badge>
                      <span className="text-gray-600">RM {item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onNavigateToItem(item)}
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onRemoveFromFavorites(item.id)}
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
