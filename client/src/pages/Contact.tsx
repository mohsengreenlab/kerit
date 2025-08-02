import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/hooks/useLanguage';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const getContactSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('validation.name_min')),
  email: z.string().email(t('validation.email_invalid')),
  phone: z.string().optional(),
  subject: z.string().min(5, t('validation.subject_min')),
  message: z.string().min(10, t('validation.message_min')),
  preferredTime: z.string().optional(),
});

const getBookingSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('validation.name_min')),
  email: z.string().email(t('validation.email_invalid')),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, t('validation.service_required')),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);

  const contactSchema = getContactSchema(t);
  const bookingSchema = getBookingSchema(t);
  type ContactForm = z.infer<typeof contactSchema>;
  type BookingForm = z.infer<typeof bookingSchema>;

  const {
    register: registerContact,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors },
    setValue: setContactValue,
    reset: resetContact,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const {
    register: registerBooking,
    handleSubmit: handleBookingSubmit,
    formState: { errors: bookingErrors },
    setValue: setBookingValue,
    reset: resetBooking,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      await apiRequest('POST', '/api/contact-message', data);
    },
    onSuccess: () => {
      setIsContactSubmitted(true);
      resetContact();
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
    },
    onError: (error) => {
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.description'),
        variant: 'destructive',
      });
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const submissionData = {
        ...data,
        preferredDate: data.preferredDate ? new Date(data.preferredDate).toISOString() : null
      };
      await apiRequest('POST', '/api/booking-consultation', submissionData);
    },
    onSuccess: () => {
      setIsBookingSubmitted(true);
      resetBooking();
      toast({
        title: t('appointment.success.title'),
        description: t('appointment.success.description'),
      });
    },
    onError: (error) => {
      toast({
        title: t('appointment.error.title'), 
        description: t('appointment.error.description'),
        variant: 'destructive',
      });
    },
  });

  const onContactSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const onBookingSubmit = (data: BookingForm) => {
    bookingMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: t('contact.info.email'),
      value: 'info@kerit.com.ru',
      link: 'mailto:info@kerit.com.ru'
    },
    {
      icon: 'fas fa-phone',
      title: t('contact.info.phone'),
      value: '+7 (999) 123-45-67',
      link: 'tel:+79991234567'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: t('contact.info.address'),
      value: 'Москва, Россия',
      link: null
    },
    {
      icon: 'fas fa-clock',
      title: t('contact.info.hours'),
      value: 'Пн-Пт: 9:00-18:00',
      link: null
    }
  ];

  const services = [
    t('services.email_marketing'),
    t('services.chatbot_dev'),
    t('services.performance_opt'),
    t('services.it_strategy'),
    t('services.other')
  ];

  return (
    <>
      <SEOHead
        title={`${t('contact.title')} - Kerit`}
        description={t('contact.subtitle')}
        keywords="контакты, связаться, консультация, email, телефон, IT консалтинг"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact & Booking Forms */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="contact">{t('contact.form.title')}</TabsTrigger>
                  <TabsTrigger value="booking">{t('appointment.title')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact" className="space-y-6">
                  <h2 className="text-3xl font-bold text-kerit-dark">
                    {t('contact.form.title')}
                  </h2>
                  
                  {isContactSubmitted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                        <div>
                          <h3 className="font-semibold text-green-800">{t('contact.success.title')}</h3>
                          <p className="text-green-700 text-sm">{t('contact.success.description')}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
                          {t('contact.form.name')} *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder={t('contact.form.name')}
                          {...registerContact('name')}
                        />
                        {contactErrors.name && (
                          <p className="text-sm text-red-600 mt-1">{contactErrors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                          {t('contact.form.email')} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          {...registerContact('email')}
                        />
                        {contactErrors.email && (
                          <p className="text-sm text-red-600 mt-1">{contactErrors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.subject')} *
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder={t('contact.form.subject')}
                        {...registerContact('subject')}
                      />
                      {contactErrors.subject && (
                        <p className="text-sm text-red-600 mt-1">{contactErrors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.message')} *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={t('contact.form.message_placeholder')}
                        rows={5}
                        {...registerContact('message')}
                      />
                      {contactErrors.message && (
                        <p className="text-sm text-red-600 mt-1">{contactErrors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold py-3"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>
                          {t('contact.form.submit')}
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="booking" className="space-y-6">
                  <h2 className="text-3xl font-bold text-kerit-dark">
                    {t('appointment.title')}
                  </h2>
                  
                  {isBookingSubmitted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                        <div>
                          <h3 className="font-semibold text-green-800">{t('appointment.success.title')}</h3>
                          <p className="text-green-700 text-sm">{t('appointment.success.description')}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleBookingSubmit(onBookingSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="booking-name" className="text-sm font-medium text-gray-700 mb-2">
                          {t('contact.form.name')} *
                        </Label>
                        <Input
                          id="booking-name"
                          type="text"
                          placeholder={t('contact.form.name')}
                          {...registerBooking('name')}
                        />
                        {bookingErrors.name && (
                          <p className="text-sm text-red-600 mt-1">{bookingErrors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="booking-email" className="text-sm font-medium text-gray-700 mb-2">
                          {t('contact.form.email')} *
                        </Label>
                        <Input
                          id="booking-email"
                          type="email"
                          placeholder="email@example.com"
                          {...registerBooking('email')}
                        />
                        {bookingErrors.email && (
                          <p className="text-sm text-red-600 mt-1">{bookingErrors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="booking-phone" className="text-sm font-medium text-gray-700 mb-2">
                          {t('contact.form.phone')}
                        </Label>
                        <Input
                          id="booking-phone"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          {...registerBooking('phone')}
                        />
                      </div>

                      <div>
                        <Label htmlFor="booking-company" className="text-sm font-medium text-gray-700 mb-2">
                          {t('contact.form.company')}
                        </Label>
                        <Input
                          id="booking-company"
                          type="text"
                          placeholder={t('contact.form.company_placeholder')}
                          {...registerBooking('company')}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.service')} *
                      </Label>
                      <Select onValueChange={(value) => setBookingValue('service', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('contact.form.select_service')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email-marketing">{t('services.email_marketing')}</SelectItem>
                          <SelectItem value="customer-chatbot">{t('services.chatbot_dev')}</SelectItem>
                          <SelectItem value="performance-improvement">{t('services.performance_opt')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {bookingErrors.service && (
                        <p className="text-sm text-red-600 mt-1">{bookingErrors.service.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="booking-date" className="text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.preferred_date')}
                      </Label>
                      <Input
                        id="booking-date"
                        type="datetime-local"
                        {...registerBooking('preferredDate')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="booking-message" className="text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.additional_message')}
                      </Label>
                      <Textarea
                        id="booking-message"
                        placeholder={t('contact.form.additional_message_placeholder')}
                        rows={3}
                        {...registerBooking('message')}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-kerit-sage hover:bg-kerit-sage/90 text-white font-semibold py-3"
                      disabled={bookingMutation.isPending}
                    >
                      {bookingMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          {t('contact.form.booking')}
                        </>
                      ) : (
                        <>
                          <i className="fas fa-calendar mr-2"></i>
                          {t('contact.form.book_consultation')}
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-kerit-dark mb-6">
                  {t('contact.info.title')}
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-kerit-light rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <i className={`${info.icon} text-kerit-dark text-lg`}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-kerit-dark mb-1">{info.title}</h3>
                        {info.link ? (
                          <a href={info.link} className="text-kerit-sage hover:text-kerit-dark transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-kerit-dark rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('contact.consultation.title')}</h3>
                <p className="text-kerit-light mb-6">
                  {t('contact.consultation.desc')}
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-kerit-yellow mr-3"></i>
                    {t('contact.consultation.item1')}
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-kerit-yellow mr-3"></i>
                    {t('contact.consultation.item2')}
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-kerit-yellow mr-3"></i>
                    {t('contact.consultation.item3')}
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-kerit-yellow mr-3"></i>
                    {t('contact.consultation.item4')}
                  </li>
                </ul>
                <div className="bg-kerit-yellow text-kerit-dark rounded-lg p-4 text-center font-semibold">
                  {t('contact.consultation.free')}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-kerit-dark mb-4">FAQ</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">{t('contact.faq.q1')}</h4>
                    <p className="text-gray-600 text-sm">{t('contact.faq.a1')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">{t('contact.faq.q2')}</h4>
                    <p className="text-gray-600 text-sm">{t('contact.faq.a2')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">{t('contact.faq.q3')}</h4>
                    <p className="text-gray-600 text-sm">{t('contact.faq.a3')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
