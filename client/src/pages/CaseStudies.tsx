import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  serviceType: string;
  clientName?: string;
  results?: string;
  publishedAt: string;
}

export default function CaseStudies() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<string>('all');

  const { data: caseStudies, isLoading, error } = useQuery<CaseStudy[]>({
    queryKey: selectedService !== 'all' ? [`/api/case-studies/${selectedService}`] : ['/api/case-studies'],
  });

  const serviceFilters = [
    { value: 'all', label: t('cases.filter.all'), icon: 'fas fa-th-large' },
    { value: 'email-marketing', label: t('cases.filter.email'), icon: 'fas fa-envelope' },
    { value: 'customer-chatbot', label: t('cases.filter.chatbot'), icon: 'fas fa-robot' },
    { value: 'performance-improvement', label: t('cases.filter.performance'), icon: 'fas fa-tachometer-alt' },
  ];

  const getServiceColor = (serviceType: string) => {
    switch (serviceType) {
      case 'email-marketing':
        return 'bg-blue-500';
      case 'customer-chatbot':
        return 'bg-green-500';
      case 'performance-improvement':
        return 'bg-purple-500';
      default:
        return 'bg-kerit-sage';
    }
  };

  const getServiceGradient = (serviceType: string) => {
    switch (serviceType) {
      case 'email-marketing':
        return 'from-blue-500 to-blue-700';
      case 'customer-chatbot':
        return 'from-green-500 to-green-700';
      case 'performance-improvement':
        return 'from-purple-500 to-purple-700';
      default:
        return 'from-kerit-sage to-kerit-dark';
    }
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="loading-shimmer h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="loading-shimmer h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="loading-shimmer h-48 w-full"></div>
                <div className="p-6">
                  <div className="loading-shimmer h-4 w-24 rounded mb-2"></div>
                  <div className="loading-shimmer h-6 w-full rounded mb-3"></div>
                  <div className="loading-shimmer h-16 w-full rounded"></div>
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
            <h2 className="text-2xl font-bold text-red-700 mb-2">{t('common.error')}</h2>
            <p className="text-red-600">
              {t('cases.no_cases_desc')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Кейсы - Kerit | Успешные проекты IT консалтинга"
        description="Изучите успешные кейсы Kerit: увеличение конверсии на 340%, автоматизация поддержки, ускорение систем в 5 раз. Реальные результаты наших клиентов."
        keywords="кейсы, проекты, результаты, email маркетинг, чат-боты, оптимизация, успешные проекты"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark mb-6">
            {t('cases.title')}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('cases.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceFilters.map((filter) => (
              <Button
                key={filter.value}
                onClick={() => setSelectedService(filter.value)}
                variant={selectedService === filter.value ? "default" : "outline"}
                className={`${
                  selectedService === filter.value
                    ? 'bg-kerit-sage text-white'
                    : 'border-kerit-sage text-kerit-sage hover:bg-kerit-sage hover:text-white'
                }`}
              >
                <i className={`${filter.icon} mr-2`}></i>
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies && caseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow kerit-card-hover">
                  <div className={`h-48 bg-gradient-to-br ${getServiceGradient(caseStudy.serviceType)} flex items-center justify-center`}>
                    {caseStudy.featuredImage ? (
                      <img
                        src={caseStudy.featuredImage}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <i className={`${
                          caseStudy.serviceType === 'email-marketing' ? 'fas fa-chart-line' :
                          caseStudy.serviceType === 'customer-chatbot' ? 'fas fa-robot' :
                          caseStudy.serviceType === 'performance-improvement' ? 'fas fa-tachometer-alt' :
                          'fas fa-star'
                        } text-4xl text-white mb-2`}></i>
                        <div className="text-white font-semibold">
                          {caseStudy.serviceType === 'email-marketing' ? 'Email-маркетинг' :
                           caseStudy.serviceType === 'customer-chatbot' ? 'Чат-бот' :
                           caseStudy.serviceType === 'performance-improvement' ? 'Оптимизация' :
                           'Кейс'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`${getServiceColor(caseStudy.serviceType)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {caseStudy.serviceType === 'email-marketing' ? 'Email-маркетинг' :
                         caseStudy.serviceType === 'customer-chatbot' ? 'Чат-бот' :
                         caseStudy.serviceType === 'performance-improvement' ? 'Оптимизация' :
                         'Проект'}
                      </div>
                      {caseStudy.clientName && (
                        <div className="text-sm text-gray-500">{caseStudy.clientName}</div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-kerit-dark mb-3">{caseStudy.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {caseStudy.excerpt}
                    </p>
                    {caseStudy.results && (
                      <div className="bg-kerit-light bg-opacity-50 rounded-lg p-3 mb-4">
                        <div className="text-sm font-semibold text-kerit-dark mb-1">Результат:</div>
                        <div className="text-sm text-kerit-sage">{caseStudy.results}</div>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <Link href={`/case-studies/${caseStudy.slug}`}>
                        <a className="text-kerit-sage font-semibold hover:text-kerit-dark transition-colors">
                          {t('landing.read_case')} <i className="fas fa-arrow-right ml-1"></i>
                        </a>
                      </Link>
                      <div className="text-sm text-gray-400">
                        {new Date(caseStudy.publishedAt).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                <i className="fas fa-folder-open text-6xl text-gray-300 mb-6"></i>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">
                  {selectedService === 'all' ? t('cases.updating_title') : t('cases.no_cases_desc')}
                </h3>
                <p className="text-gray-600 mb-8">
                  {selectedService === 'all' 
                    ? t('cases.updating_desc')
                    : t('cases.no_cases_desc')
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {selectedService !== 'all' && (
                    <Button
                      onClick={() => setSelectedService('all')}
                      className="bg-kerit-sage hover:bg-opacity-90 text-white"
                    >
                      {t('cases.show_all')}
                    </Button>
                  )}
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-kerit-sage text-kerit-sage hover:bg-kerit-sage hover:text-white"
                    >
                      {t('common.contact_us')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('cases.cta_title')}
          </h2>
          <p className="text-xl text-kerit-light mb-10">
            {t('cases.cta_desc')}
          </p>
          <Link href="/contact">
            <Button className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4">
              <i className="fas fa-comments mr-2"></i>
              {t('cases.discuss_project')}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
