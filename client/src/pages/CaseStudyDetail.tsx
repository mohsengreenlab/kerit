import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { AppointmentModal } from '@/components/AppointmentModal';
import { useState } from 'react';

interface CaseStudy {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  clientName?: string;
  results?: string;
  serviceType: string;
  publishedAt: string;
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const { data: caseStudy, isLoading, error } = useQuery<CaseStudy>({
    queryKey: [`/api/case-studies/detail/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="loading-shimmer h-12 w-3/4 rounded mb-6"></div>
          <div className="loading-shimmer h-6 w-1/2 rounded mb-8"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="loading-shimmer h-4 w-full rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-kerit-dark mb-4">
            {t('cases.not_found.title') || 'Case Study Not Found'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('cases.not_found.desc') || 'The case study you are looking for does not exist.'}
          </p>
          <a 
            href="/case-studies" 
            className="bg-kerit-sage hover:bg-opacity-90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {t('cases.back_to_cases') || 'Back to Case Studies'}
          </a>
        </div>
      </div>
    );
  }

  const getServiceColor = (serviceType: string) => {
    switch (serviceType) {
      case 'email-marketing':
        return 'bg-blue-500';
      case 'customer-chatbot':
        return 'bg-green-500';
      case 'performance-improvement':
        return 'bg-purple-500';
      default:
        return 'bg-kerit-sage';
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'email-marketing':
        return 'fas fa-envelope';
      case 'customer-chatbot':
        return 'fas fa-robot';
      case 'performance-improvement':
        return 'fas fa-tachometer-alt';
      default:
        return 'fas fa-briefcase';
    }
  };

  return (
    <>
      <SEOHead
        title={`${caseStudy.title} - Kerit Case Studies`}
        description={caseStudy.excerpt}
        keywords={`case study, ${caseStudy.serviceType}, IT consulting, Kerit`}
      />

      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-medium mb-4 ${getServiceColor(caseStudy.serviceType)}`}>
              <i className={`${getServiceIcon(caseStudy.serviceType)} mr-2`}></i>
              {t(`cases.filter.${caseStudy.serviceType.replace('-', '')}`) || caseStudy.serviceType}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-kerit-dark mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {caseStudy.excerpt}
            </p>
          </div>

          {/* Client & Results */}
          {(caseStudy.clientName || caseStudy.results) && (
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                {caseStudy.clientName && (
                  <div>
                    <h3 className="text-lg font-semibold text-kerit-dark mb-2">
                      {t('cases.client') || 'Client'}
                    </h3>
                    <p className="text-gray-600">{caseStudy.clientName}</p>
                  </div>
                )}
                {caseStudy.results && (
                  <div>
                    <h3 className="text-lg font-semibold text-kerit-dark mb-2">
                      {t('cases.results') || 'Results'}
                    </h3>
                    <p className="text-gray-600">{caseStudy.results}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="prose prose-lg max-w-none">
              {caseStudy.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-kerit-dark rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('cases.cta.title') || 'Ready to achieve similar results?'}
            </h3>
            <p className="text-kerit-light mb-6">
              {t('cases.cta.desc') || 'Let us help you transform your business with proven IT solutions.'}
            </p>
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('cases.cta.button') || 'Get Free Consultation'}
            </button>
          </div>
        </div>
      </div>

      {isAppointmentModalOpen && (
        <AppointmentModal onClose={() => setIsAppointmentModalOpen(false)} />
      )}
    </>
  );
}