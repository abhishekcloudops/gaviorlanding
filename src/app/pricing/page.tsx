import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { whatsappUrl } from "@/lib/whatsapp";

type Plan = {
  name: string;
  price: string;
  cadence: string;
  bestFor: string;
  features: string[];
  featured?: boolean;
};

type Category = {
  id: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  copy: string;
  note: string;
  plans: Plan[];
};

const categories: Category[] = [
  {
    id: "websites",
    navLabel: "Websites",
    eyebrow: "Website development",
    title: "A professional website, without the enterprise price tag.",
    copy: "Focused website packages for local businesses, founders and growing service brands that need to look credible and convert enquiries.",
    note: "Domain, hosting, premium assets, copywriting and custom backend features are quoted separately unless included in your proposal.",
    plans: [
      { name: "Gavior Mini", price: "₹1,999", cadence: "one-time", bestFor: "Personal brands and local businesses", features: ["1-page website", "Mobile responsive", "WhatsApp CTA", "Contact form", "Basic SEO", "1 revision", "3-day delivery"] },
      { name: "Gavior Starter", price: "₹4,999", cadence: "one-time", bestFor: "Small businesses ready to get online", featured: true, features: ["Up to 3 pages", "Responsive design", "WhatsApp and contact form", "Basic SEO", "Google Maps integration", "2 revisions"] },
      { name: "Gavior Pro", price: "₹19,999", cadence: "one-time", bestFor: "Professional brands that need a stronger digital presence", features: ["Up to 10 pages", "Custom UI/UX", "Advanced SEO setup", "Analytics", "Performance optimisation", "Blog/CMS", "3 revisions"] },
    ],
  },
  {
    id: "branding",
    navLabel: "Branding",
    eyebrow: "Branding",
    title: "Make a first impression that feels like you.",
    copy: "Practical visual identity packages for businesses that need a clear, consistent brand without an oversized agency engagement.",
    note: "Printing, paid fonts, stock assets and additional brand applications are separate unless they are listed in the confirmed scope.",
    plans: [
      { name: "Logo Starter", price: "₹1,999", cadence: "one-time", bestFor: "A simple, polished logo refresh", features: ["1 logo concept", "2 revisions", "PNG and JPG files", "Basic colour selection"] },
      { name: "Logo Pro", price: "₹4,999", cadence: "one-time", bestFor: "Businesses ready for a flexible logo system", featured: true, features: ["3 logo concepts", "3 revisions", "Colour palette and typography", "PNG, JPG, SVG and PDF", "Source files"] },
      { name: "Complete Brand Identity", price: "₹14,999", cadence: "one-time", bestFor: "Teams launching or repositioning a brand", features: ["Logo variations", "Colour palette and typography", "Business card and letterhead", "Social profile kit", "Brand usage guide", "5 branded social templates"] },
    ],
  },
  {
    id: "social-media",
    navLabel: "Social Media",
    eyebrow: "Social media management",
    title: "Content support that keeps your brand visible.",
    copy: "Lean monthly content packages for SMBs that need a reliable social presence, clear messaging and consistent creative output.",
    note: "Ad spend, influencer fees, paid tools, stock assets and on-location shoots are not included. Deliverables and channels are confirmed before each month begins.",
    plans: [
      { name: "Social Starter", price: "₹4,999", cadence: "/month", bestFor: "A consistent, lightweight social presence", features: ["8 static posts", "Captions and hashtags", "Content calendar", "Basic account management"] },
      { name: "Social Growth", price: "₹8,999", cadence: "/month", bestFor: "Brands ready to add short-form video", featured: true, features: ["12 posts", "4 reels", "Captions and hashtags", "Content calendar", "Scheduling", "Monthly report"] },
      { name: "Social Pro", price: "₹14,999", cadence: "/month", bestFor: "Businesses investing in consistent growth", features: ["16 posts", "8 reels", "Stories", "Content strategy", "Scheduling", "Basic community management", "Monthly analytics"] },
    ],
  },
  {
    id: "seo-marketing",
    navLabel: "SEO & Marketing",
    eyebrow: "SEO and digital marketing",
    title: "Get found, then turn attention into enquiries.",
    copy: "Choose a focused audit, an SEO growth plan or a joined-up marketing programme based on the outcome your business needs next.",
    note: "Advertising spend, third-party tools, content production and paid directory fees are separate unless explicitly included in your proposal.",
    plans: [
      { name: "SEO Audit", price: "₹1,999", cadence: "one-time", bestFor: "Finding the highest-impact fixes first", features: ["Website SEO audit", "Local visibility review", "Priority action list", "Plain-English recommendations"] },
      { name: "SEO Growth", price: "₹7,999", cadence: "/month", bestFor: "Businesses building sustainable search visibility", featured: true, features: ["10–15 target keywords", "On-page SEO", "Technical SEO", "Content optimisation", "Backlink work", "Monthly report"] },
      { name: "Marketing Pro", price: "₹24,999", cadence: "/month", bestFor: "Businesses wanting one accountable growth partner", features: ["Social media support", "SEO", "Reels and content", "Google/Meta ads management", "Monthly strategy", "Monthly analytics"] },
    ],
  },
  {
    id: "ai-cloud",
    navLabel: "AI & Cloud",
    eyebrow: "AI and cloud support",
    title: "Set up smarter systems, one useful outcome at a time.",
    copy: "Straightforward support for secure launches, simpler workflows and the practical automation work that saves teams time.",
    note: "Cloud-provider charges, paid AI tools, third-party subscriptions and custom integrations are separate. Complex infrastructure is scoped after a discovery call.",
    plans: [
      { name: "Server Setup", price: "₹2,999", cadence: "one-time", bestFor: "A dependable first home for your site or application", features: ["Server configuration", "Deployment setup", "Basic security hardening", "Handover guidance"] },
      { name: "AI Automation", price: "₹9,999", cadence: "one-time", bestFor: "Removing one repeatable manual workflow", featured: true, features: ["1 custom workflow", "AI integration", "Automation setup", "Testing", "Handover guidance"] },
      { name: "AI Business", price: "₹19,999+", cadence: "per project", bestFor: "Teams connecting several everyday business systems", features: ["Multiple workflows", "API integrations", "CRM, WhatsApp or email automation", "Custom implementation", "Testing and rollout support"] },
    ],
  },
];

function PlanCard({ plan, category }: { plan: Plan; category: string }) {
  const message = `Hi Gavior, I am interested in the ${plan.name} plan under ${category}.\n\nPrice: ${plan.price}${plan.cadence === "/month" ? "/month" : ""}\nBest for: ${plan.bestFor}\n\nPlease confirm the final scope, availability, payment process, revision limits and anything not included.`;

  return (
    <article className={`relative flex flex-col overflow-hidden rounded-[26px] border p-7 sm:p-8 ${plan.featured ? "border-[#171717] bg-[#171717] text-white shadow-[0_24px_60px_rgba(23,23,23,.2)]" : "border-[#e3ddea] bg-white shadow-[0_12px_38px_rgba(37,20,64,.05)]"}`}>
      {plan.featured && <span className="absolute right-0 top-0 rounded-bl-2xl bg-[#7018ff] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.16em]">Most popular</span>}
      <p className={`text-[10px] font-extrabold uppercase tracking-[.18em] ${plan.featured ? "text-[#bda0ff]" : "text-[#7018ff]"}`}>{plan.featured ? "Recommended plan" : "Starting package"}</p>
      <h3 className="mt-3 text-2xl font-bold tracking-[-.04em]">{plan.name}</h3>
      <div className="mt-6 flex items-end gap-2"><span className="display text-[50px]">{plan.price}</span><span className={`pb-1.5 text-xs ${plan.featured ? "text-white/50" : "text-[#77717d]"}`}>{plan.cadence}</span></div>
      <p className={`mt-5 rounded-xl p-4 text-xs leading-5 ${plan.featured ? "bg-white/[.07] text-white/65" : "bg-[#f8f7fa] text-[#6d6772]"}`}><strong className={plan.featured ? "text-white" : "text-[#171717]"}>Best for: </strong>{plan.bestFor}</p>
      <ul className="mt-7 flex-1 space-y-3 border-t border-current/10 pt-7">
        {plan.features.map((feature) => <li key={feature} className={`flex items-start gap-3 text-sm ${plan.featured ? "text-white/78" : "text-[#59535f]"}`}><CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-[#a77cff]" : "text-[#7018ff]"}`} />{feature}</li>)}
      </ul>
      <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className={`button mt-7 w-full ${plan.featured ? "bg-[#7018ff] text-white hover:bg-[#832fff]" : "bg-[#171717] text-white hover:bg-[#7018ff]"}`}>Choose this plan <ArrowRight className="h-4 w-4" /></a>
    </article>
  );
}

export default function Pricing() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-[#e8e3ed] bg-white">
          <div className="absolute left-1/2 top-[-260px] h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-[#7018ff]/10 blur-[100px]" />
          <div className="shell relative py-20 text-center sm:py-28 md:py-32">
            <p className="eyebrow justify-center">Simple, transparent pricing</p>
            <h1 className="display mx-auto mt-6 max-w-5xl text-[48px] leading-[.93] sm:text-[72px] lg:text-[92px]">Start small. <span className="text-[#7018ff]">Build with confidence.</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-7 text-[#667085] sm:text-lg">Affordable, professional digital services for Indian businesses ready to take their next step online.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3"><a href="#websites" className="button bg-[#171717] text-white hover:bg-black">Explore pricing <ArrowRight className="h-4 w-4" /></a><Link href="/book-consultation" className="button border border-[#ddd7e5] bg-white text-[#171717] hover:border-[#7018ff]">Get a custom estimate</Link></div>
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-7 gap-y-3 border-t border-black/10 pt-6 text-[11px] font-bold uppercase tracking-[.11em] text-[#7a7480]"><span>Clear deliverables</span><span>Transparent starting prices</span><span>Scope approved first</span></div>
          </div>
        </section>

        <nav aria-label="Pricing categories" className="sticky top-[78px] z-30 border-b border-black/10 bg-white/90 backdrop-blur-xl"><div className="shell flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">{categories.map((category) => <a key={category.id} href={`#${category.id}`} className="shrink-0 rounded-full border border-[#e5e0ea] bg-white px-4 py-2 text-xs font-bold text-[#625c68] transition-colors hover:border-[#7018ff] hover:text-[#7018ff]">{category.navLabel}</a>)}</div></nav>

        {categories.map((category, index) => <section id={category.id} key={category.id} className={`scroll-mt-36 py-20 md:py-28 ${index % 2 ? "bg-white" : "bg-[#f7f5fb]"}`}>
          <div className="shell">
            <div className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><p className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#7018ff]">{category.eyebrow}</p><h2 className="display mt-4 max-w-3xl text-[42px] leading-[.96] sm:text-[58px]">{category.title}</h2></div><p className="max-w-xl text-[15px] leading-7 text-[#667085] lg:justify-self-end">{category.copy}</p></div>
            <div className="mt-11 grid items-stretch gap-5 lg:grid-cols-3">{category.plans.map((plan) => <PlanCard key={plan.name} plan={plan} category={category.navLabel} />)}</div>
            <p className="mt-7 text-center text-xs leading-6 text-[#77717d]">{category.note}</p>
          </div>
        </section>)}

        <section className="bg-white py-20 md:py-28"><div className="shell grid gap-12 lg:grid-cols-[.72fr_1fr]"><div><p className="eyebrow">Good to know</p><h2 className="display mt-5 text-[42px] sm:text-[58px]">Clear before we begin.</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#667085]">We confirm scope, timeline, payment milestones and exclusions in writing before work starts.</p><Link href="/book-consultation" className="button mt-7 bg-[#7018ff] text-white hover:bg-[#5d10df]">Get a custom estimate <ArrowRight className="h-4 w-4" /></Link></div><div className="rounded-[24px] border border-[#e7e2eb] bg-[#faf9fc] p-7 sm:p-9"><p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#7018ff]">Need something different?</p><h3 className="mt-4 text-2xl font-bold tracking-[-.04em]">We can tailor the scope.</h3><p className="mt-4 text-sm leading-7 text-[#667085]">Tell us your goal, budget and deadline. We&apos;ll recommend the most practical package or put together a clear custom proposal.</p><a href={whatsappUrl("Hi Gavior, I need a custom package. My goal, budget and timeline are:")} target="_blank" rel="noreferrer" className="button mt-7 bg-[#171717] text-white hover:bg-[#7018ff]">Discuss my project <ArrowRight className="h-4 w-4" /></a></div></div></section>
      </main>
      <Footer />
    </>
  );
}
