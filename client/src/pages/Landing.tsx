import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import logoPath from '@assets/Logo_1753789199779.jpg';
import heroImage from '@assets/generated_images/Professional_business_team_meeting_166a66e9.png';
import emailThumbnail from '@assets/generated_images/Simple_email_marketing_icon_11bd6e3f.png';
import chatbotThumbnail from '@assets/generated_images/Simple_chatbot_service_icon_c5761b12.png';
import performanceThumbnail from '@assets/generated_images/Simple_performance_optimization_icon_0cbdc619.png';
import { SEOHead } from '@/components/SEOHead';
import { StatsGrid, StatsCard } from '@/components/ui/stats';
import { AppointmentModal } from '@/components/AppointmentModal';
import { OptimizedImage } from '@/components/OptimizedImage';

export default function Landing() {
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const shouldAnimate = usePageAnimation('home');
  
  // Animation refs for scroll-triggered animations
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const casesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const section = target.dataset.section;
            if (section) {
              setVisibleSections(prev => new Set(Array.from(prev).concat(section)));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = [servicesRef, statsRef, casesRef, testimonialsRef];
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

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
      title: "TechCorp Email Campaign Success",
      description: "How we helped TechCorp achieve 300% increase in email engagement",
      icon: 'fas fa-chart-line',
      gradient: 'from-kerit-sage to-kerit-dark',
      slug: 'techcorp-email-success',
      thumbnail: emailThumbnail,
    },
    {
      category: t('landing.case_chatbot.title'),
      title: "RetailMax Chatbot Implementation", 
      description: "How we reduced RetailMax support tickets by 60% with AI chatbots",
      icon: 'fas fa-robot',
      gradient: 'from-kerit-dark to-kerit-sage',
      slug: 'retailmax-chatbot-implementation',
      thumbnail: chatbotThumbnail,
    },
    {
      category: t('landing.case_performance.title'),
      title: "SpeedTech Performance Optimization",
      description: "How we helped SpeedTech reduce infrastructure costs and improve performance by 5x",
      icon: 'fas fa-tachometer-alt',
      gradient: 'from-kerit-yellow to-kerit-light',
      slug: 'speedtech-performance-optimization',
      thumbnail: performanceThumbnail,
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
      name: t('testimonial.maria.name'),
      position: t('testimonial.maria.title'),
      avatar: 'МС',
      text: t('testimonial.maria.text'),
    },
    {
      name: t('testimonial.dmitry.name'),
      position: t('testimonial.dmitry.title'),
      avatar: 'ДК',
      text: t('testimonial.dmitry.text'),
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
      <section className={`relative bg-gradient-to-br from-kerit-light to-white py-20 lg:py-32 ${shouldAnimate ? 'page-entrance-animation' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`min-w-0 ${shouldAnimate ? 'slide-left-animation animation-delay-200' : ''}`}>
              <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark leading-tight mb-6 break-words">
                IT-решения для роста и{' '}
                <span className="text-kerit-sage">масштабирования бизнеса</span>
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
            <div className={`relative flex-shrink-0 ${shouldAnimate ? 'slide-right-animation animation-delay-400' : ''}`}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage 
                  src={heroImage} 
                  alt="IT Consultancy Solutions" 
                  className="w-full h-auto max-w-lg mx-auto"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} data-section="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">{t('services.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-1000 p-8 group ${
                  visibleSections.has('services') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} data-section="stats" className="py-20 bg-kerit-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <StatsGrid>
              <StatsCard value="150+" label={t('stats.projects')} />
              <StatsCard value="98%" label={t('stats.satisfaction')} />
              <StatsCard value="5+" label={t('stats.experience')} />
              <StatsCard value="24/7" label={t('stats.support')} />
            </StatsGrid>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section ref={casesRef} data-section="cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('cases') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">{t('cases.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cases.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div 
                key={index} 
                className={`bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-1000 ${
                  visibleSections.has('cases') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  {caseStudy.thumbnail ? (
                    <OptimizedImage
                      src={caseStudy.thumbnail}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`h-full bg-gradient-to-br ${caseStudy.gradient} flex items-center justify-center`}>
                      <i className={`${caseStudy.icon} text-4xl ${caseStudy.gradient.includes('yellow') ? 'text-kerit-dark' : 'text-kerit-light'}`}></i>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-kerit-sage font-semibold mb-2">{caseStudy.category}</div>
                  <h3 className="text-xl font-bold text-kerit-dark mb-3">{caseStudy.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {caseStudy.description}
                  </p>
                  <Link href={`/case-studies/${caseStudy.slug}`} className="text-kerit-sage font-semibold hover:text-kerit-dark transition-colors">
                    {t('landing.read_case')} <i className="fas fa-arrow-right ml-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} data-section="testimonials" className="py-20 bg-kerit-light bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">{t('testimonials.title')}</h2>
            <p className="text-xl text-gray-600">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-1000 ${
                  visibleSections.has('testimonials') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
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
