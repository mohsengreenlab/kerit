import { storage } from "./storage";

export async function seedDatabase() {
  console.log("Starting database seeding...");
  
  // Proceed with seeding - no duplicate check to ensure complete data refresh

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
      title: "Современные инструменты для Email-маркетинга в 2025",
      slug: "modern-email-marketing-tools-2025",
      excerpt: "Изучите передовые инструменты и технологии email-маркетинга, которые трансформируют способы коммуникации бизнеса с клиентами в 2025 году. От автоматизации на основе ИИ до продвинутой аналитики.",
      content: `Ландшафт email-маркетинга в 2025 году стал более изощренным и мощным, чем когда-либо прежде. Современные инструменты используют искусственный интеллект, машинное обучение и продвинутую аналитику для создания высокоперсонализированных и эффективных кампаний, которые обеспечивают реальные бизнес-результаты.

**AI-Powered Email Platforms**
Today's leading email marketing platforms integrate artificial intelligence at every level. These systems can predict the optimal send times for individual subscribers, automatically craft subject lines that increase open rates, and personalize content based on behavioral patterns and preferences.

**Advanced Segmentation Tools**
Modern segmentation goes far beyond basic demographics. New tools can segment audiences based on:
- Real-time behavioral triggers
- Purchase intent signals
- Engagement scoring algorithms
- Predictive lifetime value models
- Cross-platform activity patterns

**Interactive Email Technologies**
The latest email marketing tools support rich interactive elements directly within emails:
- Embedded shopping experiences with one-click purchasing
- Real-time product recommendation carousels
- Interactive surveys and polls
- Calendar booking widgets
- Live social media feeds

**Automation and Workflow Builders**
Advanced automation platforms now offer sophisticated workflow builders that can:
- Create multi-path customer journeys
- Implement real-time decision trees
- Integrate with CRM and e-commerce platforms
- Trigger campaigns based on external data sources
- Optimize send times using machine learning

**Analytics and Performance Tracking**
Modern email marketing tools provide comprehensive analytics including:
- Revenue attribution and ROI tracking
- Heat mapping and click tracking
- A/B testing with statistical significance
- Customer lifetime value analysis
- Cross-channel campaign performance

**Deliverability and Compliance Tools**
With increasing privacy regulations and spam filters, modern tools focus heavily on:
- GDPR and CCPA compliance automation
- Advanced deliverability monitoring
- Sender reputation management
- Authentication protocol implementation
- Privacy-first data collection methods

**Integration Ecosystems**
The best email marketing tools now integrate seamlessly with:
- E-commerce platforms (Shopify, WooCommerce, Magento)
- CRM systems (Salesforce, HubSpot, Pipedrive)
- Analytics platforms (Google Analytics, Adobe Analytics)
- Social media management tools
- Customer service platforms

**Mobile-First Design Tools**
With mobile email opens exceeding 60%, modern tools prioritize:
- Responsive design templates
- Mobile-specific optimization features
- Touch-friendly interactive elements
- Fast-loading mobile experiences
- Progressive web app capabilities

**Real-Time Personalization**
Advanced personalization engines can now:
- Dynamically insert real-time content
- Personalize images and product recommendations
- Adapt messaging tone and style per recipient
- Optimize content length for individual preferences
- Include location-based offers and information

The future of email marketing lies in choosing tools that combine powerful automation with genuine personalization, helping businesses build meaningful relationships with their customers while driving measurable results.`,
      category: "email-marketing",
      tags: ["Email Marketing", "Tools", "Technology"],
      authorId: adminUser.id,
      isPublished: true,
    });

    await storage.createBlogPost({
      title: "How Customer Service Chatbots Help Business Owners",
      slug: "customer-service-chatbots-business-benefits",
      excerpt: "Discover how intelligent customer service chatbots are transforming business operations, reducing costs, and improving customer satisfaction while enabling 24/7 support.",
      content: `Customer service chatbots have evolved from simple FAQ robots to sophisticated AI assistants that can handle complex customer interactions. For business owners, they represent a powerful tool for scaling customer support while maintaining high-quality service standards.

**24/7 Availability and Instant Response**
Unlike human agents, chatbots never sleep, take breaks, or call in sick. They provide instant responses to customer inquiries at any time of day or night, ensuring that your business is always available to help customers. This round-the-clock availability can significantly improve customer satisfaction and capture leads that might otherwise be lost during off-hours.

**Significant Cost Reduction**
Implementing customer service chatbots can reduce support costs by 30-50% while handling 60-80% of routine inquiries. Business owners can:
- Reduce staffing requirements for basic support tasks
- Lower training costs for new support staff
- Minimize call center infrastructure expenses
- Eliminate overtime costs for extended support hours

**Improved Response Times**
While human agents might take minutes to respond to customer inquiries, chatbots provide instant responses. This immediate engagement can:
- Reduce customer frustration and abandonment
- Increase conversion rates for potential customers
- Improve overall customer experience ratings
- Handle multiple conversations simultaneously without quality degradation

**Consistent Service Quality**
Chatbots deliver consistent responses and follow standardized protocols, eliminating the variability that can occur with human agents. This ensures that:
- All customers receive accurate, up-to-date information
- Brand messaging remains consistent across all interactions
- Service quality doesn't fluctuate based on agent mood or experience level
- Complex processes are followed correctly every time

**Valuable Data Collection and Insights**
Modern chatbots collect valuable customer interaction data that business owners can use to:
- Identify common customer pain points and concerns
- Understand product or service improvement opportunities
- Track customer satisfaction trends
- Analyze conversation patterns for business insights
- Optimize sales and marketing strategies

**Seamless Escalation to Human Agents**
Advanced chatbots know when to escalate conversations to human agents, ensuring complex issues receive appropriate attention while preserving conversation context. This hybrid approach maximizes efficiency while maintaining customer satisfaction.

**Lead Generation and Qualification**
Customer service chatbots can also serve as powerful lead generation tools by:
- Qualifying potential customers through guided conversations
- Collecting contact information for follow-up
- Scheduling appointments or consultations
- Providing personalized product recommendations
- Nurturing prospects through automated sequences

**Multilingual Support**
For businesses serving international markets, chatbots can provide instant support in multiple languages, eliminating language barriers and expanding market reach without hiring multilingual staff.

**Scalability During Peak Periods**
During busy seasons, product launches, or promotional periods, chatbots can handle massive spikes in customer inquiries without additional staffing costs or service degradation.

**Integration with Business Systems**
Modern chatbots integrate with:
- CRM systems for customer history access
- Order management systems for real-time status updates
- Knowledge bases for accurate information retrieval
- Payment systems for transaction support
- Scheduling systems for appointment booking

**ROI and Performance Metrics**
Business owners can track chatbot performance through:
- Cost per conversation handled
- Customer satisfaction scores
- Resolution rates for different inquiry types
- Lead generation and conversion metrics
- Time savings compared to human-only support

For business owners looking to scale their operations while maintaining excellent customer service, chatbots represent a strategic investment that pays dividends in cost savings, efficiency gains, and improved customer satisfaction.`,
      category: "chatbots",
      tags: ["Chatbots", "Customer Service", "Business"],
      authorId: adminUser.id,
      isPublished: true,
    });

    await storage.createBlogPost({
      title: "How Low Performance Affects Website Visits",
      slug: "how-low-performance-affects-website-visits",
      excerpt: "Understand the critical impact of website performance on visitor behavior, conversion rates, and business success. Learn why every second counts in the digital experience.",
      content: `Website performance directly impacts every aspect of your online business success. From search engine rankings to user experience and conversion rates, slow-loading websites create a cascade of negative effects that can severely damage your business growth and revenue potential.

**The Psychology of Website Speed**
Human psychology plays a crucial role in how visitors perceive and interact with your website. Studies show that:
- Users form first impressions within 50 milliseconds
- 40% of visitors abandon sites that take longer than 3 seconds to load
- Every additional second of load time can reduce conversions by up to 7%
- Slow websites create negative brand perception and reduced trust

**Search Engine Ranking Impact**
Google and other search engines use page speed as a ranking factor, meaning slow websites suffer from:
- Lower search engine rankings
- Reduced organic traffic visibility
- Decreased click-through rates from search results
- Poor mobile search performance (especially important since mobile-first indexing)

**User Experience and Engagement Metrics**
Poor performance directly affects how users interact with your website:
- Higher bounce rates as visitors leave immediately
- Reduced time spent on site exploring content
- Lower page views per session
- Decreased return visitor rates
- Poor user satisfaction scores

**Conversion Rate Impact**
Website performance has a direct correlation with business conversions:
- E-commerce sites lose an average of $1.6 billion annually due to slow load times
- A 1-second delay can reduce conversions by 7-12%
- Checkout abandonment increases significantly with slow payment processing
- Lead generation forms see reduced completion rates on slow pages

**Mobile Performance Consequences**
With mobile traffic exceeding desktop usage, mobile performance is critical:
- Mobile users are even less tolerant of slow loading times
- Poor mobile performance affects local search rankings
- Slow mobile sites lose customers to faster competitors
- Mobile conversion rates drop dramatically with performance issues

**Revenue and Business Impact**
The financial consequences of poor website performance include:
- Direct revenue loss from reduced conversions
- Increased customer acquisition costs due to poor organic rankings
- Higher advertising costs to compensate for low organic traffic
- Lost customer lifetime value from poor first impressions
- Competitive disadvantage in crowded markets

**Technical Performance Factors**
Several technical issues commonly impact website performance:
- Unoptimized images and media files
- Excessive HTTP requests and poor caching
- Bloated code and unused JavaScript/CSS
- Slow server response times and poor hosting
- Lack of content delivery network (CDN) implementation

**Real-World Performance Statistics**
Industry research reveals stark performance impact data:
- Amazon found that every 100ms of latency cost them 1% in sales
- Google discovered that an extra 0.5 seconds in search page generation time dropped traffic by 20%
- Walmart found that for every 1 second improvement in page load time, conversions increased by 2%
- Pinterest rebuilt their pages for performance and saw a 40% reduction in perceived wait times and a 15% increase in SEO traffic

**Competitive Advantage Through Performance**
Fast websites create significant competitive advantages:
- Better user experience leads to positive word-of-mouth marketing
- Higher search rankings increase organic visibility
- Improved conversion rates maximize marketing ROI
- Enhanced mobile experience captures mobile-first customers
- Better performance supports business scalability

**Performance Monitoring and Optimization**
To maintain optimal website performance, businesses should:
- Regularly monitor core web vitals and performance metrics
- Implement performance budgets for development teams
- Use performance testing tools during development
- Optimize images, code, and server configurations
- Invest in quality hosting and CDN solutions

**Long-term Business Consequences**
Poor website performance creates cumulative negative effects:
- Gradual decline in search engine rankings
- Reduced brand reputation and customer trust
- Increased difficulty in customer acquisition
- Higher costs for digital marketing efforts
- Lost opportunities for business growth and expansion

Website performance is not just a technical concern—it's a critical business factor that affects every aspect of your online success. Investing in performance optimization is investing in your business's future growth and competitiveness.`,
      category: "performance",
      tags: ["Performance", "Website", "User Experience"],
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