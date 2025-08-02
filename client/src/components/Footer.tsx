import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import smallLogoPath from '@assets/Small_Logo_1754119146932.jpg';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <img src={smallLogoPath} alt="Kerit Logo" className="h-6 w-auto mb-4" />
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.company_desc')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-kerit-yellow transition-colors">
                <i className="fab fa-telegram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-kerit-yellow transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-kerit-yellow transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/services/email-marketing" className="hover:text-kerit-yellow transition-colors">
                  {t('services.email.title')}
                </Link>
              </li>
              <li>
                <Link href="/services/customer-chatbot" className="hover:text-kerit-yellow transition-colors">
                  {t('services.chatbot.title')}
                </Link>
              </li>
              <li>
                <Link href="/services/performance-improvement" className="hover:text-kerit-yellow transition-colors">
                  {t('services.performance.title')}
                </Link>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.company_section')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-kerit-yellow transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-kerit-yellow transition-colors">
                  {t('nav.cases')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-kerit-yellow transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-kerit-yellow transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-kerit-yellow transition-colors">
                  {t('nav.pricing')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Kerit. {t('footer.rights_reserved')}
          </div>

        </div>
      </div>
    </footer>
  );
}
