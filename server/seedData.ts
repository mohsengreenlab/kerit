import { storage } from "./storage";

export async function seedDatabase() {
  console.log("Starting database seeding...");

  // Proceed with seeding - no duplicate check to ensure complete data refresh

  try {

    // Create admin user first for blog posts (with upsert to handle duplicates)
    const adminUser = await storage.upsertUser({
      id: "admin",
      email: "admin@kerit.com",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    });

    // Create services (check if they exist first)
    let emailMarketingService, chatbotService, performanceService;

    try {
      emailMarketingService = await storage.getService("email-marketing");
      if (!emailMarketingService) {
        emailMarketingService = await storage.createService({
          name: "Email Marketing Automation",
          slug: "email-marketing",
          description: "Comprehensive email marketing solutions with automation, segmentation, and analytics",
          features: ["Campaign Creation", "A/B Testing", "Automation Workflows", "Customer Segmentation", "Analytics & Reporting"],
          isActive: true,
        });
      }
    } catch (error) {
      console.log("Email marketing service already exists or error occurred");
    }

    try {
      chatbotService = await storage.getService("chatbots");
      if (!chatbotService) {
        chatbotService = await storage.createService({
          name: "Customer Chatbots",
          slug: "chatbots",
          description: "AI-powered chatbots for 24/7 customer support and engagement",
          features: ["24/7 Support", "AI Integration", "Lead Qualification", "CRM Integration", "Multi-language Support"],
          isActive: true,
        });
      }
    } catch (error) {
      console.log("Chatbot service already exists or error occurred");
    }

    try {
      performanceService = await storage.getService("performance-improvement");
      if (!performanceService) {
        performanceService = await storage.createService({
          name: "Performance Improvement",
          slug: "performance-improvement",
          description: "System optimization and performance enhancement services",
          features: ["System Audits", "Database Optimization", "Code Review", "Performance Monitoring", "Scalability Planning"],
          isActive: true,
        });
      }
    } catch (error) {
      console.log("Performance service already exists or error occurred");
    }

    // Create service packages (only if services exist)
    if (emailMarketingService) {
      try {
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
      } catch (error) {
        console.log("Service packages may already exist");
      }
    }

    if (chatbotService) {
      try {
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
      } catch (error) {
        console.log("Chatbot service package may already exist");
      }
    }

    if (performanceService) {
      try {
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
      } catch (error) {
        console.log("Performance service package may already exist");
      }
    }

    // Only create blog posts that exist in your current database
    // Removed: "The Future of Email Marketing in 2024" since it doesn't exist in your database

    await storage.createBlogPost({
      title: "Building Effective Customer Chatbots",
      slug: "building-effective-chatbots",
      excerpt: "Learn how to create chatbots that actually help your customers. From natural language processing to continuous optimization, discover the key elements of successful chatbot implementation.",
      content: `Building effective customer chatbots requires a strategic approach that goes beyond simple question-and-answer scripts. In today's competitive landscape, customers expect intelligent, helpful, and human-like interactions from automated systems.
126:
127:**Understanding Your Customer's Journey**
128:Before developing any chatbot, it's crucial to map out your customer's typical journey and identify the most common pain points where automated assistance can provide real value. Analyze support tickets, frequently asked questions, and customer feedback to understand what your audience actually needs.
129:
130:**Natural Language Processing (NLP)**
131:Modern chatbots leverage advanced NLP to understand context, intent, and sentiment. This technology enables bots to handle complex queries, understand variations in how questions are asked, and provide relevant responses that feel natural and helpful rather than robotic.
132:
133:**Conversational Design Principles**
134:Effective chatbots follow proven conversational design principles:
135:- Keep responses concise and actionable
136:- Use a consistent, brand-appropriate tone
137:- Provide clear next steps and options
138:- Acknowledge when the bot cannot help and seamlessly transfer to human agents
139:
140:**Multi-Channel Integration**
141:The best chatbots work seamlessly across multiple platforms—website, mobile app, social media, and messaging platforms. This omnichannel approach ensures customers can get help wherever they are, using their preferred communication method.
142:
143:**Continuous Learning and Optimization**
144:Successful chatbot implementation is never "set and forget." Regular analysis of conversation logs, customer satisfaction scores, and resolution rates helps identify areas for improvement. Machine learning capabilities allow bots to become smarter and more helpful over time.
145:
146:**Human Handoff Strategy**
147:Knowing when to transfer customers to human agents is crucial. Implement clear escalation triggers and ensure smooth handoffs that preserve conversation context. This hybrid approach maximizes efficiency while maintaining customer satisfaction.
148:
149:**Performance Metrics That Matter**
150:Track meaningful metrics like resolution rate, customer satisfaction, average handling time, and escalation frequency. These insights help optimize bot performance and demonstrate ROI to stakeholders.
151:
152:**Privacy and Security Considerations**
153:Customer data protection is paramount. Implement robust security measures, comply with privacy regulations, and be transparent about data collection and usage. Trust is essential for successful chatbot adoption.
154:
155:When done right, chatbots can handle 60-80% of routine customer inquiries, reduce response times, and improve overall customer satisfaction while reducing operational costs.`,
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
167:
168:**AI-Powered Email Platforms**
169:Today's leading email marketing platforms integrate artificial intelligence at every level. These systems can predict the optimal send times for individual subscribers, automatically craft subject lines that increase open rates, and personalize content based on behavioral patterns and preferences.
170:
171:**Advanced Segmentation Tools**
172:Modern segmentation goes far beyond basic demographics. New tools can segment audiences based on:
173:- Real-time behavioral triggers
174:- Purchase intent signals
175:- Engagement scoring algorithms
176:- Predictive lifetime value models
177:- Cross-platform activity patterns
178:
179:**Interactive Email Technologies**
180:The latest email marketing tools support rich interactive elements directly within emails:
181:- Embedded shopping experiences with one-click purchasing
182:- Real-time product recommendation carousels
183:- Interactive surveys and polls
184:- Calendar booking widgets
185:- Live social media feeds
186:
187:**Automation and Workflow Builders**
188:Advanced automation platforms now offer sophisticated workflow builders that can:
189:- Create multi-path customer journeys
190:- Implement real-time decision trees
191:- Integrate with CRM and e-commerce platforms
192:- Trigger campaigns based on external data sources
193:- Optimize send times using machine learning
194:
195:**Analytics and Performance Tracking**
196:Modern email marketing tools provide comprehensive analytics including:
197:- Revenue attribution and ROI tracking
198:- Heat mapping and click tracking
199:- A/B testing with statistical significance
200:- Customer lifetime value analysis
201:- Cross-channel campaign performance
202:
203:**Deliverability and Compliance Tools**
204:With increasing privacy regulations and spam filters, modern tools focus heavily on:
205:- GDPR and CCPA compliance automation
206:- Advanced deliverability monitoring
207:- Sender reputation management
208:- Authentication protocol implementation
209:- Privacy-first data collection methods
210:
211:**Integration Ecosystems**
212:The best email marketing tools now integrate seamlessly with:
213:- E-commerce platforms (Shopify, WooCommerce, Magento)
214:- CRM systems (Salesforce, HubSpot, Pipedrive)
215:- Analytics platforms (Google Analytics, Adobe Analytics)
216:- Social media management tools
217:- Customer service platforms
218:
219:**Mobile-First Design Tools**
220:With mobile email opens exceeding 60%, modern tools prioritize:
221:- Responsive design templates
222:- Mobile-specific optimization features
223:- Touch-friendly interactive elements
224:- Fast-loading mobile experiences
225:- Progressive web app capabilities
226:
227:**Real-Time Personalization**
228:Advanced personalization engines can now:
229:- Dynamically insert real-time content
230:- Personalize images and product recommendations
231:- Adapt messaging tone and style per recipient
232:- Optimize content length for individual preferences
233:- Include location-based offers and information
234:
235:The future of email marketing lies in choosing tools that combine powerful automation with genuine personalization, helping businesses build meaningful relationships with their customers while driving measurable results.`,
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
247:
248:**24/7 Availability and Instant Response**
249:Unlike human agents, chatbots never sleep, take breaks, or call in sick. They provide instant responses to customer inquiries at any time of day or night, ensuring that your business is always available to help customers. This round-the-clock availability can significantly improve customer satisfaction and capture leads that might otherwise be lost during off-hours.
250:
251:**Significant Cost Reduction**
252:Implementing customer service chatbots can reduce support costs by 30-50% while handling 60-80% of routine inquiries. Business owners can:
253:- Reduce staffing requirements for basic support tasks
254:- Lower training costs for new support staff
255:- Minimize call center infrastructure expenses
256:- Eliminate overtime costs for extended support hours
257:
258:**Improved Response Times**
259:While human agents might take minutes to respond to customer inquiries, chatbots provide instant responses. This immediate engagement can:
260:- Reduce customer frustration and abandonment
261:- Increase conversion rates for potential customers
262:- Improve overall customer experience ratings
263:- Handle multiple conversations simultaneously without quality degradation
264:
265:**Consistent Service Quality**
266:Chatbots deliver consistent responses and follow standardized protocols, eliminating the variability that can occur with human agents. This ensures that:
267:- All customers receive accurate, up-to-date information
268:- Brand messaging remains consistent across all interactions
269:- Service quality doesn't fluctuate based on agent mood or experience level
270:- Complex processes are followed correctly every time
271:
272:**Valuable Data Collection and Insights**
273:Modern chatbots collect valuable customer interaction data that business owners can use to:
274:- Identify common customer pain points and concerns
275:- Understand product or service improvement opportunities
276:- Track customer satisfaction trends
277:- Analyze conversation patterns for business insights
278:- Optimize sales and marketing strategies
279:
280:**Seamless Escalation to Human Agents**
281:Advanced chatbots know when to escalate conversations to human agents, ensuring complex issues receive appropriate attention while preserving conversation context. This hybrid approach maximizes efficiency while maintaining customer satisfaction.
282:
283:**Lead Generation and Qualification**
284:Customer service chatbots can also serve as powerful lead generation tools by:
285:- Qualifying potential customers through guided conversations
286:- Collecting contact information for follow-up
287:- Scheduling appointments or consultations
288:- Providing personalized product recommendations
289:- Nurturing prospects through automated sequences
290:
291:**Multilingual Support**
292:For businesses serving international markets, chatbots can provide instant support in multiple languages, eliminating language barriers and expanding market reach without hiring multilingual staff.
293:
294:**Scalability During Peak Periods**
295:During busy seasons, product launches, or promotional periods, chatbots can handle massive spikes in customer inquiries without additional staffing costs or service degradation.
296:
297:**Integration with Business Systems**
298:Modern chatbots integrate with:
299:- CRM systems for customer history access
300:- Order management systems for real-time status updates
301:- Knowledge bases for accurate information retrieval
302:- Payment systems for transaction support
303:- Scheduling systems for appointment booking
304:
305:**ROI and Performance Metrics**
306:Business owners can track chatbot performance through:
307:- Cost per conversation handled
308:- Customer satisfaction scores
309:- Resolution rates for different inquiry types
310:- Lead generation and conversion metrics
311:- Time savings compared to human-only support
312:
313:For business owners looking to scale their operations while maintaining excellent customer service, chatbots represent a strategic investment that pays dividends in cost savings, efficiency gains, and improved customer satisfaction.`,
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
325:
326:**The Psychology of Website Speed**
327:Human psychology plays a crucial role in how visitors perceive and interact with your website. Studies show that:
328:- Users form first impressions within 50 milliseconds
329:- 40% of visitors abandon sites that take longer than 3 seconds to load
330:- Every additional second of load time can reduce conversions by up to 7%
331:- Slow websites create negative brand perception and reduced trust
332:
333:**Search Engine Ranking Impact**
334:Google and other search engines use page speed as a ranking factor, meaning slow websites suffer from:
335:- Lower search engine rankings
336:- Reduced organic traffic visibility
337:- Decreased click-through rates from search results
338:- Poor mobile search performance (especially important since mobile-first indexing)
339:
340:**User Experience and Engagement Metrics**
341:Poor performance directly affects how users interact with your website:
342:- Higher bounce rates as visitors leave immediately
343:- Reduced time spent on site exploring content
344:- Lower page views per session
345:- Decreased return visitor rates
346:- Poor user satisfaction scores
347:
348:**Conversion Rate Impact**
349:Website performance has a direct correlation with business conversions:
350:- E-commerce sites lose an average of $1.6 billion annually due to slow load times
351:- A 1-second delay can reduce conversions by 7-12%
352:- Checkout abandonment increases significantly with slow payment processing
353:- Lead generation forms see reduced completion rates on slow pages
354:
355:**Mobile Performance Consequences**
356:With mobile traffic exceeding desktop usage, mobile performance is critical:
357:- Mobile users are even less tolerant of slow loading times
358:- Poor mobile performance affects local search rankings
359:- Slow mobile sites lose customers to faster competitors
360:- Mobile conversion rates drop dramatically with performance issues
361:
362:**Revenue and Business Impact**
363:The financial consequences of poor website performance include:
364:- Direct revenue loss from reduced conversions
365:- Increased customer acquisition costs due to poor organic rankings
366:- Higher advertising costs to compensate for low organic traffic
367:- Lost customer lifetime value from poor first impressions
368:- Competitive disadvantage in crowded markets
369:
370:**Technical Performance Factors**
371:Several technical issues commonly impact website performance:
372:- Unoptimized images and media files
373:- Excessive HTTP requests and poor caching
374:- Bloated code and unused JavaScript/CSS
375:- Slow server response times and poor hosting
376:- Lack of content delivery network (CDN) implementation
377:
378:**Real-World Performance Statistics**
379:Industry research reveals stark performance impact data:
380:- Amazon found that every 100ms of latency cost them 1% in sales
381:- Google discovered that an extra 0.5 seconds in search page generation time dropped traffic by 20%
382:- Walmart found that for every 1 second improvement in page load time, conversions increased by 2%
383:- Pinterest rebuilt their pages for performance and saw a 40% reduction in perceived wait times and a 15% increase in SEO traffic
384:
385:**Competitive Advantage Through Performance**
386:Fast websites create significant competitive advantages:
387:- Better user experience leads to positive word-of-mouth marketing
388:- Higher search rankings increase organic visibility
389:- Improved conversion rates maximize marketing ROI
390:- Enhanced mobile experience captures mobile-first customers
391:- Better performance supports business scalability
392:
393:**Performance Monitoring and Optimization**
394:To maintain optimal website performance, businesses should:
395:- Regularly monitor core web vitals and performance metrics
396:- Implement performance budgets for development teams
397:- Use performance testing tools during development
398:- Optimize images, code, and server configurations
399:- Invest in quality hosting and CDN solutions
400:
401:**Long-term Business Consequences**
402:Poor website performance creates cumulative negative effects:
403:- Gradual decline in search engine rankings
404:- Reduced brand reputation and customer trust
405:- Increased difficulty in customer acquisition
406:- Higher costs for digital marketing efforts
407:- Lost opportunities for business growth and expansion
408:
409:Website performance is not just a technical concern—it's a critical business factor that affects every aspect of your online success. Investing in performance optimization is investing in your business's future growth and competitiveness.`,
      category: "performance",
      tags: ["Performance", "Website", "User Experience"],
      authorId: adminUser.id,
      isPublished: true,
    });

    // Create case studies (check for existing ones first)
    try {
      const existingTechCorp = await storage.getCaseStudy("techcorp-email-success");
      if (!existingTechCorp) {
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
      }
    } catch (error) {
      console.log("TechCorp case study may already exist");
    }

    try {
      const existingRetailMax = await storage.getCaseStudy("retailmax-chatbot-implementation");
      if (!existingRetailMax) {
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
      }
    } catch (error) {
      console.log("RetailMax case study may already exist");
    }

    try {
      const existingSpeedTech = await storage.getCaseStudy("speedtech-performance-optimization");
      if (!existingSpeedTech) {
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
      }
    } catch (error) {
      console.log("SpeedTech case study may already exist");
    }

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
      { key: "button.pricing", locale: "en", value: "Pricing" },
      { key: "button.pricing", locale: "ru", value: "Цены" },
    ];

    for (const translation of translations) {
      try {
        await storage.createTranslation(translation);
      } catch (error) {
        // Translation may already exist, continue
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}