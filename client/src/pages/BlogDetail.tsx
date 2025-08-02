import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  author?: {
    firstName?: string;
    lastName?: string;
  };
}

export default function BlogDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  // Get current language from localStorage
  const currentLanguage = localStorage.getItem('language') || 'en';

  // Determine the correct slug based on current language
  const getLanguageSlug = () => {
    if (!slug) return '';
    
    // If slug already has language suffix, check if it matches current language
    if (slug.endsWith('-ru') || slug.endsWith('-en')) {
      const baseSlug = slug.replace(/-ru$|-en$/, '');
      return `${baseSlug}-${currentLanguage}`;
    }
    
    // If no language suffix, add current language
    return `${slug}-${currentLanguage}`;
  };

  const languageSlug = getLanguageSlug();

  // Navigate to correct language version when language changes
  useEffect(() => {
    if (slug && !slug.endsWith(`-${currentLanguage}`)) {
      const baseSlug = slug.replace(/-ru$|-en$/, '');
      navigate(`/blog/${baseSlug}-${currentLanguage}`, { replace: true });
    }
  }, [currentLanguage, slug, navigate]);

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/post/${languageSlug}`],
  });

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="loading-shimmer h-12 w-3/4 rounded mb-6"></div>
          <div className="loading-shimmer h-6 w-1/2 rounded mb-8"></div>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="loading-shimmer h-4 w-full rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-kerit-dark mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The blog post you are looking for does not exist.
          </p>
          <a 
            href="/blog" 
            className="bg-kerit-sage hover:bg-opacity-90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {t('blog.back_to_blog')}
          </a>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'email-marketing':
        return 'bg-blue-500';
      case 'chatbots':
        return 'bg-green-500';
      case 'performance':
        return 'bg-purple-500';
      default:
        return 'bg-kerit-sage';
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Handle markdown-style headers
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h3 key={index} className="text-xl font-bold text-kerit-dark mt-8 mb-4">
            {paragraph.slice(2, -2)}
          </h3>
        );
      }
      
      // Handle bullet points
      if (paragraph.trim().startsWith('- ')) {
        return (
          <li key={index} className="ml-6 mb-2 text-gray-700">
            {paragraph.trim().slice(2)}
          </li>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-6 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <>
      <SEOHead
        title={`${blogPost.title} - Kerit Blog`}
        description={blogPost.excerpt}
        keywords={`${blogPost.category}, blog, IT consulting, Kerit`}
      />

      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            {blogPost.category && (
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-medium mb-4 ${getCategoryColor(blogPost.category)}`}>
                {blogPost.category}
              </div>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold text-kerit-dark mb-4">
              {blogPost.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {blogPost.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          {blogPost.featuredImage && (
            <div className="mb-12">
              <img
                src={blogPost.featuredImage}
                alt={blogPost.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          {/* Tags */}
          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blogPost.tags.map((tag, index) => (
                <span key={index} className="bg-kerit-light text-kerit-dark px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="prose prose-lg max-w-none">
              {formatContent(blogPost.content)}
            </div>
          </div>

          {/* Author and Date */}
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            {blogPost.author && (
              <div className="mb-4">
                <p className="text-gray-600">
                  {t('blog.author')}: {blogPost.author.firstName} {blogPost.author.lastName}
                </p>
              </div>
            )}
            <a 
              href="/blog" 
              className="inline-flex items-center text-kerit-sage hover:text-kerit-dark transition-colors font-semibold"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              {t('blog.back_to_blog')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}