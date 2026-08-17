import Image from "next/image";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";

import { Footer } from "@/components/site-footer";
import { Header } from "@/components/site-header";
import { allServices } from "@/content/site-data";
import { whatsappUrl } from "@/lib/whatsapp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Services Agency in India | Web, AI, SEO & Cloud | Gavior",
  description:
    "Explore Gavior's web development, SaaS, UI/UX, branding, SEO, AI automation and cloud services. One practical team for digital products that move your business forward.",
  keywords: [
    "digital services agency India",
    "website development services",
    "SaaS development company",
    "AI automation services",
    "UI UX design services",
    "SEO and digital marketing services",
    "cloud and DevOps consulting",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "https://gavior.in/services",
    title: "Digital Services Agency in India | Gavior",
    description:
      "Websites, digital products, growth, AI and cloud services—built around the next move your business needs to make.",
    images: [
      {
        url: "/brand/gavior-social-preview.png",
        width: 1200,
        height: 630,
        alt: "Gavior digital services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Services Agency in India | Gavior",
    description:
      "Websites, digital products, growth, AI and cloud services from one connected team.",
    images: ["/brand/gavior-social-preview.png"],
  },
};

const servicesPageUrl = "https://gavior.in/services";

const servicesStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "@id": `${servicesPageUrl}#service-catalogue`,
      name: "Gavior digital services",
      description:
        "Gavior's catalogue of website, product, growth, AI, cloud and consulting services.",
      numberOfItems: allServices.length,
      itemListElement: allServices.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          description: service.short,
          url: `${servicesPageUrl}/${service.slug}`,
          provider: { "@id": "https://gavior.in/#organization" },
          areaServed: "Worldwide",
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://gavior.in" },
        { "@type": "ListItem", position: 2, name: "Services", item: servicesPageUrl },
      ],
    },
  ],
};

function serviceWhatsAppMessage(serviceName: string) {
  return `Hi Gavior, I am interested in ${serviceName}. I found it on your Services page. Please share the recommended scope, timeline, starting price and next steps.`;
}

const serviceDescriptions: Record<string, string> = {
  "custom-websites": "Fast, conversion-focused websites built around your brand and business goals.",
  "enterprise-applications": "Secure digital systems that make complex operations easier to manage.",
  "saas-development": "Subscription products designed to launch clearly and scale confidently.",
  "mobile-app-development": "Useful, native-feeling mobile experiences for customers on the move.",
  "ui-ux-design": "Research-led interfaces that make complicated tasks feel simple.",
  "e-commerce-development": "High-performing storefronts designed to turn discovery into revenue.",
  "custom-software-development": "Purpose-built software for workflows off-the-shelf tools cannot solve.",
  "api-development": "Reliable APIs that connect products, teams and business-critical data.",
  "growth-marketing": "Focused campaigns and experiments that create measurable demand.",
  "brand-identity-design": "Distinctive visual systems that make your business easier to recognise.",
  "graphic-design": "Clear, memorable creative for digital, print and everyday brand moments.",
  "video-editing-motion-graphics": "Sharp edits and motion that turn attention into understanding.",
  "search-engine-optimization": "Technical and content-led SEO built for sustainable discovery.",
  "digital-marketing": "Connected digital campaigns shaped around reach, response and return.",
  "social-media-management": "Consistent content systems that keep your brand useful and visible.",
  "content-marketing": "Practical content that earns trust before the sales conversation begins.",
  "ai-automation": "Practical intelligence woven into the way your business already works.",
  "ai-chatbots": "Helpful conversational experiences for support, sales and internal knowledge.",
  "ai-agents": "Goal-driven assistants that coordinate multi-step work with human oversight.",
  "erp-development": "Connected operational systems that bring core business processes together.",
  "crm-development": "Customer platforms shaped around the way your team actually sells.",
  "aws-solutions": "Secure, scalable AWS foundations with cost and reliability built in.",
  "azure-solutions": "Microsoft cloud environments designed for dependable enterprise delivery.",
  "google-cloud": "Modern Google Cloud architecture for data-rich, intelligent products.",
  "devops-engineering": "Delivery systems that help teams ship safely and recover quickly.",
  "ci-cd-automation": "Automated build, test and release pipelines with fewer manual handoffs.",
  "docker-kubernetes": "Portable container platforms engineered for predictable scale.",
  "vps-dedicated-servers": "Hardened server environments with performance and control in balance.",
  "linux-administration": "Reliable Linux operations, security hardening and ongoing maintenance.",
  "technical-consulting": "Senior technical direction for architecture, delivery and critical decisions.",
};

const serviceGroups = [
  {
    number: "01",
    eyebrow: "Build",
    title: "Digital products",
    copy: "From the first interface to the systems behind it, we design and build digital products people can depend on.",
    visual: "/services/digital-products-visual.png",
    grid: "lg:grid-cols-4",
    slugs: [
      "custom-websites",
      "enterprise-applications",
      "saas-development",
      "mobile-app-development",
      "ui-ux-design",
      "e-commerce-development",
      "custom-software-development",
      "api-development",
    ],
  },
  {
    number: "02",
    eyebrow: "Be seen",
    title: "Creative & growth",
    copy: "A connected mix of brand, content and performance capability that makes your business easier to notice and choose.",
    visual: "/services/creative-growth-visual.png",
    grid: "lg:grid-cols-4",
    slugs: [
      "growth-marketing",
      "brand-identity-design",
      "graphic-design",
      "video-editing-motion-graphics",
      "search-engine-optimization",
      "digital-marketing",
      "social-media-management",
      "content-marketing",
    ],
  },
  {
    number: "03",
    eyebrow: "Work smarter",
    title: "AI & business systems",
    copy: "Applied intelligence and connected operating tools that remove repetitive work while keeping people in control.",
    visual: "/services/ai-systems-visual.png",
    grid: "lg:grid-cols-5",
    slugs: [
      "ai-automation",
      "ai-chatbots",
      "ai-agents",
      "erp-development",
      "crm-development",
    ],
  },
  {
    number: "04",
    eyebrow: "Run reliably",
    title: "Cloud, infrastructure & consulting",
    copy: "Secure foundations, automated delivery and clear technical direction for products built to keep moving.",
    visual: "/services/infrastructure-visual.png",
    grid: "lg:grid-cols-3",
    slugs: [
      "aws-solutions",
      "azure-solutions",
      "google-cloud",
      "devops-engineering",
      "ci-cd-automation",
      "docker-kubernetes",
      "vps-dedicated-servers",
      "linux-administration",
      "technical-consulting",
    ],
  },
];

export default function Services() {
  const servicesBySlug = new Map(allServices.map((service) => [service.slug, service]));

  return (
    <>
      <Header floating />
      <main className="bg-[#f7f7f8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
        />
        <section className="overflow-hidden bg-[#111114] text-white">
          <div className="shell relative pb-20 pt-32 sm:pb-24 sm:pt-36 md:pb-32 md:pt-40">
            <div className="absolute -right-28 -top-32 h-[460px] w-[460px] rounded-full bg-[#7018ff] opacity-35 blur-[130px]" />
            <div className="relative max-w-4xl"><p className="eyebrow eyebrow-light">Gavior capabilities</p><h1 className="display mt-6 text-[50px] sm:text-[72px] lg:text-[94px]">Everything your<br /><span className="text-[#9f72ff]">next move needs.</span></h1><p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/65">Websites, products, growth systems, AI and infrastructure—one joined-up team for work that needs to look good, work well and keep moving.</p><div className="mt-9 flex flex-wrap gap-3"><a href={whatsappUrl("Hi Gavior, I would like to plan a project. Please help me choose the right service and share the next steps.")} target="_blank" rel="noreferrer" className="button bg-[#25D366] text-[#082d17] hover:bg-[#2ee06f]">Plan on WhatsApp <MessageCircle size={16} /></a><a href="#all-services" className="button border border-white/25 text-white hover:bg-white/10">Explore services <ArrowRight size={16} /></a></div></div>
            <div className="relative mt-14 grid max-w-3xl grid-cols-3 border-t border-white/15 pt-6 sm:grid-cols-3"><div><strong className="display text-4xl text-[#a77cff]">{allServices.length}</strong><span className="mt-2 block text-[10px] font-bold uppercase tracking-[.14em] text-white/45">Services</span></div><div><strong className="display text-4xl text-[#a77cff]">04</strong><span className="mt-2 block text-[10px] font-bold uppercase tracking-[.14em] text-white/45">Disciplines</span></div><div><strong className="display text-4xl text-[#a77cff]">01</strong><span className="mt-2 block text-[10px] font-bold uppercase tracking-[.14em] text-white/45">Connected team</span></div></div>
          </div>
        </section>
        <nav className="border-b border-[#e1dde5] bg-white"><div className="shell flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">{serviceGroups.map((group) => <a key={group.title} href={`#${group.eyebrow.toLowerCase().replaceAll(" ", "-")}`} className="shrink-0 rounded-full border border-[#e5e0ea] px-4 py-2 text-xs font-bold text-[#5f5967] transition-colors hover:border-[#7018ff] hover:bg-[#f4efff] hover:text-[#7018ff]">{group.number} · {group.title}</a>)}</div></nav>
        <div id="all-services" className="shell py-20 md:py-28">
          <div className="mb-20 grid gap-7 border-b border-[#dfe3ea] pb-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow">All services</p>
              <h2 className="display mt-5 max-w-3xl text-[42px] sm:text-[58px]">Find the capability that moves your business forward.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                [String(allServices.length), "Services"],
                ["04", "Disciplines"],
                ["01", "Partner"],
              ].map(([value, label]) => (
                <div key={label} className="min-w-[104px] rounded-2xl border border-[#e1e4e8] bg-white p-4">
                  <strong className="display block text-3xl text-[#7018ff]">{value}</strong>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#667085]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-24 md:space-y-32">
            {serviceGroups.map((group) => {
              const groupServices = group.slugs
                .map((slug) => servicesBySlug.get(slug))
                .filter((service): service is NonNullable<typeof service> => Boolean(service));

              return (
                <section id={group.eyebrow.toLowerCase().replaceAll(" ", "-")} key={group.title} className="scroll-mt-8">
                  <div className="group relative mb-8 min-h-[250px] overflow-hidden rounded-[26px] bg-[#171717] p-7 text-white sm:min-h-[290px] sm:p-9"><Image src={group.visual} alt="" fill sizes="(max-width: 1180px) 100vw, 1180px" className="object-cover object-right opacity-70 transition-transform duration-700 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#111114_8%,#111114de_39%,#11111470_74%,#11111420)]" /><div className="relative grid min-h-[194px] gap-5 md:grid-cols-[100px_1fr_1fr] md:items-end"><span className="display text-5xl text-[#a77cff]">{group.number}</span><div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#bda0ff]">{group.eyebrow}</p><h2 className="display mt-3 text-[38px] sm:text-[48px]">{group.title}</h2></div><p className="max-w-md text-sm leading-6 text-white/72 md:justify-self-end">{group.copy}</p></div></div>

                  <div className={`grid gap-4 sm:grid-cols-2 ${group.grid}`}>
                    {groupServices.map((service, index) => {
                      const Icon = service.icon;
                      const darkAccent = service.color === "#7018ff";

                      return (
                        <a
                          key={service.slug}
                          href={whatsappUrl(serviceWhatsAppMessage(service.name))}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Chat with Gavior on WhatsApp about ${service.name}`}
                          className={`group relative flex min-h-[268px] flex-col overflow-hidden rounded-[20px] border border-[#e1e4e8] bg-white p-6 shadow-[0_4px_18px_rgba(16,24,40,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#bda0ff] hover:shadow-[0_16px_36px_rgba(112,24,255,.10)] ${index === 0 ? "sm:col-span-2 sm:min-h-[330px]" : ""}`}
                        >
                          <span className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-35 blur-2xl" style={{ backgroundColor: service.color }} />
                          <div className="relative flex items-start justify-between gap-4">
                            <span
                              className="grid h-11 w-11 place-items-center rounded-xl"
                              style={{
                                backgroundColor: service.color,
                                color: darkAccent ? "#fff" : "#171717",
                              }}
                            >
                              <Icon size={19} />
                            </span>
                            <span className="text-[10px] font-extrabold tracking-[0.14em] text-[#98a2b3]">
                              {group.number}.{String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <div className="relative mt-auto pt-12">
                            <h3 className="text-[22px] font-bold leading-[1.08] tracking-[-.045em] text-[#171717]">
                              {service.name}
                            </h3>
                            <p className="mt-3 text-xs leading-5 text-[#667085]">
                              {serviceDescriptions[service.slug] ?? service.short}
                            </p>
                            <div className="mt-5 flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#7018ff]">
                                Chat on WhatsApp
                                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
                              </span>
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f1ebff] text-[#7018ff] transition-colors group-hover:bg-[#7018ff] group-hover:text-white"><ArrowUpRight size={14} /></span>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="mt-24 overflow-hidden rounded-[28px] bg-[#7018ff] p-8 text-white sm:p-12 md:mt-32 md:p-16">
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="eyebrow text-white/70 before:bg-white">Make your move</p>
                <h2 className="display mt-6 max-w-3xl text-[44px] sm:text-[62px]">
                  Not sure which service you need? Start with the outcome.
                </h2>
              </div>
              <a href={whatsappUrl("Hi Gavior, I need help choosing the right service for my business. Please share the next steps.")} target="_blank" rel="noreferrer" className="button bg-white text-[#171717]">
                Talk on WhatsApp <MessageCircle size={16} />
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
