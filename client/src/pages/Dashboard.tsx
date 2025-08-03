import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { usePageAnimation } from '@/hooks/usePageAnimation';
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
  const shouldAnimate = usePageAnimation('dashboard');

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/dashboard/projects'],
    enabled: isAuthenticated && user?.role === 'customer',
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: t('dashboard.auth_required'),
        description: t('dashboard.auth_message'),
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }

    if (!authLoading && isAuthenticated && user?.role !== 'customer') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the client dashboard.",
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
        return t('dashboard.status.planning');
      case 'in_progress':
        return t('dashboard.status.in_progress');
      case 'review':
        return t('dashboard.status.in_progress'); // Using in_progress for review
      case 'completed':
        return t('dashboard.status.completed');
      case 'cancelled':
        return t('dashboard.status.on_hold'); // Using on_hold for cancelled
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
          <h2 className="text-2xl font-bold text-kerit-dark mb-4">{t('dashboard.auth_required')}</h2>
          <p className="text-gray-600 mb-6">{t('dashboard.auth_message')}</p>
          <button 
            onClick={() => window.location.href = '/api/dev-login'}
            className="bg-kerit-sage text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {t('dashboard.login_button')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${t('dashboard.title')} - Kerit | ${t('dashboard.projects.title')}`}
        description={t('dashboard.subtitle')}
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kerit-dark mb-2">
              {t('dashboard.welcome')}, {user?.firstName || user?.email}!
            </h1>
            <p className="text-gray-600">
              {t('dashboard.subtitle')}
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
                    <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.total_projects')}</p>
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
                    <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.in_progress')}</p>
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
                    <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.completed')}</p>
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
                    <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.rating')}</p>
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
                {t('dashboard.projects.title')}
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
                              {t('dashboard.projects.service')}: {project.package.service.name} ({project.package.name})
                            </p>
                          )}
                          <p className="text-gray-600 mb-3">{project.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">{t('dashboard.projects.start_date')}:</span>
                          <p className="text-gray-600">
                            {project.startDate ? new Date(project.startDate).toLocaleDateString() : t('dashboard.projects.no_date')}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">{t('dashboard.projects.end_date')}:</span>
                          <p className="text-gray-600">
                            {project.endDate ? new Date(project.endDate).toLocaleDateString() : t('dashboard.projects.no_end_date')}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">{t('dashboard.projects.created')}:</span>
                          <p className="text-gray-600">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {project.notes && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                          <span className="font-medium text-gray-700 block mb-2">{t('dashboard.projects.notes')}:</span>
                          <p className="text-gray-600">{project.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-folder-open text-6xl text-gray-300 mb-6"></i>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('dashboard.projects.empty.title')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('dashboard.projects.empty.message')}
                  </p>
                  <a
                    href="/contact"
                    className="bg-kerit-sage hover:bg-opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    {t('dashboard.projects.empty.button')}
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
                <h3 className="text-lg font-semibold text-kerit-dark mb-2">{t('dashboard.actions.new_project')}</h3>
                <p className="text-gray-600 text-sm">{t('dashboard.actions.new_project_desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-headset text-2xl text-kerit-dark"></i>
                </div>
                <h3 className="text-lg font-semibold text-kerit-dark mb-2">{t('dashboard.actions.support')}</h3>
                <p className="text-gray-600 text-sm">{t('dashboard.actions.support_desc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-kerit-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-file-alt text-2xl text-kerit-dark"></i>
                </div>
                <h3 className="text-lg font-semibold text-kerit-dark mb-2">{t('dashboard.actions.documents')}</h3>
                <p className="text-gray-600 text-sm">{t('dashboard.actions.documents_desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
