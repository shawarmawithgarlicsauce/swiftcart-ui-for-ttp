import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ms';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Login Screen
    'welcome': 'Welcome to',
    'guest_login': 'Start',
    'login_description': 'Start your smart shopping experience',
    'powered_by': 'Powered by SwiftCart Technology',
    
    // Home Screen
    'home_title': 'Smart Shopping Dashboard',
    'find_items': 'Find Items',
    'find_items_desc': 'Search, compare & navigate to products',
    'shopping_cart': 'Shopping Cart',
    'items_detected': 'Items Detected',
    'total_amount': 'Total Amount',
    'quick_view': 'Quick View',
    'simulate_scan': 'Simulate Item Detection',
    'auto_detect': 'Auto-Detect',
    'auto_detect_desc': 'Camera & weight sensors active',
    'mykasih_disclaimer': 'MyKasih Users:',
    'mykasih_instruction': 'Please select the',
    'cash_option': 'Cash',
    'mykasih_continuation': 'payment option at checkout to use your MyKasih vouchers.',
    
    // Navigation
    'navigation_active': 'Navigation Active',
    'store_map': 'Store Map',
    'turn_by_turn': 'Turn-by-Turn Directions',
    'you_are_here': 'You are here',
    'entrance': 'Entrance',
    'walk_straight': 'Walk straight through the',
    'find_item_at': 'Find',
    'estimated_distance': 'Estimated walking distance',
    'meters': 'meters',
    'item_found': 'Item Found - Close Navigation',
    'follow_arrows': 'Follow the arrows on your trolley display',
    'navigation_started': 'Navigation started',
    
    // Search
    'search_items': 'Search Items',
    'search_placeholder': 'Search for products...',
    'all_categories': 'All Categories',
    'all_brands': 'All Brands',
    'filter': 'Filter',
    'compare_brands': 'Compare Brands',
    'navigate': 'Navigate',
    'promotion': 'Promotion',
    'no_items_found': 'No items found',
    
    // Cart
    'view_cart': 'View Cart & Checkout',
    'cart_summary': 'Cart Summary',
    'quantity': 'Quantity',
    'remove': 'Remove',
    'proceed_payment': 'Proceed to Payment',
    'continue_shopping': 'Continue Shopping',
    'empty_cart': 'Your cart is empty',
    'start_shopping': 'Start adding items to your cart',
    
    // Payment
    'payment': 'Payment',
    'order_summary': 'Order Summary',
    'items': 'items',
    'subtotal': 'Subtotal',
    'tax': 'Tax (6%)',
    'total': 'Total',
    'payment_method': 'Payment Method',
    'credit_card': 'Credit/Debit Card',
    'e_wallet': 'E-Wallet',
    'cash': 'Cash',
    'confirm_payment': 'Confirm Payment',
    'cancel': 'Cancel',
    'payment_verified': 'Payment verified successfully',
    
    // Success
    'payment_successful': 'Payment Successful!',
    'thank_you': 'Thank you for shopping with us',
    'receipt_sent': 'Your receipt has been sent to your email',
    'exit_store': 'Exit Store',
    
    // Chatbot
    'chatbot_title': 'SwiftCart Assistant',
    'chatbot_subtitle': 'Always here to help',
    'type_message': 'Type your message...',
    'quick_actions': 'Quick actions:',
    'item_details': 'Item details',
    'payment_help': 'Payment help',
    'customer_service': 'Customer service',
    'device_issue': 'Device issue',
    'store_location': 'Store location',
    'return_policy': 'Return policy',
    'not_in_stock': 'Not in stock',
    'ingredients_found': 'Great! Here are the ingredients you need to make',
    'found_items': 'I found',
    'out_of': 'out of',
    'items_in_store': 'items in our store. Tap "Navigate" to find each item!',
    
    // Brand Comparison
    'brand_comparison': 'Brand Comparison',
    'comparing': 'Comparing',
    'products': 'products',
    'best_value': 'Best Value',
    
    // Common
    'back': 'Back',
    'close': 'Close',
    'ok': 'OK',
    'save': 'Save',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
  },
  ms: {
    // Login Screen
    'welcome': 'Selamat Datang ke',
    'guest_login': 'Mula',
    'login_description': 'Mulakan pengalaman membeli-belah pintar anda',
    'powered_by': 'Dikuasakan oleh Teknologi SwiftCart',
    
    // Home Screen
    'home_title': 'Papan Pemuka Beli-belah Pintar',
    'find_items': 'Cari Barangan',
    'find_items_desc': 'Cari, bandingkan & navigasi ke produk',
    'shopping_cart': 'Troli Beli-belah',
    'items_detected': 'Barangan Dikesan',
    'total_amount': 'Jumlah Keseluruhan',
    'quick_view': 'Lihat Pantas',
    'simulate_scan': 'Simulasi Pengesanan Barangan',
    'auto_detect': 'Pengesanan Auto',
    'auto_detect_desc': 'Kamera & sensor berat aktif',
    'mykasih_disclaimer': 'Pengguna MyKasih:',
    'mykasih_instruction': 'Sila pilih pilihan pembayaran',
    'cash_option': 'Tunai',
    'mykasih_continuation': 'semasa pembayaran untuk menggunakan baucar MyKasih anda.',
    
    // Navigation
    'navigation_active': 'Navigasi Aktif',
    'store_map': 'Peta Kedai',
    'turn_by_turn': 'Arahan Langkah demi Langkah',
    'you_are_here': 'Anda di sini',
    'entrance': 'Pintu Masuk',
    'walk_straight': 'Berjalan terus melalui',
    'find_item_at': 'Cari',
    'estimated_distance': 'Anggaran jarak berjalan kaki',
    'meters': 'meter',
    'item_found': 'Barangan Dijumpai - Tutup Navigasi',
    'follow_arrows': 'Ikuti tanda anak panah pada paparan troli anda',
    'navigation_started': 'Navigasi dimulakan',
    
    // Search
    'search_items': 'Cari Barangan',
    'search_placeholder': 'Cari produk...',
    'all_categories': 'Semua Kategori',
    'all_brands': 'Semua Jenama',
    'filter': 'Tapis',
    'compare_brands': 'Bandingkan Jenama',
    'navigate': 'Navigasi',
    'promotion': 'Promosi',
    'no_items_found': 'Tiada barangan dijumpai',
    
    // Cart
    'view_cart': 'Lihat Troli & Bayar',
    'cart_summary': 'Ringkasan Troli',
    'quantity': 'Kuantiti',
    'remove': 'Buang',
    'proceed_payment': 'Teruskan ke Pembayaran',
    'continue_shopping': 'Teruskan Membeli-belah',
    'empty_cart': 'Troli anda kosong',
    'start_shopping': 'Mula menambah barangan ke troli anda',
    
    // Payment
    'payment': 'Pembayaran',
    'order_summary': 'Ringkasan Pesanan',
    'items': 'barangan',
    'subtotal': 'Subjumlah',
    'tax': 'Cukai (6%)',
    'total': 'Jumlah',
    'payment_method': 'Kaedah Pembayaran',
    'credit_card': 'Kad Kredit/Debit',
    'e_wallet': 'Dompet Elektronik',
    'cash': 'Tunai',
    'confirm_payment': 'Sahkan Pembayaran',
    'cancel': 'Batal',
    'payment_verified': 'Pembayaran disahkan dengan jayanya',
    
    // Success
    'payment_successful': 'Pembayaran Berjaya!',
    'thank_you': 'Terima kasih kerana membeli-belah dengan kami',
    'receipt_sent': 'Resit anda telah dihantar ke e-mel anda',
    'exit_store': 'Keluar dari Kedai',
    
    // Chatbot
    'chatbot_title': 'Pembantu SwiftCart',
    'chatbot_subtitle': 'Sentiasa bersedia membantu',
    'type_message': 'Taip mesej anda...',
    'quick_actions': 'Tindakan pantas:',
    'item_details': 'Butiran barangan',
    'payment_help': 'Bantuan pembayaran',
    'customer_service': 'Perkhidmatan pelanggan',
    'device_issue': 'Masalah peranti',
    'store_location': 'Lokasi kedai',
    'return_policy': 'Polisi pemulangan',
    'not_in_stock': 'Tiada stok',
    'ingredients_found': 'Hebat! Berikut adalah bahan-bahan yang anda perlukan untuk membuat',
    'found_items': 'Saya jumpa',
    'out_of': 'daripada',
    'items_in_store': 'barangan di kedai kami. Ketik "Navigasi" untuk mencari setiap barangan!',
    
    // Brand Comparison
    'brand_comparison': 'Perbandingan Jenama',
    'comparing': 'Membandingkan',
    'products': 'produk',
    'best_value': 'Nilai Terbaik',
    
    // Common
    'back': 'Kembali',
    'close': 'Tutup',
    'ok': 'OK',
    'save': 'Simpan',
    'loading': 'Memuatkan...',
    'error': 'Ralat',
    'success': 'Berjaya',
  }
};
