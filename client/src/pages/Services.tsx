import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { AppointmentModal } from '@/components/AppointmentModal';
import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
}

export default function Services() {
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="loading-shimmer h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="loading-shimmer h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="loading-shimmer h-16 w-16 rounded-full mb-6"></div>
                <div className="loading-shimmer h-8 w-3/4 rounded mb-4"></div>
                <div className="loading-shimmer h-24 w-full rounded mb-6"></div>
                <div className="space-y-2 mb-8">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="loading-shimmer h-4 w-full rounded"></div>
                  ))}
                </div>
                <div className="loading-shimmer h-6 w-24 rounded"></div>
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
            <h2 className="text-2xl font-bold text-red-700 mb-2">{t('common.error')}</h2>
            <p className="text-red-600">
              {t('services.custom_solution_desc')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const serviceIcons: Record<string, string> = {
    'email-marketing': 'fas fa-envelope',
    'customer-chatbot': 'fas fa-robot',
    'performance-improvement': 'fas fa-tachometer-alt',
  };

  const serviceDescriptions: Record<string, string> = {
    'email-marketing': 'Автоматизация email-кампаний, сегментация аудитории и персонализация контента для максимальной конверсии',
    'customer-chatbot': 'Разработка интеллектуальных чат-ботов для автоматизации клиентского сервиса и повышения конверсии',
    'performance-improvement': 'Аудит и оптимизация систем для повышения скорости работы и снижения затрат на IT-инфраструктуру',
  };

  return (
    <>
      <SEOHead
        title="Услуги - Kerit | IT Консалтинг"
        description="Полный спектр IT консалтинговых услуг: email-маркетинг, чат-боты, оптимизация производительности. Профессиональные решения для вашего бизнеса."
        keywords="IT услуги, email маркетинг, чат-боты, оптимизация производительности, консалтинг"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
          <Button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4 text-lg"
          >
            <i className="fas fa-calendar mr-2"></i>
            {t('pricing.get_consultation')}
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services && services.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 group kerit-card-hover">
                  <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-kerit-yellow transition-colors">
                    <i className={`${serviceIcons[service.slug] || 'fas fa-cog'} text-2xl text-kerit-dark`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-kerit-dark mb-4">{service.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description || serviceDescriptions[service.slug] || 'Описание услуги'}
                  </p>
                  {service.features && service.features.length > 0 && (
                    <ul className="text-sm text-gray-600 mb-8 space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i}>
                          <i className="fas fa-check text-kerit-sage mr-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                <i className="fas fa-tools text-6xl text-gray-300 mb-6"></i>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Услуги обновляются</h3>
                <p className="text-gray-600 mb-8">
                  Мы работаем над обновлением нашего каталога услуг. Пожалуйста, свяжитесь с нами для получения актуальной информации.
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

      {/* CTA Section */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('services.custom_solution_title')}
          </h2>
          <p className="text-xl text-kerit-light mb-10">
            {t('services.custom_solution_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-comments mr-2"></i>
              {t('services.custom_solution_button')}
            </Button>
            <Link href="/contact">
              <Button
                className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
              >
                <i className="fas fa-envelope mr-2"></i>
                {t('services.write_us')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {isAppointmentModalOpen && (
        <AppointmentModal onClose={() => setIsAppointmentModalOpen(false)} />
      )}
    </>
  );
}
