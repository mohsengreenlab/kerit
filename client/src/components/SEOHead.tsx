import { useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  hreflang?: { [key: string]: string };
}

export function SEOHead({ title, description, keywords, ogImage, ogUrl, canonical, hreflang }: SEOHeadProps) {
  const { language } = useLanguage();
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    
    if (ogUrl) {
      updateOGTag('og:url', ogUrl);
    }
    
    if (ogImage) {
      updateOGTag('og:image', ogImage);
    }

    updateOGTag('og:type', 'website');
    updateOGTag('og:site_name', 'Kerit - IT Консалтинг');
    updateOGTag('og:locale', language === 'ru' ? 'ru_RU' : 'en_US');

    // Add language meta tag
    let langMeta = document.querySelector('meta[name="language"]');
    if (!langMeta) {
      langMeta = document.createElement('meta');
      langMeta.setAttribute('name', 'language');
      document.head.appendChild(langMeta);
    }
    langMeta.setAttribute('content', language === 'ru' ? 'Russian' : 'English');

    // Add robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical || window.location.href);

    // Add hreflang links for multilingual SEO
    const currentPath = window.location.pathname;
    const baseUrl = window.location.origin;
    
    // Remove existing hreflang links
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    // Add hreflang links
    if (hreflang) {
      Object.entries(hreflang).forEach(([lang, url]) => {
        const hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', lang);
        hreflangLink.setAttribute('href', url);
        document.head.appendChild(hreflangLink);
      });
    } else {
      // Default multilingual setup based on path
      const pathWithoutLang = currentPath.replace(/^\/(ru|en)/, '') || '/';
      
      // English version
      const enHreflang = document.createElement('link');
      enHreflang.setAttribute('rel', 'alternate');
      enHreflang.setAttribute('hreflang', 'en');
      enHreflang.setAttribute('href', `${baseUrl}${pathWithoutLang}`);
      document.head.appendChild(enHreflang);

      // Russian version
      const ruHreflang = document.createElement('link');
      ruHreflang.setAttribute('rel', 'alternate');
      ruHreflang.setAttribute('hreflang', 'ru');
      ruHreflang.setAttribute('href', `${baseUrl}/ru${pathWithoutLang}`);
      document.head.appendChild(ruHreflang);

      // Default fallback
      const defaultHreflang = document.createElement('link');
      defaultHreflang.setAttribute('rel', 'alternate');
      defaultHreflang.setAttribute('hreflang', 'x-default');
      defaultHreflang.setAttribute('href', `${baseUrl}${pathWithoutLang}`);
      document.head.appendChild(defaultHreflang);
    }

    // Add structured data for organization
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }
    
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kerit",
      "description": language === 'ru' 
        ? "IT консалтинговая компания специализирующаяся на email-маркетинге, чат-ботах и оптимизации производительности"
        : "IT consulting company specializing in email marketing, chatbots, and performance optimization",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7-XXX-XXX-XXXX",
        "contactType": "customer service",
        "email": "info@kerit.com.ru",
        "availableLanguage": ["Russian", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "RU"
      },
      "sameAs": [
        "https://linkedin.com/company/kerit",
        "https://twitter.com/kerit"
      ]
    };
    
    structuredData.textContent = JSON.stringify(organizationData);

  }, [title, description, keywords, ogImage, ogUrl, canonical, hreflang, language]);

  return null;
}
