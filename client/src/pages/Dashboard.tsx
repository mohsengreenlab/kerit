import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { isUnauthorizedError } from '@/lib/authUtils';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  notes: string;
  createdAt: string;
  package?: {
    name: string;
    type: string;
    service?: {
      name: string;
    };
  };
}

export default function Dashboard() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/dashboard/projects'],
    enabled: isAuthenticated && user?.role === 'customer',
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Требуется авторизация",
        description: "Для доступа к панели клиента необходимо войти в систему.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }

    if (!authLoading && isAuthenticated && user?.role !== 'customer') {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав доступа к клиентской панели.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, user, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning':
        return 'Планирование';
      case 'in_progress':
        return 'В работе';
      case 'review':
        return 'На проверке';
      case 'completed':
        return 'Завершен';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return 'fas fa-clipboard-list';
      case 'in_progress':
        return 'fas fa-cogs';
      case 'review':
        return 'fas fa-search';
      case 'completed':
        return 'fas fa-check-circle';
      case 'cancelled':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kerit-sage"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'customer') {
    return null;
  }

  if (error && isUnauthorizedError(error as Error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-kerit-dark mb-4">Требуется авторизация</h2>
          <p className="text-gray-600 mb-6">Пожалуйста, войдите в систему для доступа к панели клиента</p>
          <button 
            onClick={() => window.location.href = '/api/dev-login'}
            className="bg-kerit-sage text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Войти в систему
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Панель клиента - Kerit | Мои проекты"
        description="Панель клиента Kerit: отслеживание статуса проектов, история заказов, документация."
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kerit-dark mb-2">
              Добро пожаловать, {user?.firstName || user?.email}!
            </h1>
            <p className="text-gray-600">
              Здесь вы можете отслеживать статус ваших проектов и просматривать историю сотрудничества
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <i className="fas fa-project-diagram text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Всего проектов</p>
                    <p className="text-2xl font-bold text-kerit-dark">
                      {projects?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 rounded-full p-3 mr-4">
                    <i className="fas fa-cogs text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">В работе</p>
                    <p className="text-2xl font-bold text-kerit-dark">
                      {projects?.filter(p => p.status === 'in_progress').length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <i className="fas fa-check-circle text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Завершено</p>
                    <p className="text-2xl font-bold text-kerit-dark">
                      {projects?.filter(p => p.status === 'completed').length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-kerit-light rounded-full p-3 mr-4">
                    <i className="fas fa-star text-kerit-dark text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Рейтинг</p>
                    <p className="text-2xl font-bold text-kerit-dark">5.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-tasks mr-3 text-kerit-sage"></i>
                Мои проекты
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-6">
                      <div className="loading-shimmer h-6 w-3/4 rounded mb-3"></div>
                      <div className="loading-shimmer h-4 w-full rounded mb-2"></div>
                      <div className="loading-shimmer h-4 w-2/3 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : projects && projects.length > 0 ? (
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold text-kerit-dark mr-3">
                              {project.title}
                            </h3>
                            <Badge className={getStatusColor(project.status)}>
                              <i className={`${getStatusIcon(project.status)} mr-1`}></i>
                              {getStatusText(project.status)}
                            </Badge>
                          </div>
                          {project.package?.service && (
                            <p className="text-sm text-kerit-sage mb-2">
                              Услуга: {project.package.service.name} ({project.package.name})
                            </p>
                          )}
                          <p className="text-gray-600 mb-3">{project.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Дата начала:</span>
                          <p className="text-gray-600">
                            {project.startDate ? new Date(project.startDate).toLocaleDateString('ru-RU') : 'Не указана'}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Планируемое завершение:</span>
                          <p className="text-gray-600">
                            {project.endDate ? new Date(project.endDate).toLocaleDateString('ru-RU') : 'Не указано'}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Создан:</span>
                          <p className="text-gray-600">
                            {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>

                      {project.notes && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                          <span className="font-medium text-gray-700 block mb-2">Заметки:</span>
                          <p className="text-gray-600">{project.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-folder-open text-6xl text-gray-300 mb-6"></i>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Проектов пока нет</h3>
                  <p className="text-gray-600 mb-6">
                    У вас еще нет активных проектов. Свяжитесь с нами для обсуждения нового проекта.
                  </p>
                  <a
                    href="/contact"
                    className="bg-kerit-sage hover:bg-opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Начать новый проект
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-plus text-2xl text-kerit-dark"></i>
                </div>
                <h3 className="text-lg font-semibold text-kerit-dark mb-2">Новый проект</h3>
                <p className="text-gray-600 text-sm">Обсудить новую задачу с нашей командой</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-headset text-2xl text-kerit-dark"></i>
                </div>
                <h3 className="text-lg font-semibold text-kerit-dark mb-2">Поддержка</h3>
                <p className="text-gray-600 text-sm">Связаться с технической поддержкой</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-file-alt text-2xl text-kerit-dark"></i>
                </div>
                <h3 className="text-lg font-semibold text-kerit-dark mb-2">Документы</h3>
                <p className="text-gray-600 text-sm">Договоры, отчеты и техническая документация</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
