// Default translations
export const defaultTranslations: Record<string, Record<string, string>> = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.cases': 'Кейсы',
    'nav.blog': 'Блог',
    'nav.pricing': 'Тарифы',
    'nav.contact': 'Контакты',
    'nav.dashboard': 'Клиентам',
    'nav.admin': 'Админ',

    // Hero section
    'hero.title': 'IT-решения, которые масштабируют ваш бизнес',
    'hero.highlight': 'масштабируют',
    'hero.subtitle': 'Профессиональные консалтинговые услуги в области email-маркетинга, разработки чат-ботов и оптимизации производительности систем',
    'hero.cta.audit': 'Получить бесплатный аудит',
    'hero.cta.consultation': 'Записаться на консультацию',

    // Services
    'services.title': 'Наши услуги',
    'services.subtitle': 'Комплексные IT-решения для роста и развития вашего бизнеса',
    'services.email.title': 'Email-маркетинг',
    'services.email.description': 'Автоматизация email-кампаний, сегментация аудитории и персонализация контента для максимальной конверсии',
    'services.chatbot.title': 'Чат-боты для клиентов',
    'services.chatbot.description': 'Разработка интеллектуальных чат-ботов для автоматизации клиентского сервиса и повышения конверсии',
    'services.performance.title': 'Оптимизация производительности',
    'services.performance.description': 'Аудит и оптимизация систем для повышения скорости работы и снижения затрат на IT-инфраструктуру',

    // Stats
    'stats.projects': 'Проектов завершено',
    'stats.satisfaction': 'Удовлетворенность клиентов',
    'stats.experience': 'Лет опыта',
    'stats.support': 'Поддержка',

    // Case studies
    'cases.title': 'Успешные кейсы',
    'cases.subtitle': 'Реальные результаты наших клиентов',
    'cases.view_all': 'Посмотреть все кейсы',
    'cases.filter.all': 'Все кейсы',
    'cases.filter.email': 'Email-маркетинг',
    'cases.filter.chatbot': 'Чат-боты',
    'cases.filter.performance': 'Оптимизация',

    // Blog
    'blog.title': 'Блог',
    'blog.subtitle': 'Полезные статьи и insights',
    'blog.filter.all': 'Все статьи',
    'blog.filter.email': 'Email-маркетинг',
    'blog.filter.chatbots': 'Чат-боты',
    'blog.filter.performance': 'Производительность',
    'blog.filter.analytics': 'Аналитика',
    'blog.filter.trends': 'Тренды',

    // Testimonials
    'testimonials.title': 'Отзывы клиентов',
    'testimonials.subtitle': 'Что говорят о нас наши партнеры',

    // CTA
    'cta.title': 'Готовы масштабировать свой бизнес?',
    'cta.subtitle': 'Получите бесплатную консультацию и узнайте, как IT-решения могут увеличить вашу прибыль',
    'cta.audit': 'Получить бесплатный аудит',
    'cta.call': 'Записаться на звонок',

    // Common
    'common.read_more': 'Подробнее',
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.cases': 'Cases',
    'nav.blog': 'Blog',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',

    // Hero section
    'hero.title': 'IT solutions that scale your business',
    'hero.highlight': 'scale',
    'hero.subtitle': 'Professional consulting services in email marketing, chatbot development and performance optimization',
    'hero.cta.audit': 'Get Free Audit',
    'hero.cta.consultation': 'Book Consultation',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive IT solutions for business growth and development',
    'services.email.title': 'Email Marketing',
    'services.email.description': 'Email campaign automation, audience segmentation and content personalization for maximum conversion',
    'services.chatbot.title': 'Customer Chatbots',
    'services.chatbot.description': 'Development of intelligent chatbots for customer service automation and conversion improvement',
    'services.performance.title': 'Performance Optimization',
    'services.performance.description': 'System audit and optimization to improve performance and reduce IT infrastructure costs',

    // Stats
    'stats.projects': 'Projects Completed',
    'stats.satisfaction': 'Client Satisfaction',
    'stats.experience': 'Years Experience',
    'stats.support': 'Support',

    // Case studies
    'cases.title': 'Success Stories',
    'cases.subtitle': 'Real results from our clients',
    'cases.view_all': 'View All Cases',
    'cases.filter.all': 'All Cases',
    'cases.filter.email': 'Email Marketing',
    'cases.filter.chatbot': 'Chatbots',
    'cases.filter.performance': 'Performance',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Useful articles and insights',
    'blog.filter.all': 'All Articles',
    'blog.filter.email': 'Email Marketing',
    'blog.filter.chatbots': 'Chatbots',
    'blog.filter.performance': 'Performance',
    'blog.filter.analytics': 'Analytics',
    'blog.filter.trends': 'Trends',

    // Testimonials
    'testimonials.title': 'Client Testimonials',
    'testimonials.subtitle': 'What our partners say about us',

    // CTA
    'cta.title': 'Ready to scale your business?',
    'cta.subtitle': 'Get a free consultation and learn how IT solutions can increase your profits',
    'cta.audit': 'Get Free Audit',
    'cta.call': 'Book a Call',

    // Common
    'common.read_more': 'Read More',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
  },
};

export function getTranslation(key: string, locale: string, translations: Record<string, string> = {}): string {
  // First check custom translations from API
  if (translations[key]) {
    return translations[key];
  }
  
  // Fall back to default translations
  return defaultTranslations[locale]?.[key] || defaultTranslations['ru']?.[key] || key;
}
