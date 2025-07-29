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

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Тема должна содержать минимум 5 символов'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
  preferredTime: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        title: 'Сообщение отправлено!',
        description: 'Мы свяжемся с вами в ближайшее время.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить сообщение. Попробуйте еще раз.',
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
      title: 'Email',
      value: 'hello@kerit.com',
      link: 'mailto:hello@kerit.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Телефон',
      value: '+7 (999) 123-45-67',
      link: 'tel:+79991234567'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Адрес',
      value: 'Москва, Россия',
      link: null
    },
    {
      icon: 'fas fa-clock',
      title: 'Режим работы',
      value: 'Пн-Пт: 9:00-18:00',
      link: null
    }
  ];

  const services = [
    'Email-маркетинг',
    'Разработка чат-ботов',
    'Оптимизация производительности',
    'Консультация по IT-стратегии',
    'Другое'
  ];

  return (
    <>
      <SEOHead
        title="Контакты - Kerit | Свяжитесь с нами"
        description="Свяжитесь с командой Kerit для обсуждения вашего IT-проекта. Email: hello@kerit.com, телефон: +7 (999) 123-45-67. Бесплатная консультация."
        keywords="контакты, связаться, консультация, email, телефон, IT консалтинг"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-kerit-light to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-kerit-dark mb-6">
            {t('nav.contact')}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Готовы обсудить ваш проект? Свяжитесь с нашей командой экспертов для получения бесплатной консультации
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-kerit-dark mb-6">
                Напишите нам
              </h2>
              
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                    <div>
                      <h3 className="font-semibold text-green-800">Сообщение отправлено!</h3>
                      <p className="text-green-700 text-sm">Мы свяжемся с вами в течение 24 часов.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ваше имя"
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
                      Телефон
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
                      Интересующая услуга
                    </Label>
                    <Select onValueChange={(value) => setValue('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
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
                    Тема обращения *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Кратко опишите вашу задачу"
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                    Сообщение *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Расскажите подробнее о вашем проекте, задачах и ожиданиях"
                    rows={5}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Предпочтительное время для связи
                  </Label>
                  <Select onValueChange={(value) => setValue('preferredTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Утром (9:00-12:00)</SelectItem>
                      <SelectItem value="afternoon">Днем (12:00-15:00)</SelectItem>
                      <SelectItem value="evening">Вечером (15:00-18:00)</SelectItem>
                      <SelectItem value="anytime">В любое время</SelectItem>
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
                      Отправка...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Отправить сообщение
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-kerit-dark mb-6">
                  Контактная информация
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
                <h3 className="text-2xl font-bold mb-4">Бесплатная консультация</h3>
                <p className="text-kerit-light mb-6">
                  Получите персональные рекомендации по развитию вашего IT-проекта от наших экспертов
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-kerit-yellow mr-3"></i>
                    Анализ текущей ситуации
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-kerit-yellow mr-3"></i>
                    Рекомендации по улучшению
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-kerit-yellow mr-3"></i>
                    Оценка бюджета и сроков
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-kerit-yellow mr-3"></i>
                    План реализации проекта
                  </li>
                </ul>
                <div className="bg-kerit-yellow text-kerit-dark rounded-lg p-4 text-center font-semibold">
                  Консультация совершенно бесплатна!
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-kerit-dark mb-4">FAQ</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">Как быстро вы отвечаете?</h4>
                    <p className="text-gray-600 text-sm">Мы отвечаем в течение 2-4 часов в рабочее время.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">Сколько стоит консультация?</h4>
                    <p className="text-gray-600 text-sm">Первичная консультация всегда бесплатна.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-kerit-dark mb-2">Работаете ли с небольшими проектами?</h4>
                    <p className="text-gray-600 text-sm">Да, мы работаем с проектами любого масштаба.</p>
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
