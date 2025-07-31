import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';

export function CookieNotice() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-kerit-dark text-white p-4 z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm">
            {t('cookies.message')}{' '}
            <Link href="/privacy" className="text-kerit-yellow hover:underline">
              {t('cookies.learn_more')}
            </Link>
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleAccept}
            className="bg-kerit-yellow text-kerit-dark px-4 py-2 text-sm font-medium hover:bg-yellow-400"
          >
            {t('cookies.accept')}
          </Button>
          <Button
            onClick={handleDecline}
            className="bg-kerit-yellow text-kerit-dark px-4 py-2 text-sm font-medium hover:bg-yellow-400"
          >
            {t('cookies.decline')}
          </Button>
        </div>
      </div>
    </div>
  );
}
