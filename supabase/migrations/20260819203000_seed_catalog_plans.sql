-- Seed default Gavior service plans into catalog_items
do $$
declare
  v_admin_id uuid;
begin
  -- Find an admin or active profile to set as created_by
  select id into v_admin_id from public.profiles where role = 'admin' order by created_at asc limit 1;
  
  if v_admin_id is null then
    select id into v_admin_id from public.profiles order by created_at asc limit 1;
  end if;

  if v_admin_id is null then
    select id into v_admin_id from auth.users order by created_at asc limit 1;
  end if;

  if v_admin_id is not null then
    -- Websites
    if not exists (select 1 from public.catalog_items where name = 'Website Mini / Landing Page') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Website Mini / Landing Page', 'Single-page responsive landing page with WhatsApp CTA, contact form, mobile-first design, basic SEO, fast loading, and 1 revision round.', 'service', 'project', '998314', 99900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Website Starter') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Website Starter', 'Up to 5 pages mobile-responsive website, WhatsApp integration & contact form, basic SEO setup, Google Maps embed, and 2 revision rounds.', 'service', 'project', '998314', 499900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Website Standard') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Website Standard', 'Multi-page dynamic business website (up to 8-10 pages) with standard CMS, lead generation forms, animations, performance optimization, and on-page SEO.', 'service', 'project', '998314', 999900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Website Growth') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Website Growth', 'Custom UI tailored to brand, blog & content dashboard, advanced SEO & analytics setup, fast build, lead capture sections, training & handover.', 'service', 'project', '998314', 1999900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Custom Web Application / E-Commerce') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Custom Web Application / E-Commerce', 'Custom web application or e-commerce platform with payment gateway integration, admin dashboard, user authentication, database flows, and launch support.', 'service', 'project', '998314', 4999900, 1800, true, v_admin_id);
    end if;

    -- Branding & Identity
    if not exists (select 1 from public.catalog_items where name = 'Logo Starter') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Logo Starter', '1 custom logo concept, 2 revision rounds, high-resolution PNG & JPG exports, and basic color selection.', 'service', 'package', '998391', 199900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Logo Pro') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Logo Pro', '3 unique logo concepts, 3 revision rounds, color palette & typography selection, vector formats (SVG, PDF, PNG, JPG), and full source files.', 'service', 'package', '998391', 499900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Complete Brand Identity') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Complete Brand Identity', 'Comprehensive brand identity system: logo variations, brand guideline document, color & typography system, business card & letterhead design, social profile kit, 5 branded social templates.', 'service', 'package', '998391', 1499900, 1800, true, v_admin_id);
    end if;

    -- Graphic Design Packages
    if not exists (select 1 from public.catalog_items where name = 'Graphic Design - Basic Plan') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Graphic Design - Basic Plan', 'Monthly graphic design retainer: 5 social media posts, 2 digital ad creatives, 1 web banner design, 1 promotional flyer/poster, 2 revision rounds per deliverable.', 'service', 'month', '998391', 199900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Graphic Design - Standard Plan') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Graphic Design - Standard Plan', 'Monthly graphic design retainer: 12 social media posts, 4 digital ad creatives, 2 web banner designs, 2 flyers/posters, 1 bi-fold brochure, 1 business card design, 3 revision rounds.', 'service', 'month', '998391', 399900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Graphic Design - Premium Plan') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Graphic Design - Premium Plan', 'Monthly graphic design retainer: 20 social media posts, 6 ad creatives (Google & Meta), 4 banner designs, 3 flyers/posters, 2 bi-fold brochures, business card + letterhead, unlimited revisions.', 'service', 'month', '998391', 699900, 1800, true, v_admin_id);
    end if;

    -- Social Media Management
    if not exists (select 1 from public.catalog_items where name = 'Social Media Starter Plan') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Social Media Starter Plan', 'Monthly social media package: 8 static posts, engaging captions & hashtags, monthly content calendar, basic profile & account management.', 'service', 'month', '998361', 499900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Social Media Growth Plan') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Social Media Growth Plan', 'Monthly social media package: 12 posts, 4 reels/short videos, captions & hashtags, content calendar, post scheduling, and monthly performance report.', 'service', 'month', '998361', 899900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Social Media Pro Plan') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Social Media Pro Plan', 'Monthly social media package: 16 posts, 8 reels/short videos, story updates, complete content strategy, post scheduling, community engagement, and analytics report.', 'service', 'month', '998361', 1499900, 1800, true, v_admin_id);
    end if;

    -- SEO & Digital Marketing
    if not exists (select 1 from public.catalog_items where name = 'Comprehensive SEO Audit') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Comprehensive SEO Audit', 'Full technical SEO audit, local Google Business review, site speed analysis, indexing issues report, and prioritized action checklist.', 'service', 'audit', '998313', 199900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'SEO Growth Plan') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('SEO Growth Plan', 'Monthly SEO growth program: 10–15 target keywords, on-page optimization, technical SEO fixes, content enhancement, quality backlink outreach, and monthly ranking reports.', 'service', 'month', '998365', 799900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Full-Funnel Marketing Pro') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Full-Funnel Marketing Pro', 'Integrated monthly growth retainer: social media management, organic SEO, video reels, Google Ads & Meta Ads campaign management, and bi-weekly strategy reviews.', 'service', 'month', '998361', 2499900, 1800, true, v_admin_id);
    end if;

    -- AI & Automation
    if not exists (select 1 from public.catalog_items where name = 'AI Workflow Automation (Starter)') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('AI Workflow Automation (Starter)', 'End-to-end setup of 1 custom AI workflow (e.g. automated lead qualification, auto-reply, document parser), API integration, testing, handover & documentation.', 'service', 'workflow', '998314', 999900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'AI Business Integration (Advanced)') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('AI Business Integration (Advanced)', 'Multiple integrated AI workflows, custom CRM/WhatsApp/Email automation pipelines, webhook connections, user training, and rollout support.', 'service', 'project', '998314', 1999900, 1800, true, v_admin_id);
    end if;

    -- UI/UX Design
    if not exists (select 1 from public.catalog_items where name = 'UI/UX Wireframe & Prototype Sprint') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('UI/UX Wireframe & Prototype Sprint', 'User flow mapping, low/high-fidelity wireframes, and clickable interactive Figma prototype for up to 6 core application screens.', 'service', 'project', '998391', 999900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Full Product UI/UX Design System') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Full Product UI/UX Design System', 'End-to-end UI/UX product design for web or mobile: complete Figma design system, auto-layout components, light/dark themes, responsive viewports, and developer handoff specs.', 'service', 'project', '998391', 2499900, 1800, true, v_admin_id);
    end if;

    -- Mobile Apps
    if not exists (select 1 from public.catalog_items where name = 'Mobile App MVP') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Mobile App MVP', 'Cross-platform mobile application MVP (iOS & Android) with core features, user authentication, REST/GraphQL API integration, push notifications, and App Store readiness.', 'service', 'project', '998314', 4999900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Enterprise Mobile Application') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Enterprise Mobile Application', 'Full-scale custom mobile app with real-time sync, offline storage, role-based auth, secure payment gateway, analytics tracking, and app store release management.', 'service', 'project', '998314', 9999900, 1800, true, v_admin_id);
    end if;

    -- SaaS Development
    if not exists (select 1 from public.catalog_items where name = 'SaaS MVP Platform Development') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('SaaS MVP Platform Development', 'Full SaaS MVP build: multi-tenant architecture, user authentication & role management, subscription billing (Stripe/Razorpay), admin dashboard, API layer, and cloud deployment.', 'service', 'project', '998314', 7499900, 1800, true, v_admin_id);
    end if;

    -- Video Editing
    if not exists (select 1 from public.catalog_items where name = 'Short-Form Reel / Video Edit') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Short-Form Reel / Video Edit', 'High-engagement short video editing (up to 60s): dynamic captions, sound design, jump cuts, visual hooks, and color grading.', 'service', 'video', '999613', 99900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Creator Reels & Shorts Pack (5 Videos)') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Creator Reels & Shorts Pack (5 Videos)', 'Bundle of 5 edited reels/shorts with trendy captions, custom sound effects, transitions, B-roll overlays, and thumbnail designs.', 'service', 'pack', '999613', 449900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Brand Promotional / Explainer Video') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Brand Promotional / Explainer Video', 'Motion graphics explainer or brand promo video (up to 90s): storyboarding, 2D motion design, voiceover sync, and licensed background audio.', 'service', 'video', '999613', 499900, 1800, true, v_admin_id);
    end if;

    -- Cloud & DevOps
    if not exists (select 1 from public.catalog_items where name = 'Cloud Server & Deployment Setup') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Cloud Server & Deployment Setup', 'Production server configuration (VPS/Cloud), SSL certificate, Nginx reverse proxy, Node/Next.js PM2 process setup, and security firewall hardening.', 'service', 'server', '998315', 299900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'DevOps & CI/CD Pipeline Setup') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('DevOps & CI/CD Pipeline Setup', 'Automated CI/CD deployment pipeline with GitHub Actions, automated test suites, staging & production deploy stages, and Docker containerization.', 'service', 'pipeline', '998313', 999900, 1800, true, v_admin_id);
    end if;

    if not exists (select 1 from public.catalog_items where name = 'Cloud Infrastructure & Migration') then
      insert into public.catalog_items (name, description, item_type, unit, sac_hsn, unit_price_paise, tax_rate_bps, active, created_by)
      values ('Cloud Infrastructure & Migration', 'Enterprise cloud architecture design (AWS/GCP), high availability clustering, managed database setup, automated backups, and zero-downtime workload migration.', 'service', 'project', '998315', 2499900, 1800, true, v_admin_id);
    end if;

  end if;
end $$;
