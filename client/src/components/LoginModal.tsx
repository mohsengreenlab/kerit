import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/useLanguage';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      // Use the development login endpoint
      window.location.href = '/api/dev-login';
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-kerit-dark">{t('auth.login')}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {t('auth.demo_login_desc')}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.email')}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@kerit.com"
                value="demo@kerit.com"
                disabled
                className="w-full bg-gray-50"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value="demo123"
                disabled
                className="w-full bg-gray-50"
              />
            </div>
          </div>

          <Button
            onClick={handleDemoLogin}
            className="w-full bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                {t('auth.logging_in')}
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                {t('auth.demo_login')}
              </>
            )}
          </Button>

          <div className="text-center text-sm text-gray-500">
            <p>{t('auth.demo_note')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}