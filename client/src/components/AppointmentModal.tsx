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
import { useLanguage } from '@/hooks/useLanguage';

const getAppointmentSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('validation.name_min')),
  email: z.string().email(t('validation.email_invalid')),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

interface AppointmentModalProps {
  onClose: () => void;
}

export function AppointmentModal({ onClose }: AppointmentModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const appointmentSchema = getAppointmentSchema(t);
  type AppointmentForm = z.infer<typeof appointmentSchema>;
  
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
      const submissionData = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        service: data.service || 'General Consultation',
        preferredDate: data.preferredDate ? new Date(data.preferredDate).toISOString() : null,
        message: data.message || 'Consultation request from appointment modal',
      };
      await apiRequest('POST', '/api/booking-consultation', submissionData);
    },
    onSuccess: () => {
      toast({
        title: "Consultation Booked Successfully!",
        description: "Thank you for booking a consultation. We'll contact you soon to confirm the details.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to book consultation. Please try again.",
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: AppointmentForm) => {
    mutation.mutate(data);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-kerit-dark">{t('appointment.title')}</h3>
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
              {t('contact.form.name')} *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={t('contact.form.name')}
              className="w-full"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
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
              className="w-full"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
              {t('contact.form.phone')}
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
            <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2">
              Company
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Company Name"
              className="w-full"
              {...register('company')}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Service
            </Label>
            <Select onValueChange={(value) => setValue('service', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email-marketing">Email Marketing</SelectItem>
                <SelectItem value="customer-chatbot">Customer Chatbot</SelectItem>
                <SelectItem value="performance-improvement">Performance Improvement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="preferredDate" className="text-sm font-medium text-gray-700 mb-2">
              Preferred Date & Time
            </Label>
            <Input
              id="preferredDate"
              type="datetime-local"
              className="w-full"
              {...register('preferredDate')}
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
              {t('contact.form.message')}
            </Label>
            <Textarea
              id="message"
              placeholder={t('contact.form.message_placeholder')}
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
            {mutation.isPending ? t('contact.form.sending') : t('appointment.title')}
          </Button>
        </form>
      </div>
    </div>
  );
}
