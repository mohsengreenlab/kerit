import { useLanguage } from '@/hooks/useLanguage';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => setLocale('ru')}
        className={`font-medium transition-colors ${
          locale === 'ru' 
            ? 'text-kerit-dark border-b-2 border-kerit-yellow' 
            : 'text-gray-500 hover:text-kerit-dark'
        }`}
      >
        RU
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => setLocale('en')}
        className={`font-medium transition-colors ${
          locale === 'en' 
            ? 'text-kerit-dark border-b-2 border-kerit-yellow' 
            : 'text-gray-500 hover:text-kerit-dark'
        }`}
      >
        EN
      </button>
    </div>
  );
}
