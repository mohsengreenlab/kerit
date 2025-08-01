import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";

// Pages
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import About from "@/pages/About";
import WhoWeAre from "@/pages/WhoWeAre";
import Services from "@/pages/Services";
import CaseStudies from "@/pages/CaseStudies";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Pricing from "@/pages/Pricing";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import TestForms from "@/pages/TestForms";
import NotFound from "@/pages/not-found";
import CaseStudyDetail from "@/pages/CaseStudyDetail";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kerit-sage"></div>
      </div>
    );
  }

  return (
    <Layout>
      <Switch>
        {/* Public routes */}
        <Route path="/" component={Landing} />
        <Route path="/about" component={About} />
        <Route path="/who-we-are" component={WhoWeAre} />
        <Route path="/services" component={Services} />
        <Route path="/case-studies" component={CaseStudies} />
        <Route path="/case-studies/:slug" component={CaseStudyDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/pricing" component={Pricing} />
        
        {/* Protected routes */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/admin24" component={Admin} />
        
        {/* Test route */}
        <Route path="/test-forms" component={TestForms} />
        
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
