import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services | Gavior",
  description:
    "Technical SEO, content strategy, and link building. Rank #1 on Google with our proven SEO services. 150%+ organic traffic increase.",
  keywords: [
    "SEO services",
    "search engine optimization",
    "technical SEO",
    "content strategy",
    "link building",
  ],
  openGraph: {
    title: "SEO Services | Gavior",
    description: "Rank #1 on Google",
    type: "website",
  },
};

export default function SEOServices() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">SEO Services</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Rank #1 on Google
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              Technical SEO, content strategy, and link building. We've helped 100+ businesses achieve 150%+ organic traffic growth and top Google rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold">
                Get SEO Audit
              </button>
              <button className="px-6 py-3 border border-black rounded-lg font-semibold">
                View Case Studies
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">SEO Results You Can Expect</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "150%+ Traffic Growth",
                description:
                  "Average organic traffic increase of 150-300% within 6 months of optimization",
              },
              {
                title: "Top 3 Rankings",
                description:
                  "Achieve first-page rankings for your primary keywords and stay competitive",
              },
              {
                title: "Qualified Leads",
                description:
                  "Organic traffic converts 2-3x better than paid traffic with lower CPA",
              },
              {
                title: "Better ROI",
                description:
                  "SEO provides long-term, sustainable growth with better ROI than PPC",
              },
              {
                title: "Local SEO",
                description:
                  "Dominate local search results with optimized Google My Business and citations",
              },
              {
                title: "Sustainable Growth",
                description:
                  "Organic traffic continues generating leads long after initial investment",
              },
            ].map((benefit, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-[#667085]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our SEO Services</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Technical SEO Audit",
                description:
                  "Complete audit of site structure, speed, mobile-friendliness, and indexability",
              },
              {
                step: 2,
                title: "On-Page Optimization",
                description:
                  "Optimize title tags, meta descriptions, headers, images, and content for keywords",
              },
              {
                step: 3,
                title: "Content Strategy",
                description:
                  "Develop content plan targeting high-value keywords with strong search intent",
              },
              {
                step: 4,
                title: "Link Building",
                description:
                  "Earn high-quality backlinks from relevant, authoritative websites",
              },
              {
                step: 5,
                title: "Local SEO",
                description:
                  "Optimize for local search including Google My Business and local citations",
              },
              {
                step: 6,
                title: "Monthly Reporting",
                description:
                  "Detailed reports with rankings, traffic, conversions, and recommendations",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 pb-6 border-b last:border-b-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#667085]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools & Technology */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">SEO Tools & Technology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Rank Tracking", tools: "Semrush, Ahrefs, SE Ranking" },
              {
                category: "Technical SEO",
                tools: "Screaming Frog, GTmetrix, PageSpeed",
              },
              { category: "Analytics", tools: "Google Analytics 4, Search Console" },
              { category: "Research", tools: "Semrush, Ahrefs, Moz" },
              {
                category: "Content",
                tools: "Surfer SEO, Clearscope, MarketMuse",
              },
              { category: "Backlinks", tools: "Ahrefs, Semrush, Majestic" },
              { category: "Monitoring", tools: "Google Alerts, Brand24" },
              { category: "Reporting", tools: "Data Studio, Google Sheets" },
            ].map((tech, i) => (
              <div key={i} className="p-6 bg-[#f4f4f5] rounded-xl">
                <h3 className="font-bold mb-3">{tech.category}</h3>
                <p className="text-sm text-[#667085]">{tech.tools}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">SEO Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Audit Only",
                price: "$2,000",
                description: "One-time comprehensive audit",
                features: [
                  "Full technical audit",
                  "Competitor analysis",
                  "Keyword research",
                  "40+ recommendations",
                  "Detailed report",
                  "One-time service",
                ],
              },
              {
                name: "Monthly Management",
                price: "$2K-5K",
                description: "Full SEO management",
                features: [
                  "On-page optimization",
                  "Content strategy",
                  "Link building",
                  "Rank tracking",
                  "Monthly reporting",
                  "Ongoing optimization",
                ],
                featured: true,
              },
              {
                name: "Annual Program",
                price: "$20K-50K",
                description: "Comprehensive annual SEO",
                features: [
                  "Everything in monthly",
                  "Dedicated account manager",
                  "Weekly strategy calls",
                  "Custom content plan",
                  "Advanced analytics",
                  "Guaranteed improvements",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl border-2 ${
                  plan.featured
                    ? "border-black bg-[#f4f4f5]"
                    : "border-[#e1e4e8]"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-[#667085] mb-4">{plan.description}</p>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">SEO Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "How long does SEO take to show results?",
                a: "Typically 3-6 months to see measurable results. We focus on sustainable growth, not quick wins.",
              },
              {
                q: "Is SEO better than Google Ads?",
                a: "Both work great together. SEO gives long-term sustainable growth; Ads give immediate visibility.",
              },
              {
                q: "What if I'm already using an SEO agency?",
                a: "We can audit your current SEO strategy and provide recommendations for improvement.",
              },
              {
                q: "How do you measure SEO success?",
                a: "Rankings, organic traffic, conversions, and revenue. We track all metrics in monthly reports.",
              },
              {
                q: "Can you guarantee #1 rankings?",
                a: "No one can guarantee rankings. We guarantee effort and improvement. Top 3 rankings achievable for most keywords.",
              },
              {
                q: "What about voice search and AI?",
                a: "We optimize for voice search, featured snippets, and new ranking factors as Google evolves.",
              },
            ].map((faq, i) => (
              <details key={i} className="border border-[#e1e4e8] rounded-lg p-4">
                <summary className="font-bold cursor-pointer">{faq.q}</summary>
                <p className="mt-3 text-[#667085]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 shell text-center">
          <h2 className="display text-4xl mb-6">Ready to dominate Google?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Get a free SEO audit and discover exactly what's holding your rankings back.
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg">
            Get Free SEO Audit
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
