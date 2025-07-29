import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';
import logoPath from '@assets/Logo_1753789199779.jpg';

export function Header() {
  const [location] = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location === path || location.startsWith(path + '/');
  };

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/case-studies', label: t('nav.cases') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/pricing', label: t('nav.pricing') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <img src={logoPath} alt="Kerit Logo" className="h-8 w-auto" />
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a className={`transition-colors font-medium ${
                  isActive(item.path)
                    ? 'text-kerit-sage border-b-2 border-kerit-yellow'
                    : 'text-kerit-dark hover:text-kerit-sage'
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Auth */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Auth Links */}
            <div className="hidden lg:flex items-center space-x-3 text-sm">
              {isAuthenticated ? (
                <>
                  {user?.role === 'customer' && (
                    <Link href="/dashboard">
                      <a className="text-kerit-sage hover:text-kerit-dark transition-colors">
                        <i className="fas fa-user mr-1"></i>{t('nav.dashboard')}
                      </a>
                    </Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link href="/admin">
                      <a className="text-kerit-sage hover:text-kerit-dark transition-colors">
                        <i className="fas fa-cog mr-1"></i>{t('nav.admin')}
                      </a>
                    </Link>
                  )}
                  <a href="/api/logout" className="text-kerit-sage hover:text-kerit-dark transition-colors">
                    <i className="fas fa-sign-out-alt mr-1"></i>{t('auth.logout')}
                  </a>
                </>
              ) : (
                <button 
                  onClick={() => {
                    // Temporary development login - replace with proper Replit Auth
                    window.location.href = '/api/dev-login';
                  }}
                  className="text-kerit-sage hover:text-kerit-dark transition-colors bg-transparent border-none cursor-pointer"
                >
                  <i className="fas fa-sign-in-alt mr-1"></i>{t('auth.login')}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md text-kerit-dark hover:text-kerit-sage"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a 
                  className={`block py-2 px-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-kerit-light text-kerit-dark'
                      : 'text-kerit-dark hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="border-t pt-2">
              {isAuthenticated ? (
                <>
                  {user?.role === 'customer' && (
                    <Link href="/dashboard">
                      <a className="block py-2 px-3 text-kerit-sage" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="fas fa-user mr-2"></i>{t('nav.dashboard')}
                      </a>
                    </Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link href="/admin">
                      <a className="block py-2 px-3 text-kerit-sage" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="fas fa-cog mr-2"></i>{t('nav.admin')}
                      </a>
                    </Link>
                  )}
                  <a href="/api/logout" className="block py-2 px-3 text-kerit-sage">
                    <i className="fas fa-sign-out-alt mr-2"></i>{t('auth.logout')}
                  </a>
                </>
              ) : (
                <button 
                  onClick={() => {
                    // Temporary development login - replace with proper Replit Auth
                    window.location.href = '/api/dev-login';
                    setIsMobileMenuOpen(false);
                  }}
                  className="block py-2 px-3 text-kerit-sage w-full text-left bg-transparent border-none cursor-pointer"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>{t('auth.login')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
