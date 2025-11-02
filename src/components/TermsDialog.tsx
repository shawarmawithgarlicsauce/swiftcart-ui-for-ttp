import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export function TermsDialog({ 
  open, 
  onOpenChange, 
  onAccept 
}: TermsDialogProps) {
  const { t } = useLanguage();
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleAccept = () => {
    if (agreeTerms) {
      onAccept();
      onOpenChange(false);
      setAgreeTerms(false); // Reset for next time
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setAgreeTerms(false); // Reset when closing
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{t('terms_title')}</DialogTitle>
          <DialogDescription>
            {t('terms_subtitle')}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto px-6" style={{ maxHeight: 'calc(85vh - 280px)' }}>
          <div className="space-y-4 text-sm text-gray-700 pb-4">
            <section>
              <h3 className="font-semibold text-gray-900 mb-2">1. {t('terms_acceptance')}</h3>
              <p>
                {t('terms_acceptance_text')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">2. {t('terms_usage')}</h3>
              <p>
                {t('terms_usage_text')}
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>{t('terms_usage_item1')}</li>
                <li>{t('terms_usage_item2')}</li>
                <li>{t('terms_usage_item3')}</li>
                <li>{t('terms_usage_item4')}</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">3. {t('terms_privacy')}</h3>
              <p>
                {t('terms_privacy_text')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">4. {t('terms_account')}</h3>
              <p>
                {t('terms_account_text')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">5. {t('terms_payment')}</h3>
              <p>
                {t('terms_payment_text')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">6. {t('terms_liability')}</h3>
              <p>
                {t('terms_liability_text')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">7. {t('terms_modifications')}</h3>
              <p>
                {t('terms_modifications_text')}
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-gray-900 mb-2">8. {t('terms_contact')}</h3>
              <p>
                {t('terms_contact_text')}
              </p>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-col gap-4 px-6 pb-6 pt-4 border-t bg-white">
          {/* Agreement Checkbox */}
          <div className="flex items-center space-x-2 w-full">
            <Checkbox 
              id="terms-accept" 
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
            />
            <label
              htmlFor="terms-accept"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {t('terms_agree_checkbox')}
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => handleClose(false)}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!agreeTerms}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {t('accept_continue')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
