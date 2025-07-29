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
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('footer.company_desc')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-kerit-dark mb-6">{t('about.mission')}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t('about.mission_desc')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lightbulb text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">{t('about.innovation')}</h3>
                <p className="text-gray-600">
                  {t('about.innovation_desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">{t('about.team')}</h3>
                <p className="text-gray-600">
                  {t('about.team_desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">{t('about.results')}</h3>
                <p className="text-gray-600">
                  {t('about.results_desc')}
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-kerit-dark mb-6">{t('about.why_choose')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-kerit-yellow rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-check text-kerit-dark"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">{t('about.approach_title')}</h4>
                    <p className="text-gray-700">
                      {t('about.approach_desc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kerit-yellow rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-check text-kerit-dark"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">{t('about.measurable_title')}</h4>
                    <p className="text-gray-700">
                      {t('about.measurable_desc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kerit-yellow rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <i className="fas fa-check text-kerit-dark"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">{t('about.partnership_title')}</h4>
                    <p className="text-gray-700">
                      {t('about.partnership_desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-kerit-dark rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">{t('about.cta_title')}</h2>
              <p className="text-white text-lg mb-8">
                {t('about.cta_desc')}
              </p>
              <a
                href="/contact"
                className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
              >
                {t('about.contact_us')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
