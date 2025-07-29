import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { AppointmentModal } from '@/components/AppointmentModal';

interface ServiceWithPackages {
  id: string;
  name: string;
  slug: string;
  description: string;
  packages: {
    id: string;
    name: string;
    type: 'basic' | 'pro' | 'enterprise';
    price: number;
    currency: string;
    features: string[];
    description: string;
  }[];
}

export default function Pricing() {
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const { data: servicesWithPackages, isLoading, error } = useQuery<ServiceWithPackages[]>({
    queryKey: ['/api/pricing'],
  });

  const getPackageColor = (type: string) => {
    switch (type) {
      case 'basic':
        return 'border-gray-200';
      case 'pro':
        return 'border-kerit-yellow border-2';
      case 'enterprise':
        return 'border-kerit-sage';
      default:
        return 'border-gray-200';
    }
  };

  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'basic':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'pro':
        return 'bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark';
      case 'enterprise':
        return 'bg-kerit-sage hover:bg-opacity-90 text-white';
      default:
        return 'bg-kerit-sage hover:bg-opacity-90 text-white';
    }
  };

  const formatPrice = (price: number, currency: string = 'USD') => {
    if (currency === 'USD') {
      return `$${(price / 100).toLocaleString()}`;
    }
    return `${(price / 100).toLocaleString()} ₽`;
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="loading-shimmer h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="loading-shimmer h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="space-y-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-8">
                <div className="loading-shimmer h-8 w-64 mx-auto rounded"></div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="bg-white rounded-2xl shadow-lg p-8">
                      <div className="loading-shimmer h-6 w-24 rounded mb-4"></div>
                      <div className="loading-shimmer h-10 w-32 rounded mb-6"></div>
                      <div className="space-y-3 mb-8">
                        {[...Array(4)].map((_, k) => (
                          <div key={k} className="loading-shimmer h-4 w-full rounded"></div>
                        ))}
                      </div>
                      <div className="loading-shimmer h-12 w-full rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
            <h2 className="text-2xl font-bold text-red-700 mb-2">{t('pricing.loading_error')}</h2>
            <p className="text-red-600">
              {t('pricing.loading_error_desc')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Тарифы - Kerit | Цены на IT консалтинг"
        description="Прозрачные тарифы на услуги IT консалтинга Kerit: email-маркетинг, чат-боты, оптимизация производительности. Пакеты Basic, Pro, Enterprise."
        keywords="тарифы, цены, стоимость, IT консалтинг, пакеты услуг, email маркетинг"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark mb-6">
            {t('nav.pricing')}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('pricing.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-calculator mr-2"></i>
              {t('pricing.choose_plan')}
            </Button>
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              variant="outline"
              className="border-2 border-kerit-sage text-kerit-sage hover:bg-kerit-sage hover:text-white font-semibold px-8 py-4"
            >
              <i className="fas fa-phone mr-2"></i>
              {t('pricing.get_consultation')}
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {servicesWithPackages && servicesWithPackages.length > 0 ? (
            <div className="space-y-20">
              {servicesWithPackages.map((service) => (
                <div key={service.id}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-kerit-dark mb-4">{service.name}</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">{service.description}</p>
                  </div>

                  {service.packages && service.packages.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                      {service.packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={`bg-white rounded-2xl shadow-lg p-8 relative ${getPackageColor(pkg.type)}`}
                        >
                          {pkg.type === 'pro' && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                              <div className="bg-kerit-yellow text-kerit-dark px-4 py-2 rounded-full text-sm font-semibold">
                                {t('pricing.popular')}
                              </div>
                            </div>
                          )}
                          
                          <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-kerit-dark mb-2">{pkg.name}</h3>
                            <div className="text-4xl font-bold text-kerit-dark mb-2">
                              {formatPrice(pkg.price, pkg.currency)}
                            </div>
                            <p className="text-gray-600">{pkg.description}</p>
                          </div>

                          <ul className="space-y-4 mb-8">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <i className="fas fa-check text-kerit-sage mr-3 mt-1"></i>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            onClick={() => setIsAppointmentModalOpen(true)}
                            className={`w-full ${getButtonStyle(pkg.type)}`}
                          >
                            Выбрать пакет
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                        <i className="fas fa-cog text-4xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">Индивидуальные тарифы</h3>
                        <p className="text-gray-600 mb-6">
                          Для этой услуги мы составляем персональные предложения
                        </p>
                        <Button
                          onClick={() => setIsAppointmentModalOpen(true)}
                          className="bg-kerit-sage hover:bg-opacity-90 text-white"
                        >
                          Получить предложение
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                <i className="fas fa-coins text-6xl text-gray-300 mb-6"></i>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Тарифы обновляются</h3>
                <p className="text-gray-600 mb-8">
                  Мы работаем над обновлением наших тарифных планов. Свяжитесь с нами для получения актуальной информации о ценах.
                </p>
                <Button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="bg-kerit-sage hover:bg-opacity-90 text-white"
                >
                  Связаться с нами
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">{t('pricing.faq_title')}</h2>
            <p className="text-xl text-gray-600">{t('pricing.faq_subtitle')}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-kerit-dark mb-2">{t('pricing.faq_q1')}</h3>
              <p className="text-gray-600">
                {t('pricing.faq_a1')}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-kerit-dark mb-2">{t('pricing.faq_q2')}</h3>
              <p className="text-gray-600">
                {t('pricing.faq_a2')}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-kerit-dark mb-2">{t('pricing.faq_q3')}</h3>
              <p className="text-gray-600">
                {t('pricing.faq_a3')}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-kerit-dark mb-2">{t('pricing.faq_q4')}</h3>
              <p className="text-gray-600">
                {t('pricing.faq_a4')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('pricing.custom_title')}
          </h2>
          <p className="text-xl text-kerit-light mb-10">
            {t('pricing.custom_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-calculator mr-2"></i>
              Рассчитать стоимость
            </Button>
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              variant="outline"
              className="border-2 border-kerit-light text-kerit-light hover:bg-kerit-light hover:text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-comments mr-2"></i>
              Обсудить проект
            </Button>
          </div>
        </div>
      </section>

      {isAppointmentModalOpen && (
        <AppointmentModal onClose={() => setIsAppointmentModalOpen(false)} />
      )}
    </>
  );
}
