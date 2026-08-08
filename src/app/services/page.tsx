import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { PageHero } from "@/components/page-templates";
import { ServiceGrid, CTA } from "@/components/sections";
import { allServices } from "@/content/site-data";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/services",
  },
};


export default function Services() {
  const websitePackages = [
    {
      name: "Gavior Mini",
      price: "₹999",
      label: "Get online fast",
      delivery: "3 Days Delivery",
      idealFor: "Local Shops • Freelancers • Personal Brands",
      features: [
        "1 Page Website",
        "Mobile Responsive",
        "WhatsApp Button",
        "Basic Contact Form",
      ],
    },
    {
      name: "Gavior Starter",
      price: "₹1,999",
      label: "Most popular",
      delivery: "5–7 Days Delivery",
      idealFor: "Small Businesses • Services • Startups",
      features: [
        "3–4 Page Website",
        "Responsive Design",
        "WhatsApp Integration",
        "Basic SEO",
        "Contact Form",
      ],
      highlighted: true,
    },
    {
      name: "Gavior Grow",
      price: "₹3,999",
      label: "Built to grow",
      delivery: "7–10 Days Delivery",
      idealFor: "Growing Businesses • Brands",
      features: [
        "5–6 Page Website",
        "Premium UI Design",
        "Basic SEO",
        "WhatsApp + Lead Form",
        "Google Analytics",
        "Social Media Integration",
      ],
    },
  ];

  return (
    <>
      <Header />
      <PageHero
        eyebrow="Capabilities"
        title="Every capability your next chapter needs."
        copy="Bring us the question. Together, we’ll find the clearest path from where you are to where the business needs to go."
        action="Plan your project"
      />
      <ServiceGrid />
      <section className="bg-[#f7f5fb] py-20 md:py-28">
        <div className="shell">
          <div className="overflow-hidden rounded-[28px] bg-[#7018ff] text-white">
            <div className="grid items-center gap-8 px-7 py-9 sm:px-10 md:grid-cols-[1fr_auto] md:px-14 md:py-11">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  Websites for every stage
                </p>
                <h2 className="display mt-4 max-w-3xl text-[38px] leading-[.98] sm:text-[52px]">
                  Your business deserves a digital presence.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                  Website • Design • SEO • Digital solutions — affordable, professional and ready to grow with you.
                </p>
              </div>
              <div className="flex min-w-[190px] items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-7 py-6 text-center backdrop-blur-sm">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white/65">Starting at</span>
                  <span className="display mt-1 block text-5xl">₹999</span>
                  <span className="mt-1 block text-xs font-semibold text-white/70">Launch in just 3 days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 grid items-stretch gap-5 lg:grid-cols-3">
            {websitePackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col overflow-hidden rounded-[22px] border p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${
                  pkg.highlighted
                    ? "border-[#171717] bg-[#171717] text-white shadow-[0_18px_50px_rgba(23,23,23,.16)]"
                    : "border-[#e4dfeb] bg-white text-[#171717] shadow-[0_10px_35px_rgba(31,18,51,.05)]"
                }`}
              >
                {pkg.highlighted && (
                  <span className="absolute right-0 top-0 rounded-bl-xl bg-[#a56bff] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">
                    Most popular
                  </span>
                )}
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${pkg.highlighted ? "text-[#bda0ff]" : "text-[#7018ff]"}`}>
                    {pkg.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">{pkg.name}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <p className="display text-[46px] leading-none">{pkg.price}</p>
                    <span className={`pb-1 text-xs ${pkg.highlighted ? "text-white/55" : "text-[#667085]"}`}>one-time</span>
                  </div>
                  <span className={`mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${pkg.highlighted ? "bg-white/10 text-white/80" : "bg-[#f1eaff] text-[#7018ff]"}`}>
                    {pkg.delivery}
                  </span>
                </div>

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
                  <span className={pkg.highlighted ? "font-bold text-white" : "font-bold text-[#171717]"}>Perfect for: </span>
                  {pkg.idealFor}
                </div>
                <Link
                  href="/contact"
                  className={`button mt-5 w-full ${pkg.highlighted ? "bg-[#7018ff] text-white hover:bg-[#832fff]" : "bg-[#171717] text-white hover:bg-[#7018ff]"}`}
                >
                  Get started <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-[#667085]">
            Not sure which one fits? <Link href="/contact" className="font-bold text-[#7018ff] underline decoration-[#7018ff]/30 underline-offset-4">Tell us what you need</Link> — we’ll help you choose.
          </p>
        </div>
      </section>
      <section className="shell pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-[#e1e4e8]">
          {allServices.slice(6).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="py-5 pr-5 border-b border-[#e1e4e8] text-base font-bold hover:text-[#7018ff]"
            >
              {s.name} <span className="float-right">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <CTA />
      <Footer />
    </>
  );
}
