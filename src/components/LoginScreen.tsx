import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Languages, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PhoneLoginDialog } from './PhoneLoginDialog';
import { RegistrationForm } from './RegistrationForm';
import { OTPVerificationDialog } from './OTPVerificationDialog';
import { RegistrationSuccessDialog } from './RegistrationSuccessDialog';
import swiftCartLogo from 'figma:asset/2f2fd3f3494b451e6d573549434bd41c71761826.png';
import storeBackground from 'figma:asset/c6a2b06ef266249fd599d8d502cc881ba5d4614e.png';

interface LoginScreenProps {
  onGuestLogin: () => void;
  onPhoneLogin?: (userData?: { phoneNumber: string; fullName?: string }) => void;
}

export function LoginScreen({ onGuestLogin, onPhoneLogin }: LoginScreenProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [fullName, setFullName] = useState('');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ms' : 'en');
  };

  const handlePhoneLogin = () => {
    setShowPhoneDialog(true);
  };

  const handleRegister = () => {
    setShowRegistrationForm(true);
  };

  const handlePhoneContinue = (phone: string, code: string) => {
    setPhoneNumber(phone);
    setCountryCode(code);
    setShowPhoneDialog(false);
    
    // For phone login, go directly to main page
    if (onPhoneLogin) {
      onPhoneLogin({ phoneNumber: phone });
    } else {
      onGuestLogin();
    }
  };

  const handleRegistrationFormSubmit = (data: { phoneNumber: string; countryCode: string; fullName?: string }) => {
    setPhoneNumber(data.phoneNumber);
    setCountryCode(data.countryCode);
    setFullName(data.fullName || '');
    setShowRegistrationForm(false);
    setShowOTPDialog(true);
  };

  const handleOTPVerify = () => {
    setShowOTPDialog(false);
    setShowSuccessDialog(true);
  };

  const handleRegistrationComplete = () => {
    setShowSuccessDialog(false);
    // Proceed to main page with user data
    if (onPhoneLogin) {
      onPhoneLogin({ phoneNumber, fullName });
    } else {
      onGuestLogin();
    }
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
            <div className="border-4 border-primary rounded-2xl p-6 bg-white shadow-lg">
              <img 
                src={swiftCartLogo} 
                alt="SwiftCart Logo" 
                className="w-80 h-auto object-contain"
              />
            </div>
          </div>
          
          <p className="text-gray-700 mb-10 text-lg">
            {t('welcome')} <span className="uppercase">MYDIN</span>! {t('login_description')}
          </p>
          
          <div className="space-y-4 mb-3">
            <Button 
              onClick={handlePhoneLogin} 
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              {t('phone_login')}
            </Button>
            
            <Button 
              onClick={onGuestLogin} 
              variant="outline"
              className="w-full border-2 border-primary/50 hover:bg-primary/5"
              size="lg"
            >
              {t('guest_login')}
            </Button>
          </div>

          {/* Register Option */}
          <div className="text-center mb-6">
            <button 
              onClick={handleRegister}
              className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
            >
              {t('register_new')}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            {t('powered_by')}
          </p>
        </Card>
      </div>

      {/* Phone Login Dialog */}
      <PhoneLoginDialog
        open={showPhoneDialog}
        onOpenChange={setShowPhoneDialog}
        onContinue={handlePhoneContinue}
        isRegistration={false}
      />

      {/* Registration Form */}
      <RegistrationForm
        open={showRegistrationForm}
        onOpenChange={setShowRegistrationForm}
        onRegister={handleRegistrationFormSubmit}
      />

      {/* OTP Verification Dialog */}
      <OTPVerificationDialog
        open={showOTPDialog}
        onOpenChange={setShowOTPDialog}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        onVerify={handleOTPVerify}
      />

      {/* Registration Success Dialog */}
      <RegistrationSuccessDialog
        open={showSuccessDialog}
        onComplete={handleRegistrationComplete}
      />
    </div>
  );
}
