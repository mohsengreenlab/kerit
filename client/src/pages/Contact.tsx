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

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactSchema = getContactSchema(t);
  type ContactForm = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
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

  const onSubmit = (data: ContactForm) => {
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: t('contact.info.email'),
      value: 'hello@kerit.com',
      link: 'mailto:hello@kerit.com'
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
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-kerit-dark mb-6">
                {t('contact.form.title')}
              </h2>
              
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                    <div>
                      <h3 className="font-semibold text-green-800">{t('contact.success.title')}</h3>
                      <p className="text-green-700 text-sm">{t('contact.success.description')}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')} *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('contact.form.name')}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.phone')}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      {...register('phone')}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.service')}
                    </Label>
                    <Select onValueChange={(value) => setValue('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('contact.form.service')} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service, index) => (
                          <SelectItem key={index} value={service}>{service}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
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
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.preferred_time')}
                  </Label>
                  <Select onValueChange={(value) => setValue('preferredTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('contact.form.time_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">{t('time.morning')}</SelectItem>
                      <SelectItem value="afternoon">{t('time.afternoon')}</SelectItem>
                      <SelectItem value="evening">{t('time.evening')}</SelectItem>
                      <SelectItem value="anytime">{t('time.anytime')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold py-3"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
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
