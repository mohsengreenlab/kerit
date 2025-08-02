import { storage } from "./storage";

export async function seedDatabase() {
  console.log("Starting database seeding...");
  
  try {
    // First check if data already exists to avoid duplicates
    const existingTranslations = await storage.getTranslationsByLocale('en');
    if (existingTranslations.length > 10) {
      console.log("Database already seeded, skipping...");
      return;
    }
  } catch (error) {
    console.log("Unable to check existing translations, proceeding with seeding...");
  }

  try {

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
      excerpt: "Discover the latest trends and technologies shaping email marketing. AI-powered personalization, interactive content, and advanced automation are revolutionizing how businesses connect with their audience.",
      content: `Email marketing continues to evolve with cutting-edge technologies that are transforming how businesses engage with their customers. In 2024, we're witnessing unprecedented changes that are reshaping the entire landscape of digital communication.

**AI-Powered Personalization**
Artificial intelligence is no longer a luxury—it's becoming essential for competitive email marketing. Modern AI systems can analyze customer behavior patterns, purchase history, and engagement metrics to create hyper-personalized content that resonates with individual recipients. This technology enables marketers to send the right message, to the right person, at exactly the right time.

**Interactive Content Revolution**
Static emails are becoming obsolete. Interactive elements like embedded surveys, product carousels, countdown timers, and in-email purchases are driving engagement rates through the roof. These features allow customers to take action directly within the email, reducing friction and improving conversion rates by up to 300%.

**Advanced Automation Workflows**
Today's automation goes far beyond basic drip campaigns. Sophisticated trigger-based sequences can adapt in real-time based on customer actions, preferences, and behavioral data. This creates a more dynamic, responsive communication strategy that feels personal rather than automated.

**Privacy-First Approach**
With increasing privacy regulations and the gradual phase-out of third-party cookies, email marketing is becoming more valuable than ever. Building first-party data through email subscriptions and direct customer relationships is now a strategic imperative for sustainable business growth.

**Mobile-First Design**
With over 60% of emails opened on mobile devices, responsive design isn't optional—it's mandatory. The best email campaigns are now designed mobile-first, ensuring optimal experiences across all devices and platforms.

**Integration with Omnichannel Strategies**
Email marketing no longer operates in isolation. The most successful campaigns integrate seamlessly with social media, content marketing, and customer service touchpoints to create cohesive, unified customer experiences.

The future of email marketing lies in embracing these technological advances while maintaining the human connection that makes email such a powerful communication channel.`,
      category: "email-marketing",
      tags: ["Email Marketing", "Automation"],
      authorId: adminUser.id,
      isPublished: true,
    });

    await storage.createBlogPost({
      title: "Building Effective Customer Chatbots",
      slug: "building-effective-chatbots",
      excerpt: "Learn how to create chatbots that actually help your customers. From natural language processing to continuous optimization, discover the key elements of successful chatbot implementation.",
      content: `Building effective customer chatbots requires a strategic approach that goes beyond simple question-and-answer scripts. In today's competitive landscape, customers expect intelligent, helpful, and human-like interactions from automated systems.

**Understanding Your Customer's Journey**
Before developing any chatbot, it's crucial to map out your customer's typical journey and identify the most common pain points where automated assistance can provide real value. Analyze support tickets, frequently asked questions, and customer feedback to understand what your audience actually needs.

**Natural Language Processing (NLP)**
Modern chatbots leverage advanced NLP to understand context, intent, and sentiment. This technology enables bots to handle complex queries, understand variations in how questions are asked, and provide relevant responses that feel natural and helpful rather than robotic.

**Conversational Design Principles**
Effective chatbots follow proven conversational design principles:
- Keep responses concise and actionable
- Use a consistent, brand-appropriate tone
- Provide clear next steps and options
- Acknowledge when the bot cannot help and seamlessly transfer to human agents

**Multi-Channel Integration**
The best chatbots work seamlessly across multiple platforms—website, mobile app, social media, and messaging platforms. This omnichannel approach ensures customers can get help wherever they are, using their preferred communication method.

**Continuous Learning and Optimization**
Successful chatbot implementation is never "set and forget." Regular analysis of conversation logs, customer satisfaction scores, and resolution rates helps identify areas for improvement. Machine learning capabilities allow bots to become smarter and more helpful over time.

**Human Handoff Strategy**
Knowing when to transfer customers to human agents is crucial. Implement clear escalation triggers and ensure smooth handoffs that preserve conversation context. This hybrid approach maximizes efficiency while maintaining customer satisfaction.

**Performance Metrics That Matter**
Track meaningful metrics like resolution rate, customer satisfaction, average handling time, and escalation frequency. These insights help optimize bot performance and demonstrate ROI to stakeholders.

**Privacy and Security Considerations**
Customer data protection is paramount. Implement robust security measures, comply with privacy regulations, and be transparent about data collection and usage. Trust is essential for successful chatbot adoption.

When done right, chatbots can handle 60-80% of routine customer inquiries, reduce response times, and improve overall customer satisfaction while reducing operational costs.`,
      category: "chatbots",
      tags: ["Chatbots", "Customer Service"],
      authorId: adminUser.id,
      isPublished: true,
    });

    await storage.createBlogPost({
      title: "Performance Optimization: Speed Up Your Systems",
      slug: "performance-optimization-guide",
      excerpt: "Comprehensive guide to system performance optimization. Learn proven techniques to accelerate your applications, reduce costs, and improve user experience.",
      content: `System performance optimization is critical for business success in today's fast-paced digital environment. Slow applications lead to frustrated users, lost revenue, and increased operational costs. This comprehensive guide covers proven strategies to dramatically improve your system performance.

**Performance Audit Foundation**
Every optimization project should begin with a thorough performance audit. This involves analyzing application response times, database query performance, server resource utilization, and user experience metrics. Understanding your baseline performance is essential for measuring improvement and prioritizing optimization efforts.

**Database Optimization Strategies**
Database performance often represents the biggest bottleneck in web applications. Key optimization techniques include:
- Query optimization and indexing strategies
- Database connection pooling and caching
- Data archiving and partitioning
- Read replica implementation for scaling

**Application Code Optimization**
Clean, efficient code is the foundation of high-performance systems. Focus on:
- Eliminating N+1 query problems
- Implementing proper caching layers
- Optimizing algorithms and data structures
- Reducing memory usage and garbage collection overhead

**Infrastructure Scaling**
Modern infrastructure offers numerous scaling options:
- Horizontal scaling with load balancers
- Content delivery networks (CDNs) for static assets
- Microservices architecture for component-level scaling
- Container orchestration for efficient resource utilization

**Frontend Performance**
User experience is significantly impacted by frontend performance:
- Image optimization and lazy loading
- Minification and compression of assets
- Browser caching strategies
- Progressive web app techniques

**Monitoring and Alerting**
Continuous monitoring is essential for maintaining optimal performance:
- Real-time performance metrics
- Automated alerting for performance degradation
- User experience monitoring
- Capacity planning based on growth trends

**Cost Optimization**
Performance improvements often lead to significant cost savings:
- Right-sizing infrastructure resources
- Eliminating performance bottlenecks that require over-provisioning
- Optimizing cloud resource usage
- Reducing bandwidth and storage costs

**Real-World Results**
Our clients typically see 3-5x performance improvements with 20-40% cost reductions through systematic optimization. These improvements translate directly to better user experience, increased conversion rates, and reduced operational overhead.

The key to successful performance optimization is taking a systematic, data-driven approach that addresses the entire technology stack from database to user interface.`,
      category: "performance",
      tags: ["Performance", "Optimization"],
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

    await storage.createCaseStudy({
      title: "SpeedTech Performance Optimization",
      slug: "speedtech-performance-optimization",
      content: "SpeedTech Solutions had slow loading times and high infrastructure costs. We performed comprehensive system optimization including database tuning, code optimization, and infrastructure scaling, achieving remarkable results.",
      excerpt: "How we helped SpeedTech reduce infrastructure costs and improve performance by 5x",
      clientName: "SpeedTech Solutions",
      results: "5x faster loading times, reduced infrastructure costs by hundreds of dollars monthly",
      serviceType: "performance-improvement",
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
      { key: "nav.cases", locale: "en", value: "Cases" },
      { key: "nav.cases", locale: "ru", value: "Кейсы" },
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
      
      // Cases filters
      { key: "cases.filter.all", locale: "en", value: "All Cases" },
      { key: "cases.filter.all", locale: "ru", value: "Все кейсы" },
      { key: "cases.filter.email", locale: "en", value: "Email Marketing" },
      { key: "cases.filter.email", locale: "ru", value: "Email-маркетинг" },
      { key: "cases.filter.chatbot", locale: "en", value: "Chatbots" },
      { key: "cases.filter.chatbot", locale: "ru", value: "Чат-боты" },
      { key: "cases.filter.performance", locale: "en", value: "Performance" },
      { key: "cases.filter.performance", locale: "ru", value: "Оптимизация" },
      
      // Blog filters
      { key: "blog.filter.all", locale: "en", value: "All Articles" },
      { key: "blog.filter.all", locale: "ru", value: "Все статьи" },
      { key: "blog.filter.email", locale: "en", value: "Email Marketing" },
      { key: "blog.filter.email", locale: "ru", value: "Email-маркетинг" },
      { key: "blog.filter.chatbots", locale: "en", value: "Chatbots" },
      { key: "blog.filter.chatbots", locale: "ru", value: "Чат-боты" },
      { key: "blog.filter.performance", locale: "en", value: "Performance" },
      { key: "blog.filter.performance", locale: "ru", value: "Производительность" },
      { key: "blog.filter.analytics", locale: "en", value: "Analytics" },
      { key: "blog.filter.analytics", locale: "ru", value: "Аналитика" },
      { key: "blog.filter.trends", locale: "en", value: "Trends" },
      { key: "blog.filter.trends", locale: "ru", value: "Тренды" },
      
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