-- Seed all 30 standard Gavior service packages into ops_catalog_items
insert into public.ops_catalog_items (name, category, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active)
values
  -- Websites
  ('Website Mini / Landing Page', 'Websites', 'Single-page responsive landing page with WhatsApp CTA, contact form, mobile-first design, basic SEO, fast loading, and 1 revision round.', 'service', 'project', '998314', 99900, 1800, true),
  ('Website Starter', 'Websites', 'Up to 5 pages mobile-responsive website, WhatsApp integration & contact form, basic SEO setup, Google Maps embed, and 2 revision rounds.', 'service', 'project', '998314', 499900, 1800, true),
  ('Website Standard', 'Websites', 'Multi-page dynamic business website (up to 8-10 pages) with standard CMS, lead generation forms, animations, performance optimization, and on-page SEO.', 'service', 'project', '998314', 999900, 1800, true),
  ('Website Growth', 'Websites', 'Custom UI tailored to brand, blog & content dashboard, advanced SEO & analytics setup, fast build, lead capture sections, training & handover.', 'service', 'project', '998314', 1999900, 1800, true),
  ('Custom Web Application / E-Commerce', 'Websites', 'Custom web application or e-commerce platform with payment gateway integration, admin dashboard, user authentication, database flows, and launch support.', 'service', 'project', '998314', 4999900, 1800, true),

  -- Branding
  ('Logo Starter', 'Branding', '1 custom logo concept, 2 revision rounds, high-resolution PNG & JPG exports, and basic color selection.', 'service', 'package', '998391', 199900, 1800, true),
  ('Logo Pro', 'Branding', '3 unique logo concepts, 3 revision rounds, color palette & typography selection, vector formats (SVG, PDF, PNG, JPG), and full source files.', 'service', 'package', '998391', 499900, 1800, true),
  ('Complete Brand Identity', 'Branding', 'Comprehensive brand identity system: logo variations, brand guideline document, color & typography system, business card & letterhead design, social profile kit, 5 branded social templates.', 'service', 'package', '998391', 1499900, 1800, true),

  -- Graphic Design
  ('Graphic Design - Basic Plan', 'Graphic Design', 'Monthly graphic design retainer: 5 social media posts, 2 digital ad creatives, 1 web banner design, 1 promotional flyer/poster, 2 revision rounds per deliverable.', 'service', 'month', '998391', 199900, 1800, true),
  ('Graphic Design - Standard Plan', 'Graphic Design', 'Monthly graphic design retainer: 12 social media posts, 4 digital ad creatives, 2 web banner designs, 2 flyers/posters, 1 bi-fold brochure, 1 business card design, 3 revision rounds.', 'service', 'month', '998391', 399900, 1800, true),
  ('Graphic Design - Premium Plan', 'Graphic Design', 'Monthly graphic design retainer: 20 social media posts, 6 ad creatives (Google & Meta), 4 banner designs, 3 flyers/posters, 2 bi-fold brochures, business card + letterhead, unlimited revisions.', 'service', 'month', '998391', 699900, 1800, true),

  -- Social Media
  ('Social Media Starter Plan', 'Social Media', 'Monthly social media package: 8 static posts, engaging captions & hashtags, monthly content calendar, basic profile & account management.', 'service', 'month', '998361', 499900, 1800, true),
  ('Social Media Growth Plan', 'Social Media', 'Monthly social media package: 12 posts, 4 reels/short videos, captions & hashtags, content calendar, post scheduling, and monthly performance report.', 'service', 'month', '998361', 899900, 1800, true),
  ('Social Media Pro Plan', 'Social Media', 'Monthly social media package: 16 posts, 8 reels/short videos, story updates, complete content strategy, post scheduling, community engagement, and analytics report.', 'service', 'month', '998361', 1499900, 1800, true),

  -- SEO & Marketing
  ('Comprehensive SEO Audit', 'SEO & Marketing', 'Full technical SEO audit, local Google Business review, site speed analysis, indexing issues report, and prioritized action checklist.', 'service', 'audit', '998313', 199900, 1800, true),
  ('SEO Growth Plan', 'SEO & Marketing', 'Monthly SEO growth program: 10–15 target keywords, on-page optimization, technical SEO fixes, content enhancement, quality backlink outreach, and monthly ranking reports.', 'service', 'month', '998365', 799900, 1800, true),
  ('Full-Funnel Marketing Pro', 'SEO & Marketing', 'Integrated monthly growth retainer: social media management, organic SEO, video reels, Google Ads & Meta Ads campaign management, and bi-weekly strategy reviews.', 'service', 'month', '998361', 2499900, 1800, true),

  -- AI & Automation
  ('AI Workflow Automation (Starter)', 'AI & Automation', 'End-to-end setup of 1 custom AI workflow (e.g. automated lead qualification, auto-reply, document parser), API integration, testing, handover & documentation.', 'service', 'workflow', '998314', 999900, 1800, true),
  ('AI Business Integration (Advanced)', 'AI & Automation', 'Multiple integrated AI workflows, custom CRM/WhatsApp/Email automation pipelines, webhook connections, user training, and rollout support.', 'service', 'project', '998314', 1999900, 1800, true),

  -- UI/UX Design
  ('UI/UX Wireframe & Prototype Sprint', 'UI/UX Design', 'User flow mapping, low/high-fidelity wireframes, and clickable interactive Figma prototype for up to 6 core application screens.', 'service', 'project', '998391', 999900, 1800, true),
  ('Full Product UI/UX Design System', 'UI/UX Design', 'End-to-end UI/UX product design for web or mobile: complete Figma design system, auto-layout components, light/dark themes, responsive viewports, and developer handoff specs.', 'service', 'project', '998391', 2499900, 1800, true),

  -- Mobile Apps
  ('Mobile App MVP', 'Mobile Apps', 'Cross-platform mobile application MVP (iOS & Android) with core features, user authentication, REST/GraphQL API integration, push notifications, and App Store readiness.', 'service', 'project', '998314', 4999900, 1800, true),
  ('Enterprise Mobile Application', 'Mobile Apps', 'Full-scale custom mobile app with real-time sync, offline storage, role-based auth, secure payment gateway, analytics tracking, and app store release management.', 'service', 'project', '998314', 9999900, 1800, true),

  -- SaaS Development
  ('SaaS MVP Platform Development', 'SaaS Development', 'Full SaaS MVP build: multi-tenant architecture, user authentication & role management, subscription billing (Stripe/Razorpay), admin dashboard, API layer, and cloud deployment.', 'service', 'project', '998314', 7499900, 1800, true),

  -- Video Editing
  ('Short-Form Reel / Video Edit', 'Video Editing', 'High-engagement short video editing (up to 60s): dynamic captions, sound design, jump cuts, visual hooks, and color grading.', 'service', 'video', '999613', 99900, 1800, true),
  ('Creator Reels & Shorts Pack (5 Videos)', 'Video Editing', 'Bundle of 5 edited reels/shorts with trendy captions, custom sound effects, transitions, B-roll overlays, and thumbnail designs.', 'service', 'pack', '999613', 449900, 1800, true),
  ('Brand Promotional / Explainer Video', 'Video Editing', 'Motion graphics explainer or brand promo video (up to 90s): storyboarding, 2D motion design, voiceover sync, and licensed background audio.', 'service', 'video', '999613', 499900, 1800, true),

  -- Cloud & DevOps
  ('Cloud Server & Deployment Setup', 'Cloud & DevOps', 'Production server configuration (VPS/Cloud), SSL certificate, Nginx reverse proxy, Node/Next.js PM2 process setup, and security firewall hardening.', 'service', 'server', '998315', 299900, 1800, true),
  ('DevOps & CI/CD Pipeline Setup', 'Cloud & DevOps', 'Automated CI/CD deployment pipeline with GitHub Actions, automated test suites, staging & production deploy stages, and Docker containerization.', 'service', 'pipeline', '998313', 999900, 1800, true),
  ('Cloud Infrastructure & Migration', 'Cloud & DevOps', 'Enterprise cloud architecture design (AWS/GCP), high availability clustering, managed database setup, automated backups, and zero-downtime workload migration.', 'service', 'project', '998315', 2499900, 1800, true)
on conflict (lower(trim(name))) do nothing;
