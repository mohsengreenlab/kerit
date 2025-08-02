# Kerit IT Consultancy Website

## Overview

This is a full-stack IT consultancy website for Kerit, built with Express (Node.js), React, and PostgreSQL. The application provides a modern, mobile-first, multilingual (Russian/English) website for an IT consulting company specializing in email marketing, chatbots, and performance optimization services.

## User Preferences

```
Preferred communication style: Simple, everyday language.
No CMS needed - website should load with all content from database seeding on deployment.
Admin panel (/admin24) only for receiving messages, not content management.
Admin password for /admin24: admin123 (default fallback when ADMIN_PASSWORD not set)
Development admin bypass available at: /api/dev-admin-login
```

## Recent Changes (August 2, 2025)

✓ **MIGRATION COMPLETE**: Successfully migrated from Replit Agent to standard Replit environment
✓ **Database Setup**: Created PostgreSQL database and pushed complete schema using Drizzle Kit
✓ **Application Running**: Server running on port 5000 with full database seeding on startup
✓ **Case Studies Verified**: All 3 case studies properly loaded including performance-improvement type
✓ **API Endpoints Operational**: All translation, case studies, and service endpoints working correctly
✓ **Development Environment Ready**: Project fully configured for continued development work

### User Requested Improvements (August 2, 2025)
✓ **Animation Fix**: Fixed page animation system to trigger only once per browser session visit
✓ **Cookie Management**: Enhanced session handling to prevent "relation sessions does not exist" errors
✓ **Translation Fixes**: Corrected Russian phrases appearing in English mode on Cases page
✓ **Date Handling**: Fixed 1970 dates display by implementing proper date validation
✓ **Contact Email Update**: Changed contact email to info@kerit.com.ru across the website
✓ **Case Study Pages**: Removed filter buttons from all case study detail pages
✓ **Blog Improvements**: 
  - Removed Analytics and Trends categories
  - Removed date display from blog posts  
  - Created comprehensive blog content with full articles
  - Removed newsletter subscription section

## Previous Changes (August 1, 2025)

✓ **CRITICAL FIX**: Resolved booking consultation validation errors on production VPS
✓ Updated `insertBookingConsultationSchema` to properly handle optional nullable fields
✓ Fixed "Invalid booking data" 400 errors that prevented website visitors from booking appointments  
✓ Booking API now returns 200 OK with successful consultation bookings
✓ Deployed complete database schema and application to production VPS
✓ Fixed VPS deployment script to include dev dependencies for building
✓ Application running successfully on both development (port 5000) and production (port 3001)

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom Kerit brand colors
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API with organized route handlers

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Neon serverless driver with WebSocket support

## Key Components

### Authentication System
- **Provider**: Replit Auth integration with OpenID Connect
- **Roles**: Admin and Customer roles with role-based access control
- **Routes**: `/admin24` for admin access, `/dashboard` for customer portal
- **Session Storage**: PostgreSQL-backed sessions with configurable TTL

### Content System (No CMS)
- **Static Content**: All content loaded from database seeding on startup
- **Blog**: Pre-populated blog posts with categories and tags
- **Case Studies**: Portfolio showcase with service filtering
- **Services**: Service descriptions with pricing packages
- **Multilingual**: Translation system supporting Russian/English
- **Admin Panel**: Only for receiving contact messages and booking consultations

### Analytics and Tracking
- **User Tracking**: Visitor identification and return visitor detection
- **Page Views**: Detailed page view analytics with path tracking
- **Cookie Consent**: GDPR-compliant cookie consent management
- **Admin Dashboard**: Analytics overview for site administrators

### Service Structure
- **Email Marketing**: Automation, segmentation, A/B testing features
- **Customer Chatbots**: 24/7 support, AI integration, CRM connectivity
- **Performance Improvement**: System audits, database optimization, monitoring

## Data Flow

### Public User Journey
1. User visits landing page with hero section and service overview
2. Language preference stored in localStorage, translations fetched from API
3. Service pages provide detailed information with CTAs for appointments
4. Contact forms and appointment bookings stored in database
5. Blog and case studies showcase company expertise
6. Page views and user behavior tracked for analytics (with consent)

### Authenticated User Flow
1. Users authenticate via Replit Auth at designated login endpoints
2. Customer users access project dashboard showing their service packages
3. Admin users access comprehensive management panel
4. Role-based content rendering and API access control
5. Session management maintains authentication state

### Content Management Flow
1. Admins manage all content through protected admin panel
2. Dynamic content stored in PostgreSQL with translation support
3. SEO metadata and Open Graph tags generated per page
4. Publishing workflow controls content visibility
5. Analytics data aggregated for admin reporting

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database queries and migrations
- **@tanstack/react-query**: Server state management and caching
- **express**: Web framework for API routes and middleware

### UI and Styling
- **@radix-ui/***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for consistent iconography
- **wouter**: Lightweight React routing

### Authentication and Sessions
- **openid-client**: OpenID Connect client for Replit Auth
- **passport**: Authentication middleware
- **connect-pg-simple**: PostgreSQL session store
- **express-session**: Session management

### Development Tools
- **vite**: Fast development server and build tool
- **typescript**: Type safety and better developer experience
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Server**: Development server runs with `tsx` for hot reloading
- **Client**: Vite dev server with HMR and React Fast Refresh
- **Database**: Drizzle Kit for schema synchronization with automatic seeding
- **Content Loading**: Database seeding runs on startup to populate all content
- **Environment**: Replit-optimized with cartographer plugin

### Production Build
- **Client**: Vite builds optimized static assets to `dist/public`
- **Server**: esbuild bundles Node.js server to `dist/index.js`
- **Assets**: Static file serving handled by Express in production
- **Database**: PostgreSQL with connection pooling via Neon

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **SESSION_SECRET**: Session encryption key (required)
- **REPL_ID**: Replit environment identifier
- **ISSUER_URL**: OpenID Connect issuer for authentication
- **NODE_ENV**: Environment mode (development/production)

### SEO and Performance
- **SSR**: Server-side rendering for public pages
- **Meta Tags**: Dynamic OpenGraph and Twitter card generation
- **Sitemap**: Automated sitemap.xml generation
- **Lighthouse**: Optimized for 90+ performance scores
- **Mobile-First**: Responsive design with progressive enhancement

The application follows modern web development best practices with type safety, accessibility (WCAG AA compliance), and performance optimization as core principles.