import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { AppointmentModal } from '@/components/AppointmentModal';

export default function EmailMarketing() {
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const { data: service, isLoading } = useQuery({
    queryKey: ['/api/services', 'email-marketing'],
  });

  const features = [
    {
      icon: 'fas fa-funnel-dollar',
      title: 'Автоматизация воронок продаж',
      description: 'Настройка последовательностей писем для ведения клиентов от знакомства до покупки'
    },
    {
      icon: 'fas fa-users',
      title: 'Сегментация аудитории',
      description: 'Разделение базы подписчиков по поведению, интересам и демографическим данным'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'A/B тестирование',
      description: 'Тестирование различных вариантов писем для повышения открываемости и кликабельности'
    },
    {
      icon: 'fas fa-robot',
      title: 'Персонализация контента',
      description: 'Индивидуальная настройка сообщений на основе данных о поведении пользователей'
    },
    {
      icon: 'fas fa-analytics',
      title: 'Детальная аналитика',
      description: 'Отслеживание всех метрик: открытия, клики, конверсии, доходность кампаний'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Интеграция с CRM',
      description: 'Синхронизация с вашими системами учета клиентов и продаж'
    }
  ];

  const benefits = [
    'Увеличение конверсии до 340%',
    'Автоматизация 80% коммуникаций',
    'Снижение стоимости привлечения клиента',
    'Повышение лояльности существующих клиентов',
    'Масштабируемость без увеличения штата'
  ];

  const process = [
    {
      step: '01',
      title: 'Аудит текущих процессов',
      description: 'Анализируем вашу базу подписчиков, текущие кампании и метрики'
    },
    {
      step: '02',
      title: 'Стратегия и планирование',
      description: 'Разрабатываем стратегию email-маркетинга под ваши цели'
    },
    {
      step: '03',
      title: 'Настройка автоматизации',
      description: 'Создаем и настраиваем автоматические последовательности писем'
    },
    {
      step: '04',
      title: 'Запуск и оптимизация',
      description: 'Запускаем кампании и постоянно оптимизируем результаты'
    }
  ];

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="loading-shimmer h-16 w-3/4 mx-auto rounded mb-8"></div>
          <div className="loading-shimmer h-6 w-full rounded mb-4"></div>
          <div className="loading-shimmer h-6 w-2/3 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Email-маркетинг - Kerit | Автоматизация продаж через email"
        description="Профессиональная настройка email-маркетинга: автоматизация воронок, сегментация аудитории, A/B тестирование. Увеличьте конверсию до 340%."
        keywords="email маркетинг, автоматизация продаж, email кампании, сегментация аудитории, воронки продаж"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark leading-tight mb-6">
                Email-маркетинг,<br />
                который <span className="text-kerit-sage">продает</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Автоматизируем процесс продаж через email-кампании. Превращаем подписчиков в клиентов с помощью персонализированных сообщений и умных воронок.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
                >
                  <i className="fas fa-chart-line mr-2"></i>
                  Получить бесплатный аудит
                </Button>
                <Button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  variant="outline"
                  className="border-2 border-kerit-sage text-kerit-sage hover:bg-kerit-sage hover:text-white font-semibold px-8 py-4"
                >
                  <i className="fas fa-calendar mr-2"></i>
                  Записаться на консультацию
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-kerit-sage to-kerit-dark rounded-2xl p-8 shadow-2xl">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 mb-4">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-envelope text-kerit-light text-2xl mr-3"></i>
                    <span className="text-kerit-light font-semibold">Добро пожаловать!</span>
                  </div>
                  <div className="text-kerit-light text-sm">Автоматическое приветствие</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 mb-4">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-gift text-kerit-light text-2xl mr-3"></i>
                    <span className="text-kerit-light font-semibold">Специальное предложение</span>
                  </div>
                  <div className="text-kerit-light text-sm">Через 3 дня после подписки</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <i className="fas fa-star text-kerit-light text-2xl mr-3"></i>
                    <span className="text-kerit-light font-semibold">Отзывы клиентов</span>
                  </div>
                  <div className="text-kerit-light text-sm">Серия кейсов и результатов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">
              Результаты наших клиентов
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Реальные показатели эффективности email-маркетинга
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="bg-kerit-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-kerit-dark text-xl"></i>
                </div>
                <p className="text-sm font-semibold text-kerit-dark">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">
              Что входит в услугу
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр работ по настройке и ведению email-маркетинга
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="bg-kerit-yellow rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <i className={`${feature.icon} text-2xl text-kerit-dark`}></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">
              Как мы работаем
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Пошаговый процесс настройки эффективного email-маркетинга
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-kerit-sage text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Готовы автоматизировать продажи?
          </h2>
          <p className="text-xl text-kerit-light mb-10">
            Получите бесплатный аудит вашего email-маркетинга и персональные рекомендации по улучшению
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-chart-line mr-2"></i>
              Получить бесплатный аудит
            </Button>
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              variant="outline"
              className="border-2 border-kerit-light text-kerit-light hover:bg-kerit-light hover:text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-phone mr-2"></i>
              Записаться на звонок
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
