import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="О нас - Kerit | IT Консалтинг"
        description="Узнайте больше о команде Kerit и нашем подходе к IT консалтингу. Мы помогаем бизнесу расти с помощью цифровых решений."
        keywords="о компании, команда, IT консалтинг, история компании"
      />

      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-kerit-dark mb-6">
              О компании Kerit
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Мы специализируемся на цифровой трансформации бизнеса через инновационные IT-решения
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-kerit-dark mb-6">Наша миссия</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Kerit создана для того, чтобы помочь бизнесу максимально эффективно использовать возможности 
                современных IT-технологий. Мы верим, что правильно настроенные цифровые процессы могут 
                кардинально изменить результативность любой компании.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lightbulb text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">Инновации</h3>
                <p className="text-gray-600">
                  Используем передовые технологии для решения бизнес-задач
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">Команда</h3>
                <p className="text-gray-600">
                  Опытные специалисты с глубокой экспертизой в IT
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">Результат</h3>
                <p className="text-gray-600">
                  Фокусируемся на измеримых бизнес-показателях
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-kerit-dark mb-6">Почему выбирают нас</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-kerit-yellow rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-check text-kerit-dark"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">Комплексный подход</h4>
                    <p className="text-gray-700">
                      Анализируем все аспекты вашего бизнеса для создания целостной стратегии цифровизации
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kerit-yellow rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-check text-kerit-dark"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">Измеримые результаты</h4>
                    <p className="text-gray-700">
                      Каждый проект имеет четкие KPI и метрики эффективности
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kerit-yellow rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-check text-kerit-dark"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">Долгосрочное партнерство</h4>
                    <p className="text-gray-700">
                      Поддерживаем клиентов на всех этапах развития их цифровой экосистемы
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-kerit-dark rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Готовы к сотрудничеству?</h2>
              <p className="text-kerit-light text-lg mb-8">
                Свяжитесь с нами для обсуждения вашего проекта
              </p>
              <a
                href="/contact"
                className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
