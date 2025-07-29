import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertContactSubmissionSchema, insertBlogPostSchema, insertCaseStudySchema } from "@shared/schema";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Development login endpoint (temporary)
  app.get('/api/dev-login', (req, res) => {
    // Mock user session for development
    (req as any).session.user = {
      id: 'dev-user-123',
      email: 'dev@kerit.com',
      firstName: 'Development',
      lastName: 'User',
      role: 'customer'
    };
    res.redirect('/');
  });

  // Auth routes - allow public access, return null if not authenticated
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check for development session first
      if (req.session?.user) {
        return res.json(req.session.user);
      }
      
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.json(null);
      }
      
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.json(null); // Return null instead of error for public access
    }
  });

  // Public content routes
  app.get('/api/pages/:slug', async (req, res) => {
    try {
      const page = await storage.getPage(req.params.slug);
      if (!page || !page.isPublished) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      console.error("Error fetching page:", error);
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  app.get('/api/blog/:category?', async (req, res) => {
    try {
      const { category } = req.params;
      let posts;
      if (category && category !== 'undefined') {
        posts = await storage.getBlogPostsByCategory(category as string);
      } else {
        posts = await storage.getAllBlogPosts(true);
      }
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post || !post.isPublished) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get('/api/case-studies/:service?', async (req, res) => {
    try {
      const { service } = req.params;
      let caseStudies;
      if (service && service !== 'undefined') {
        caseStudies = await storage.getCaseStudiesByService(service as string);
      } else {
        caseStudies = await storage.getAllCaseStudies(true);
      }
      res.json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({ message: "Failed to fetch case studies" });
    }
  });

  app.get('/api/case-studies/:slug', async (req, res) => {
    try {
      const caseStudy = await storage.getCaseStudy(req.params.slug);
      if (!caseStudy || !caseStudy.isPublished) {
        return res.status(404).json({ message: "Case study not found" });
      }
      res.json(caseStudy);
    } catch (error) {
      console.error("Error fetching case study:", error);
      res.status(500).json({ message: "Failed to fetch case study" });
    }
  });

  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getAllServices(true);
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get('/api/services/:slug', async (req, res) => {
    try {
      const service = await storage.getService(req.params.slug);
      if (!service || !service.isActive) {
        return res.status(404).json({ message: "Service not found" });
      }
      const packages = await storage.getServicePackages(service.id);
      res.json({ ...service, packages });
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.get('/api/pricing', async (req, res) => {
    try {
      const services = await storage.getAllServices(true);
      const servicesWithPackages = await Promise.all(
        services.map(async (service) => {
          const packages = await storage.getServicePackages(service.id);
          return { ...service, packages };
        })
      );
      res.json(servicesWithPackages);
    } catch (error) {
      console.error("Error fetching pricing:", error);
      res.status(500).json({ message: "Failed to fetch pricing" });
    }
  });

  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ message: "Contact form submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(400).json({ message: "Invalid form data" });
    }
  });

  // Analytics tracking
  app.post('/api/analytics/track', async (req, res) => {
    try {
      const { path, title } = req.body;
      const sessionId = req.headers['x-session-id'] as string || crypto.randomUUID();
      const ipAddress = req.ip;
      const userAgent = req.headers['user-agent'];
      const referrer = req.headers.referer;

      // Track visitor
      const visitor = await storage.trackVisitor(sessionId, ipAddress, userAgent, referrer);
      
      // Track page view
      await storage.trackPageView(visitor.id, path, title);

      res.json({ sessionId, visitorId: visitor.id });
    } catch (error) {
      console.error("Error tracking analytics:", error);
      res.status(500).json({ message: "Failed to track analytics" });
    }
  });

  // Translations
  app.get('/api/translations/:locale', async (req, res) => {
    try {
      const translations = await storage.getTranslationsByLocale(req.params.locale);
      const translationMap = translations.reduce((acc, t) => {
        acc[t.key] = t.value;
        return acc;
      }, {} as Record<string, string>);
      res.json(translationMap);
    } catch (error) {
      console.error("Error fetching translations:", error);
      res.status(500).json({ message: "Failed to fetch translations" });
    }
  });

  // Protected customer routes
  app.get('/api/dashboard/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'customer') {
        return res.status(403).json({ message: "Access denied" });
      }

      const projects = await storage.getProjectsByCustomer(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching customer projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Protected admin routes
  const adminAuth = async (req: any, res: any, next: any) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      next();
    } catch (error) {
      return res.status(403).json({ message: "Access denied" });
    }
  };

  // Admin analytics
  app.get('/api/admin/analytics', isAuthenticated, adminAuth, async (req, res) => {
    try {
      const stats = await storage.getVisitorStats();
      const popularPages = await storage.getPopularPages(10);
      res.json({ stats, popularPages });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Admin content management
  app.get('/api/admin/pages', isAuthenticated, adminAuth, async (req, res) => {
    try {
      const pages = await storage.getAllPages();
      res.json(pages);
    } catch (error) {
      console.error("Error fetching pages:", error);
      res.status(500).json({ message: "Failed to fetch pages" });
    }
  });

  app.get('/api/admin/blog', isAuthenticated, adminAuth, async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post('/api/admin/blog', isAuthenticated, adminAuth, async (req: any, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: req.user.claims.sub,
      });
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.get('/api/admin/case-studies', isAuthenticated, adminAuth, async (req, res) => {
    try {
      const caseStudies = await storage.getAllCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({ message: "Failed to fetch case studies" });
    }
  });

  app.post('/api/admin/case-studies', isAuthenticated, adminAuth, async (req, res) => {
    try {
      const validatedData = insertCaseStudySchema.parse(req.body);
      const caseStudy = await storage.createCaseStudy(validatedData);
      res.json(caseStudy);
    } catch (error) {
      console.error("Error creating case study:", error);
      res.status(400).json({ message: "Invalid case study data" });
    }
  });

  app.get('/api/admin/contact-submissions', isAuthenticated, adminAuth, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.patch('/api/admin/contact-submissions/:id/read', isAuthenticated, adminAuth, async (req, res) => {
    try {
      await storage.markContactSubmissionAsRead(req.params.id);
      res.json({ message: "Marked as read" });
    } catch (error) {
      console.error("Error marking submission as read:", error);
      res.status(500).json({ message: "Failed to update submission" });
    }
  });

  app.get('/api/admin/projects', isAuthenticated, adminAuth, async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
