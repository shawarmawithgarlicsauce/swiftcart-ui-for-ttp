import { Button } from './ui/button';
import { Card } from './ui/card';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import swiftCartLogo from 'figma:asset/2f2fd3f3494b451e6d573549434bd41c71761826.png';
import storeBackground from 'figma:asset/c6a2b06ef266249fd599d8d502cc881ba5d4614e.png';

interface LoginScreenProps {
  onGuestLogin: () => void;
}

export function LoginScreen({ onGuestLogin }: LoginScreenProps) {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ms' : 'en');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-6 overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${storeBackground})`,
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Language Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          onClick={toggleLanguage}
          variant="outline"
          className="bg-white/95 backdrop-blur-sm hover:bg-white border-2 border-primary/30 shadow-lg"
          size="lg"
        >
          <Languages className="w-5 h-5 mr-2" />
          {language === 'en' ? 'Bahasa Melayu' : 'English'}
        </Button>
      </div>
      
      {/* Content */}
      <div className="tablet-container relative z-10">
        <Card className="w-full max-w-2xl mx-auto p-12 text-center border-4 border-primary shadow-2xl bg-white/95 backdrop-blur-sm">
          <div className="flex justify-center mb-8">
            <img 
              src={swiftCartLogo} 
              alt="SwiftCart Logo" 
              className="w-80 h-auto object-contain"
            />
          </div>
          
          <p className="text-gray-700 mb-10 text-lg">
            {t('welcome')} <span className="uppercase">MYDIN</span>! {t('login_description')}
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={onGuestLogin} 
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {t('guest_login')}
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-8">
            {t('powered_by')}
          </p>
        </Card>
      </div>
    </div>
  );
}
