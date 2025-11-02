import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
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
import { TermsDialog } from './TermsDialog';

interface RegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: (data: { phoneNumber: string; countryCode: string; fullName?: string }) => void;
}

export function RegistrationForm({ 
  open, 
  onOpenChange, 
  onRegister 
}: RegistrationFormProps) {
  const { t } = useLanguage();
  const [countryCode, setCountryCode] = useState('+60');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const handleRegister = () => {
    if (phoneNumber.trim() && agreeTerms) {
      onRegister({
        phoneNumber,
        countryCode,
        fullName: fullName.trim() || undefined
      });
    }
  };

  const handleTermsAccept = () => {
    setAgreeTerms(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            {t('create_account')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="fullname">{t('full_name_optional')}</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Phone Number Field */}
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

          {/* Terms & Privacy Checkbox */}
          <div className="flex items-center space-x-2 py-2">
            <Checkbox 
              id="terms" 
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('agree_to')}{' '}
              <button
                type="button"
                onClick={() => setShowTermsDialog(true)}
                className="text-primary hover:underline font-medium"
              >
                {t('terms_and_privacy')}
              </button>
              .
            </label>
          </div>

          {/* Register Button */}
          <Button
            onClick={handleRegister}
            disabled={phoneNumber.length < 7 || !agreeTerms}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            {t('register')}
          </Button>
        </div>

        {/* Terms and Conditions Dialog */}
        <TermsDialog
          open={showTermsDialog}
          onOpenChange={setShowTermsDialog}
          onAccept={handleTermsAccept}
        />
      </DialogContent>
    </Dialog>
  );
}
