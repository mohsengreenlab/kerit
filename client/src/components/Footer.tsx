import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import logoPath from '@assets/Logo_1753783870877.jpg';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <img src={logoPath} alt="Kerit Logo" className="h-6 w-auto mb-4" />
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
                <Link href="/services/email-marketing">
                  <a className="hover:text-kerit-yellow transition-colors">{t('services.email.title')}</a>
                </Link>
              </li>
              <li>
                <Link href="/services/customer-chatbot">
                  <a className="hover:text-kerit-yellow transition-colors">{t('services.chatbot.title')}</a>
                </Link>
              </li>
              <li>
                <Link href="/services/performance-improvement">
                  <a className="hover:text-kerit-yellow transition-colors">{t('services.performance.title')}</a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="hover:text-kerit-yellow transition-colors">{t('nav.pricing')}</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.company_section')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about">
                  <a className="hover:text-kerit-yellow transition-colors">{t('nav.about')}</a>
                </Link>
              </li>
              <li>
                <Link href="/case-studies">
                  <a className="hover:text-kerit-yellow transition-colors">{t('nav.cases')}</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="hover:text-kerit-yellow transition-colors">{t('nav.blog')}</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-kerit-yellow transition-colors">{t('nav.contact')}</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Kerit. {t('footer.rights_reserved')}
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link href="/privacy">
              <a className="hover:text-kerit-yellow transition-colors">{t('footer.privacy_policy')}</a>
            </Link>
            <Link href="/terms">
              <a className="hover:text-kerit-yellow transition-colors">{t('footer.terms_of_use')}</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
