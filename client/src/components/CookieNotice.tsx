import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function CookieNotice() {
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
            Мы используем cookies для улучшения работы сайта и анализа посещаемости.{' '}
            <Link href="/privacy">
              <a className="text-kerit-yellow hover:underline">Подробнее</a>
            </Link>
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleAccept}
            className="bg-kerit-yellow text-kerit-dark px-4 py-2 text-sm font-medium hover:bg-yellow-400"
          >
            Принять
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            className="border-kerit-light text-kerit-light px-4 py-2 text-sm hover:bg-kerit-light hover:text-kerit-dark"
          >
            Отклонить
          </Button>
        </div>
      </div>
    </div>
  );
}
