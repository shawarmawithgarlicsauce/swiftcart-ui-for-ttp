import { useState } from 'react';
import { Smartphone, Barcode } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useLanguage } from '../contexts/LanguageContext';

interface PhoneLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (phoneNumber: string, countryCode: string) => void;
  isRegistration?: boolean;
}

export function PhoneLoginDialog({ 
  open, 
  onOpenChange, 
  onContinue,
  isRegistration = false 
}: PhoneLoginDialogProps) {
  const { t } = useLanguage();
  const [countryCode, setCountryCode] = useState('+60');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (phoneNumber.trim()) {
      onContinue(phoneNumber, countryCode);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            {isRegistration ? t('register_new') : t('enter_phone')}
          </DialogTitle>
          <DialogDescription>
            {isRegistration 
              ? t('login_description')
              : t('enter_phone')
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone">{t('phone_number')}</Label>
            <div className="flex gap-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+60">🇲🇾 +60</SelectItem>
                  <SelectItem value="+65">🇸🇬 +65</SelectItem>
                  <SelectItem value="+62">🇮🇩 +62</SelectItem>
                  <SelectItem value="+66">🇹🇭 +66</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                placeholder="123456789"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="flex-1"
                maxLength={12}
              />
            </div>
          </div>

          {/* Barcode scan option - only show for phone login, not registration */}
          {!isRegistration && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-blue-900">
                <Barcode className="w-4 h-4 flex-shrink-0" />
                <span>{t('scan_barcode_option')}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={handleContinue}
              disabled={phoneNumber.length < 7}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {t('continue')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
