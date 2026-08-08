import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { PageHero } from "@/components/page-templates";
import { CTA } from "@/components/sections";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development & Software Cost Breakdown | Gavior Pricing",
  description: "Transparent pricing and investment estimates for custom website development, AI automation, SaaS platforms, and mobile apps by Gavior.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function Pricing() {
  const websitePackages = [
    {
      name: "Gavior Mini",
      price: "₹999",
      label: "Get online fast",
      delivery: "3 days",
      idealFor: "Local shops, freelancers and personal brands",
      features: [
        "1 page website",
        "Mobile responsive",
        "WhatsApp button",
        "Basic contact form",
      ],
    },
    {
      name: "Gavior Starter",
      price: "₹1,999",
      label: "Most popular",
      delivery: "5–7 days",
      idealFor: "Small businesses, service providers and startups",
      features: [
        "3–4 page website",
        "Responsive design",
        "WhatsApp integration",
        "Basic SEO setup",
        "Contact form",
      ],
      highlighted: true,
    },
    {
      name: "Gavior Grow",
      price: "₹3,999",
      label: "Built to grow",
      delivery: "7–10 days",
      idealFor: "Growing businesses and established brands",
      features: [
        "5–6 page website",
        "Premium UI design",
        "Basic SEO setup",
        "WhatsApp + lead form",
        "Google Analytics",
        "Social media integration",
      ],
    },
  ];

  const tiers = [
    {
      title: "Discovery Sprint",
      tagline: "For decisions that need certainty",
      timeline: "2–3 weeks",
      investment: "Starting from $2,500",
      description: "A focused strategy, wireframing, architecture definition, and technical blueprint before engineering starts.",
      features: [
        "Product discovery & user journey mapping",
        "Technical stack & database schema blueprint",
        "High-fidelity visual UI direction",
        "Fixed-scope cost & timeline roadmap",
      ],
      highlight: false,
    },
    {
      title: "Transformation Project",
      tagline: "For a defined digital step-change",
      timeline: "From 6–12 weeks",
      investment: "Custom project scope",
      description: "A dedicated cross-functional team (Design, Frontend, Backend, AI) focused on delivering one high-impact product.",
      features: [
        "Bespoke Next.js / TypeScript engineering",
        "Custom design system & component library",
        "CMS, API & database integrations",
        "SEO, Core Web Vitals & SOC2 security",
      ],
      highlight: true,
    },
    {
      title: "Embedded Partnership",
      tagline: "For ongoing velocity & scale",
      timeline: "Monthly retainer",
      investment: "Flexible capacity",
      description: "Senior engineering and design capability integrated directly into your product team's weekly rhythm.",
      features: [
        "Dedicated senior engineers & UX designers",
        "Continuous feature delivery & AI automation",
        "24/7 SLA uptime monitoring & cloud DevOps",
        "Weekly strategic sprint reviews",
      ],
      highlight: false,
    },
  ];

  const serviceCosts = [
    {
      service: "Custom Website Development",
      range: "$2,000 – $10,000+",
      intent: "High-performance marketing sites, modern Next.js frontends, custom design systems.",
      link: "/services/custom-websites",
    },
    {
      service: "AI Workflow Automation",
      range: "$3,000 – $25,000+",
      intent: "Autonomous AI agents, document extraction pipelines, multi-system workflow integrations.",
      link: "/services/ai-automation",
    },
    {
      service: "Mobile App Development",
      range: "$5,000 – $30,000+",
      intent: "Native iOS/Android and Flutter cross-platform applications with offline synchronization.",
      link: "/services/mobile-app-development",
    },
    {
      service: "SaaS Platform Engineering",
      range: "$8,000 – $50,000+",
      intent: "Multi-tenant cloud architecture, recurring billing engines, microservices, enterprise security.",
      link: "/services/saas-development",
    },
  ];

  return (
    <>
      <Header />
      <PageHero
        eyebrow="Ways to work & pricing"
        title="Transparent investment. Measurable outcomes."
        copy="Great software engineering is an investment in business capability. We structure engagements with clear scopes, transparent deliverables, and zero hidden costs."
        action="Discuss your budget & scope"
      />

      {/* Affordable Website Packages */}
      <section className="bg-[#f7f5fb] py-16 md:py-24">
        <div className="shell">
          <div className="grid items-end gap-7 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow">Website packages</p>
              <h2 className="display mt-5 max-w-3xl text-[42px] leading-[.96] sm:text-[58px]">
                Get your business online, starting at ₹999.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#667085]">
                Professional websites with clear deliverables, fixed pricing and fast turnaround—built for businesses ready to be seen online.
              </p>
            </div>
            <div className="rounded-2xl bg-[#7018ff] px-6 py-5 text-white shadow-[0_14px_35px_rgba(112,24,255,.2)] sm:min-w-[210px]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/65">Launch offer</p>
              <p className="display mt-1 text-4xl">From ₹999</p>
              <p className="mt-1 text-xs font-semibold text-white/70">Ready in as little as 3 days</p>
            </div>
          </div>

          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
            {websitePackages.map((pkg) => (
              <article
                key={pkg.name}
                className={`relative flex flex-col overflow-hidden rounded-[24px] border p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${
                  pkg.highlighted
                    ? "border-[#171717] bg-[#171717] text-white shadow-[0_20px_55px_rgba(23,23,23,.18)]"
                    : "border-[#e4dfeb] bg-white text-[#171717] shadow-[0_10px_35px_rgba(31,18,51,.05)] hover:border-[#c7adfa]"
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute right-0 top-0 rounded-bl-xl bg-[#7018ff] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">
                    Most popular
                  </span>
                )}

                <p className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${pkg.highlighted ? "text-[#bda0ff]" : "text-[#7018ff]"}`}>
                  {pkg.label}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{pkg.name}</h3>
                <div className="mt-5 flex items-end gap-2">
                  <p className="display text-[48px] leading-none">{pkg.price}</p>
                  <span className={`pb-1 text-xs ${pkg.highlighted ? "text-white/55" : "text-[#667085]"}`}>one-time</span>
                </div>
                <span className={`mt-5 w-fit rounded-full px-3 py-1.5 text-xs font-bold ${pkg.highlighted ? "bg-white/10 text-white/80" : "bg-[#f1eaff] text-[#7018ff]"}`}>
                  Delivered in {pkg.delivery}
                </span>

                <ul className="mt-7 flex-1 space-y-3 border-t border-current/10 pt-7 text-sm">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${pkg.highlighted ? "bg-[#7018ff]" : "bg-[#f1eaff]"}`}>
                        <CheckCircle2 className={`h-3.5 w-3.5 ${pkg.highlighted ? "text-white" : "text-[#7018ff]"}`} />
                      </span>
                      <span className={pkg.highlighted ? "text-white/85" : "text-[#475467]"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-7 rounded-xl p-3.5 text-xs leading-5 ${pkg.highlighted ? "bg-white/[.07] text-white/65" : "bg-[#f8f7fa] text-[#667085]"}`}>
                  <span className={pkg.highlighted ? "font-bold text-white" : "font-bold text-[#171717]"}>Best for: </span>
                  {pkg.idealFor}
                </div>
                <Link
                  href="/contact"
                  className={`button mt-5 w-full ${pkg.highlighted ? "bg-[#7018ff] text-white hover:bg-[#832fff]" : "bg-[#171717] text-white hover:bg-[#7018ff]"}`}
                >
                  Start this package <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-[#667085]">
            Need help choosing? <Link href="/contact" className="font-bold text-[#7018ff] underline decoration-[#7018ff]/30 underline-offset-4">Tell us about your business</Link> and we’ll recommend the right package.
          </p>
        </div>
      </section>

      {/* Engagement Tiers */}
      <section className="shell grid gap-6 py-20 md:grid-cols-3 md:py-24">
        {tiers.map((t) => (
          <div
            className={`card p-8 flex flex-col rounded-2xl border transition-all ${
              t.highlight
                ? "bg-[#0b1220] text-white border-[#7018ff] shadow-xl"
                : "bg-white text-[#101828] border-[#eaecf0]"
            }`}
            key={t.title}
          >
            <p className={`text-xs font-bold uppercase tracking-widest ${t.highlight ? "text-[#c7f3ec]" : "text-[#7018ff]"}`}>
              {t.tagline}
            </p>
            <h2 className="text-2xl font-bold tracking-tight mt-4">
              {t.title}
            </h2>
            <p className={`text-sm mt-3 flex-1 ${t.highlight ? "text-gray-300" : "text-[#475467]"}`}>
              {t.description}
            </p>

            <div className="mt-6 pt-6 border-t border-current/15">
              <span className="block text-xs uppercase font-bold tracking-wider opacity-60">
                Timeline: {t.timeline}
              </span>
              <span className="block text-xl font-extrabold mt-1">
                {t.investment}
              </span>
            </div>

            <ul className="mt-6 space-y-2.5 text-xs">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${t.highlight ? "text-[#c7f3ec]" : "text-[#7018ff]"}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/book-consultation"
              className={`button mt-8 w-full ${
                t.highlight
                  ? "bg-[#7018ff] text-white hover:bg-[#6012e0]"
                  : "bg-[#0b1220] text-white hover:bg-[#1a233a]"
              }`}
            >
              Book Discovery
            </Link>
          </div>
        ))}
      </section>

      {/* High-Intent Service Cost Breakdown Table */}
      <section className="shell pb-24">
        <div className="border-t border-[#eaecf0] pt-16">
          <span className="eyebrow">Cost Guidance</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#101828] mt-3">
            Estimated Investment by Service Line
          </h2>
          <p className="text-[#475467] text-base mt-2 max-w-2xl">
            Real budget benchmarks to help your leadership team plan digital transformation initiatives.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {serviceCosts.map((sc) => (
              <div key={sc.service} className="p-7 border border-[#eaecf0] rounded-2xl bg-white hover:border-[#7018ff] transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="text-xl font-bold text-[#101828]">{sc.service}</h3>
                  <span className="px-3 py-1 bg-[#7018ff]/10 text-[#7018ff] text-xs font-bold rounded-full border border-[#7018ff]/20">
                    {sc.range}
                  </span>
                </div>
                <p className="text-sm text-[#475467] mt-3 leading-relaxed">
                  {sc.intent}
                </p>
                <Link
                  href={sc.link}
                  className="mt-5 inline-flex items-center text-xs font-bold text-[#7018ff] hover:translate-x-1 transition-transform gap-1"
                >
                  Explore service details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}
