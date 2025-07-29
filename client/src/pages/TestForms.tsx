import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiRequest } from '@/lib/queryClient';

export default function TestForms() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    preferredDate: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/contact-message', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Contact message sent successfully!",
      });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/booking-consultation', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Consultation booking submitted successfully!",
      });
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        preferredDate: '',
        message: ''
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to book consultation",
        variant: "destructive",
      });
    },
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(contactForm);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...bookingForm,
      preferredDate: bookingForm.preferredDate ? new Date(bookingForm.preferredDate).toISOString() : null
    };
    bookingMutation.mutate(submissionData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-kerit-dark mb-2">
            Test Forms
          </h1>
          <p className="text-gray-600">
            Test contact messages and booking consultations functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Message Form */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Message Test</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                />
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full"
                >
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Consultation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Consultation Booking Test</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                />
                <Input
                  placeholder="Company Name"
                  value={bookingForm.company}
                  onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                />
                <Select
                  value={bookingForm.service}
                  onValueChange={(value) => setBookingForm({ ...bookingForm, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email-marketing">Email Marketing</SelectItem>
                    <SelectItem value="customer-chatbot">Customer Chatbot</SelectItem>
                    <SelectItem value="performance-improvement">Performance Improvement</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="datetime-local"
                  placeholder="Preferred Date & Time"
                  value={bookingForm.preferredDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                />
                <Textarea
                  placeholder="Additional Message (Optional)"
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  rows={3}
                />
                <Button 
                  type="submit" 
                  disabled={bookingMutation.isPending}
                  className="w-full"
                >
                  {bookingMutation.isPending ? 'Booking...' : 'Book Consultation'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            After submitting forms, check the admin dashboard at:
          </p>
          <a 
            href="/admin24" 
            className="inline-flex items-center px-4 py-2 bg-kerit-sage text-white rounded-lg hover:bg-kerit-sage/90 transition-colors"
          >
            Go to Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}