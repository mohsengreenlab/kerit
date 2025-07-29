import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { isUnauthorizedError } from '@/lib/authUtils';
import { apiRequest } from '@/lib/queryClient';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface BookingConsultation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  preferredDate?: string;
  message?: string;
  status: string;
  isRead: boolean;
  createdAt: string;
}

export default function Admin() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('messages');

  // Redirect to home if not authenticated as admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      toast({
        title: "Access Denied",
        description: "Admin access required. Redirecting to admin login...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/dev-admin-login";
      }, 1000);
      return;
    }
  }, [isAuthenticated, authLoading, user, toast]);

  const { data: messages, isLoading: messagesLoading } = useQuery<ContactMessage[]>({
    queryKey: ['/api/admin/contact-messages'],
    enabled: user?.role === 'admin',
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery<BookingConsultation[]>({
    queryKey: ['/api/admin/booking-consultations'],
    enabled: user?.role === 'admin',
  });

  const markAsReadMutation = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: 'message' | 'booking' }) => {
      await apiRequest(`/api/admin/${type === 'message' ? 'contact-messages' : 'booking-consultations'}/${id}/mark-read`, {
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-messages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/booking-consultations'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/dev-admin-login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to mark as read",
        variant: "destructive",
      });
    },
  });

  const updateBookingStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest(`/api/admin/booking-consultations/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/booking-consultations'] });
      toast({
        title: "Success",
        description: "Booking status updated",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/dev-admin-login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    },
  });

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

  const unreadMessages = messages?.filter(m => !m.isRead).length || 0;
  const unreadBookings = bookings?.filter(b => !b.isRead).length || 0;
  const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;

  return (
    <>
      <SEOHead
        title="Admin Dashboard - Kerit | Messages & Bookings"
        description="Admin dashboard for managing visitor messages and consultation bookings."
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kerit-dark mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage visitor messages and consultation bookings
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <i className="fas fa-envelope text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Messages</p>
                    <p className="text-2xl font-bold text-kerit-dark">
                      {messages?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-red-100 rounded-full p-3 mr-4">
                    <i className="fas fa-envelope-open text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                    <p className="text-2xl font-bold text-kerit-dark">
                      {unreadMessages}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <i className="fas fa-calendar text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-kerit-dark">
                      {bookings?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 rounded-full p-3 mr-4">
                    <i className="fas fa-clock text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                    <p className="text-2xl font-bold text-kerit-dark">
                      {pendingBookings}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="messages" className="relative">
                Contact Messages
                {unreadMessages > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs">
                    {unreadMessages}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="bookings" className="relative">
                Consultation Bookings
                {unreadBookings > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs">
                    {unreadBookings}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-envelope mr-3 text-kerit-sage"></i>
                    Contact Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {messagesLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-6">
                          <div className="loading-shimmer h-6 w-3/4 rounded mb-3"></div>
                          <div className="loading-shimmer h-4 w-full rounded mb-2"></div>
                          <div className="loading-shimmer h-4 w-2/3 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : messages && messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`border rounded-lg p-6 transition-colors ${
                            !message.isRead ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-kerit-dark">
                                  {message.subject}
                                </h3>
                                {!message.isRead && (
                                  <Badge className="bg-red-500 text-white">New</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                <strong>From:</strong> {message.name} ({message.email})
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(message.createdAt).toLocaleString()}
                              </p>
                            </div>
                            {!message.isRead && (
                              <Button
                                size="sm"
                                onClick={() => markAsReadMutation.mutate({ id: message.id, type: 'message' })}
                                disabled={markAsReadMutation.isPending}
                              >
                                Mark as Read
                              </Button>
                            )}
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <i className="fas fa-envelope text-6xl text-gray-300 mb-6"></i>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Messages Yet</h3>
                      <p className="text-gray-600">
                        Contact messages from visitors will appear here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-calendar mr-3 text-kerit-sage"></i>
                    Consultation Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookingsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-6">
                          <div className="loading-shimmer h-6 w-3/4 rounded mb-3"></div>
                          <div className="loading-shimmer h-4 w-full rounded mb-2"></div>
                          <div className="loading-shimmer h-4 w-2/3 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : bookings && bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div 
                          key={booking.id} 
                          className={`border rounded-lg p-6 transition-colors ${
                            !booking.isRead ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-kerit-dark">
                                  {booking.service} Consultation
                                </h3>
                                {!booking.isRead && (
                                  <Badge className="bg-red-500 text-white">New</Badge>
                                )}
                                <Badge 
                                  className={`${
                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {booking.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                <strong>Client:</strong> {booking.name} ({booking.email})
                              </p>
                              {booking.phone && (
                                <p className="text-sm text-gray-600 mb-1">
                                  <strong>Phone:</strong> {booking.phone}
                                </p>
                              )}
                              {booking.company && (
                                <p className="text-sm text-gray-600 mb-1">
                                  <strong>Company:</strong> {booking.company}
                                </p>
                              )}
                              {booking.preferredDate && (
                                <p className="text-sm text-gray-600 mb-1">
                                  <strong>Preferred Date:</strong> {new Date(booking.preferredDate).toLocaleString()}
                                </p>
                              )}
                              <p className="text-sm text-gray-500">
                                <strong>Booked:</strong> {new Date(booking.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {!booking.isRead && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => markAsReadMutation.mutate({ id: booking.id, type: 'booking' })}
                                  disabled={markAsReadMutation.isPending}
                                >
                                  Mark as Read
                                </Button>
                              )}
                              {booking.status === 'pending' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateBookingStatusMutation.mutate({ id: booking.id, status: 'confirmed' })}
                                  disabled={updateBookingStatusMutation.isPending}
                                >
                                  Confirm
                                </Button>
                              )}
                            </div>
                          </div>
                          {booking.message && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">Additional Message:</p>
                              <p className="text-gray-700 whitespace-pre-wrap">{booking.message}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <i className="fas fa-calendar text-6xl text-gray-300 mb-6"></i>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
                      <p className="text-gray-600">
                        Consultation bookings from visitors will appear here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}