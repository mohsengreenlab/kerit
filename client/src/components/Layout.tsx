import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieNotice } from './CookieNotice';
import { AppointmentModal } from './AppointmentModal';
import { LanguageContext } from '@/hooks/useLanguage';
import { getTranslation, defaultTranslations } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [locale, setLocale] = useState<string>(() => {
    return localStorage.getItem('language') || 'ru';
  });
  
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Fetch translations from API
  const { data: apiTranslations = {} } = useQuery({
    queryKey: ['/api/translations', locale],
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Track page views
  useEffect(() => {
    trackPageView(window.location.pathname, document.title);
  }, []);

  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('language', newLocale);
  };

  const t = (key: string, defaultValue?: string) => {
    return getTranslation(key, locale, apiTranslations) || defaultValue || key;
  };

  const languageContextValue = {
    locale,
    setLocale: handleSetLocale,
    t,
    translations: apiTranslations,
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieNotice />
        {isAppointmentModalOpen && (
          <AppointmentModal onClose={() => setIsAppointmentModalOpen(false)} />
        )}
      </div>
    </LanguageContext.Provider>
  );
}
