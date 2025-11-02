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
    'guest_login': 'Continue as Guest',
    'phone_login': 'Continue with Phone Number',
    'register_new': 'Register New Account',
    'terms_privacy': 'By continuing, you agree to our Terms & Privacy.',
    'login_description': 'Start your smart shopping experience',
    'powered_by': 'Powered by SwiftCart Technology',
    
    // Phone Login Dialog
    'enter_phone': 'Enter Phone Number',
    'phone_number': 'Phone Number',
    'continue': 'Continue',
    'cancel': 'Cancel',
    'scan_barcode_option': 'Or scan your MYDIN member barcode via the app',
    'enter_otp': 'Enter Verification Code',
    'otp_sent': 'We\'ve sent a 6-digit code to',
    'verify': 'Verify',
    'resend_code': 'Resend Code',
    'registration_success': 'You\'ve successfully registered with MYDIN! Enjoy exclusive discounts and rewards!',
    'registration_title': 'Registration Successful',
    
    // Registration Form
    'full_name': 'Full Name',
    'full_name_optional': 'Full Name (Optional)',
    'agree_terms': 'I agree to the Terms & Privacy.',
    'agree_to': 'I agree to the',
    'terms_and_privacy': 'Terms & Privacy',
    'register': 'Register',
    'create_account': 'Create Your Account',
    
    // Terms & Conditions
    'terms_title': 'Terms & Conditions and Privacy Policy',
    'terms_subtitle': 'Please read and accept our terms to continue',
    'terms_acceptance': 'Acceptance of Terms',
    'terms_acceptance_text': 'By accessing and using SwiftCart smart shopping system at MYDIN stores, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our service.',
    'terms_usage': 'Service Usage',
    'terms_usage_text': 'SwiftCart provides an automated shopping experience with the following features:',
    'terms_usage_item1': 'Automatic item detection using barcode scanners, cameras, and weight sensors',
    'terms_usage_item2': 'In-store navigation and product location services',
    'terms_usage_item3': 'Digital payment processing and receipt generation',
    'terms_usage_item4': 'Promotional offers and loyalty rewards tracking',
    'terms_privacy': 'Privacy and Data Collection',
    'terms_privacy_text': 'We collect and process your personal information including phone number, purchase history, and shopping preferences to provide and improve our services. Your data is encrypted and stored securely. We do not share your personal information with third parties without your consent, except as required by law.',
    'terms_account': 'Account Responsibilities',
    'terms_account_text': 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify us immediately of any unauthorized use of your account.',
    'terms_payment': 'Payment Terms',
    'terms_payment_text': 'All prices are displayed in Malaysian Ringgit (RM). Payment must be completed before exiting the store. We accept credit/debit cards, e-wallets, cash, and MyKasih vouchers. All transactions are subject to verification and approval.',
    'terms_liability': 'Limitation of Liability',
    'terms_liability_text': 'SwiftCart and MYDIN are not liable for any indirect, incidental, or consequential damages arising from the use of our service. While we strive for accuracy in item detection and pricing, errors may occur and will be corrected promptly.',
    'terms_modifications': 'Modifications to Terms',
    'terms_modifications_text': 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of SwiftCart after changes constitutes acceptance of the modified terms.',
    'terms_contact': 'Contact Information',
    'terms_contact_text': 'For questions about these Terms and Conditions or Privacy Policy, please contact MYDIN customer service at support@mydin.com.my or visit our customer service desk in-store.',
    'terms_agree_checkbox': 'I have read and agree to the Terms & Conditions and Privacy Policy',
    'accept_continue': 'Accept & Continue',
    
    // User Profile & Points
    'my_points': 'My Points',
    'points': 'Points',
    'purchase_history': 'Purchase History',
    'logout': 'Logout',
    'back_to_start': 'Back to Start',
    'no_purchase_history': 'No purchase history yet',
    'view_history': 'View your past purchases and details',
    'date': 'Date',
    'items': 'Items',
    'amount': 'Amount',
    'item_name': 'Item Name',
    'brand': 'Brand',
    'qty': 'Qty',
    'subtotal': 'Subtotal',
    
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
    'guest_login': 'Teruskan sebagai Tetamu',
    'phone_login': 'Teruskan dengan Nombor Telefon',
    'register_new': 'Daftar Akaun Baharu',
    'terms_privacy': 'Dengan meneruskan, anda bersetuju dengan Terma & Privasi kami.',
    'login_description': 'Mulakan pengalaman membeli-belah pintar anda',
    'powered_by': 'Dikuasakan oleh Teknologi SwiftCart',
    
    // Phone Login Dialog
    'enter_phone': 'Masukkan Nombor Telefon',
    'phone_number': 'Nombor Telefon',
    'continue': 'Teruskan',
    'cancel': 'Batal',
    'scan_barcode_option': 'Atau imbas kod bar ahli MYDIN anda melalui aplikasi',
    'enter_otp': 'Masukkan Kod Pengesahan',
    'otp_sent': 'Kami telah menghantar kod 6 digit ke',
    'verify': 'Sahkan',
    'resend_code': 'Hantar Semula Kod',
    'registration_success': 'Anda berjaya mendaftar dengan MYDIN! Nikmati diskaun dan ganjaran eksklusif!',
    'registration_title': 'Pendaftaran Berjaya',
    
    // Registration Form
    'full_name': 'Nama Penuh',
    'full_name_optional': 'Nama Penuh (Pilihan)',
    'agree_terms': 'Saya bersetuju dengan Terma & Privasi.',
    'agree_to': 'Saya bersetuju dengan',
    'terms_and_privacy': 'Terma & Privasi',
    'register': 'Daftar',
    'create_account': 'Cipta Akaun Anda',
    
    // Terms & Conditions
    'terms_title': 'Terma & Syarat dan Dasar Privasi',
    'terms_subtitle': 'Sila baca dan terima terma kami untuk meneruskan',
    'terms_acceptance': 'Penerimaan Terma',
    'terms_acceptance_text': 'Dengan mengakses dan menggunakan sistem beli-belah pintar SwiftCart di kedai MYDIN, anda bersetuju untuk terikat dengan Terma dan Syarat ini. Jika anda tidak bersetuju dengan mana-mana bahagian terma ini, sila jangan gunakan perkhidmatan kami.',
    'terms_usage': 'Penggunaan Perkhidmatan',
    'terms_usage_text': 'SwiftCart menyediakan pengalaman beli-belah automatik dengan ciri-ciri berikut:',
    'terms_usage_item1': 'Pengesanan barangan automatik menggunakan pengimbas kod bar, kamera, dan sensor berat',
    'terms_usage_item2': 'Navigasi dalam kedai dan perkhidmatan lokasi produk',
    'terms_usage_item3': 'Pemprosesan pembayaran digital dan penjanaan resit',
    'terms_usage_item4': 'Tawaran promosi dan penjejakan ganjaran kesetiaan',
    'terms_privacy': 'Privasi dan Pengumpulan Data',
    'terms_privacy_text': 'Kami mengumpul dan memproses maklumat peribadi anda termasuk nombor telefon, sejarah pembelian, dan pilihan beli-belah untuk menyediakan dan meningkatkan perkhidmatan kami. Data anda disulitkan dan disimpan dengan selamat. Kami tidak berkongsi maklumat peribadi anda dengan pihak ketiga tanpa persetujuan anda, kecuali seperti yang dikehendaki oleh undang-undang.',
    'terms_account': 'Tanggungjawab Akaun',
    'terms_account_text': 'Anda bertanggungjawab untuk mengekalkan kerahsiaan kelayakan akaun anda dan untuk semua aktiviti yang berlaku di bawah akaun anda. Sila maklumkan kami dengan segera sekiranya terdapat penggunaan tidak sah akaun anda.',
    'terms_payment': 'Terma Pembayaran',
    'terms_payment_text': 'Semua harga dipaparkan dalam Ringgit Malaysia (RM). Pembayaran mesti diselesaikan sebelum keluar dari kedai. Kami menerima kad kredit/debit, dompet elektronik, tunai, dan baucar MyKasih. Semua transaksi tertakluk kepada pengesahan dan kelulusan.',
    'terms_liability': 'Had Liabiliti',
    'terms_liability_text': 'SwiftCart dan MYDIN tidak bertanggungjawab untuk sebarang kerosakan tidak langsung, sampingan, atau berbangkit yang timbul daripada penggunaan perkhidmatan kami. Walaupun kami berusaha untuk ketepatan dalam pengesanan barangan dan harga, kesilapan mungkin berlaku dan akan diperbetulkan dengan segera.',
    'terms_modifications': 'Pengubahsuaian Terma',
    'terms_modifications_text': 'Kami berhak untuk mengubah suai terma ini pada bila-bila masa. Perubahan akan berkuat kuasa serta-merta selepas disiark an. Penggunaan berterusan SwiftCart anda selepas perubahan membentuk penerimaan terma yang diubah suai.',
    'terms_contact': 'Maklumat Hubungan',
    'terms_contact_text': 'Untuk soalan tentang Terma dan Syarat atau Dasar Privasi ini, sila hubungi perkhidmatan pelanggan MYDIN di support@mydin.com.my atau lawati meja perkhidmatan pelanggan kami di kedai.',
    'terms_agree_checkbox': 'Saya telah membaca dan bersetuju dengan Terma & Syarat dan Dasar Privasi',
    'accept_continue': 'Terima & Teruskan',
    
    // User Profile & Points
    'my_points': 'Mata Saya',
    'points': 'Mata',
    'purchase_history': 'Sejarah Pembelian',
    'logout': 'Log Keluar',
    'back_to_start': 'Kembali ke Mula',
    'no_purchase_history': 'Tiada sejarah pembelian lagi',
    'view_history': 'Lihat pembelian lalu dan butiran anda',
    'date': 'Tarikh',
    'items': 'Barangan',
    'amount': 'Jumlah',
    'item_name': 'Nama Barangan',
    'brand': 'Jenama',
    'qty': 'Kuantiti',
    'subtotal': 'Subjumlah',
    
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
