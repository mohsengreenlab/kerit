import { storage } from "./storage";

export async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // First check if data already exists to avoid duplicates
    const existingServices = await storage.getAllServices();
    if (existingServices.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    // Create admin user first for blog posts
    const adminUser = await storage.upsertUser({
      id: "admin",
      email: "admin@kerit.com",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    });

    // Create services
    const emailMarketingService = await storage.createService({
      name: "Email Marketing Automation",
      slug: "email-marketing",
      description: "Comprehensive email marketing solutions with automation, segmentation, and analytics",
      features: ["Campaign Creation", "A/B Testing", "Automation Workflows", "Customer Segmentation", "Analytics & Reporting"],
      isActive: true,
    });

    const chatbotService = await storage.createService({
      name: "Customer Chatbots",
      slug: "chatbots",
      description: "AI-powered chatbots for 24/7 customer support and engagement",
      features: ["24/7 Support", "AI Integration", "Lead Qualification", "CRM Integration", "Multi-language Support"],
      isActive: true,
    });

    const performanceService = await storage.createService({
      name: "Performance Improvement",
      slug: "performance-improvement",
      description: "System optimization and performance enhancement services",
      features: ["System Audits", "Database Optimization", "Code Review", "Performance Monitoring", "Scalability Planning"],
      isActive: true,
    });

    // Create service packages
    await storage.createServicePackage({
      serviceId: emailMarketingService.id,
      name: "Starter",
      type: "basic",
      description: "Perfect for small businesses starting with email marketing",
      price: 29900, // in cents
      currency: "USD",
      features: ["Up to 5,000 contacts", "Basic templates", "Email support"],
      isActive: true,
    });

    await storage.createServicePackage({
      serviceId: emailMarketingService.id,
      name: "Professional",
      type: "pro",
      description: "Advanced features for growing businesses",
      price: 59900, // in cents
      currency: "USD",
      features: ["Up to 25,000 contacts", "Advanced automation", "A/B testing", "Priority support"],
      isActive: true,
    });

    await storage.createServicePackage({
      serviceId: chatbotService.id,
      name: "Basic Bot",
      type: "basic",
      description: "Simple chatbot for basic customer support",
      price: 19900, // in cents
      currency: "USD",
      features: ["FAQ responses", "Basic lead capture", "Email integration"],
      isActive: true,
    });

    await storage.createServicePackage({
      serviceId: performanceService.id,
      name: "Performance Audit",
      type: "enterprise",
      description: "Comprehensive system performance analysis",
      price: 99900, // in cents
      currency: "USD",
      features: ["Full system audit", "Performance report", "Optimization recommendations"],
      isActive: true,
    });

    // Create blog posts
    await storage.createBlogPost({
      title: "The Future of Email Marketing in 2024",
      slug: "future-email-marketing-2024",
      excerpt: "Discover the latest trends and technologies shaping email marketing",
      content: "Email marketing continues to evolve with AI-powered personalization, interactive content, and advanced automation workflows...",
      category: "Email Marketing",
      tags: ["Email Marketing", "AI", "Automation"],
      authorId: adminUser.id,
      isPublished: true,
    });

    await storage.createBlogPost({
      title: "Building Effective Customer Chatbots",
      slug: "building-effective-chatbots",
      excerpt: "Learn how to create chatbots that actually help your customers",
      content: "Effective chatbots require careful planning, natural language processing, and continuous optimization...",
      category: "Chatbots",
      tags: ["Chatbots", "AI", "Customer Service"],
      authorId: adminUser.id,
      isPublished: true,
    });

    // Create case studies
    await storage.createCaseStudy({
      title: "TechCorp Email Campaign Success",
      slug: "techcorp-email-success",
      content: "TechCorp Ltd faced challenges with low email engagement rates and poor conversion. We implemented advanced segmentation and personalized automation workflows, resulting in significant improvements.",
      excerpt: "How we helped TechCorp achieve 300% increase in email engagement",
      clientName: "TechCorp Ltd",
      results: "300% increase in open rates, 250% increase in click-through rates",
      serviceType: "email-marketing",
      isPublished: true,
    });

    await storage.createCaseStudy({
      title: "RetailMax Chatbot Implementation",
      slug: "retailmax-chatbot-implementation",
      content: "RetailMax Store had high customer service costs and long response times. We deployed an AI-powered chatbot with product recommendations, delivering immediate results.",
      excerpt: "How we reduced RetailMax support tickets by 60% with AI chatbots",
      clientName: "RetailMax Store",
      results: "60% reduction in support tickets, 24/7 customer assistance",
      serviceType: "customer-chatbot",
      isPublished: true,
    });

    // Create translations
    const translations = [
      // Navigation
      { key: "nav.home", locale: "en", value: "Home" },
      { key: "nav.home", locale: "ru", value: "Главная" },
      { key: "nav.about", locale: "en", value: "About" },
      { key: "nav.about", locale: "ru", value: "О нас" },
      { key: "nav.services", locale: "en", value: "Services" },
      { key: "nav.services", locale: "ru", value: "Услуги" },
      { key: "nav.caseStudies", locale: "en", value: "Case Studies" },
      { key: "nav.caseStudies", locale: "ru", value: "Кейсы" },
      { key: "nav.blog", locale: "en", value: "Blog" },
      { key: "nav.blog", locale: "ru", value: "Блог" },
      { key: "nav.contact", locale: "en", value: "Contact" },
      { key: "nav.contact", locale: "ru", value: "Контакты" },
      { key: "nav.pricing", locale: "en", value: "Pricing" },
      { key: "nav.pricing", locale: "ru", value: "Цены" },
      
      // Hero section
      { key: "hero.title", locale: "en", value: "IT Solutions That Drive Growth" },
      { key: "hero.title", locale: "ru", value: "IT-решения для роста бизнеса" },
      { key: "hero.subtitle", locale: "en", value: "Expert email marketing, chatbots, and performance optimization" },
      { key: "hero.subtitle", locale: "ru", value: "Экспертные услуги по email-маркетингу, чат-ботам и оптимизации производительности" },
      
      // Buttons
      { key: "button.getStarted", locale: "en", value: "Get Started" },
      { key: "button.getStarted", locale: "ru", value: "Начать" },
      { key: "button.learnMore", locale: "en", value: "Learn More" },
      { key: "button.learnMore", locale: "ru", value: "Узнать больше" },
      { key: "button.contactUs", locale: "en", value: "Contact Us" },
      { key: "button.contactUs", locale: "ru", value: "Связаться с нами" },
    ];

    for (const translation of translations) {
      await storage.createTranslation(translation);
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}