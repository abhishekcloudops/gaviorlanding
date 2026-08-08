import {
  ArrowUpRight,
  Bot,
  Braces,
  Cloud,
  LayoutPanelTop,
  Megaphone,
  Palette,
  Smartphone,
} from "lucide-react";

export const services = [
  {
    slug: "custom-websites",
    name: "Custom website development",
    short: "High-performance sites that turn attention into action.",
    icon: LayoutPanelTop,
    tag: "Build your digital front door",
    color: "#7018ff",
  },
  {
    slug: "enterprise-applications",
    name: "Enterprise web applications",
    short: "Complex workflows made intuitive, dependable and secure.",
    icon: Braces,
    tag: "Operate without friction",
    color: "#c9dcff",
  },
  {
    slug: "saas-development",
    name: "SaaS development",
    short: "Subscription products designed for scale from the first release.",
    icon: Cloud,
    tag: "Launch with conviction",
    color: "#ffe1bb",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile app development",
    short: "Native-feeling mobile experiences for customers on the move.",
    icon: Smartphone,
    tag: "Be useful everywhere",
    color: "#ffd1c9",
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX design",
    short: "Clear, considered interfaces for moments that matter.",
    icon: Palette,
    tag: "Make complexity feel simple",
    color: "#ddcdfd",
  },
  {
    slug: "ai-automation",
    name: "AI automation",
    short: "Practical intelligence woven into the way your business works.",
    icon: Bot,
    tag: "Put repetitive work on autopilot",
    color: "#c7f3ec",
  },
  {
    slug: "growth-marketing",
    name: "Growth & performance marketing",
    short: "Signals, systems and campaigns that create measurable demand.",
    icon: Megaphone,
    tag: "Find your next customer",
    color: "#fcd6ef",
  },
];
export const allServices = [
  ...services,
  ...[
    "E-commerce development",
    "Brand identity design",
    "Graphic design",
    "Video editing & motion graphics",
    "Search engine optimization",
    "Digital marketing",
    "Social media management",
    "Content marketing",
    "AI chatbots",
    "AI agents",
    "Custom software development",
    "ERP development",
    "CRM development",
    "AWS solutions",
    "Azure solutions",
    "Google Cloud",
    "DevOps engineering",
    "CI/CD automation",
    "Docker & Kubernetes",
    "VPS & dedicated servers",
    "Linux administration",
    "API development",
    "Technical consulting",
  ].map((name, i) => ({
    slug: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, ""),
    name,
    short:
      "Strategic capability, expertly delivered for businesses ready to build forward.",
    icon: ArrowUpRight,
    tag: "Make the next move",
    color: ["#7018ff", "#c9dcff", "#ffe1bb", "#ffd1c9"][i % 4],
  })),
];
export const projects = [
  {
    slug: "nimbus-health",
    name: "Nimbus Health",
    type: "Healthcare platform",
    description: "A calmer way for patients to find, book and manage care.",
    result: "38% more completed bookings",
    color: "#4a8a92",
  },
  {
    slug: "vanta-commerce",
    name: "Vanta Commerce",
    type: "Retail intelligence",
    description: "A commerce operating system for brands that refuse to guess.",
    result: "2.4× faster campaign launch",
    color: "#7561e8",
  },
  {
    slug: "northstar-logistics",
    name: "Northstar",
    type: "Logistics command centre",
    description: "One clear view of a moving, global operation.",
    result: "18 hours saved per team, weekly",
    color: "#d4764b",
  },
];
export const industries = [
  "Healthcare",
  "Education",
  "Finance",
  "Real estate",
  "Travel & hospitality",
  "Manufacturing",
  "Construction",
  "Retail",
  "Restaurants",
  "E-commerce",
  "Technology",
  "Automotive",
  "Logistics",
  "NGOs",
  "Government",
  "Startups",
  "Personal brands",
];
export const faqs = [
  [
    "What does Gavior do?",
    "Gavior designs and builds custom websites, SaaS products, enterprise applications, UI/UX systems and AI workflow automations for organisations that need digital work to create practical business value.",
  ],
  [
    "What does an engagement with Gavior look like?",
    "We begin with the business problem and desired outcome, then define the right scope, team and delivery plan. You work directly with the people designing and building the solution.",
  ],
  [
    "Can Gavior work with our internal team?",
    "Yes. Gavior can work alongside internal product, design, marketing and engineering teams, adding focused strategy, design or implementation capability where it is needed.",
  ],
  [
    "How are projects scoped and priced?",
    "Project scope and investment depend on the problem, requirements, technical complexity and delivery approach. Gavior offers discovery work, defined projects and ongoing partnerships.",
  ],
  [
    "Where does Gavior work?",
    "Gavior is based in India and works with teams across time zones. Project collaboration is planned around the people, goals and operating rhythm of each engagement.",
  ],
];

// --- Route slug sources of truth -------------------------------------------
// These bound the dynamic routes. `industries/[slug]` and `blog/[slug]` used to
// title-case whatever string was in the URL and return 200 for it, which made
// the URL space infinite and let anyone render arbitrary text as an <h1> on
// this domain. Both routes now resolve against the data below and 404 otherwise,
// so link generation, generateStaticParams and the sitemap cannot drift apart.

export const industrySlug = (name: string) =>
  name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");



/** Hardcoded service pages under src/app/services/<slug>/page.tsx. */
export const hardcodedServiceSlugs = [
  "ai-automation",
  "branding",
  "cloud-solutions",
  "devops",
  "digital-marketing",
  "graphic-design",
  "mobile-app-development",
  "motion-graphics",
  "saas-development",
  "seo-services",
  "ui-ux-design",
  "video-editing",
  "website-development",
];
