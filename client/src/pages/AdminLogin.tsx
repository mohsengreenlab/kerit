
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = async () => {
    try {
      const response = await fetch('/api/admin-captcha');
      const data = await response.json();
      setCaptchaQuestion(data.question);
    } catch (error) {
      console.error('Failed to generate captcha:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiRequest('POST', '/api/admin-login', { username, password, captcha });
      
      toast({
        title: "Login Successful",
        description: "Welcome to admin dashboard",
      });
      
      setLocation('/admin24');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials or captcha",
        variant: "destructive",
      });
      generateCaptcha(); // Generate new captcha on failed attempt
      setCaptcha('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-kerit-dark">Admin Login</CardTitle>
          <CardDescription>Enter admin credentials to access dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="captcha">Security Check: {captchaQuestion}</Label>
              <Input
                id="captcha"
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Enter the answer"
                required
                className="mt-1"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-kerit-sage hover:bg-kerit-dark"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Logging in...
                </>
              ) : (
                'Login to Admin Panel'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
