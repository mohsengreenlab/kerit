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

    // Footer
    'footer.company_desc': 'Kerit - ведущая консалтинговая компания, специализирующаяся на цифровой трансформации бизнеса через инновационные IT-решения.',
    'footer.company_section': 'Компания',
    'footer.rights_reserved': 'Все права защищены.',
    'footer.privacy_policy': 'Политика конфиденциальности',
    'footer.terms_of_use': 'Условия использования',

    // Header/Auth
    'auth.login': 'Войти',
    'auth.logout': 'Выйти',

    // Cookie Notice
    'cookies.message': 'Мы используем cookies для улучшения работы сайта и анализа посещаемости.',
    'cookies.learn_more': 'Подробнее',
    'cookies.accept': 'Принять',
    'cookies.decline': 'Отклонить',

    // Pricing page
    'pricing.title': 'Тарифы',
    'pricing.subtitle': 'Прозрачные тарифы на профессиональные IT-решения. Выберите подходящий пакет или получите персональное предложение',
    'pricing.loading_error': 'Ошибка загрузки',
    'pricing.loading_error_desc': 'Не удалось загрузить информацию о тарифах. Пожалуйста, попробуйте обновить страницу.',
    'pricing.basic': 'Базовый',
    'pricing.pro': 'Профессиональный',
    'pricing.enterprise': 'Корпоративный',
    'pricing.choose_plan': 'Выбрать план',
    'pricing.get_consultation': 'Получить консультацию',
    'pricing.popular': 'Популярный',
    'pricing.faq_title': 'Часто задаваемые вопросы',

    // Blog page extensions
    'blog.search_placeholder': 'Поиск статей...',
    'blog.no_posts': 'Статьи не найдены',
    'blog.no_posts_desc': 'В данной категории пока нет опубликованных статей.',

    // Case Studies page extensions
    'cases.no_cases': 'Кейсы не найдены',
    'cases.no_cases_desc': 'В данной категории пока нет опубликованных кейсов.',

    // Services page extensions
    'services.custom_solution_title': 'Не нашли подходящую услугу?',
    'services.custom_solution_desc': 'Мы создаем индивидуальные решения под ваши задачи. Расскажите о вашем проекте, и мы предложим оптимальный подход.',
    'services.custom_solution_button': 'Обсудить проект',

    // About page
    'about.title': 'О нас',
    'about.mission': 'Наша миссия',
    'about.mission_desc': 'Kerit создана для того, чтобы помочь бизнесу максимально эффективно использовать возможности современных IT-технологий. Мы верим, что правильно настроенные цифровые процессы могут кардинально изменить результативность любой компании.',
    'about.innovation': 'Инновации',
    'about.innovation_desc': 'Используем передовые технологии для решения бизнес-задач',
    'about.team': 'Команда',
    'about.team_desc': 'Опытные специалисты с глубокой экспертизой в IT',
    'about.results': 'Результат',
    'about.results_desc': 'Фокусируемся на измеримых бизнес-показателях',
    'about.why_choose': 'Почему выбирают нас',

    // Home page
    'home.success_stories': 'Истории успеха',
    'home.testimonials': 'Отзывы клиентов',
    'home.welcome': 'Добро пожаловать',
    'home.dashboard_subtitle': 'Ваша панель управления Kerit',
    'home.admin_panel': 'Админ-панель',
    'home.admin_desc': 'Управление контентом, аналитикой и пользователями',
    'home.customer_panel': 'Клиентская панель',
    'home.customer_desc': 'Просмотр ваших проектов и статусов',

    // Landing page features
    'landing.email_features.automation': 'Настройка автоворонок',
    'landing.email_features.testing': 'A/B тестирование',
    'landing.email_features.analytics': 'Аналитика и отчеты',
    'landing.chatbot_features.support': '24/7 поддержка клиентов',
    'landing.chatbot_features.crm': 'Интеграция с CRM',
    'landing.chatbot_features.multichannel': 'Многоканальность',
    'landing.performance_features.audit': 'Аудит инфраструктуры',
    'landing.performance_features.database': 'Оптимизация базы данных',
    'landing.performance_features.monitoring': 'Мониторинг системы',

    // Case study examples
    'landing.case_email.title': 'Email-маркетинг',
    'landing.case_email.result': 'Увеличение конверсии на 340%',
    'landing.case_email.desc': 'Как мы помогли интернет-магазину одежды автоматизировать email-кампании и утроить продажи',
    'landing.case_chatbot.title': 'Чат-бот',
    'landing.case_chatbot.result': 'Автоматизация поддержки клиентов',
    'landing.case_chatbot.desc': 'Внедрение интеллектуального чат-бота снизило нагрузку на call-центр на 70%',
    'landing.case_performance.title': 'Оптимизация',
    'landing.case_performance.result': 'Ускорение сайта в 5 раз',
    'landing.case_performance.desc': 'Комплексная оптимизация системы позволила сократить время загрузки с 8 до 1.6 секунд',
    'landing.read_case': 'Читать кейс',

    // Testimonials
    'testimonial.alexey.name': 'Алексей Петров',
    'testimonial.alexey.title': 'CEO, TechStart',
    'testimonial.alexey.text': 'Команда Kerit профессионально подошла к настройке нашего email-маркетинга. Результат превзошел все ожидания!',

    // About page additional
    'about.cta_title': 'Готовы к сотрудничеству?',
    'about.cta_desc': 'Свяжитесь с нами для обсуждения вашего проекта',
    'about.contact_us': 'Связаться с нами',

    // Cases page
    'cases.updating_title': 'Кейсы обновляются',
    'cases.updating_desc': 'Мы работаем над добавлением новых кейсов. Следите за обновлениями!',
    'cases.cta_title': 'Готовы создать свой успешный кейс?',
    'cases.cta_desc': 'Обсудите ваш проект с нашими экспертами и получите персональную стратегию развития',

    // Blog page
    'blog.updating_title': 'Блог обновляется',
    'blog.updating_desc': 'Мы работаем над добавлением новых экспертных статей. Следите за обновлениями!',
    'blog.newsletter_title': 'Не пропустите новые статьи',
    'blog.newsletter_desc': 'Подпишитесь на наши обновления и получайте свежие экспертные материалы первыми',
    'blog.newsletter_note': 'Никакого спама, только полезные материалы',

    // Pricing FAQ
    'pricing.faq_title': 'Часто задаваемые вопросы',
    'pricing.faq_subtitle': 'Ответы на популярные вопросы о наших тарифах',
    'blog.no_posts_title': 'Статьи не найдены',
    'pricing.faq_q1': 'Можно ли изменить пакет в процессе работы?',
    'pricing.faq_a1': 'Да, вы можете перейти на другой пакет в любое время. Мы пересчитаем стоимость пропорционально.',
    'pricing.faq_q2': 'Что входит в поддержку?',
    'pricing.faq_a2': 'Поддержка включает консультации, исправление ошибок, обновления и оптимизацию в рамках выбранного пакета.',
    'pricing.faq_q3': 'Предоставляете ли скидки?',
    'pricing.faq_a3': 'Мы предоставляем скидки при заказе нескольких услуг и долгосрочном сотрудничестве. Обсудите это с менеджером.',
    'pricing.faq_q4': 'Какие способы оплаты доступны?',
    'pricing.faq_a4': 'Мы принимаем оплату банковским переводом, картой и электронными кошельками. Возможна рассрочка.',
    'pricing.custom_title': 'Нужен индивидуальный расчет?',
    'pricing.custom_desc': 'Получите персональное предложение с учетом специфики вашего проекта и бюджета',
    
    // Additional testimonials
    'testimonial.maria.name': 'Мария Сидорова',
    'testimonial.maria.title': 'Маркетинг-директор, Fashion Plus',
    'testimonial.maria.text': 'Чат-бот от Kerit полностью автоматизировал нашу работу с клиентами. Теперь мы работаем 24/7!',
    'testimonial.dmitry.name': 'Дмитрий Козлов',
    'testimonial.dmitry.title': 'IT-директор, LogiCorp', 
    'testimonial.dmitry.text': 'Оптимизация от Kerit сэкономила нам тысячи долларов на инфраструктуре. Рекомендую!',
    
    // About page details
    'about.approach_title': 'Комплексный подход',
    'about.approach_desc': 'Анализируем все аспекты вашего бизнеса для создания целостной стратегии цифровизации',
    'about.measurable_title': 'Измеримые результаты', 
    'about.measurable_desc': 'Каждый проект имеет четкие KPI и метрики эффективности',
    'about.partnership_title': 'Долгосрочное партнерство',
    'about.partnership_desc': 'Поддерживаем клиентов на всех этапах развития их цифровой экосистемы',
    
    // Blog page
    'blog.clear_search': 'Очистить поиск',
    'blog.suggest_topic': 'Предложить тему',
    'blog.email_placeholder': 'Ваш email',
    'blog.subscribe': 'Подписаться',
    'blog.no_posts_desc': 'По запросу ничего не найдено. Попробуйте изменить поисковый запрос.',
    'blog.updating_title': 'Блог обновляется',
    'blog.updating_desc': 'Мы работаем над добавлением новых экспертных статей. Следите за обновлениями!',
    
    // Contact FAQ
    'contact.faq.q1': 'Как быстро вы отвечаете?',
    'contact.faq.a1': 'Мы отвечаем в течение 2-4 часов в рабочее время.',
    'contact.faq.q2': 'Сколько стоит консультация?',
    'contact.faq.a2': 'Первичная консультация всегда бесплатна.',
    'contact.faq.q3': 'Работаете ли с небольшими проектами?',
    'contact.faq.a3': 'Да, мы работаем с проектами любого масштаба.',

    // Additional buttons and CTAs
    'services.write_us': 'Написать нам',
    'cases.show_all': 'Показать все кейсы',
    'cases.discuss_project': 'Обсудить проект',
    'pricing.calculate_cost': 'Рассчитать стоимость',
    'pricing.discuss_project': 'Обсудить проект',
    'pricing.book_consultation': 'Записаться на консультацию',

    // Dashboard
    'dashboard.title': 'Панель клиента',
    'dashboard.welcome': 'Добро пожаловать',
    'dashboard.subtitle': 'Здесь вы можете отслеживать статус ваших проектов и просматривать историю сотрудничества',
    'dashboard.auth_required': 'Требуется авторизация',
    'dashboard.auth_message': 'Пожалуйста, войдите в систему для доступа к панели клиента',
    'dashboard.login_button': 'Войти в систему',
    'dashboard.stats.total_projects': 'Всего проектов',
    'dashboard.stats.in_progress': 'В работе',
    'dashboard.stats.completed': 'Завершено',
    'dashboard.stats.rating': 'Рейтинг',
    'dashboard.projects.title': 'Мои проекты',
    'dashboard.projects.service': 'Услуга',
    'dashboard.projects.start_date': 'Дата начала',
    'dashboard.projects.end_date': 'Планируемое завершение',
    'dashboard.projects.created': 'Создан',
    'dashboard.projects.notes': 'Заметки',
    'dashboard.projects.no_date': 'Не указана',
    'dashboard.projects.no_end_date': 'Не указано',
    'dashboard.projects.empty.title': 'Проектов пока нет',
    'dashboard.projects.empty.message': 'У вас еще нет активных проектов. Свяжитесь с нами для обсуждения нового проекта.',
    'dashboard.projects.empty.button': 'Начать новый проект',
    'dashboard.actions.new_project': 'Новый проект',
    'dashboard.actions.new_project_desc': 'Обсудить новую задачу с нашей командой',
    'dashboard.actions.support': 'Поддержка',
    'dashboard.actions.support_desc': 'Связаться с технической поддержкой',
    'dashboard.actions.documents': 'Документы',
    'dashboard.actions.documents_desc': 'Договоры, отчеты и техническая документация',
    'dashboard.status.planning': 'Планирование',
    'dashboard.status.in_progress': 'В работе',
    'dashboard.status.completed': 'Завершено',
    'dashboard.status.on_hold': 'Приостановлено',

    // Common
    'common.read_more': 'Подробнее',
    'common.contact_us': 'Связаться с нами',
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

    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.password': 'Password',
    'auth.logging_in': 'Logging in...',
    'auth.demo_login': 'Demo Login',
    'auth.demo_login_desc': 'This is a demonstration version of the login system',
    'auth.demo_note': 'Demo account for testing features',

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

    // Footer
    'footer.company_desc': 'Kerit - a leading consulting company specializing in business digital transformation through innovative IT solutions.',
    'footer.company_section': 'Company',
    'footer.rights_reserved': 'All rights reserved.',
    'footer.privacy_policy': 'Privacy Policy',
    'footer.terms_of_use': 'Terms of Use',

    // Header/Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',

    // Cookie Notice
    'cookies.message': 'We use cookies to improve site performance and analyze traffic.',
    'cookies.learn_more': 'Learn more',
    'cookies.accept': 'Accept',
    'cookies.decline': 'Decline',

    // Pricing page
    'pricing.title': 'Pricing',
    'pricing.subtitle': 'Transparent pricing for professional IT solutions. Choose a suitable package or get a personalized offer',
    'pricing.loading_error': 'Loading Error',
    'pricing.loading_error_desc': 'Failed to load pricing information. Please try refreshing the page.',
    'pricing.basic': 'Basic',
    'pricing.pro': 'Professional',
    'pricing.enterprise': 'Enterprise',
    'pricing.choose_plan': 'Choose Plan',
    'pricing.get_consultation': 'Get Consultation',
    'pricing.popular': 'Popular',
    'pricing.faq_title': 'Frequently Asked Questions',

    // Blog page extensions
    'blog.search_placeholder': 'Search articles...',
    'blog.no_posts': 'No articles found',
    'blog.no_posts_desc': 'No published articles in this category yet.',

    // Case Studies page extensions
    'cases.no_cases': 'No cases found',
    'cases.no_cases_desc': 'No published cases in this category yet.',

    // Services page extensions
    'services.custom_solution_title': 'Didn\'t find a suitable service?',
    'services.custom_solution_desc': 'We create custom solutions for your needs. Tell us about your project, and we\'ll suggest the optimal approach.',
    'services.custom_solution_button': 'Discuss Project',

    // About page
    'about.title': 'About Us',
    'about.mission': 'Our Mission',
    'about.mission_desc': 'Kerit was created to help businesses maximize the potential of modern IT technologies. We believe that properly configured digital processes can dramatically change the effectiveness of any company.',
    'about.innovation': 'Innovation',
    'about.innovation_desc': 'We use cutting-edge technologies to solve business challenges',
    'about.team': 'Team',
    'about.team_desc': 'Experienced specialists with deep IT expertise',
    'about.results': 'Results',
    'about.results_desc': 'We focus on measurable business metrics',
    'about.why_choose': 'Why Choose Us',

    // Home page
    'home.success_stories': 'Success Stories',
    'home.testimonials': 'Client Testimonials',
    'home.welcome': 'Welcome',
    'home.dashboard_subtitle': 'Your Kerit dashboard',
    'home.admin_panel': 'Admin Panel',
    'home.admin_desc': 'Manage content, analytics, and users',
    'home.customer_panel': 'Customer Panel',
    'home.customer_desc': 'View your projects and statuses',

    // Landing page features
    'landing.email_features.automation': 'Autoflow Setup',
    'landing.email_features.testing': 'A/B Testing',
    'landing.email_features.analytics': 'Analytics & Reports',
    'landing.chatbot_features.support': '24/7 Customer Support',
    'landing.chatbot_features.crm': 'CRM Integration',
    'landing.chatbot_features.multichannel': 'Multi-channel',
    'landing.performance_features.audit': 'Infrastructure Audit',
    'landing.performance_features.database': 'Database Optimization',
    'landing.performance_features.monitoring': 'System Monitoring',

    // Case study examples
    'landing.case_email.title': 'Email Marketing',
    'landing.case_email.result': '340% Conversion Increase',
    'landing.case_email.desc': 'How we helped an online clothing store automate email campaigns and triple sales',
    'landing.case_chatbot.title': 'Chatbot',
    'landing.case_chatbot.result': 'Customer Support Automation',
    'landing.case_chatbot.desc': 'Smart chatbot implementation reduced call center load by 70%',
    'landing.case_performance.title': 'Optimization',
    'landing.case_performance.result': '5x Website Speed Boost',
    'landing.case_performance.desc': 'Comprehensive system optimization reduced loading time from 8 to 1.6 seconds',
    'landing.read_case': 'Read Case',

    // Testimonials
    'testimonial.alexey.name': 'Alexey Petrov',
    'testimonial.alexey.title': 'CEO, TechStart',
    'testimonial.alexey.text': 'The Kerit team professionally approached setting up our email marketing. The result exceeded all expectations!',

    // About page additional
    'about.cta_title': 'Ready to collaborate?',
    'about.cta_desc': 'Contact us to discuss your project',
    'about.contact_us': 'Contact Us',

    // Cases page
    'cases.updating_title': 'Cases are being updated',
    'cases.updating_desc': 'We are working on adding new cases. Stay tuned for updates!',
    'cases.cta_title': 'Ready to create your success story?',
    'cases.cta_desc': 'Discuss your project with our experts and get a personalized development strategy',

    // Blog page
    'blog.updating_title': 'Blog is being updated',
    'blog.updating_desc': 'We are working on adding new expert articles. Stay tuned for updates!',
    'blog.newsletter_title': 'Don\'t miss new articles',
    'blog.newsletter_desc': 'Subscribe to our updates and get fresh expert materials first',
    'blog.newsletter_note': 'No spam, only useful materials',

    // Pricing FAQ
    'pricing.faq_title': 'Frequently Asked Questions',
    'pricing.faq_subtitle': 'Answers to popular questions about our pricing',
    'blog.no_posts_title': 'No Articles Found',
    'pricing.faq_q1': 'Can I change the package during work?',
    'pricing.faq_a1': 'Yes, you can switch to another package at any time. We will recalculate the cost proportionally.',
    'pricing.faq_q2': 'What is included in support?',
    'pricing.faq_a2': 'Support includes consultations, bug fixes, updates and optimization within the selected package.',
    'pricing.faq_q3': 'Do you provide discounts?',
    'pricing.faq_a3': 'We provide discounts for ordering multiple services and long-term cooperation. Discuss this with the manager.',
    'pricing.faq_q4': 'What payment methods are available?',
    'pricing.faq_a4': 'We accept payment by bank transfer, card and electronic wallets. Installment plans are possible.',
    'pricing.custom_title': 'Need a custom quote?',
    'pricing.custom_desc': 'Get a personalized offer considering your project specifics and budget',
    
    // Additional testimonials  
    'testimonial.maria.name': 'Maria Sidorova',
    'testimonial.maria.title': 'Marketing Director, Fashion Plus',
    'testimonial.maria.text': 'Kerit\'s chatbot completely automated our customer service. Now we work 24/7!',
    'testimonial.dmitry.name': 'Dmitry Kozlov', 
    'testimonial.dmitry.title': 'IT Director, LogiCorp',
    'testimonial.dmitry.text': 'Kerit\'s optimization saved us thousands of dollars on infrastructure. Highly recommend!',
    
    // About page details
    'about.approach_title': 'Comprehensive Approach',
    'about.approach_desc': 'We analyze all aspects of your business to create a holistic digitalization strategy',
    'about.measurable_title': 'Measurable Results',
    'about.measurable_desc': 'Every project has clear KPIs and efficiency metrics',
    'about.partnership_title': 'Long-term Partnership',
    'about.partnership_desc': 'We support clients at every stage of their digital ecosystem development',
    
    // Blog page
    'blog.clear_search': 'Clear Search',
    'blog.suggest_topic': 'Suggest Topic',
    'blog.email_placeholder': 'Your email',
    'blog.subscribe': 'Subscribe',
    'blog.no_posts_desc': 'Nothing found for your query. Try changing the search term.',
    'blog.updating_title': 'Blog is being updated',
    'blog.updating_desc': 'We are working on adding new expert articles. Stay tuned for updates!',
    
    // Contact FAQ
    'contact.faq.q1': 'How quickly do you respond?',
    'contact.faq.a1': 'We respond within 2-4 hours during business hours.',
    'contact.faq.q2': 'How much does consultation cost?',
    'contact.faq.a2': 'Initial consultation is always free.',
    'contact.faq.q3': 'Do you work with small projects?',
    'contact.faq.a3': 'Yes, we work with projects of any scale.',

    // Additional buttons and CTAs
    'services.write_us': 'Write to Us',
    'cases.show_all': 'Show All Cases',
    'cases.discuss_project': 'Discuss Project',
    'pricing.calculate_cost': 'Calculate Cost',
    'pricing.discuss_project': 'Discuss Project',
    'pricing.book_consultation': 'Book Consultation',

    // Dashboard
    'dashboard.title': 'Client Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.subtitle': 'Here you can track the status of your projects and view collaboration history',
    'dashboard.auth_required': 'Authorization Required',
    'dashboard.auth_message': 'Please log in to access the client dashboard',
    'dashboard.login_button': 'Log In',
    'dashboard.stats.total_projects': 'Total Projects',
    'dashboard.stats.in_progress': 'In Progress',
    'dashboard.stats.completed': 'Completed',
    'dashboard.stats.rating': 'Rating',
    'dashboard.projects.title': 'My Projects',
    'dashboard.projects.service': 'Service',
    'dashboard.projects.start_date': 'Start Date',
    'dashboard.projects.end_date': 'Expected Completion',
    'dashboard.projects.created': 'Created',
    'dashboard.projects.notes': 'Notes',
    'dashboard.projects.no_date': 'Not specified',
    'dashboard.projects.no_end_date': 'Not specified',
    'dashboard.projects.empty.title': 'No Projects Yet',
    'dashboard.projects.empty.message': 'You don\'t have any active projects yet. Contact us to discuss a new project.',
    'dashboard.projects.empty.button': 'Start New Project',
    'dashboard.actions.new_project': 'New Project',
    'dashboard.actions.new_project_desc': 'Discuss a new task with our team',
    'dashboard.actions.support': 'Support',
    'dashboard.actions.support_desc': 'Contact technical support',
    'dashboard.actions.documents': 'Documents',
    'dashboard.actions.documents_desc': 'Contracts, reports and technical documentation',
    'dashboard.status.planning': 'Planning',
    'dashboard.status.in_progress': 'In Progress',
    'dashboard.status.completed': 'Completed',
    'dashboard.status.on_hold': 'On Hold',

    // Common
    'common.read_more': 'Read More',
    'common.contact_us': 'Contact Us',
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
