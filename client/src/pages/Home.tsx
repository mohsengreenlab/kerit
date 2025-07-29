import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'wouter';

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="Панель управления - Kerit"
        description="Добро пожаловать в панель управления Kerit"
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-kerit-dark mb-4">
              Добро пожаловать, {user?.firstName || user?.email}!
            </h1>
            <p className="text-xl text-gray-600">
              Ваша панель управления Kerit
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {user?.role === 'admin' && (
              <Link href="/admin">
                <a className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-kerit-yellow">
                  <div className="text-center">
                    <div className="bg-kerit-dark rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-cog text-2xl text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-kerit-dark mb-2">Админ-панель</h3>
                    <p className="text-gray-600">Управление контентом, аналитикой и пользователями</p>
                  </div>
                </a>
              </Link>
            )}

            {user?.role === 'customer' && (
              <Link href="/dashboard">
                <a className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-kerit-yellow">
                  <div className="text-center">
                    <div className="bg-kerit-sage rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-user text-2xl text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-kerit-dark mb-2">Клиентская панель</h3>
                    <p className="text-gray-600">Просмотр ваших проектов и статусов</p>
                  </div>
                </a>
              </Link>
            )}

            <Link href="/services">
              <a className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-kerit-yellow">
                <div className="text-center">
                  <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-list text-2xl text-kerit-dark"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-kerit-dark mb-2">{t('nav.services')}</h3>
                  <p className="text-gray-600">Просмотр наших услуг и решений</p>
                </div>
              </a>
            </Link>

            <Link href="/contact">
              <a className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-kerit-yellow">
                <div className="text-center">
                  <div className="bg-kerit-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-envelope text-2xl text-kerit-dark"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-kerit-dark mb-2">{t('nav.contact')}</h3>
                  <p className="text-gray-600">Связаться с нашей командой</p>
                </div>
              </a>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <a href="/api/logout" className="text-kerit-sage hover:text-kerit-dark transition-colors">
              <i className="fas fa-sign-out-alt mr-2"></i>
              Выйти из системы
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
