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

    // Contact page
    'contact.title': 'Контакты',
    'contact.subtitle': 'Готовы обсудить ваш проект? Свяжитесь с нашей командой экспертов для получения бесплатной консультации',
    'contact.form.title': 'Отправить сообщение',
    'contact.form.name': 'Имя',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Телефон',
    'contact.form.subject': 'Тема',
    'contact.form.message': 'Сообщение',
    'contact.form.preferred_time': 'Предпочтительное время звонка',
    'contact.form.service': 'Интересующая услуга',
    'contact.form.submit': 'Отправить сообщение',
    'contact.form.sending': 'Отправка...',
    'contact.form.message_placeholder': 'Расскажите подробнее о вашем проекте, задачах и ожиданиях',
    'contact.form.time_placeholder': 'Выберите время',
    'contact.info.title': 'Контактная информация',
    'contact.consultation.title': 'Бесплатная консультация',
    'contact.consultation.desc': 'Получите персональные рекомендации по развитию вашего IT-проекта от наших экспертов',
    'contact.consultation.item1': 'Анализ текущей ситуации',
    'contact.consultation.item2': 'Рекомендации по улучшению',
    'contact.consultation.item3': 'Оценка бюджета и сроков',
    'contact.consultation.item4': 'План реализации проекта',
    'contact.consultation.free': 'Консультация совершенно бесплатна!',
    
    // Time slots
    'time.morning': 'Утром (9:00-12:00)',
    'time.afternoon': 'Днем (12:00-15:00)',
    'time.evening': 'Вечером (15:00-18:00)',
    'time.anytime': 'В любое время',
    
    // Appointment modal
    'appointment.title': 'Записаться на консультацию',
    'appointment.success.title': 'Заявка отправлена!',
    'appointment.success.description': 'Мы свяжемся с вами в ближайшее время.',
    'appointment.error.title': 'Ошибка',
    'appointment.error.description': 'Не удалось отправить заявку. Попробуйте еще раз.',
    'appointment.consultation_request': 'Запрос на консультацию',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Телефон',
    'contact.info.address': 'Адрес',
    'contact.info.hours': 'Режим работы',
    'contact.success.title': 'Сообщение отправлено!',
    'contact.success.description': 'Мы свяжемся с вами в ближайшее время.',
    'contact.error.title': 'Ошибка',
    'contact.error.description': 'Не удалось отправить сообщение. Попробуйте еще раз.',

    // Form validation
    'validation.name_min': 'Имя должно содержать минимум 2 символа',
    'validation.email_invalid': 'Введите корректный email',
    'validation.subject_min': 'Тема должна содержать минимум 5 символов',
    'validation.message_min': 'Сообщение должно содержать минимум 10 символов',

    // Services
    'services.email_marketing': 'Email-маркетинг',
    'services.chatbot_dev': 'Разработка чат-ботов',
    'services.performance_opt': 'Оптимизация производительности',
    'services.it_strategy': 'Консультация по IT-стратегии',
    'services.other': 'Другое',

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

    // Contact page
    'contact.title': 'Contact',
    'contact.subtitle': 'Ready to discuss your project? Contact our team of experts for a free consultation',
    'contact.form.title': 'Send Message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.preferred_time': 'Preferred call time',
    'contact.form.service': 'Service of interest',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.message_placeholder': 'Tell us more about your project, tasks, and expectations',
    'contact.form.time_placeholder': 'Select time',
    'contact.info.title': 'Contact Information',
    'contact.consultation.title': 'Free Consultation',
    'contact.consultation.desc': 'Get personalized recommendations for developing your IT project from our experts',
    'contact.consultation.item1': 'Current situation analysis',
    'contact.consultation.item2': 'Improvement recommendations',
    'contact.consultation.item3': 'Budget and timeline estimation',
    'contact.consultation.item4': 'Project implementation plan',
    'contact.consultation.free': 'Consultation is completely free!',
    
    // Time slots
    'time.morning': 'Morning (9:00-12:00)',
    'time.afternoon': 'Afternoon (12:00-15:00)',
    'time.evening': 'Evening (15:00-18:00)',
    'time.anytime': 'Anytime',
    
    // Appointment modal
    'appointment.title': 'Book Consultation',
    'appointment.success.title': 'Request sent!',
    'appointment.success.description': 'We will contact you shortly.',
    'appointment.error.title': 'Error',
    'appointment.error.description': 'Failed to send request. Please try again.',
    'appointment.consultation_request': 'Consultation request',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.address': 'Address',
    'contact.info.hours': 'Business Hours',
    'contact.success.title': 'Message sent!',
    'contact.success.description': 'We will contact you shortly.',
    'contact.error.title': 'Error',
    'contact.error.description': 'Failed to send message. Please try again.',

    // Form validation
    'validation.name_min': 'Name must contain at least 2 characters',
    'validation.email_invalid': 'Please enter a valid email',
    'validation.subject_min': 'Subject must contain at least 5 characters',
    'validation.message_min': 'Message must contain at least 10 characters',

    // Services
    'services.email_marketing': 'Email Marketing',
    'services.chatbot_dev': 'Chatbot Development',
    'services.performance_opt': 'Performance Optimization',
    'services.it_strategy': 'IT Strategy Consulting',
    'services.other': 'Other',

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
