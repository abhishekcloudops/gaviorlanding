"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { whatsappUrl } from "@/lib/whatsapp";

type Currency = "INR" | "USD";

const INR_PER_USD = 85;

function formatPrice(price: string, currency: Currency) {
  if (currency === "INR") return price;

  return price.replace(/₹([\d,]+)/g, (_match, amount: string) => {
    const converted = Math.round(Number(amount.replace(/,/g, "")) / INR_PER_USD);
    return `$${new Intl.NumberFormat("en-US").format(converted)}`;
  });
}

const websitePackages = [
  {
    name: "Gavior Mini",
    eyebrow: "Get online fast",
    price: "₹999",
    delivery: "3 days",
    bestFor: "Local shops, freelancers and personal brands",
    features: [
      "1-page website",
      "Mobile responsive",
      "WhatsApp button",
      "Basic contact form",
    ],
  },
  {
    name: "Gavior Starter",
    eyebrow: "Most popular",
    price: "₹1,999",
    delivery: "5–7 days",
    bestFor: "Small businesses, service providers and startups",
    features: [
      "3–4-page website",
      "Responsive design",
      "WhatsApp integration",
      "Basic SEO setup",
      "Contact form",
    ],
    featured: true,
  },
  {
    name: "Gavior Grow",
    eyebrow: "Built to grow",
    price: "₹3,999",
    delivery: "7–10 days",
    bestFor: "Growing businesses and established brands",
    features: [
      "5–6-page website",
      "Premium UI design",
      "Basic SEO setup",
      "WhatsApp + lead form",
      "Google Analytics",
      "Social media integration",
    ],
  },
];

const creativeServices = [
  { icon: "🚀", name: "Growth Marketing", price: "From ₹7,999/month", model: "Monthly" },
  { icon: "🎨", name: "Brand Identity Design", price: "From ₹1,999", model: "Per project" },
  { icon: "🖼️", name: "Graphic Design", price: "From ₹299/design", model: "Per design" },
  { icon: "📦", name: "Monthly Design Pack", price: "From ₹2,999/month", model: "Monthly" },
  { icon: "🎬", name: "Video Editing & Motion Graphics", price: "From ₹499/video", model: "Per video" },
  { icon: "🔍", name: "SEO", price: "From ₹1,499/month", model: "Monthly" },
  { icon: "📈", name: "Digital Marketing", price: "From ₹7,999/month", model: "Monthly" },
  { icon: "📱", name: "Social Media Management", price: "From ₹4,999/month", model: "Monthly" },
  { icon: "✍️", name: "Content Marketing", price: "From ₹6,999/month", model: "Monthly" },
];

const serviceGroups = [
  {
    id: "products",
    eyebrow: "Digital products",
    title: "Build the product your next stage needs.",
    copy: "Focused starting points for custom digital products. Final pricing follows the approved screens, workflows and integrations.",
    tone: "light",
    services: [
      { icon: "◫", name: "Custom Website Development", price: "From ₹6,999", model: "Per project" },
      { icon: "⌘", name: "Web App Prototype", price: "From ₹49,999", model: "Per project" },
      { icon: "◎", name: "SaaS Micro-MVP", price: "From ₹74,999", model: "Per MVP" },
      { icon: "▯", name: "Mobile App MVP", price: "From ₹49,999", model: "Per project" },
      { icon: "✦", name: "UI/UX Design", price: "From ₹7,999", model: "Up to 5 key screens" },
      { icon: "◇", name: "E-commerce Development", price: "From ₹14,999", model: "Per store" },
      { icon: "↗", name: "Custom Software Prototype", price: "From ₹49,999", model: "Per workflow" },
      { icon: "↔", name: "API Development", price: "From ₹9,999", model: "Per integration" },
    ],
  },
  {
    id: "ai-systems",
    eyebrow: "AI & business systems",
    title: "Automate one useful outcome at a time.",
    copy: "Start with a defined use case, prove its value and expand from there. Third-party API and model usage are billed separately.",
    tone: "dark",
    services: [
      { icon: "✣", name: "AI Workflow Automation", price: "From ₹14,999", model: "One workflow" },
      { icon: "◉", name: "AI Chatbot", price: "From ₹9,999", model: "One chatbot" },
      { icon: "✦", name: "AI Agent", price: "From ₹29,999", model: "One use case" },
      { icon: "▦", name: "ERP Starter Module", price: "From ₹74,999", model: "One module" },
      { icon: "◌", name: "CRM Starter", price: "From ₹39,999", model: "Core pipeline" },
    ],
  },
  {
    id: "infrastructure",
    eyebrow: "Cloud & infrastructure",
    title: "A reliable foundation for what you build.",
    copy: "One-time setup and ongoing support for launch infrastructure, deployments and day-to-day operations.",
    tone: "light",
    services: [
      { icon: "☁", name: "AWS / Azure / GCP Setup", price: "From ₹9,999", model: "Per environment" },
      { icon: "↻", name: "DevOps Engineering", price: "From ₹14,999", model: "Per project" },
      { icon: "⇢", name: "CI/CD Automation", price: "From ₹7,999", model: "Per pipeline" },
      { icon: "⬡", name: "Docker Starter", price: "From ₹14,999", model: "Single service" },
      { icon: "▰", name: "VPS Setup", price: "From ₹2,999", model: "One-time setup" },
      { icon: "⌁", name: "Linux Administration", price: "From ₹2,999/month", model: "Monthly" },
      { icon: "?", name: "Technical Consulting", price: "From ₹999/hour", model: "Hourly" },
    ],
  },
];

const faqs = [
  ["Are these prices final?", "Website package prices apply to the listed scope. Every “starting from” price is confirmed after requirements, integrations and timelines are agreed."],
  ["Are domain and hosting included?", "No, unless your package or proposal explicitly includes them. We can help you select, purchase and configure both."],
  ["Can I combine different services?", "Yes. We can combine website, design, marketing, AI and infrastructure work into one practical proposal."],
  ["Are ad spend, cloud and AI usage included?", "No. Advertising spend, cloud-provider bills, paid tools and AI/API usage are separate unless listed in your proposal."],
];

function SectionIntro({ eyebrow, title, copy, inverted = false }: { eyebrow: string; title: string; copy: string; inverted?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
      <div>
        <p className={`text-[11px] font-extrabold uppercase tracking-[.18em] ${inverted ? "text-[#bda0ff]" : "text-[#7018ff]"}`}>{eyebrow}</p>
        <h2 className="display mt-4 max-w-3xl text-[42px] leading-[.96] sm:text-[58px]">{title}</h2>
      </div>
      <p className={`max-w-xl text-[15px] leading-7 lg:justify-self-end ${inverted ? "text-white/60" : "text-[#667085]"}`}>{copy}</p>
    </div>
  );
}

function PriceRows({ services, currency, inverted = false }: { services: { icon: string; name: string; price: string; model: string }[]; currency: Currency; inverted?: boolean }) {
  return (
    <div className={`mt-10 overflow-hidden rounded-[24px] border ${inverted ? "border-white/10 bg-white/[.035]" : "border-[#e6e1ec] bg-white shadow-[0_14px_45px_rgba(37,20,64,.055)]"}`}>
      <div className={`hidden grid-cols-[1fr_220px_170px] gap-5 border-b px-7 py-4 text-[10px] font-extrabold uppercase tracking-[.17em] md:grid ${inverted ? "border-white/10 text-white/38" : "border-[#ebe7f0] text-[#8a8492]"}`}>
        <span>Service</span><span>Starting price</span><span>Pricing</span>
      </div>
      {services.map((service) => {
        const displayedPrice = formatPrice(service.price, currency);

        return <a
          href={whatsappUrl(
            `Hi Gavior, I am interested in your ${service.name} service.\n\nDisplayed price: ${displayedPrice}\nPricing model: ${service.model}\n\nPlease share the included deliverables, expected timeline, revision limits and final quotation.`,
          )}
          target="_blank"
          rel="noreferrer"
          key={service.name}
          className={`group grid gap-4 border-b px-5 py-5 transition-colors last:border-0 sm:px-7 md:grid-cols-[1fr_220px_170px] md:items-center ${inverted ? "border-white/10 hover:bg-white/[.06]" : "border-[#eeeaf2] hover:bg-[#faf8fd]"}`}
        >
          <span className="flex min-w-0 items-center gap-4">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg ${inverted ? "bg-white/10" : "bg-[#f1eaff]"}`}>{service.icon}</span>
            <span className={`font-bold tracking-[-.02em] ${inverted ? "text-white" : "text-[#171717]"}`}>{service.name}</span>
          </span>
          <span className={`text-lg font-extrabold tracking-[-.035em] ${inverted ? "text-[#cbb3ff]" : "text-[#7018ff]"}`}>{displayedPrice}</span>
          <span className={`flex items-center justify-between gap-3 text-sm ${inverted ? "text-white/55" : "text-[#667085]"}`}>
            {service.model}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>;
      })}
    </div>
  );
}

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [locationResolved, setLocationResolved] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    fetch(`/api/visitor-country?timezone=${encodeURIComponent(timezone)}`, {
      signal: controller.signal,
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Location lookup failed")))
      .then((data: { currency?: Currency }) => {
        if (data.currency === "INR" || data.currency === "USD") setCurrency(data.currency);
      })
      .catch(() => {
        if (timezone !== "Asia/Kolkata") setCurrency("USD");
      })
      .finally(() => setLocationResolved(true));

    return () => controller.abort();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[#e8e3ed] bg-white">
          <div className="absolute left-1/2 top-[-260px] h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-[#7018ff]/10 blur-[100px]" />
          <div className="shell relative py-20 text-center sm:py-28 md:py-32">
            <p className="eyebrow justify-center">Simple, transparent pricing</p>
            <h1 className="display mx-auto mt-6 max-w-5xl text-[48px] leading-[.93] sm:text-[72px] lg:text-[92px]">
              Start small. <span className="text-[#7018ff]">Build what matters.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-7 text-[#667085] sm:text-lg">
              Clear starting prices for websites, creative work, software, AI and infrastructure—with the scope confirmed before work begins.
            </p>
            <p className="mt-4 text-xs font-bold text-[#7018ff]" aria-live="polite">
              {locationResolved
                ? currency === "INR" ? "Prices shown in INR for India" : "Prices shown in USD for your region"
                : "Setting prices for your region…"}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="#website-packages" className="button bg-[#171717] text-white hover:bg-black">Explore pricing <ArrowRight className="h-4 w-4" /></a>
              <Link href="/book-consultation" className="button border border-[#ddd7e5] bg-white text-[#171717] hover:border-[#7018ff]">Get a custom estimate</Link>
            </div>
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-7 gap-y-3 border-t border-black/10 pt-6 text-[11px] font-bold uppercase tracking-[.11em] text-[#7a7480]">
              <span>Clear deliverables</span><span>No hidden service fees</span><span>Scope approved first</span>
            </div>
          </div>
        </section>

        <nav aria-label="Pricing categories" className="sticky top-[78px] z-30 border-b border-black/10 bg-white/90 backdrop-blur-xl">
          <div className="shell flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
            {[
              ["Websites", "#website-packages"],
              ["Creative & growth", "#creative-growth"],
              ["Digital products", "#products"],
              ["AI & systems", "#ai-systems"],
              ["Cloud & infrastructure", "#infrastructure"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="shrink-0 rounded-full border border-[#e5e0ea] bg-white px-4 py-2 text-xs font-bold text-[#625c68] transition-colors hover:border-[#7018ff] hover:text-[#7018ff]">{label}</a>
            ))}
          </div>
        </nav>

        <section id="website-packages" className="scroll-mt-36 bg-[#f7f5fb] py-20 md:py-28">
          <div className="shell">
            <SectionIntro eyebrow="Website packages" title={`Your digital presence starts at ${formatPrice("₹999", currency)}.`} copy="Fast, fixed-scope websites for local businesses, freelancers, startups and growing brands." />
            <div className="mt-11 grid items-stretch gap-5 lg:grid-cols-3">
              {websitePackages.map((pkg) => (
                <article key={pkg.name} className={`relative flex flex-col overflow-hidden rounded-[26px] border p-7 sm:p-8 ${pkg.featured ? "border-[#171717] bg-[#171717] text-white shadow-[0_24px_60px_rgba(23,23,23,.2)]" : "border-[#e3ddea] bg-white shadow-[0_12px_38px_rgba(37,20,64,.05)]"}`}>
                  {pkg.featured && <span className="absolute right-0 top-0 rounded-bl-2xl bg-[#7018ff] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.16em]">Most popular</span>}
                  <p className={`text-[10px] font-extrabold uppercase tracking-[.18em] ${pkg.featured ? "text-[#bda0ff]" : "text-[#7018ff]"}`}>{pkg.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-.04em]">{pkg.name}</h3>
                  <div className="mt-6 flex items-end gap-2"><span className="display text-[52px]">{formatPrice(pkg.price, currency)}</span><span className={`pb-1.5 text-xs ${pkg.featured ? "text-white/50" : "text-[#77717d]"}`}>one-time</span></div>
                  <span className={`mt-5 w-fit rounded-full px-3 py-1.5 text-xs font-bold ${pkg.featured ? "bg-white/10 text-white/75" : "bg-[#f1eaff] text-[#7018ff]"}`}>Delivered in {pkg.delivery}</span>
                  <ul className="mt-7 flex-1 space-y-3 border-t border-current/10 pt-7">
                    {pkg.features.map((feature) => <li key={feature} className={`flex items-start gap-3 text-sm ${pkg.featured ? "text-white/78" : "text-[#59535f]"}`}><CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.featured ? "text-[#a77cff]" : "text-[#7018ff]"}`} />{feature}</li>)}
                  </ul>
                  <p className={`mt-7 rounded-xl p-4 text-xs leading-5 ${pkg.featured ? "bg-white/[.07] text-white/60" : "bg-[#f8f7fa] text-[#6d6772]"}`}><strong className={pkg.featured ? "text-white" : "text-[#171717]"}>Best for: </strong>{pkg.bestFor}</p>
                  <a
                    href={whatsappUrl(
                      `Hi Gavior, I want to choose the ${pkg.name} website package.\n\nPrice: ${formatPrice(pkg.price, currency)} one-time\nDelivery: ${pkg.delivery}\nBest for: ${pkg.bestFor}\n\nIncluded:\n${pkg.features.map((feature) => `• ${feature}`).join("\n")}\n\nPlease confirm the final scope, availability, payment process, and domain/hosting charges.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className={`button mt-5 w-full ${pkg.featured ? "bg-[#7018ff] text-white hover:bg-[#832fff]" : "bg-[#171717] text-white hover:bg-[#7018ff]"}`}
                  >
                    Choose {pkg.name.replace("Gavior ", "")} <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-7 text-center text-xs leading-6 text-[#77717d]">Domain, hosting, premium assets, copywriting and custom backend features are quoted separately unless included in your proposal.{currency === "USD" ? " USD prices are rounded estimates; final invoice currency is confirmed in your proposal." : ""}</p>
          </div>
        </section>

        <section id="creative-growth" className="scroll-mt-36 bg-white py-20 md:py-28">
          <div className="shell">
            <SectionIntro eyebrow="Creative & growth services" title="Creative support that keeps your brand moving." copy="Book a single deliverable or choose monthly support. Each plan is shaped around a clear volume, channel and revision limit." />
            <PriceRows services={creativeServices} currency={currency} />
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["Creative Essentials", "From ₹2,999/month", "A practical monthly design pack for brands that need consistent output."],
                ["Brand Momentum", "From ₹9,999/month", "Design, short-form edits and a lightweight monthly content plan."],
                ["Growth Partner", "From ₹14,999/month", "Campaign, content and performance support in one engagement."],
              ].map(([name, price, copy]) => <div key={name} className="flex flex-col rounded-2xl border border-[#e8e3ed] bg-[#faf9fc] p-6"><p className="text-sm font-bold">{name}</p><p className="mt-3 text-xl font-extrabold text-[#7018ff]">{formatPrice(price, currency)}</p><p className="mt-3 flex-1 text-xs leading-5 text-[#6d6772]">{copy}</p><a href={whatsappUrl(`Hi Gavior, I want to choose the ${name} creative plan.\n\nDisplayed price: ${formatPrice(price, currency)}\nPlan summary: ${copy}\n\nPlease share the complete deliverables, monthly limits, revisions, timeline and payment process.`)} target="_blank" rel="noreferrer" className="button mt-5 w-full bg-[#171717] text-white hover:bg-[#7018ff]">Choose this plan <ArrowRight className="h-4 w-4" /></a></div>)}
            </div>
            <p className="mt-6 text-xs leading-6 text-[#77717d]">Advertising spend, influencer fees, paid tools, stock assets and production costs are separate. Deliverable volume and platforms are confirmed before the monthly plan begins.</p>
          </div>
        </section>

        {serviceGroups.map((group) => {
          const inverted = group.tone === "dark";
          return (
            <section id={group.id} key={group.id} className={`scroll-mt-36 py-20 md:py-28 ${inverted ? "bg-[#111016] text-white" : "bg-[#f7f5fb]"}`}>
              <div className="shell">
                <SectionIntro eyebrow={group.eyebrow} title={group.title} copy={group.copy} inverted={inverted} />
                <PriceRows services={group.services} currency={currency} inverted={inverted} />
                {group.id === "products" && <p className="mt-6 text-xs leading-6 text-[#77717d]">Micro-MVP and prototype prices cover a tightly defined first version. Complex permissions, native applications, multi-tenant architecture, subscriptions and production scaling require a custom estimate.</p>}
                {group.id === "infrastructure" && <p className="mt-6 text-xs leading-6 text-[#77717d]">Cloud-provider charges, licences and paid monitoring tools are separate. Production Kubernetes, migrations, high availability and multi-environment infrastructure require a custom estimate.</p>}
              </div>
            </section>
          );
        })}

        <section className="bg-white py-20 md:py-28">
          <div className="shell grid gap-12 lg:grid-cols-[.72fr_1fr]">
            <div>
              <p className="eyebrow">Good to know</p>
              <h2 className="display mt-5 text-[42px] sm:text-[58px]">Clear before we begin.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#667085]">No vague packages and no surprise additions. We confirm scope, timing, payment milestones and exclusions in writing.</p>
              <Link href="/book-consultation" className="button mt-7 bg-[#7018ff] text-white hover:bg-[#5d10df]">Get a custom estimate <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="border-t border-[#e7e2eb]">
              {faqs.map(([question, answer]) => <details key={question} className="group border-b border-[#e7e2eb] py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold tracking-[-.02em]"><span>{question}</span><span className="text-xl font-light text-[#7018ff] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-3 text-sm leading-7 text-[#667085]">{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="bg-[#7018ff] py-16 text-white md:py-20">
          <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-white/55">Your next move</p><h2 className="display mt-3 max-w-3xl text-[40px] sm:text-[56px]">Not sure which service fits?</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/70">Tell us the outcome you need. We’ll recommend the most practical starting point and budget.</p></div>
            <Link href="/contact" className="button shrink-0 bg-white text-[#4c0fb1] hover:bg-[#f4edff]">Talk to Gavior <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
