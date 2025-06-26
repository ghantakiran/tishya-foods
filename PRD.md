# Product Requirements Document (PRD): Tishya Foods

## 1. Overview
Create a modern, SEO-optimized website for Tishya Foods, inspired by tishyafoods.com, to showcase and sell plant-based protein products. The site should provide an excellent user experience, drive organic traffic, and encourage repeat visits.

## 2. Objectives
- Clone and improve upon the user experience of tishyafoods.com.
- Optimize all pages for SEO to attract high-intent users searching for plant-based protein products.
- Provide clear product information, easy navigation, and a seamless shopping experience.
- Enable content marketing (blog, recipes, nutrition info) to boost organic reach.

## 3. Target Users
- Health-conscious consumers interested in plant-based protein.
- Fitness enthusiasts and athletes.
- Environmentally conscious shoppers.
- Returning customers and brand advocates.

## 4. Features & Requirements

### 4.1. User-Facing Features
- Home page with hero section, featured products, and value propositions.
- Product catalog with filtering, sorting, and search.
- Product detail pages with rich content, reviews, and SEO meta tags.
- Shopping cart and checkout flow.
- Blog/Content section for recipes, nutrition, and lifestyle articles.
- About, Contact, and FAQ pages.
- Responsive design for mobile and desktop.
- Accessibility compliance (WCAG 2.1).

### 4.2. Admin Features
- Product management (CRUD).
- Blog/content management.
- Order management dashboard.
- SEO settings for all pages (meta tags, Open Graph, schema.org).

### 4.3. Technical/SEO Requirements
- Server-side rendering (SSR) for SEO (e.g., Next.js).
- Sitemap.xml and robots.txt.
- Structured data (schema.org) for products and articles.
- Fast page load times (Core Web Vitals).
- Social sharing meta tags (Open Graph, Twitter Cards).
- Google Analytics and Search Console integration.

CREATE TABLE seo_meta (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    page_type TEXT NOT NULL, -- e.g., 'product', 'blog', 'home'
    page_id uuid,            -- references the relevant table
    meta_title TEXT,
    meta_description TEXT,
    og_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
); 