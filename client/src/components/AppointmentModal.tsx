import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const appointmentSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().optional(),
  preferredTime: z.string().min(1, 'Выберите предпочтительное время'),
  message: z.string().optional(),
});

type AppointmentForm = z.infer<typeof appointmentSchema>;

interface AppointmentModalProps {
  onClose: () => void;
}

export function AppointmentModal({ onClose }: AppointmentModalProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AppointmentForm>({
    resolver: zodResolver(appointmentSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: AppointmentForm) => {
      await apiRequest('POST', '/api/contact', {
        ...data,
        subject: 'Запрос на консультацию',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Заявка отправлена!',
        description: 'Мы свяжемся с вами в ближайшее время.',
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте еще раз.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: AppointmentForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-kerit-dark">Записаться на консультацию</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
              Имя *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ваше имя"
              className="w-full"
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
              className="w-full"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
              Телефон
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              className="w-full"
              {...register('phone')}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Предпочтительное время *
            </Label>
            <Select onValueChange={(value) => setValue('preferredTime', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите время" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Утром (9:00-12:00)</SelectItem>
                <SelectItem value="afternoon">Днем (12:00-15:00)</SelectItem>
                <SelectItem value="evening">Вечером (15:00-18:00)</SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredTime && (
              <p className="text-sm text-red-600 mt-1">{errors.preferredTime.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
              Комментарий
            </Label>
            <Textarea
              id="message"
              placeholder="Расскажите о ваших задачах"
              rows={3}
              className="w-full"
              {...register('message')}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-kerit-yellow hover:bg-yellow-400 text-kerit-dark font-semibold py-3"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Отправка...' : 'Записаться на консультацию'}
          </Button>
        </form>
      </div>
    </div>
  );
}
