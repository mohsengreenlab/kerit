import {
  users,
  pages,
  blogPosts,
  caseStudies,
  services,
  servicePackages,
  projects,
  translations,
  contactSubmissions,
  contactMessages,
  bookingConsultations,
  visitors,
  pageViews,
  type User,
  type UpsertUser,
  type InsertPage,
  type Page,
  type InsertBlogPost,
  type BlogPost,
  type InsertCaseStudy,
  type CaseStudy,
  type InsertService,
  type Service,
  type InsertServicePackage,
  type ServicePackage,
  type InsertProject,
  type Project,
  type InsertTranslation,
  type Translation,
  type InsertContactSubmission,
  type ContactSubmission,
  type ContactMessage,
  type InsertContactMessage,
  type BookingConsultation,
  type InsertBookingConsultation,
  type Visitor,
  type PageView,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, like } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Pages operations
  getPage(slug: string): Promise<Page | undefined>;
  getAllPages(): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: string): Promise<void>;
  
  // Blog operations
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
  
  // Case studies operations
  getCaseStudy(slug: string): Promise<CaseStudy | undefined>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>;
  getAllCaseStudies(published?: boolean): Promise<CaseStudy[]>;
  getCaseStudiesByService(serviceType: string): Promise<CaseStudy[]>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  updateCaseStudy(id: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy>;
  deleteCaseStudy(id: string): Promise<void>;
  
  // Services operations
  getService(slug: string): Promise<Service | undefined>;
  getAllServices(active?: boolean): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<void>;
  
  // Service packages operations
  getServicePackage(id: string): Promise<ServicePackage | undefined>;
  getServicePackages(serviceId?: string): Promise<ServicePackage[]>;
  createServicePackage(package_: InsertServicePackage): Promise<ServicePackage>;
  updateServicePackage(id: string, package_: Partial<InsertServicePackage>): Promise<ServicePackage>;
  deleteServicePackage(id: string): Promise<void>;
  
  // Projects operations
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByCustomer(customerId: string): Promise<Project[]>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Translations operations
  getTranslation(key: string, locale: string): Promise<Translation | undefined>;
  getTranslationsByLocale(locale: string): Promise<Translation[]>;
  createTranslation(translation: InsertTranslation): Promise<Translation>;
  updateTranslation(id: string, translation: Partial<InsertTranslation>): Promise<Translation>;
  deleteTranslation(id: string): Promise<void>;
  
  // Contact submissions operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  markContactSubmissionAsRead(id: string): Promise<void>;
  
  // Contact messages operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: string): Promise<void>;
  
  // Booking consultations operations
  createBookingConsultation(booking: InsertBookingConsultation): Promise<BookingConsultation>;
  getAllBookingConsultations(): Promise<BookingConsultation[]>;
  markBookingConsultationAsRead(id: string): Promise<void>;
  updateBookingConsultationStatus(id: string, status: string): Promise<void>;
  
  // Analytics operations
  trackVisitor(sessionId: string, ipAddress?: string, userAgent?: string, referrer?: string): Promise<Visitor>;
  trackPageView(visitorId: string, path: string, title?: string): Promise<PageView>;
  getVisitorStats(): Promise<{ totalVisitors: number; totalPageViews: number; returningVisitors: number }>;
  getPopularPages(limit?: number): Promise<{ path: string; views: number }[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Pages operations
  async getPage(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page;
  }

  async getAllPages(): Promise<Page[]> {
    return await db.select().from(pages).orderBy(desc(pages.updatedAt));
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db.insert(pages).values(page).returning();
    return newPage;
  }

  async updatePage(id: string, page: Partial<InsertPage>): Promise<Page> {
    const [updatedPage] = await db
      .update(pages)
      .set({ ...page, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return updatedPage;
  }

  async deletePage(id: string): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  // Blog operations
  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        content: blogPosts.content,
        excerpt: blogPosts.excerpt,
        featuredImage: blogPosts.featuredImage,
        category: blogPosts.category,
        tags: blogPosts.tags,
        publishedAt: blogPosts.publishedAt,
        isPublished: blogPosts.isPublished,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
        authorId: blogPosts.authorId,
      })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return post;
  }

  async getAllBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const query = db.select().from(blogPosts);
    if (published !== undefined) {
      return await query.where(eq(blogPosts.isPublished, published)).orderBy(desc(blogPosts.publishedAt));
    }
    return await query.orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.category, category), eq(blogPosts.isPublished, true)))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Case studies operations
  async getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug));
    return caseStudy;
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug));
    return caseStudy;
  }

  async getAllCaseStudies(published?: boolean): Promise<CaseStudy[]> {
    const query = db.select().from(caseStudies);
    if (published !== undefined) {
      return await query.where(eq(caseStudies.isPublished, published)).orderBy(desc(caseStudies.publishedAt));
    }
    return await query.orderBy(desc(caseStudies.createdAt));
  }

  async getCaseStudiesByService(serviceType: string): Promise<CaseStudy[]> {
    return await db
      .select()
      .from(caseStudies)
      .where(and(eq(caseStudies.serviceType, serviceType), eq(caseStudies.isPublished, true)))
      .orderBy(desc(caseStudies.publishedAt));
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const [newCaseStudy] = await db.insert(caseStudies).values(caseStudy).returning();
    return newCaseStudy;
  }

  async updateCaseStudy(id: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy> {
    const [updatedCaseStudy] = await db
      .update(caseStudies)
      .set({ ...caseStudy, updatedAt: new Date() })
      .where(eq(caseStudies.id, id))
      .returning();
    return updatedCaseStudy;
  }

  async deleteCaseStudy(id: string): Promise<void> {
    await db.delete(caseStudies).where(eq(caseStudies.id, id));
  }

  // Services operations
  async getService(slug: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async getAllServices(active?: boolean): Promise<Service[]> {
    const query = db.select().from(services);
    if (active !== undefined) {
      return await query.where(eq(services.isActive, active)).orderBy(services.name);
    }
    return await query.orderBy(services.name);
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: string): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Service packages operations
  async getServicePackage(id: string): Promise<ServicePackage | undefined> {
    const [package_] = await db.select().from(servicePackages).where(eq(servicePackages.id, id));
    return package_;
  }

  async getServicePackages(serviceId?: string): Promise<ServicePackage[]> {
    const query = db.select().from(servicePackages);
    if (serviceId) {
      return await query.where(eq(servicePackages.serviceId, serviceId)).orderBy(servicePackages.price);
    }
    return await query.orderBy(servicePackages.serviceId, servicePackages.price);
  }

  async createServicePackage(package_: InsertServicePackage): Promise<ServicePackage> {
    const [newPackage] = await db.insert(servicePackages).values(package_).returning();
    return newPackage;
  }

  async updateServicePackage(id: string, package_: Partial<InsertServicePackage>): Promise<ServicePackage> {
    const [updatedPackage] = await db
      .update(servicePackages)
      .set({ ...package_, updatedAt: new Date() })
      .where(eq(servicePackages.id, id))
      .returning();
    return updatedPackage;
  }

  async deleteServicePackage(id: string): Promise<void> {
    await db.delete(servicePackages).where(eq(servicePackages.id, id));
  }

  // Projects operations
  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getProjectsByCustomer(customerId: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.customerId, customerId))
      .orderBy(desc(projects.createdAt));
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Translations operations
  async getTranslation(key: string, locale: string): Promise<Translation | undefined> {
    const [translation] = await db
      .select()
      .from(translations)
      .where(and(eq(translations.key, key), eq(translations.locale, locale)));
    return translation;
  }

  async getTranslationsByLocale(locale: string): Promise<Translation[]> {
    return await db.select().from(translations).where(eq(translations.locale, locale));
  }

  async createTranslation(translation: InsertTranslation): Promise<Translation> {
    const [newTranslation] = await db.insert(translations).values(translation).returning();
    return newTranslation;
  }

  async updateTranslation(id: string, translation: Partial<InsertTranslation>): Promise<Translation> {
    const [updatedTranslation] = await db
      .update(translations)
      .set({ ...translation, updatedAt: new Date() })
      .where(eq(translations.id, id))
      .returning();
    return updatedTranslation;
  }

  async deleteTranslation(id: string): Promise<void> {
    await db.delete(translations).where(eq(translations.id, id));
  }

  // Contact submissions operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async markContactSubmissionAsRead(id: string): Promise<void> {
    await db.update(contactSubmissions).set({ isRead: true }).where(eq(contactSubmissions.id, id));
  }

  // Contact messages operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async markContactMessageAsRead(id: string): Promise<void> {
    await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));
  }

  // Booking consultations operations
  async createBookingConsultation(booking: InsertBookingConsultation): Promise<BookingConsultation> {
    const [newBooking] = await db.insert(bookingConsultations).values(booking).returning();
    return newBooking;
  }

  async getAllBookingConsultations(): Promise<BookingConsultation[]> {
    return await db.select().from(bookingConsultations).orderBy(desc(bookingConsultations.createdAt));
  }

  async markBookingConsultationAsRead(id: string): Promise<void> {
    await db
      .update(bookingConsultations)
      .set({ isRead: true })
      .where(eq(bookingConsultations.id, id));
  }

  async updateBookingConsultationStatus(id: string, status: string): Promise<void> {
    await db
      .update(bookingConsultations)
      .set({ status })
      .where(eq(bookingConsultations.id, id));
  }

  // Analytics operations
  async trackVisitor(sessionId: string, ipAddress?: string, userAgent?: string, referrer?: string): Promise<Visitor> {
    // Check if visitor exists
    const [existingVisitor] = await db
      .select()
      .from(visitors)
      .where(eq(visitors.sessionId, sessionId));

    if (existingVisitor) {
      // Update existing visitor
      const [updatedVisitor] = await db
        .update(visitors)
        .set({
          lastVisit: new Date(),
          visitCount: sql`${visitors.visitCount} + 1`,
        })
        .where(eq(visitors.id, existingVisitor.id))
        .returning();
      return updatedVisitor;
    } else {
      // Create new visitor
      const [newVisitor] = await db
        .insert(visitors)
        .values({
          sessionId,
          ipAddress,
          userAgent,
          referrer,
        })
        .returning();
      return newVisitor;
    }
  }

  async trackPageView(visitorId: string, path: string, title?: string): Promise<PageView> {
    // Update visitor's total page views
    await db
      .update(visitors)
      .set({
        totalPageViews: sql`${visitors.totalPageViews} + 1`,
        lastVisit: new Date(),
      })
      .where(eq(visitors.id, visitorId));

    // Create page view record
    const [newPageView] = await db
      .insert(pageViews)
      .values({
        visitorId,
        path,
        title,
      })
      .returning();
    return newPageView;
  }

  async getVisitorStats(): Promise<{ totalVisitors: number; totalPageViews: number; returningVisitors: number }> {
    const [stats] = await db
      .select({
        totalVisitors: sql<number>`count(*)`,
        totalPageViews: sql<number>`sum(${visitors.totalPageViews})`,
        returningVisitors: sql<number>`count(*) filter (where ${visitors.visitCount} > 1)`,
      })
      .from(visitors);

    return {
      totalVisitors: stats.totalVisitors || 0,
      totalPageViews: stats.totalPageViews || 0,
      returningVisitors: stats.returningVisitors || 0,
    };
  }

  async getPopularPages(limit: number = 10): Promise<{ path: string; views: number }[]> {
    const results = await db
      .select({
        path: pageViews.path,
        views: sql<number>`count(*)`,
      })
      .from(pageViews)
      .groupBy(pageViews.path)
      .orderBy(sql`count(*) desc`)
      .limit(limit);

    return results.map(r => ({ path: r.path, views: r.views }));
  }
}

export const storage = new DatabaseStorage();
