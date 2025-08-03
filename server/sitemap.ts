import type { Express } from "express";
import { storage } from "./storage";

// Generate XML sitemap with multilingual support
export function setupSitemap(app: Express) {
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const baseUrl = process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : 'http://localhost:5000';
      
      // Get dynamic content
      const [services, caseStudies, blogPosts] = await Promise.all([
        storage.getAllServices(),
        storage.getAllCaseStudies(),
        storage.getAllBlogPosts()
      ]);

      // Static pages
      const staticPages = [
        { path: '', priority: '1.0', changefreq: 'daily' },
        { path: '/services', priority: '0.9', changefreq: 'weekly' },
        { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
        { path: '/contact', priority: '0.8', changefreq: 'monthly' },
        { path: '/about', priority: '0.7', changefreq: 'monthly' },
        { path: '/who-we-are', priority: '0.7', changefreq: 'monthly' },
        { path: '/blog', priority: '0.8', changefreq: 'daily' },
        { path: '/case-studies', priority: '0.8', changefreq: 'weekly' }
      ];

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

      // Add static pages with multilingual support
      staticPages.forEach(page => {
        // English version
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}${page.path}</loc>\n`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.path}" />\n`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru${page.path}" />\n`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.path}" />\n`;
        sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
        sitemap += `    <priority>${page.priority}</priority>\n`;
        sitemap += `  </url>\n`;

        // Russian version
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}/ru${page.path}</loc>\n`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.path}" />\n`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru${page.path}" />\n`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.path}" />\n`;
        sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
        sitemap += `    <priority>${page.priority}</priority>\n`;
        sitemap += `  </url>\n`;
      });

      // Add blog posts with language detection
      if (blogPosts && blogPosts.length > 0) {
        const englishPosts = blogPosts.filter(post => 
          post.slug.endsWith('-en') || (!post.slug.endsWith('-ru') && !post.slug.endsWith('-en'))
        );
        const russianPosts = blogPosts.filter(post => post.slug.endsWith('-ru'));

        // English blog posts
        englishPosts.forEach((post: any) => {
          const russianCounterpart = russianPosts.find((rPost: any) => 
            rPost.slug.replace('-ru', '') === post.slug.replace('-en', '')
          );

          sitemap += `  <url>\n`;
          sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
          sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/blog/${post.slug}" />\n`;
          if (russianCounterpart) {
            sitemap += `    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/blog/${russianCounterpart.slug}" />\n`;
          }
          sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/blog/${post.slug}" />\n`;
          sitemap += `    <lastmod>${post.publishedAt}</lastmod>\n`;
          sitemap += `    <changefreq>monthly</changefreq>\n`;
          sitemap += `    <priority>0.7</priority>\n`;
          sitemap += `  </url>\n`;
        });

        // Russian blog posts
        russianPosts.forEach((post: any) => {
          const englishCounterpart = englishPosts.find((ePost: any) => 
            ePost.slug.replace('-en', '') === post.slug.replace('-ru', '')
          );

          sitemap += `  <url>\n`;
          sitemap += `    <loc>${baseUrl}/ru/blog/${post.slug}</loc>\n`;
          sitemap += `    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/blog/${post.slug}" />\n`;
          if (englishCounterpart) {
            sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/blog/${englishCounterpart.slug}" />\n`;
          }
          sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/blog/${englishCounterpart?.slug || post.slug.replace('-ru', '')}" />\n`;
          sitemap += `    <lastmod>${post.publishedAt}</lastmod>\n`;
          sitemap += `    <changefreq>monthly</changefreq>\n`;
          sitemap += `    <priority>0.7</priority>\n`;
          sitemap += `  </url>\n`;
        });
      }

      // Add case studies
      if (caseStudies && caseStudies.length > 0) {
        caseStudies.forEach((caseStudy: any) => {
          // English version
          sitemap += `  <url>\n`;
          sitemap += `    <loc>${baseUrl}/case-studies/${caseStudy.slug}</loc>\n`;
          sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/case-studies/${caseStudy.slug}" />\n`;
          sitemap += `    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/case-studies/${caseStudy.slug}" />\n`;
          sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/case-studies/${caseStudy.slug}" />\n`;
          sitemap += `    <lastmod>${caseStudy.publishedAt}</lastmod>\n`;
          sitemap += `    <changefreq>monthly</changefreq>\n`;
          sitemap += `    <priority>0.8</priority>\n`;
          sitemap += `  </url>\n`;

          // Russian version
          sitemap += `  <url>\n`;
          sitemap += `    <loc>${baseUrl}/ru/case-studies/${caseStudy.slug}</loc>\n`;
          sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/case-studies/${caseStudy.slug}" />\n`;
          sitemap += `    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/case-studies/${caseStudy.slug}" />\n`;
          sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/case-studies/${caseStudy.slug}" />\n`;
          sitemap += `    <lastmod>${caseStudy.publishedAt}</lastmod>\n`;
          sitemap += `    <changefreq>monthly</changefreq>\n`;
          sitemap += `    <priority>0.8</priority>\n`;
          sitemap += `  </url>\n`;
        });
      }

      sitemap += `</urlset>`;

      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  // Robots.txt with multilingual sitemap
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : 'http://localhost:5000';
    
    const robots = `User-agent: *
Allow: /

# Multilingual content
Allow: /ru/
Allow: /en/

# Block admin areas
Disallow: /admin24
Disallow: /api/
Disallow: /dashboard

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Yandex
Allow: /

User-agent: Bingbot
Allow: /`;

    res.set('Content-Type', 'text/plain');
    res.send(robots);
  });
}