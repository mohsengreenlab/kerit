import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';

export default function WhoWeAre() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title="Кто мы - Kerit | IT Консалтинг"
        description="Познакомьтесь с командой Kerit - международной группой IT-профессионалов из СПбГУ, работающих над качественными технологическими решениями."
        keywords="команда, о нас, СПбГУ, IT профессионалы, международная команда"
      />

      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-kerit-dark mb-6">
              {t('who_we_are.title')}
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {t('who_we_are.intro')}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {t('who_we_are.mission')}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t('who_we_are.values')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-university text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">{t('who_we_are.education_title')}</h3>
                <p className="text-gray-600">
                  {t('who_we_are.education_desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-globe text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">{t('who_we_are.international_title')}</h3>
                <p className="text-gray-600">
                  {t('who_we_are.international_desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-kerit-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-heart text-3xl text-kerit-dark"></i>
                </div>
                <h3 className="text-xl font-bold text-kerit-dark mb-2">{t('who_we_are.passion_title')}</h3>
                <p className="text-gray-600">
                  {t('who_we_are.passion_desc')}
                </p>
              </div>
            </div>

            <div className="text-center bg-kerit-dark rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold text-white mb-6">{t('who_we_are.cta_title')}</h2>
              <p className="text-white text-lg mb-8">
                {t('who_we_are.cta_desc')}
              </p>
              <a
                href="/contact"
                className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
              >
                {t('who_we_are.contact_us')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}