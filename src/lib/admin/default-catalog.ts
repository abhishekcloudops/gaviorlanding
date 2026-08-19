export type DefaultCatalogPlan = {
  name: string;
  category: string;
  description: string;
  item_type: "service" | "product";
  unit: string;
  sac_hsn: string;
  unit_price_paise: number;
  tax_rate_bps: number;
};

export const DEFAULT_GAVIOR_PLANS: DefaultCatalogPlan[] = [
  // ─── Website Development ───
  {
    name: "Website Mini / Landing Page",
    category: "Websites",
    description: "Single-page responsive landing page with WhatsApp CTA, contact form, mobile-first design, basic SEO, fast loading, and 1 revision round.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 99900, // ₹999
    tax_rate_bps: 1800,
  },
  {
    name: "Website Starter",
    category: "Websites",
    description: "Up to 5 pages mobile-responsive website, WhatsApp integration & contact form, basic SEO setup, Google Maps embed, and 2 revision rounds.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 499900, // ₹4,999
    tax_rate_bps: 1800,
  },
  {
    name: "Website Standard",
    category: "Websites",
    description: "Multi-page dynamic business website (up to 8-10 pages) with standard CMS, lead generation forms, animations, performance optimization, and on-page SEO.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 999900, // ₹9,999
    tax_rate_bps: 1800,
  },
  {
    name: "Website Growth",
    category: "Websites",
    description: "Custom UI tailored to brand, blog & content dashboard, advanced SEO & analytics setup, fast build, lead capture sections, training & handover.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 1999900, // ₹19,999
    tax_rate_bps: 1800,
  },
  {
    name: "Custom Web Application / E-Commerce",
    category: "Websites",
    description: "Custom web application or e-commerce platform with payment gateway integration, admin dashboard, user authentication, database flows, and launch support.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 4999900, // ₹49,999
    tax_rate_bps: 1800,
  },

  // ─── Branding & Identity ───
  {
    name: "Logo Starter",
    category: "Branding",
    description: "1 custom logo concept, 2 revision rounds, high-resolution PNG & JPG exports, and basic color selection.",
    item_type: "service",
    unit: "package",
    sac_hsn: "998391",
    unit_price_paise: 199900, // ₹1,999
    tax_rate_bps: 1800,
  },
  {
    name: "Logo Pro",
    category: "Branding",
    description: "3 unique logo concepts, 3 revision rounds, color palette & typography selection, vector formats (SVG, PDF, PNG, JPG), and full source files.",
    item_type: "service",
    unit: "package",
    sac_hsn: "998391",
    unit_price_paise: 499900, // ₹4,999
    tax_rate_bps: 1800,
  },
  {
    name: "Complete Brand Identity",
    category: "Branding",
    description: "Comprehensive brand identity system: logo variations, brand guideline document, color & typography system, business card & letterhead design, social profile kit, 5 branded social templates.",
    item_type: "service",
    unit: "package",
    sac_hsn: "998391",
    unit_price_paise: 1499900, // ₹14,999
    tax_rate_bps: 1800,
  },

  // ─── Graphic Design Packages ───
  {
    name: "Graphic Design - Basic Plan",
    category: "Graphic Design",
    description: "Monthly graphic design retainer: 5 social media posts, 2 digital ad creatives, 1 web banner design, 1 promotional flyer/poster, 2 revision rounds per deliverable.",
    item_type: "service",
    unit: "month",
    sac_hsn: "998391",
    unit_price_paise: 199900, // ₹1,999/mo
    tax_rate_bps: 1800,
  },
  {
    name: "Graphic Design - Standard Plan",
    category: "Graphic Design",
    description: "Monthly graphic design retainer: 12 social media posts, 4 digital ad creatives, 2 web banner designs, 2 flyers/posters, 1 bi-fold brochure, 1 business card design, 3 revision rounds.",
    item_type: "service",
    unit: "month",
    sac_hsn: "998391",
    unit_price_paise: 399900, // ₹3,999/mo
    tax_rate_bps: 1800,
  },
  {
    name: "Graphic Design - Premium Plan",
    category: "Graphic Design",
    description: "Monthly graphic design retainer: 20 social media posts, 6 ad creatives (Google & Meta), 4 banner designs, 3 flyers/posters, 2 bi-fold brochures, business card + letterhead, unlimited revisions.",
    item_type: "service",
    unit: "month",
    sac_hsn: "998391",
    unit_price_paise: 699900, // ₹6,999/mo
    tax_rate_bps: 1800,
  },

  // ─── Social Media Management ───
  {
    name: "Social Media Starter Plan",
    category: "Social Media",
    description: "Monthly social media package: 8 static posts, engaging captions & hashtags, monthly content calendar, basic profile & account management.",
    item_type: "service",
    unit: "month",
    sac_hsn: "998361",
    unit_price_paise: 499900, // ₹4,999/mo
    tax_rate_bps: 1800,
  },
  {
    name: "Social Media Growth Plan",
    category: "Social Media",
    description: "Monthly social media package: 12 posts, 4 reels/short videos, captions & hashtags, content calendar, post scheduling, and monthly performance report.",
    item_type: "service",
    unit: "month",
    sac_hsn: "998361",
    unit_price_paise: 899900, // ₹8,999/mo
    tax_rate_bps: 1800,
  },
  {
    name: "Social Media Pro Plan",
    category: "Social Media",
    description: "Monthly social media package: 16 posts, 8 reels/short videos, story updates, complete content strategy, post scheduling, community engagement, and analytics report.",
    item_type: "service",
    unit: "month",
    sac_hsn: "998361",
    unit_price_paise: 1499900, // ₹14,999/mo
    tax_rate_bps: 1800,
  },

  // ─── SEO & Digital Marketing ───
  {
    name: "Comprehensive SEO Audit",
    category: "SEO & Marketing",
    description: "Full technical SEO audit, local Google Business review, site speed analysis, indexing issues report, and prioritized action checklist.",
    item_type: "service",
    unit: "audit",
    sac_hsn: "998313",
    unit_price_paise: 199900, // ₹1,999
    tax_rate_bps: 1800,
  },
  {
    name: "SEO Growth Plan",
    category: "SEO & Marketing",
    description: "Monthly SEO growth program: 10–15 target keywords, on-page optimization, technical SEO fixes, content enhancement, quality backlink outreach, and monthly ranking reports.",
    item_type: "service",
    unit: "month",
    sac_hsn: "998365",
    unit_price_paise: 799900, // ₹7,999/mo
    tax_rate_bps: 1800,
  },
  {
    name: "Full-Funnel Marketing Pro",
    category: "SEO & Marketing",
    description: "Integrated monthly growth retainer: social media management, organic SEO, video reels, Google Ads & Meta Ads campaign management, and bi-weekly strategy reviews.",
    item_type: "service",
    unit: "month",
    sac_hsn: "998361",
    unit_price_paise: 2499900, // ₹24,999/mo
    tax_rate_bps: 1800,
  },

  // ─── AI & Workflow Automation ───
  {
    name: "AI Workflow Automation (Starter)",
    category: "AI & Automation",
    description: "End-to-end setup of 1 custom AI workflow (e.g. automated lead qualification, auto-reply, document parser), API integration, testing, handover & documentation.",
    item_type: "service",
    unit: "workflow",
    sac_hsn: "998314",
    unit_price_paise: 999900, // ₹9,999
    tax_rate_bps: 1800,
  },
  {
    name: "AI Business Integration (Advanced)",
    category: "AI & Automation",
    description: "Multiple integrated AI workflows, custom CRM/WhatsApp/Email automation pipelines, webhook connections, user training, and rollout support.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 1999900, // ₹19,999
    tax_rate_bps: 1800,
  },

  // ─── UI/UX Design ───
  {
    name: "UI/UX Wireframe & Prototype Sprint",
    category: "UI/UX Design",
    description: "User flow mapping, low/high-fidelity wireframes, and clickable interactive Figma prototype for up to 6 core application screens.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998391",
    unit_price_paise: 999900, // ₹9,999
    tax_rate_bps: 1800,
  },
  {
    name: "Full Product UI/UX Design System",
    category: "UI/UX Design",
    description: "End-to-end UI/UX product design for web or mobile: complete Figma design system, auto-layout components, light/dark themes, responsive viewports, and developer handoff specs.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998391",
    unit_price_paise: 2499900, // ₹24,999
    tax_rate_bps: 1800,
  },

  // ─── Mobile App Development ───
  {
    name: "Mobile App MVP",
    category: "Mobile Apps",
    description: "Cross-platform mobile application MVP (iOS & Android) with core features, user authentication, REST/GraphQL API integration, push notifications, and App Store readiness.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 4999900, // ₹49,999
    tax_rate_bps: 1800,
  },
  {
    name: "Enterprise Mobile Application",
    category: "Mobile Apps",
    description: "Full-scale custom mobile app with real-time sync, offline storage, role-based auth, secure payment gateway, analytics tracking, and app store release management.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 9999900, // ₹99,999
    tax_rate_bps: 1800,
  },

  // ─── SaaS Application Development ───
  {
    name: "SaaS MVP Platform Development",
    category: "SaaS Development",
    description: "Full SaaS MVP build: multi-tenant architecture, user authentication & role management, subscription billing (Stripe/Razorpay), admin dashboard, API layer, and cloud deployment.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998314",
    unit_price_paise: 7499900, // ₹74,999
    tax_rate_bps: 1800,
  },

  // ─── Video Editing & Motion Graphics ───
  {
    name: "Short-Form Reel / Video Edit",
    category: "Video Editing",
    description: "High-engagement short video editing (up to 60s): dynamic captions, sound design, jump cuts, visual hooks, and color grading.",
    item_type: "service",
    unit: "video",
    sac_hsn: "999613",
    unit_price_paise: 99900, // ₹999
    tax_rate_bps: 1800,
  },
  {
    name: "Creator Reels & Shorts Pack (5 Videos)",
    category: "Video Editing",
    description: "Bundle of 5 edited reels/shorts with trendy captions, custom sound effects, transitions, B-roll overlays, and thumbnail designs.",
    item_type: "service",
    unit: "pack",
    sac_hsn: "999613",
    unit_price_paise: 449900, // ₹4,499
    tax_rate_bps: 1800,
  },
  {
    name: "Brand Promotional / Explainer Video",
    category: "Video Editing",
    description: "Motion graphics explainer or brand promo video (up to 90s): storyboarding, 2D motion design, voiceover sync, and licensed background audio.",
    item_type: "service",
    unit: "video",
    sac_hsn: "999613",
    unit_price_paise: 499900, // ₹4,999
    tax_rate_bps: 1800,
  },

  // ─── Cloud & DevOps ───
  {
    name: "Cloud Server & Deployment Setup",
    category: "Cloud & DevOps",
    description: "Production server configuration (VPS/Cloud), SSL certificate, Nginx reverse proxy, Node/Next.js PM2 process setup, and security firewall hardening.",
    item_type: "service",
    unit: "server",
    sac_hsn: "998315",
    unit_price_paise: 299900, // ₹2,999
    tax_rate_bps: 1800,
  },
  {
    name: "DevOps & CI/CD Pipeline Setup",
    category: "Cloud & DevOps",
    description: "Automated CI/CD deployment pipeline with GitHub Actions, automated test suites, staging & production deploy stages, and Docker containerization.",
    item_type: "service",
    unit: "pipeline",
    sac_hsn: "998313",
    unit_price_paise: 999900, // ₹9,999
    tax_rate_bps: 1800,
  },
  {
    name: "Cloud Infrastructure & Migration",
    category: "Cloud & DevOps",
    description: "Enterprise cloud architecture design (AWS/GCP), high availability clustering, managed database setup, automated backups, and zero-downtime workload migration.",
    item_type: "service",
    unit: "project",
    sac_hsn: "998315",
    unit_price_paise: 2499900, // ₹24,999
    tax_rate_bps: 1800,
  },
];
