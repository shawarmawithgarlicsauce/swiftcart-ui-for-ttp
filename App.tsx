import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner@2.0.3";
import { LoginScreen } from "./components/LoginScreen";
import { HomeScreen } from "./components/HomeScreen";
import { ItemSearchScreen } from "./components/ItemSearchScreen";
import { NavigationDisplay } from "./components/NavigationDisplay";
import { ScannedItemsCart } from "./components/ScannedItemsCart";
import { CartItemsViewer } from "./components/CartItemsViewer";
import { BarcodeScannerScreen } from "./components/BarcodeScannerScreen";
import { PaymentScreen } from "./components/PaymentScreen";
import { SuccessScreen } from "./components/SuccessScreen";
import { BrandComparison } from "./components/BrandComparison";
import { Chatbot } from "./components/Chatbot";
import { Screen, Item, CartItem } from "./types";
import { mockItems } from "./data/mockItems";
import {
  LanguageProvider,
  useLanguage,
} from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { t } = useLanguage();
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("login");
  const [scannedItems, setScannedItems] = useState<CartItem[]>(
    [],
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(
    null,
  );
  const [comparisonCategory, setComparisonCategory] =
    useState<string>("");
  const [showQuickCartView, setShowQuickCartView] =
    useState(false);
  const [userType, setUserType] = useState<
    "guest" | "phone" | "registered"
  >("guest");
  const [userData, setUserData] = useState<{
    phoneNumber?: string;
    fullName?: string;
  }>({});

  // Auto-detect items simulation
  useEffect(() => {
    if (currentScreen === "home") {
      const timer = setTimeout(() => {
        // Simulate auto-detection every 15 seconds if on home screen
        const randomItem =
          mockItems[
            Math.floor(Math.random() * mockItems.length)
          ];
        const existingItem = scannedItems.find(
          (item) => item.id === randomItem.id,
        );

        if (Math.random() > 0.7 && scannedItems.length < 5) {
          // 30% chance
          if (existingItem) {
            handleAddScannedItem({
              ...existingItem,
              quantity: existingItem.quantity + 1,
            });
          } else {
            handleAddScannedItem({
              ...randomItem,
              quantity: 1,
              weight: Math.random() * 2 + 0.5,
            });
          }
        }
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, scannedItems]);

  // Calculate total price from scanned items
  const totalPrice = scannedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const scannedItemsCount = scannedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // Handle guest login
  const handleGuestLogin = () => {
    setUserType("guest");
    setUserData({});
    setCurrentScreen("home");
    toast.success("Welcome to SwiftCart!", {
      description: "Logged in as Guest",
    });
  };

  // Handle phone/registered login
  const handlePhoneLogin = (data?: {
    phoneNumber: string;
    fullName?: string;
  }) => {
    if (data?.fullName) {
      // User registered with full name
      setUserType("registered");
      setUserData({
        phoneNumber: data.phoneNumber,
        fullName: data.fullName,
      });
      toast.success(`Welcome, ${data.fullName}!`, {
        description: "Account successfully created",
      });
    } else {
      // User logged in with phone only
      setUserType("phone");
      setUserData({ phoneNumber: data?.phoneNumber });
      toast.success("Welcome to SwiftCart!", {
        description: "Logged in with Phone Number",
      });
    }
    setCurrentScreen("home");
  };

  // Handle item selection for navigation
  const handleSelectItem = (item: Item) => {
    setSelectedItem(item);
    setCurrentScreen("navigation");
    toast.info("Navigation started");
  };

  // Handle add scanned item
  const handleAddScannedItem = (item: CartItem) => {
    setScannedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? item : i));
      }
      return [...prev, item];
    });
    toast.success(`${item.name} detected`, {
      description: `RM ${item.price.toFixed(2)} - Qty: ${item.quantity}`,
    });
  };

  // Handle remove scanned item
  const handleRemoveScannedItem = (itemId: string) => {
    const item = scannedItems.find((i) => i.id === itemId);
    setScannedItems((prev) =>
      prev.filter((i) => i.id !== itemId),
    );
    if (item) {
      toast.info(`${item.name} removed from cart`);
    }
  };

  // Handle update quantity
  const handleUpdateQuantity = (
    itemId: string,
    newQuantity: number,
  ) => {
    setScannedItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
    toast.success("Quantity updated");
  };

  // Handle payment confirmation
  const handleConfirmPayment = () => {
    toast.success("Payment verified successfully");
    setCurrentScreen("success");
  };

  // Handle exit after successful payment
  const handleExit = () => {
    setCurrentScreen("login");
    setScannedItems([]);
    setSelectedItem(null);
    setUserType("guest");
    setUserData({});
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentScreen("login");
    setScannedItems([]);
    setSelectedItem(null);
    setUserType("guest");
    setUserData({});
  };

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (scannedItems.length === 0) {
      toast.error("No items in cart");
      return;
    }
    setCurrentScreen("payment");
  };

  // Handle brand comparison
  const handleShowComparison = (category: string) => {
    setComparisonCategory(category);
    setCurrentScreen("comparison");
  };

  // Handle simulate scan for demo
  const handleSimulateScan = () => {
    const randomItem =
      mockItems[Math.floor(Math.random() * mockItems.length)];
    const existingItem = scannedItems.find(
      (item) => item.id === randomItem.id,
    );

    if (existingItem) {
      handleAddScannedItem({
        ...existingItem,
        quantity: existingItem.quantity + 1,
      });
    } else {
      handleAddScannedItem({
        ...randomItem,
        quantity: 1,
        weight: Math.random() * 2 + 0.5,
      });
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      {currentScreen === "login" && (
        <LoginScreen
          onGuestLogin={handleGuestLogin}
          onPhoneLogin={handlePhoneLogin}
        />
      )}

      {currentScreen === "home" && (
        <HomeScreen
          onNavigateToSearch={() => setCurrentScreen("search")}
          onNavigateToScannedCart={() =>
            setCurrentScreen("scannedCart")
          }
          onQuickViewCart={() => setShowQuickCartView(true)}
          scannedItemsCount={scannedItemsCount}
          totalPrice={totalPrice}
          onSimulateScan={handleSimulateScan}
          userType={userType}
          userData={userData}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "search" && (
        <ItemSearchScreen
          onBack={() => setCurrentScreen("home")}
          onSelectItem={handleSelectItem}
          onCompare={handleShowComparison}
        />
      )}

      {currentScreen === "comparison" && (
        <BrandComparison
          items={mockItems.filter(
            (item) => item.category === comparisonCategory,
          )}
          category={comparisonCategory}
          onBack={() => setCurrentScreen("search")}
          onNavigateToItem={handleSelectItem}
        />
      )}

      {currentScreen === "navigation" && selectedItem && (
        <NavigationDisplay
          item={selectedItem}
          onClose={() => setCurrentScreen("home")}
        />
      )}

      {currentScreen === "scannedCart" && (
        <ScannedItemsCart
          onBack={() => setCurrentScreen("home")}
          scannedItems={scannedItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveScannedItem}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {currentScreen === "scanner" && (
        <BarcodeScannerScreen
          onBack={() => setCurrentScreen("home")}
          scannedItems={scannedItems}
          onAddScannedItem={handleAddScannedItem}
          onRemoveScannedItem={handleRemoveScannedItem}
          totalPrice={totalPrice}
        />
      )}

      {currentScreen === "payment" && (
        <PaymentScreen
          scannedItems={scannedItems}
          totalPrice={totalPrice}
          onConfirmPayment={handleConfirmPayment}
          onCancel={() => setCurrentScreen("home")}
        />
      )}

      {currentScreen === "success" && (
        <SuccessScreen
          totalPrice={totalPrice}
          onExit={handleExit}
        />
      )}

      {/* Chatbot - Available on all screens except login */}
      {currentScreen !== "login" &&
        currentScreen !== "success" && (
          <Chatbot onNavigateToItem={handleSelectItem} />
        )}

      {/* Checkout button - More prominent floating button */}
      {currentScreen === "home" && scannedItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none z-40">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <button
              onClick={() => setCurrentScreen("scannedCart")}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] animate-pulse"
            >
              <span className="text-xl">
                View Cart & Checkout
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-xl text-2xl backdrop-blur-sm">
                RM {totalPrice.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Scanned items viewer on scanner screen */}
      {currentScreen === "scanner" && scannedItemsCount > 0 && (
        <div className="fixed bottom-6 left-6 bg-white rounded-lg shadow-xl p-4 max-w-xs z-40">
          <h4 className="mb-2">Cart Summary</h4>
          <div className="space-y-1 text-sm">
            {scannedItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span className="truncate">
                  {item.name} x{item.quantity}
                </span>
                <span>
                  RM {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            {scannedItems.length > 3 && (
              <p className="text-gray-500 text-xs">
                +{scannedItems.length - 3} more items
              </p>
            )}
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between">
            <span>Total:</span>
            <span>RM {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Quick Cart Viewer Modal */}
      <CartItemsViewer
        isOpen={showQuickCartView}
        onClose={() => setShowQuickCartView(false)}
        scannedItems={scannedItems}
        onViewFullCart={() => {
          setShowQuickCartView(false);
          setCurrentScreen("scannedCart");
        }}
      />
    </>
  );
}