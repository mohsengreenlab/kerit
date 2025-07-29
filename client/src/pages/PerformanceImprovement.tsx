import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { AppointmentModal } from '@/components/AppointmentModal';

export default function PerformanceImprovement() {
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const features = [
    {
      icon: 'fas fa-search',
      title: 'Комплексный аудит системы',
      description: 'Детальный анализ архитектуры, кода, базы данных и инфраструктуры'
    },
    {
      icon: 'fas fa-database',
      title: 'Оптимизация базы данных',
      description: 'Настройка индексов, оптимизация запросов, архитектурные улучшения'
    },
    {
      icon: 'fas fa-code',
      title: 'Рефакторинг кода',
      description: 'Улучшение алгоритмов, устранение узких мест, оптимизация логики'
    },
    {
      icon: 'fas fa-server',
      title: 'Настройка инфраструктуры',
      description: 'Конфигурация серверов, кэширование, балансировка нагрузки'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Мониторинг производительности',
      description: 'Внедрение систем контроля и алертов для отслеживания метрик'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Обеспечение надежности',
      description: 'Резервное копирование, отказоустойчивость, безопасность'
    }
  ];

  const metrics = [
    {
      icon: 'fas fa-tachometer-alt',
      title: 'Скорость загрузки',
      before: '8.2 сек',
      after: '1.6 сек',
      improvement: '5x быстрее'
    },
    {
      icon: 'fas fa-database',
      title: 'Время запросов к БД',
      before: '2.5 сек',
      after: '0.3 сек',
      improvement: '8x быстрее'
    },
    {
      icon: 'fas fa-memory',
      title: 'Использование памяти',
      before: '4.2 ГБ',
      after: '1.8 ГБ',
      improvement: '57% экономия'
    },
    {
      icon: 'fas fa-server',
      title: 'Нагрузка на сервер',
      before: '85% CPU',
      after: '35% CPU',
      improvement: '59% снижение'
    }
  ];

  const services = [
    {
      title: 'Аудит производительности',
      description: 'Полный анализ текущего состояния системы с детальным отчетом',
      features: ['Анализ архитектуры', 'Профилирование кода', 'Тестирование нагрузки', 'Отчет с рекомендациями'],
      price: 'от 50 000 ₽'
    },
    {
      title: 'Базовая оптимизация',
      description: 'Устранение критических проблем производительности',
      features: ['Оптимизация запросов', 'Настройка кэширования', 'Исправление узких мест', '30 дней поддержки'],
      price: 'от 150 000 ₽'
    },
    {
      title: 'Комплексная оптимизация',
      description: 'Полная реструктуризация для максимальной производительности',
      features: ['Архитектурные изменения', 'Масштабирование', 'Мониторинг', '90 дней поддержки'],
      price: 'от 300 000 ₽'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Диагностика системы',
      description: 'Анализируем текущую производительность и выявляем проблемные зоны',
      duration: '1-2 недели'
    },
    {
      step: '02',
      title: 'Планирование оптимизации',
      description: 'Разрабатываем план работ с приоритизацией по влиянию на производительность',
      duration: '3-5 дней'
    },
    {
      step: '03',
      title: 'Реализация изменений',
      description: 'Внедряем оптимизации поэтапно с контролем результатов',
      duration: '2-8 недель'
    },
    {
      step: '04',
      title: 'Тестирование и мониторинг',
      description: 'Проверяем результаты и настраиваем системы контроля',
      duration: '1-2 недели'
    }
  ];

  return (
    <>
      <SEOHead
        title="Оптимизация производительности - Kerit | Ускорение работы систем"
        description="Профессиональная оптимизация производительности IT-систем. Ускорение работы в 5 раз, снижение нагрузки на серверы, экономия на инфраструктуре."
        keywords="оптимизация производительности, ускорение сайта, оптимизация базы данных, производительность системы"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark leading-tight mb-6">
                Оптимизация,<br />
                которая <span className="text-kerit-sage">ускоряет</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Увеличиваем скорость работы ваших систем в 5 раз. Снижаем затраты на серверы и улучшаем пользовательский опыт.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
                >
                  <i className="fas fa-search mr-2"></i>
                  Получить аудит производительности
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
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-red-400 text-2xl font-bold mb-1">8.2s</div>
                    <div className="text-kerit-light text-sm">До оптимизации</div>
                  </div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-green-400 text-2xl font-bold mb-1">1.6s</div>
                    <div className="text-kerit-light text-sm">После оптимизации</div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <i className="fas fa-rocket text-kerit-light text-3xl mb-2"></i>
                  <div className="text-kerit-light font-semibold">5x ускорение</div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-kerit-yellow rounded-full px-4 py-2 text-kerit-dark text-sm font-semibold">
                    <i className="fas fa-check mr-1"></i>
                    Цель достигнута
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">
              Результаты оптимизации
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Реальные метрики улучшения производительности
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <i className={`${metric.icon} text-2xl text-kerit-dark`}></i>
                </div>
                <h3 className="text-lg font-bold text-kerit-dark mb-4">{metric.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Было:</span>
                    <span className="font-semibold">{metric.before}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Стало:</span>
                    <span className="font-semibold">{metric.after}</span>
                  </div>
                </div>
                <div className="bg-kerit-yellow text-kerit-dark px-3 py-1 rounded-full text-sm font-semibold">
                  {metric.improvement}
                </div>
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
              Что включает оптимизация
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Комплексный подход к улучшению производительности
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

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">
              Пакеты услуг
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Выберите подходящий уровень оптимизации
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg p-8 relative ${index === 1 ? 'border-2 border-kerit-yellow' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-kerit-yellow text-kerit-dark px-4 py-2 rounded-full text-sm font-semibold">
                      Популярный
                    </div>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-kerit-dark mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <i className="fas fa-check text-kerit-sage mr-3"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <div className="text-3xl font-bold text-kerit-dark mb-4">{service.price}</div>
                  <Button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className={`w-full ${index === 1 ? 'bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark' : 'bg-kerit-sage hover:bg-opacity-90 text-white'}`}
                  >
                    Выбрать пакет
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">
              Процесс оптимизации
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Поэтапный подход для достижения максимального результата
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-kerit-sage text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-2">{step.description}</p>
                <div className="text-sm text-kerit-sage font-semibold">{step.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Готовы ускорить вашу систему?
          </h2>
          <p className="text-xl text-kerit-light mb-10">
            Получите бесплатный аудит производительности и узнайте, на сколько можно ускорить вашу систему
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-search mr-2"></i>
              Получить бесплатный аудит
            </Button>
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              variant="outline"
              className="border-2 border-kerit-light text-kerit-light hover:bg-kerit-light hover:text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-phone mr-2"></i>
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
