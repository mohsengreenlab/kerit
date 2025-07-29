import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { isUnauthorizedError } from '@/lib/authUtils';

interface AnalyticsData {
  stats: {
    totalVisitors: number;
    totalPageViews: number;
    returningVisitors: number;
  };
  popularPages: {
    path: string;
    views: number;
  }[];
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  customer?: {
    firstName?: string;
    lastName?: string;
    email: string;
  };
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  serviceType: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

export default function Admin() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('analytics');

  const { data: analytics, isLoading: analyticsLoading } = useQuery<AnalyticsData>({
    queryKey: ['/api/admin/analytics'],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: submissions, isLoading: submissionsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/admin/contact-submissions'],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/admin/projects'],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/admin/blog'],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const { data: caseStudies, isLoading: casesLoading } = useQuery<CaseStudy[]>({
    queryKey: ['/api/admin/case-studies'],
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Требуется авторизация",
        description: "Для доступа к админ-панели необходимо войти в систему.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }

    if (!authLoading && isAuthenticated && user?.role !== 'admin') {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав администратора.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, user, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kerit-sage"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const unreadSubmissions = submissions?.filter(s => !s.isRead).length || 0;

  return (
    <>
      <SEOHead
        title="Админ-панель - Kerit | Управление контентом"
        description="Панель администратора Kerit: аналитика, управление контентом, проекты."
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kerit-dark mb-2">
              Панель администратора
            </h1>
            <p className="text-gray-600">
              Управление контентом, аналитикой и проектами
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="analytics">
                <i className="fas fa-chart-bar mr-2"></i>
                Аналитика
              </TabsTrigger>
              <TabsTrigger value="submissions">
                <i className="fas fa-envelope mr-2"></i>
                Обращения
                {unreadSubmissions > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white">{unreadSubmissions}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="projects">
                <i className="fas fa-project-diagram mr-2"></i>
                Проекты
              </TabsTrigger>
              <TabsTrigger value="content">
                <i className="fas fa-edit mr-2"></i>
                Контент
              </TabsTrigger>
              <TabsTrigger value="settings">
                <i className="fas fa-cog mr-2"></i>
                Настройки
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-3 mr-4">
                        <i className="fas fa-users text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Всего посетителей</p>
                        <p className="text-2xl font-bold text-kerit-dark">
                          {analyticsLoading ? '...' : analytics?.stats.totalVisitors || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-3 mr-4">
                        <i className="fas fa-eye text-green-600 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Просмотры страниц</p>
                        <p className="text-2xl font-bold text-kerit-dark">
                          {analyticsLoading ? '...' : analytics?.stats.totalPageViews || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="bg-purple-100 rounded-full p-3 mr-4">
                        <i className="fas fa-redo text-purple-600 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Возвращающиеся</p>
                        <p className="text-2xl font-bold text-kerit-dark">
                          {analyticsLoading ? '...' : analytics?.stats.returningVisitors || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Популярные страницы</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="loading-shimmer h-12 rounded"></div>
                      ))}
                    </div>
                  ) : analytics?.popularPages.length ? (
                    <div className="space-y-3">
                      {analytics.popularPages.map((page, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">{page.path}</span>
                          <Badge>{page.views} просмотров</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Данные не найдены</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Submissions Tab */}
            <TabsContent value="submissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Обращения клиентов</CardTitle>
                </CardHeader>
                <CardContent>
                  {submissionsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4">
                          <div className="loading-shimmer h-6 w-1/2 rounded mb-3"></div>
                          <div className="loading-shimmer h-4 w-full rounded mb-2"></div>
                          <div className="loading-shimmer h-4 w-3/4 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : submissions && submissions.length > 0 ? (
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <div
                          key={submission.id}
                          className={`border rounded-lg p-4 ${
                            submission.isRead ? 'border-gray-200 bg-white' : 'border-kerit-yellow bg-kerit-light bg-opacity-30'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-kerit-dark">{submission.subject}</h3>
                              <p className="text-sm text-gray-600">
                                От: {submission.name} ({submission.email})
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!submission.isRead && (
                                <Badge className="bg-kerit-yellow text-kerit-dark">Новое</Badge>
                              )}
                              <span className="text-sm text-gray-500">
                                {new Date(submission.createdAt).toLocaleString('ru-RU')}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{submission.message}</p>
                          {!submission.isRead && (
                            <Button size="sm" className="bg-kerit-sage hover:bg-opacity-90 text-white">
                              Отметить как прочитанное
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                      <p className="text-gray-500">Новых обращений нет</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Управление проектами</CardTitle>
                </CardHeader>
                <CardContent>
                  {projectsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4">
                          <div className="loading-shimmer h-6 w-1/2 rounded mb-3"></div>
                          <div className="loading-shimmer h-4 w-full rounded mb-2"></div>
                          <div className="loading-shimmer h-4 w-3/4 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : projects && projects.length > 0 ? (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-kerit-dark">{project.title}</h3>
                              <p className="text-sm text-gray-600">
                                Клиент: {project.customer?.firstName} {project.customer?.lastName} ({project.customer?.email})
                              </p>
                            </div>
                            <Badge className="bg-kerit-light text-kerit-dark">{project.status}</Badge>
                          </div>
                          <p className="text-gray-700 mb-3">{project.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Создан: {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                            </span>
                            <Button size="sm" variant="outline">Редактировать</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <i className="fas fa-project-diagram text-6xl text-gray-300 mb-4"></i>
                      <p className="text-gray-500">Проектов пока нет</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Статьи блога
                      <Button size="sm" className="bg-kerit-sage hover:bg-opacity-90 text-white">
                        <i className="fas fa-plus mr-2"></i>Добавить
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {blogLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="loading-shimmer h-16 rounded"></div>
                        ))}
                      </div>
                    ) : blogPosts && blogPosts.length > 0 ? (
                      <div className="space-y-3">
                        {blogPosts.slice(0, 5).map((post) => (
                          <div key={post.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-sm">{post.title}</p>
                              <p className="text-xs text-gray-500">{post.slug}</p>
                            </div>
                            <Badge className={post.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {post.isPublished ? 'Опубликовано' : 'Черновик'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">Статей пока нет</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Кейсы
                      <Button size="sm" className="bg-kerit-sage hover:bg-opacity-90 text-white">
                        <i className="fas fa-plus mr-2"></i>Добавить
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {casesLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="loading-shimmer h-16 rounded"></div>
                        ))}
                      </div>
                    ) : caseStudies && caseStudies.length > 0 ? (
                      <div className="space-y-3">
                        {caseStudies.slice(0, 5).map((caseStudy) => (
                          <div key={caseStudy.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-sm">{caseStudy.title}</p>
                              <p className="text-xs text-gray-500">{caseStudy.serviceType}</p>
                            </div>
                            <Badge className={caseStudy.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {caseStudy.isPublished ? 'Опубликовано' : 'Черновик'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">Кейсов пока нет</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки системы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-kerit-dark mb-4">Общие настройки</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">Аналитика посетителей</p>
                            <p className="text-sm text-gray-600">Отслеживание активности пользователей</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Включено</Badge>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">Email уведомления</p>
                            <p className="text-sm text-gray-600">Уведомления о новых обращениях</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Включено</Badge>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">Автоматическое резервное копирование</p>
                            <p className="text-sm text-gray-600">Ежедневные бэкапы базы данных</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Включено</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-kerit-dark mb-4">Действия</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <i className="fas fa-download mr-2"></i>
                          Экспорт данных
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <i className="fas fa-shield-alt mr-2"></i>
                          Проверка безопасности
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <i className="fas fa-broom mr-2"></i>
                          Очистка кэша
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
