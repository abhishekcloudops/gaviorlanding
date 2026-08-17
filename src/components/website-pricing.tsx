import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

const plans = [
  { name: "Website Starter", price: "₹4,999", bestFor: "Small businesses ready to get online", features: ["Up to 5 pages", "Mobile-responsive design", "WhatsApp and contact form", "Basic SEO setup", "Google Maps integration", "2 revision rounds"] },
  { name: "Website Growth", price: "₹19,999", bestFor: "Businesses that need a stronger digital presence", featured: true, features: ["Custom UI tailored to your brand", "Blog and content dashboard", "Advanced SEO and analytics setup", "Fast, performance-focused build", "Lead capture and conversion sections", "Training and handover"] },
  { name: "Custom Website", price: "Custom", bestFor: "Websites with specific business, content or product needs", features: ["Scope built around your goals", "Custom pages, flows and integrations", "CMS, dashboard or booking features", "E-commerce and payment options", "SEO, analytics and launch support", "Clear proposal before work starts"] },
];

export function WebsitePricing({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "bg-[#f7f5fb] py-20 md:py-28" : "scroll-mt-36 bg-[#f7f5fb] py-20 md:py-28"} id={compact ? undefined : "websites"}>
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><p className="eyebrow">Website pricing</p><h2 className="display mt-5 text-[44px] sm:text-[60px]">A website that looks<br />as serious as your business.</h2></div><p className="max-w-xl text-[16px] leading-7 text-[#667085] lg:justify-self-end">Choose a clear starting point or build a scope around exactly what your business needs next.</p></div>
        <div className="mt-11 grid items-stretch gap-5 lg:grid-cols-3">{plans.map((plan) => {
          const message = `Hi Gavior, I am interested in the ${plan.name} plan.\n\nPrice: ${plan.price}\n\nPlease share the final scope, availability and next steps.`;
          return <article key={plan.name} className={`relative flex flex-col overflow-hidden rounded-[26px] border p-7 sm:p-8 ${plan.featured ? "border-[#171717] bg-[#171717] text-white shadow-[0_24px_60px_rgba(23,23,23,.2)]" : "border-[#e3ddea] bg-white"}`}>
            {plan.featured && <span className="absolute right-0 top-0 rounded-bl-2xl bg-[#7018ff] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.16em]">Most popular</span>}
            <p className={`text-[10px] font-extrabold uppercase tracking-[.18em] ${plan.featured ? "text-[#bda0ff]" : "text-[#7018ff]"}`}>{plan.featured ? "Recommended plan" : "Starting package"}</p><h3 className="mt-3 text-2xl font-bold tracking-[-.04em]">{plan.name}</h3><div className="mt-6"><span className="display text-[50px]">{plan.price}</span><span className={`ml-2 text-xs ${plan.featured ? "text-white/50" : "text-[#77717d]"}`}>{plan.price === "Custom" ? "quote" : "one-time"}</span></div><p className={`mt-5 rounded-xl p-4 text-xs leading-5 ${plan.featured ? "bg-white/[.07] text-white/65" : "bg-[#f8f7fa] text-[#6d6772]"}`}><strong className={plan.featured ? "text-white" : "text-[#171717]"}>Best for: </strong>{plan.bestFor}</p><ul className="mt-7 flex-1 space-y-3 border-t border-current/10 pt-7">{plan.features.map((feature) => <li key={feature} className={`flex items-start gap-3 text-sm ${plan.featured ? "text-white/78" : "text-[#59535f]"}`}><CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-[#a77cff]" : "text-[#7018ff]"}`} />{feature}</li>)}</ul><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className={`button mt-7 w-full ${plan.featured ? "bg-[#7018ff] text-white hover:bg-[#832fff]" : "bg-[#171717] text-white hover:bg-[#7018ff]"}`}>Choose this plan <ArrowRight className="h-4 w-4" /></a></article>;
        })}</div>
        {compact && <div className="mt-8 text-center"><Link href="/pricing" className="button button-light">View all pricing <ArrowRight size={15} /></Link></div>}
      </div>
    </section>
  );
}
