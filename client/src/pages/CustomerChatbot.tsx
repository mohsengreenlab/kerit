import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { AppointmentModal } from '@/components/AppointmentModal';

export default function CustomerChatbot() {
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const features = [
    {
      icon: 'fas fa-clock',
      title: '24/7 поддержка клиентов',
      description: 'Чат-бот работает круглосуточно, отвечая на вопросы клиентов в любое время'
    },
    {
      icon: 'fas fa-brain',
      title: 'Искусственный интеллект',
      description: 'Использование NLP для понимания естественной речи и контекста разговора'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Передача оператору',
      description: 'Умная передача сложных вопросов живому оператору в нужный момент'
    },
    {
      icon: 'fas fa-database',
      title: 'Интеграция с CRM',
      description: 'Синхронизация с вашей системой учета клиентов и истории обращений'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Аналитика диалогов',
      description: 'Детальная статистика по обращениям, популярным вопросам и конверсии'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Мультиканальность',
      description: 'Работа в мессенджерах, на сайте, в мобильном приложении'
    }
  ];

  const benefits = [
    'Снижение нагрузки на операторов до 70%',
    'Ответ на запрос менее чем за 5 секунд',
    'Обработка до 1000 диалогов одновременно',
    'Экономия на зарплате операторов до 60%',
    'Повышение удовлетворенности клиентов'
  ];

  const useCases = [
    {
      title: 'Интернет-магазины',
      description: 'Помощь в выборе товаров, оформление заказов, отслеживание доставки',
      icon: 'fas fa-shopping-cart'
    },
    {
      title: 'Банки и финансы',
      description: 'Информация по продуктам, помощь в оформлении заявок, поддержка клиентов',
      icon: 'fas fa-university'
    },
    {
      title: 'Недвижимость',
      description: 'Подбор объектов, запись на просмотры, консультации по ипотеке',
      icon: 'fas fa-home'
    },
    {
      title: 'Образование',
      description: 'Информация о курсах, запись на обучение, поддержка студентов',
      icon: 'fas fa-graduation-cap'
    },
    {
      title: 'Медицина',
      description: 'Запись к врачам, напоминания о приеме, первичная консультация',
      icon: 'fas fa-stethoscope'
    },
    {
      title: 'Туризм',
      description: 'Подбор туров, бронирование, информация о направлениях',
      icon: 'fas fa-plane'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Анализ потребностей',
      description: 'Изучаем ваш бизнес, типичные вопросы клиентов и процессы поддержки'
    },
    {
      step: '02',
      title: 'Проектирование диалогов',
      description: 'Создаем сценарии общения и логику работы чат-бота'
    },
    {
      step: '03',
      title: 'Разработка и интеграция',
      description: 'Программируем бота и интегрируем с вашими системами'
    },
    {
      step: '04',
      title: 'Тестирование и запуск',
      description: 'Проводим тестирование и запускаем чат-бота в работу'
    },
    {
      step: '05',
      title: 'Обучение и поддержка',
      description: 'Обучаем команду работе с ботом и обеспечиваем техподдержку'
    }
  ];

  return (
    <>
      <SEOHead
        title="Чат-боты для клиентов - Kerit | Автоматизация поддержки 24/7"
        description="Разработка интеллектуальных чат-ботов для автоматизации клиентского сервиса. Снижение нагрузки на операторов до 70%, работа 24/7."
        keywords="чат-бот, автоматизация поддержки, клиентский сервис, AI бот, мессенджер бот"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark leading-tight mb-6">
                Чат-боты,<br />
                которые <span className="text-kerit-sage">работают</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Автоматизируем клиентскую поддержку с помощью умных чат-ботов. Обеспечиваем 24/7 сервис и снижаем нагрузку на операторов до 70%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
                >
                  <i className="fas fa-robot mr-2"></i>
                  Получить демо чат-бота
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
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex items-start mb-2">
                    <div className="bg-kerit-light rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      <i className="fas fa-user text-kerit-dark text-sm"></i>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-kerit-dark">
                      Здравствуйте! Есть вопрос по вашему сервису
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="bg-kerit-sage rounded-lg px-3 py-2 text-sm text-white mr-3">
                      Привет! Я помогу вам. Что именно вас интересует?
                    </div>
                    <div className="bg-kerit-yellow rounded-full w-8 h-8 flex items-center justify-center">
                      <i className="fas fa-robot text-kerit-dark text-sm"></i>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="flex items-start mb-2">
                    <div className="bg-kerit-light rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      <i className="fas fa-user text-kerit-dark text-sm"></i>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-kerit-dark">
                      Какие у вас тарифы?
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="bg-kerit-sage rounded-lg px-3 py-2 text-sm text-white mr-3">
                      У нас есть 3 тарифа: Базовый, Профессиональный и Корпоративный. Показать детали?
                    </div>
                    <div className="bg-kerit-yellow rounded-full w-8 h-8 flex items-center justify-center">
                      <i className="fas fa-robot text-kerit-dark text-sm"></i>
                    </div>
                  </div>
                </div>
                <div className="text-center text-kerit-light text-sm">
                  <i className="fas fa-clock mr-1"></i>
                  Среднее время ответа: 2 секунды
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
              Результаты внедрения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Реальная экономия времени и денег с чат-ботами
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
              Возможности наших чат-ботов
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Современные технологии для эффективной автоматизации
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

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-kerit-dark mb-4">
              Отрасли применения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Чат-боты эффективно работают в различных сферах бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow text-center">
                <div className="bg-kerit-sage rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <i className={`${useCase.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-4">{useCase.title}</h3>
                <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
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
              Этапы разработки
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              От идеи до полностью функционального чат-бота
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-kerit-sage text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-kerit-dark mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-kerit-light transform translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Готовы автоматизировать поддержку?
          </h2>
          <p className="text-xl text-kerit-light mb-10">
            Получите демо-версию чат-бота для вашей сферы и увидите результат уже через неделю
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4"
            >
              <i className="fas fa-robot mr-2"></i>
              Получить демо чат-бота
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
