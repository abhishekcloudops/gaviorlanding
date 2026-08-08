import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Footer } from "@/components/site-footer";
import { PageHero } from "@/components/page-templates";
import { Header } from "@/components/site-header";
import { allServices } from "@/content/site-data";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Gavior",
  description:
    "Explore Gavior services across digital products, creative growth, AI automation, cloud infrastructure and technical consulting.",
  alternates: {
    canonical: "/services",
  },
};

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
      <Header />
      <PageHero
        eyebrow="Capabilities"
        title="One team. Every digital capability."
        copy="Strategy, design, engineering, growth and infrastructure—connected around the outcome your business needs next."
        action="Plan your project"
      />

      <main className="bg-[#f7f7f8] py-20 md:py-28">
        <div className="shell">
          <div className="mb-20 grid gap-7 border-b border-[#dfe3ea] pb-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow">All services</p>
              <h2 className="display mt-5 max-w-3xl text-[42px] sm:text-[58px]">
                Everything needed to make the next move count.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["30", "Services"],
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
                <section key={group.title}>
                  <div className="mb-8 grid gap-5 md:grid-cols-[120px_1fr_1fr] md:items-end">
                    <span className="display text-5xl text-[#7018ff]/25">{group.number}</span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7018ff]">{group.eyebrow}</p>
                      <h2 className="display mt-3 text-[38px] sm:text-[48px]">{group.title}</h2>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-[#667085] md:justify-self-end">{group.copy}</p>
                  </div>

                  <div className={`grid gap-4 sm:grid-cols-2 ${group.grid}`}>
                    {groupServices.map((service, index) => {
                      const Icon = service.icon;
                      const darkAccent = service.color === "#7018ff";

                      return (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="group flex min-h-[260px] flex-col rounded-2xl border border-[#e1e4e8] bg-white p-6 shadow-[0_4px_18px_rgba(16,24,40,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#bda0ff] hover:shadow-[0_16px_36px_rgba(112,24,255,.10)]"
                        >
                          <div className="flex items-start justify-between gap-4">
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

                          <div className="mt-auto pt-12">
                            <h3 className="text-[22px] font-bold leading-[1.08] tracking-[-.045em] text-[#171717]">
                              {service.name}
                            </h3>
                            <p className="mt-3 text-xs leading-5 text-[#667085]">
                              {serviceDescriptions[service.slug] ?? service.short}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#7018ff]">
                              Explore service
                              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="mt-24 overflow-hidden rounded-[28px] bg-[#171717] p-8 text-white sm:p-12 md:mt-32 md:p-16">
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="eyebrow text-white/60 before:bg-[#a56bff]">Make your move</p>
                <h2 className="display mt-6 max-w-3xl text-[44px] sm:text-[62px]">
                  Not sure which service you need? Start with the outcome.
                </h2>
              </div>
              <Link href="/book-consultation" className="button bg-white text-[#171717]">
                Talk to Gavior <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
