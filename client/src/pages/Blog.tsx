import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
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

export default function Blog() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: selectedCategory !== 'all' ? [`/api/blog/${selectedCategory}`] : ['/api/blog'],
  });

  const categories = [
    { value: 'all', label: t('blog.filter.all'), icon: 'fas fa-th-large' },
    { value: 'email-marketing', label: t('blog.filter.email'), icon: 'fas fa-envelope' },
    { value: 'chatbots', label: t('blog.filter.chatbots'), icon: 'fas fa-robot' },
    { value: 'performance', label: t('blog.filter.performance'), icon: 'fas fa-tachometer-alt' },
    { value: 'analytics', label: t('blog.filter.analytics'), icon: 'fas fa-chart-line' },
    { value: 'trends', label: t('blog.filter.trends'), icon: 'fas fa-trending-up' },
  ];

  const filteredPosts = blogPosts?.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'email-marketing':
        return 'bg-blue-500';
      case 'chatbots':
        return 'bg-green-500';
      case 'performance':
        return 'bg-purple-500';
      case 'analytics':
        return 'bg-orange-500';
      case 'trends':
        return 'bg-pink-500';
      default:
        return 'bg-kerit-sage';
    }
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="loading-shimmer h-12 w-96 mx-auto rounded mb-4"></div>
            <div className="loading-shimmer h-6 w-2/3 mx-auto rounded"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="loading-shimmer h-48 w-full"></div>
                <div className="p-6">
                  <div className="loading-shimmer h-4 w-24 rounded mb-2"></div>
                  <div className="loading-shimmer h-6 w-full rounded mb-3"></div>
                  <div className="loading-shimmer h-16 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
            <h2 className="text-2xl font-bold text-red-700 mb-2">{t('common.error')}</h2>
            <p className="text-red-600">
              {t('blog.no_posts_desc')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Блог - Kerit | Экспертные статьи по IT консалтингу"
        description="Читайте экспертные статьи о email-маркетинге, чат-ботах, оптимизации производительности и IT-трендах. Практические советы от команды Kerit."
        keywords="IT блог, email маркетинг, чат-боты, оптимизация, IT статьи, экспертные советы"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark mb-6">
            {t('nav.blog')}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('blog.subtitle')}
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder={t('blog.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className={`${
                  selectedCategory === category.value
                    ? 'bg-kerit-sage text-white'
                    : 'border-kerit-sage text-kerit-sage hover:bg-kerit-sage hover:text-white'
                }`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow kerit-card-hover">
                  <div className="h-48 bg-gradient-to-br from-kerit-sage to-kerit-dark flex items-center justify-center">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <i className="fas fa-newspaper text-4xl text-kerit-light mb-2"></i>
                        <div className="text-kerit-light font-semibold">Статья</div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      {post.category && (
                        <div className={`${getCategoryColor(post.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                          {categories.find(c => c.value === post.category)?.label || post.category}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-kerit-dark mb-3 line-clamp-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-kerit-light text-kerit-dark px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <Link href={`/blog/${post.slug}`}>
                        <a className="text-kerit-sage font-semibold hover:text-kerit-dark transition-colors">
                          Читать статью <i className="fas fa-arrow-right ml-1"></i>
                        </a>
                      </Link>
                      {post.author && (
                        <div className="text-sm text-gray-500">
                          {post.author.firstName} {post.author.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                <i className="fas fa-search text-6xl text-gray-300 mb-6"></i>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">
                  {searchQuery ? 'Статьи не найдены' : 'Блог обновляется'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {searchQuery 
                    ? `По запросу "${searchQuery}" ничего не найдено. Попробуйте изменить поисковый запрос.`
                    : 'Мы работаем над добавлением новых экспертных статей. Следите за обновлениями!'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {searchQuery && (
                    <Button
                      onClick={() => setSearchQuery('')}
                      className="bg-kerit-sage hover:bg-opacity-90 text-white"
                    >
                      Очистить поиск
                    </Button>
                  )}
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-kerit-sage text-kerit-sage hover:bg-kerit-sage hover:text-white"
                    >
                      Предложить тему
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-kerit-dark">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Не пропустите новые статьи
          </h2>
          <p className="text-xl text-kerit-light mb-10">
            Подпишитесь на наши обновления и получайте свежие экспертные материалы первыми
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Ваш email"
              className="bg-white text-kerit-dark"
            />
            <Button className="bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold px-6">
              Подписаться
            </Button>
          </div>
          <p className="text-kerit-light text-sm mt-4">
            Никакого спама, только полезные материалы
          </p>
        </div>
      </section>
    </>
  );
}
