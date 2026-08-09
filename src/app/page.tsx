import type { Metadata } from "next";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import {
  CTA,
  FAQ,
  Intro,
  KineticHero,
  Metrics,
  ProjectGrid,
  ServiceGrid,
} from "@/components/sections";
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
            <p className="eyebrow">Services at a glance</p>
            <h2 className="display mt-5 text-[43px] sm:text-[58px]">
              What services does Gavior provide?
            </h2>
            <p className="mt-6 text-[17px] leading-8 text-[#667085]">
              Gavior brings product strategy, design, engineering, growth and cloud delivery together. Businesses can start with one focused capability or combine services around a larger digital goal.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="card p-7">
              <h3 className="text-xl font-bold tracking-[-.04em]">Digital products</h3>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#667085]">
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/custom-websites">Custom website development</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/saas-development">SaaS development</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/enterprise-applications">Enterprise applications</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/ui-ux-design">UI/UX design</Link></li>
              </ul>
            </div>
            <div className="card p-7">
              <h3 className="text-xl font-bold tracking-[-.04em]">Brand & growth</h3>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#667085]">
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/brand-identity-design">Brand identity design</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/growth-marketing">Growth marketing</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/search-engine-optimization">Search engine optimization</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/content-marketing">Content marketing</Link></li>
              </ul>
            </div>
            <div className="card p-7">
              <h3 className="text-xl font-bold tracking-[-.04em]">AI, cloud & operations</h3>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#667085]">
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/ai-automation">AI automation</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/cloud-solutions">Cloud solutions</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/devops-engineering">DevOps engineering</Link></li>
                <li><Link className="font-semibold text-[#171717] hover:text-[#7018ff]" href="/services/technical-consulting">Technical consulting</Link></li>
              </ul>
            </div>
          </div>
        </section>
        <section className="bg-[#f7f7f8] py-20 md:py-28">
          <div className="shell">
            <div className="max-w-3xl">
              <p className="eyebrow">Choose a starting point</p>
              <h2 className="display mt-5 text-[43px] sm:text-[58px]">
                Which Gavior service fits your next project?
              </h2>
              <p className="mt-6 text-[17px] leading-8 text-[#667085]">
                Start with the business outcome, then choose the capability that makes that outcome practical. If your need crosses categories, we can shape one connected delivery plan.
              </p>
            </div>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-[#e1e4e8] bg-white">
              <table className="min-w-[700px] w-full border-collapse text-left">
                <caption className="sr-only">Gavior services by common business need</caption>
                <thead className="bg-[#171717] text-white">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-xs font-extrabold uppercase tracking-[.14em]">Business need</th>
                    <th scope="col" className="px-6 py-4 text-xs font-extrabold uppercase tracking-[.14em]">Best starting service</th>
                    <th scope="col" className="px-6 py-4 text-xs font-extrabold uppercase tracking-[.14em]">What it helps you do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e1e4e8] text-sm leading-6 text-[#667085]">
                  <tr>
                    <th scope="row" className="px-6 py-5 font-bold text-[#171717]">Turn more visitors into enquiries</th>
                    <td className="px-6 py-5"><Link className="font-semibold text-[#7018ff]" href="/services/custom-websites">Custom website development</Link></td>
                    <td className="px-6 py-5">Create a fast, clear digital presence around the right audience and conversion path.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-5 font-bold text-[#171717]">Launch or improve a software product</th>
                    <td className="px-6 py-5"><Link className="font-semibold text-[#7018ff]" href="/services/saas-development">SaaS development</Link></td>
                    <td className="px-6 py-5">Define the product scope, customer workflows and delivery path for a useful release.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-5 font-bold text-[#171717]">Remove repetitive operational work</th>
                    <td className="px-6 py-5"><Link className="font-semibold text-[#7018ff]" href="/services/ai-automation">AI automation</Link></td>
                    <td className="px-6 py-5">Connect real business triggers, data and review steps into a controlled workflow.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-6 py-5 font-bold text-[#171717]">Improve reliability and release speed</th>
                    <td className="px-6 py-5"><Link className="font-semibold text-[#7018ff]" href="/services/devops-engineering">Cloud & DevOps engineering</Link></td>
                    <td className="px-6 py-5">Build dependable infrastructure, delivery automation and operational visibility.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="shell py-20 md:py-28 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Technology context</p>
            <h2 className="display mt-5 text-[43px] sm:text-[58px]">
              How does Gavior choose the right technology?
            </h2>
          </div>
          <div className="text-[17px] leading-8 text-[#667085]">
            <p>Technology follows the business need. Gavior scopes the product, data, security and operating requirements first, then recommends platforms and tools that your team can realistically run and improve.</p>
            <p className="mt-5">These established technology ecosystems help explain the kinds of decisions Gavior can scope. They do not prescribe a one-size-fits-all stack.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              {technologyGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-base font-bold text-[#171717]">{group.title}</h3>
                  <ul className="mt-3 grid gap-3 text-sm leading-6">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <a
                          className="font-semibold text-[#171717] underline decoration-[#bda0ff] underline-offset-4 hover:text-[#7018ff]"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.name}
                        </a>{" "}
                        — {item.description}.
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="shell py-20 md:py-28">
          <p className="eyebrow">How we approach a project</p>
          <h2 className="display text-[43px] sm:text-[58px] mt-5 max-w-3xl">Start with the decision. Build the system around it.</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[['01', 'Clarify the problem', 'Align on the people, workflow, constraints and outcome before choosing the solution.'], ['02', 'Make the right thing visible', 'Use research, prototypes and technical planning to turn assumptions into decisions the team can review.'], ['03', 'Deliver with a practical rhythm', 'Build, test and improve in focused increments, with clear ownership at launch and beyond.']].map(([number, title, copy]) => (
              <div key={number} className="card p-7">
                <p className="text-xs font-bold text-[#7018ff]">{number}</p>
                <h3 className="text-2xl font-bold tracking-[-.04em] mt-7">{title}</h3>
                <p className="text-sm leading-6 text-[#667085] mt-4">{copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="shell py-20 grid lg:grid-cols-2 gap-8">
          <div className="rounded-[20px] bg-[#f4f4f5] p-8 sm:p-11">
            <p className="eyebrow">One connected team</p>
            <h2 className="display text-[42px] mt-6">
              Less handoff.
              <br />
              More progress.
            </h2>
            <p className="mt-6 leading-7 text-[#667085] max-w-md">
              Our strategists, designers and engineers sit on the same side of
              the table. It makes the work stronger—and the route from insight
              to impact much shorter.
            </p>
          </div>
          <div className="rounded-[20px] bg-[#171717] text-white p-8 sm:p-11 flex flex-col justify-between">
            <div>
              <p className="eyebrow eyebrow-light before:bg-[#a56bff]">A practical point of view</p>
              <h2 className="display text-[42px] mt-6">
                Beautiful only
                <br />
                matters if it works.
              </h2>
            </div>
            <p className="font-semibold max-w-sm">
              Everything we create is designed to be understood, used and
              measured in the real world.
            </p>
          </div>
        </section>
        <ProjectGrid />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
