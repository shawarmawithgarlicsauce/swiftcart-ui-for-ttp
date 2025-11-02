import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';

interface RegistrationSuccessDialogProps {
  open: boolean;
  onComplete: () => void;
}

export function RegistrationSuccessDialog({ 
  open, 
  onComplete 
}: RegistrationSuccessDialogProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (open) {
      // Auto-close after 2.5 seconds and proceed to main page
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [open, onComplete]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-4 text-center">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            {t('registration_title')}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 text-center">
          <p className="text-gray-700">
            {t('registration_success')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
