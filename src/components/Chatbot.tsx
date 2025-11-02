import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Item } from '../types';
import { mockItems } from '../data/mockItems';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  ingredients?: RecipeIngredient[];
}

interface RecipeIngredient {
  name: string;
  amount: string;
  item?: Item;
}

interface Recipe {
  name: string;
  ingredients: RecipeIngredient[];
}

interface ChatbotProps {
  onClose?: () => void;
  onNavigateToItem?: (item: Item) => void;
}

const quickActions = [
  'Item details',
  'Payment help',
  'Customer service',
  'Device issue',
  'Store location',
  'Return policy'
];

const recipes: Record<string, Recipe> = {
  'buttermilk chicken': {
    name: 'Buttermilk Chicken',
    ingredients: [
      { name: 'Chicken Breast', amount: '500g' },
      { name: 'Full Cream Fresh Milk', amount: '1 cup (for buttermilk)' },
      { name: 'Eggs', amount: '2 pieces' },
      { name: 'Olive Oil', amount: '2 tbsp' },
      { name: 'Curry Leaves', amount: '10g' },
      { name: 'Red Chili', amount: '5g' },
    ]
  },
  'spaghetti': {
    name: 'Spaghetti',
    ingredients: [
      { name: 'Spaghetti Pasta', amount: '400g' },
      { name: 'Olive Oil', amount: '3 tbsp' },
      { name: 'Cherry Tomatoes', amount: '200g' },
    ]
  },
  'french toast': {
    name: 'French Toast',
    ingredients: [
      { name: 'Bread', amount: '4 slices' },
      { name: 'Eggs', amount: '2 pieces' },
      { name: 'Fresh Milk', amount: '1/4 cup' },
    ]
  },
  'banana smoothie': {
    name: 'Banana Smoothie',
    ingredients: [
      { name: 'Bananas', amount: '2 pieces' },
      { name: 'Fresh Milk', amount: '1 cup' },
    ]
  }
};

const botResponses: Record<string, string> = {
  'item details': 'I can help you find information about any item in the store. Please tell me which product you\'re interested in, and I\'ll provide details like price, location, and available promotions.',
  'payment help': 'For payment issues: 1) Ensure your card is properly inserted, 2) Check if contactless payment is enabled, 3) Try an alternative payment method. If problems persist, our staff at checkout counter 3 can assist you.',
  'customer service': 'Our customer service team is here to help! You can find staff members at the information counter near the entrance, or press the assistance button on your trolley for immediate help.',
  'device issue': 'If your SwiftCart device is malfunctioning: 1) Try restarting by logging out and back in, 2) Check if the screen is clean and responsive, 3) If the scanner isn\'t working, use manual barcode entry. For urgent issues, please visit the customer service desk.',
  'store location': 'Use the store map feature in the search menu to navigate. I can also guide you to specific aisles. Which section are you looking for?',
  'return policy': 'Our return policy allows returns within 30 days with receipt. Perishable items must be returned within 7 days. Fresh produce and dairy can be exchanged at the customer service counter.',
  'promotion': 'Current promotions include: Farm Fresh Milk 20% off, Marigold Milk Buy 2 Get 1 Free, Minute Maid Juice save RM2.40, and Bertolli Olive Oil RM5 off. Check items with the purple promotion badge!',
  'brand': 'We carry popular brands including Farm Fresh, Dutch Lady, Marigold, Gardenia, Massimo, Ayamas, and many more. Use the brand comparison feature in item search to compare prices.',
  'compare': 'To compare brands: Go to Search Items → Select a category → Tap "Compare Brands" to see price differences between similar products from different brands.',
  'checkout': 'To checkout: 1) Ensure all items are scanned, 2) Review your cart total, 3) Tap "Proceed to Payment" button, 4) Choose your payment method. The system will verify payment before you can exit.',
  'scan': 'Items are automatically detected when placed in your trolley using weight and camera sensors. You can also manually scan barcodes if needed. Items detected will appear in your cart instantly.',
  'default': 'I\'m your SwiftCart assistant! I can help with item information, payment issues, device problems, and general store inquiries. How can I assist you today?'
};

// Helper function to find items in store that match ingredient names
function findItemForIngredient(ingredientName: string): Item | undefined {
  const searchTerms = ingredientName.toLowerCase();
  
  // Direct matches
  const exactMatch = mockItems.find(item => 
    item.name.toLowerCase().includes(searchTerms)
  );
  
  if (exactMatch) return exactMatch;
  
  // Fuzzy matches for common ingredients
  const fuzzyMatches: Record<string, string> = {
    'chicken breast': 'chicken breast',
    'chicken': 'chicken',
    'milk': 'milk',
    'eggs': 'eggs',
    'egg': 'eggs',
    'olive oil': 'olive oil',
    'oil': 'olive oil',
    'bread': 'bread',
    'spaghetti': 'spaghetti',
    'pasta': 'pasta',
    'tomatoes': 'tomatoes',
    'tomato': 'tomatoes',
    'bananas': 'bananas',
    'banana': 'bananas',
    'curry': 'curry',
    'chili': 'chili',
    'chilli': 'chili'
  };
  
  for (const [key, value] of Object.entries(fuzzyMatches)) {
    if (searchTerms.includes(key)) {
      return mockItems.find(item => item.name.toLowerCase().includes(value));
    }
  }
  
  return undefined;
}

export function Chatbot({ onClose, onNavigateToItem }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your SwiftCart assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue.toLowerCase();
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const { response, ingredients } = getBotResponse(userInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        ingredients
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const getBotResponse = (input: string): { response: string; ingredients?: RecipeIngredient[] } => {
    // Check for recipe queries
    const recipeKeywords = ['recipe', 'make', 'cook', 'prepare', 'ingredients', 'need'];
    const isRecipeQuery = recipeKeywords.some(keyword => input.includes(keyword));
    
    if (isRecipeQuery) {
      // Find matching recipe
      for (const [recipeName, recipe] of Object.entries(recipes)) {
        if (input.includes(recipeName)) {
          // Match ingredients with store items
          const ingredientsWithItems = recipe.ingredients.map(ing => ({
            ...ing,
            item: findItemForIngredient(ing.name)
          }));
          
          const foundCount = ingredientsWithItems.filter(ing => ing.item).length;
          const totalCount = ingredientsWithItems.length;
          
          return {
            response: `Great! Here are the ingredients you need to make ${recipe.name}. I found ${foundCount} out of ${totalCount} items in our store. Tap "Navigate" to find each item!`,
            ingredients: ingredientsWithItems
          };
        }
      }
      
      // Generic recipe response if no match found
      return {
        response: 'I can help you find ingredients for recipes! Try asking about: Buttermilk Chicken, Spaghetti, French Toast, or Banana Smoothie.'
      };
    }
    
    // Check for standard responses
    for (const [key, response] of Object.entries(botResponses)) {
      if (input.includes(key)) {
        return { response };
      }
    }
    
    return { response: botResponses.default };
  };

  const handleQuickAction = (action: string) => {
    const message = action;
    setInputValue(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleNavigate = (item: Item) => {
    if (onNavigateToItem) {
      onNavigateToItem(item);
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-2xl z-50 bg-indigo-600 hover:bg-indigo-700"
      >
        <MessageCircle className="w-7 h-7" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-white">SwiftCart Assistant</h3>
            <p className="text-indigo-100 text-xs">Always here to help</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-indigo-700">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-indigo-100' : 'bg-gray-100'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-indigo-600" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                
                {/* Display ingredients list with navigation buttons */}
                {message.ingredients && message.ingredients.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.ingredients.map((ingredient, index) => (
                      <div 
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-3 text-left"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate">
                              {ingredient.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {ingredient.amount}
                            </p>
                            {ingredient.item && (
                              <div className="mt-1 flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  RM {ingredient.item.price.toFixed(2)}
                                  {ingredient.item.price < 1 ? '/g' : ''}
                                </Badge>
                                <p className="text-xs text-gray-500 truncate">
                                  {ingredient.item.aisle}
                                </p>
                              </div>
                            )}
                          </div>
                          {ingredient.item ? (
                            <Button
                              size="sm"
                              onClick={() => handleNavigate(ingredient.item!)}
                              className="bg-primary hover:bg-primary/90 flex-shrink-0"
                            >
                              <MapPin className="w-3 h-3 mr-1" />
                              Navigate
                            </Button>
                          ) : (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              Not in stock
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex-shrink-0 border-t pt-2">
          <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map(action => (
              <Badge
                key={action}
                variant="secondary"
                className="cursor-pointer hover:bg-indigo-100"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t flex-shrink-0">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
