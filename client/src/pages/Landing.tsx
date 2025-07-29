import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { StatsGrid, StatsCard } from '@/components/ui/stats';
import { AppointmentModal } from '@/components/AppointmentModal';

export default function Landing() {
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const services = [
    {
      icon: 'fas fa-envelope',
      title: t('services.email.title'),
      description: t('services.email.description'),
      features: [t('landing.email_features.automation'), t('landing.email_features.testing'), t('landing.email_features.analytics')],
      link: '/services/email-marketing',
    },
    {
      icon: 'fas fa-robot',
      title: t('services.chatbot.title'),
      description: t('services.chatbot.description'),
      features: [t('landing.chatbot_features.support'), t('landing.chatbot_features.crm'), t('landing.chatbot_features.multichannel')],
      link: '/services/customer-chatbot',
    },
    {
      icon: 'fas fa-tachometer-alt',
      title: t('services.performance.title'),
      description: t('services.performance.description'),
      features: [t('landing.performance_features.audit'), t('landing.performance_features.database'), t('landing.performance_features.monitoring')],
      link: '/services/performance-improvement',
    },
  ];

  const caseStudies = [
    {
      category: t('landing.case_email.title'),
      title: t('landing.case_email.result'),
      description: t('landing.case_email.desc'),
      icon: 'fas fa-chart-line',
      gradient: 'from-kerit-sage to-kerit-dark',
    },
    {
      category: t('landing.case_chatbot.title'),
      title: t('landing.case_chatbot.result'),
      description: t('landing.case_chatbot.desc'),
      icon: 'fas fa-robot',
      gradient: 'from-kerit-dark to-kerit-sage',
    },
    {
      category: t('landing.case_performance.title'),
      title: t('landing.case_performance.result'),
      description: t('landing.case_performance.desc'),
      icon: 'fas fa-tachometer-alt',
      gradient: 'from-kerit-yellow to-kerit-light',
    },
  ];

  const testimonials = [
    {
      name: t('testimonial.alexey.name'),
      position: t('testimonial.alexey.title'),
      avatar: 'АП',
      text: t('testimonial.alexey.text'),
    },
    {
      name: 'Мария Сидорова',
      position: 'Маркетинг-директор, Fashion Plus',
      avatar: 'МС',
      text: 'Чат-бот от Kerit полностью автоматизировал нашу работу с клиентами. Теперь мы работаем 24/7!',
    },
    {
      name: 'Дмитрий Козлов',
      position: 'IT-директор, LogiCorp',
      avatar: 'ДК',
      text: 'Оптимизация от Kerit сэкономила нам тысячи долларов на инфраструктуре. Рекомендую!',
    },
  ];

  return (
    <>
      <SEOHead
        title="Kerit - IT Консалтинг | Цифровые решения для вашего бизнеса"
        description="Kerit предоставляет профессиональные IT консалтинговые услуги: email-маркетинг, чат-боты, оптимизация производительности. Получите бесплатную консультацию."
        keywords="IT консалтинг, email маркетинг, чат-боты, оптимизация производительности, цифровые решения"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-kerit-light to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark leading-tight mb-6">
                {t('hero.title').split(t('hero.highlight'))[0]}
                <span className="text-kerit-sage">{t('hero.highlight')}</span>
                {t('hero.title').split(t('hero.highlight'))[1]}
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
                >
                  <i className="fas fa-chart-line mr-2"></i>
                  {t('hero.cta.audit')}
                </button>
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="border-2 border-kerit-sage text-kerit-sage hover:bg-kerit-sage hover:text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                >
                  <i className="fas fa-calendar mr-2"></i>
                  {t('hero.cta.consultation')}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-kerit-sage to-kerit-dark rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <i className="fas fa-envelope text-3xl text-kerit-light mb-2"></i>
                    <div className="text-kerit-light font-semibold">Email Marketing</div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <i className="fas fa-robot text-3xl text-kerit-light mb-2"></i>
                    <div className="text-kerit-light font-semibold">Chat Bots</div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <i className="fas fa-tachometer-alt text-3xl text-kerit-light mb-2"></i>
                    <div className="text-kerit-light font-semibold">Performance</div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <i className="fas fa-chart-bar text-3xl text-kerit-light mb-2"></i>
                    <div className="text-kerit-light font-semibold">Analytics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">{t('services.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 group">
                <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-kerit-yellow transition-colors">
                  <i className={`${service.icon} text-2xl text-kerit-dark`}></i>
                </div>
                <h3 className="text-2xl font-bold text-kerit-dark mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="text-sm text-gray-600 mb-8 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i}>
                      <i className="fas fa-check text-kerit-sage mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={service.link}>
                  <a className="text-kerit-sage font-semibold hover:text-kerit-dark transition-colors">
                    {t('common.read_more')} <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsGrid>
            <StatsCard value="150+" label={t('stats.projects')} />
            <StatsCard value="98%" label={t('stats.satisfaction')} />
            <StatsCard value="5+" label={t('stats.experience')} />
            <StatsCard value="24/7" label={t('stats.support')} />
          </StatsGrid>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">{t('cases.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cases.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${caseStudy.gradient} flex items-center justify-center`}>
                  <i className={`${caseStudy.icon} text-4xl ${caseStudy.gradient.includes('yellow') ? 'text-kerit-dark' : 'text-kerit-light'}`}></i>
                </div>
                <div className="p-6">
                  <div className="text-sm text-kerit-sage font-semibold mb-2">{caseStudy.category}</div>
                  <h3 className="text-xl font-bold text-kerit-dark mb-3">{caseStudy.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {caseStudy.description}
                  </p>
                  <Link href="/case-studies">
                    <a className="text-kerit-sage font-semibold hover:text-kerit-dark transition-colors">
                      {t('landing.read_case')} <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/case-studies">
              <a className="bg-kerit-sage hover:bg-opacity-90 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('cases.view_all')}
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-kerit-light bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">{t('testimonials.title')}</h2>
            <p className="text-xl text-gray-600">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-kerit-sage rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-kerit-dark">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex text-kerit-yellow mt-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-kerit-light mb-10">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
            >
              <i className="fas fa-chart-line mr-2"></i>
              {t('cta.audit')}
            </button>
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="border-2 border-kerit-light text-kerit-light hover:bg-kerit-light hover:text-kerit-dark font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              <i className="fas fa-phone mr-2"></i>
              {t('cta.call')}
            </button>
          </div>
        </div>
      </section>

      {isAppointmentModalOpen && (
        <AppointmentModal onClose={() => setIsAppointmentModalOpen(false)} />
      )}
    </>
  );
}
