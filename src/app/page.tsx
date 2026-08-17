import type { Metadata } from "next";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import {
  CTA,
  ClientReviews,
  FAQ,
  Intro,
  KineticHero,
  Metrics,
  ServiceStrip,
  ServiceGrid,
} from "@/components/sections";
import { WebsitePricing } from "@/components/website-pricing";
import { faqs, services } from "@/content/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gavior — Web Development, AI Automation & Digital Products",
  description: "Gavior builds custom websites, SaaS products, cloud systems and AI automation for ambitious businesses across India and beyond.",
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      en: "/",
    },
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

const homeServiceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Gavior digital services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.name,
      url: `https://gavior.in/services/${service.slug}`,
      provider: { "@id": "https://gavior.in/#organization" },
    },
  })),
};

const technologyGroups = [
  {
    title: "Product development",
    items: [
      { name: "React", url: "https://en.wikipedia.org/wiki/React_(software)", description: "a component-based user-interface library" },
      { name: "Next.js", url: "https://en.wikipedia.org/wiki/Next.js", description: "a framework for production web applications" },
    ],
  },
  {
    title: "Cloud platforms",
    items: [
      { name: "Amazon Web Services", url: "https://en.wikipedia.org/wiki/Amazon_Web_Services", description: "a cloud-computing platform" },
      { name: "Microsoft Azure", url: "https://en.wikipedia.org/wiki/Microsoft_Azure", description: "Microsoft’s cloud platform" },
      { name: "Google Cloud Platform", url: "https://en.wikipedia.org/wiki/Google_Cloud_Platform", description: "Google’s cloud platform" },
    ],
  },
  {
    title: "Delivery & AI systems",
    items: [
      { name: "Docker", url: "https://en.wikipedia.org/wiki/Docker_(software)", description: "container packaging for consistent releases" },
      { name: "Kubernetes", url: "https://en.wikipedia.org/wiki/Kubernetes", description: "container orchestration for scalable operations" },
      { name: "OpenAI", url: "https://en.wikipedia.org/wiki/OpenAI", description: "an AI platform relevant to automation workflows" },
    ],
  },
];

const homeEntitySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://gavior.in/#home",
  url: "https://gavior.in/",
  name: "Gavior — Web Development, AI Automation & Digital Products",
  about: technologyGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Thing",
      name: item.name,
      sameAs: item.url,
    })),
  ),
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="home-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceListSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeEntitySchema) }}
        />
        <KineticHero />
        <ServiceStrip />
        <Intro
          eyebrow="The Gavior difference"
          title="Clarity is a competitive advantage."
          copy="We bring strategy, craft and engineering together—so every decision serves the bigger picture and every detail earns its place."
        />
        <Metrics />
        <ServiceGrid />
        <section className="bg-[#f7f7f8] py-20 md:py-28">
          <div className="shell grid lg:grid-cols-[.9fr_1.1fr] gap-12">
            <div>
              <p className="eyebrow">Digital product and engineering partner</p>
              <h2 className="display text-[43px] sm:text-[58px] mt-5">What Gavior helps businesses build.</h2>
            </div>
            <div className="text-[17px] leading-8 text-[#667085] grid gap-5">
              <p>Gavior works with organisations that need a clearer digital presence, a more useful product or a better way to operate. Our work spans custom website development, SaaS products, enterprise applications, UI/UX design, cloud engineering and AI workflow automation.</p>
              <p>Every engagement starts by understanding the business decision behind the request: the audience, the workflow, the systems involved and the outcome that would make the investment worthwhile. That lets strategy, design and engineering move in one direction.</p>
              <p>Whether you need a focused discovery sprint, a defined product release or ongoing delivery support, we help shape the scope into a practical plan your team can understand and own.</p>
              <Link href="/services" className="font-bold text-[#7018ff]">Explore all Gavior services →</Link>
            </div>
          </div>
        </section>
        <section className="shell py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">The outcomes that matter</p>
            <h2 className="display mt-5 text-[43px] sm:text-[58px]">Make progress people can actually feel.</h2>
            <p className="mt-6 text-[17px] leading-8 text-[#667085]">A stronger website, a simpler workflow or a clearer product should make a visible difference to the people running your business and the people choosing it.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[['01', 'Earn attention', 'Make a sharp first impression with a brand and digital presence that is clear from the first scroll.'], ['02', 'Remove friction', 'Turn complicated customer journeys and internal tasks into useful, considered experiences.'], ['03', 'Build momentum', 'Create digital foundations your team can launch, learn from and improve over time.']].map(([number, title, copy]) => <div key={number} className="card p-7"><p className="text-xs font-bold text-[#7018ff]">{number}</p><h3 className="mt-10 text-2xl font-bold tracking-[-.04em]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#667085]">{copy}</p></div>)}
          </div>
        </section>
        <section className="bg-[#f7f7f8] py-20 md:py-28">
          <div className="shell grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div><p className="eyebrow">How we work together</p><h2 className="display mt-5 text-[43px] sm:text-[58px]">Enough structure to move fast.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[['A clear first step', 'Bring the idea, problem or opportunity. We will help identify the most useful next move.'], ['One joined-up team', 'Strategy, design and engineering stay connected, so the work does not get lost in handoffs.'], ['Built in the open', 'See real progress in focused working sessions, prototypes and releases—not a big reveal at the end.'], ['A launch you can own', 'We leave you with a practical handover, clear priorities and a product ready to keep improving.']].map(([title, copy]) => <div key={title} className="rounded-2xl bg-white p-6"><h3 className="text-lg font-bold tracking-[-.04em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#667085]">{copy}</p></div>)}
            </div>
          </div>
        </section>
        <WebsitePricing compact />
        <ClientReviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
