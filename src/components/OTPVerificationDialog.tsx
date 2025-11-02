import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from './ui/input-otp';
import { useLanguage } from '../contexts/LanguageContext';

interface OTPVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
  countryCode: string;
  onVerify: () => void;
}

export function OTPVerificationDialog({ 
  open, 
  onOpenChange, 
  phoneNumber,
  countryCode,
  onVerify 
}: OTPVerificationDialogProps) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify();
    }
  };

  const handleResendCode = () => {
    // Simulate resending code
    setOtp('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            {t('enter_otp')}
          </DialogTitle>
          <DialogDescription>
            {t('otp_sent')} {countryCode} {phoneNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              onClick={handleResendCode}
              className="text-primary"
            >
              {t('resend_code')}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={handleVerify}
              disabled={otp.length !== 6}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {t('verify')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
