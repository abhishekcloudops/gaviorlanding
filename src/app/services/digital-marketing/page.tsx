import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Gavior",
  description:
    "PPC, social media, email marketing, and content strategy. Grow your business online with data-driven digital marketing.",
  keywords: [
    "digital marketing",
    "PPC advertising",
    "social media marketing",
    "email marketing",
    "content marketing",
  ],
  openGraph: {
    title: "Digital Marketing Services | Gavior",
    description: "Grow your business online",
    type: "website",
  },
  alternates: {
    canonical: "/services/digital-marketing",
  },
};

export default function DigitalMarketing() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Digital Marketing</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Grow your business online
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              PPC, social media, email marketing, and content strategy. Data-driven digital marketing that delivers 3-5x ROI on ad spend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start Campaign
              </Link>
              <Link
                href="/case-studies"
                className="px-6 py-3 border border-black rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Digital marketing services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Google Ads Management",
                description:
                  "Search, Display, and Shopping ads optimized for maximum ROAS",
              },
              {
                title: "Facebook & Instagram Ads",
                description:
                  "Targeted social ads with pixel tracking and conversion optimization",
              },
              {
                title: "LinkedIn Ads",
                description:
                  "B2B advertising on LinkedIn for lead generation and brand awareness",
              },
              {
                title: "Social Media Management",
                description:
                  "Content creation, posting, engagement, and community building",
              },
              {
                title: "Email Marketing",
                description:
                  "Automated campaigns, newsletters, and customer retention sequences",
              },
              {
                title: "Content Strategy",
                description:
                  "Blog posts, guides, and content calendar planning for organic growth",
              },
            ].map((service, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-[#667085]">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Why choose our marketing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "3-5x ROI",
                description:
                  "Average return of 3-5x on ad spend with optimized campaigns",
              },
              {
                title: "Predictable Lead Generation",
                description:
                  "Consistent flow of qualified leads at predictable cost per lead",
              },
              {
                title: "Brand Awareness Growth",
                description:
                  "Increase brand visibility and recognition in your target market",
              },
              {
                title: "Customer Retention",
                description:
                  "Email and retargeting campaigns that increase customer lifetime value",
              },
              {
                title: "Data-Driven Decisions",
                description:
                  "All decisions backed by data analysis and A/B testing",
              },
              {
                title: "Transparent Reporting",
                description:
                  "Monthly reports showing metrics, spend, and ROI clarity",
              },
            ].map((benefit, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-[#667085]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Marketing Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Strategy & Planning",
                description:
                  "Audit current marketing, identify opportunities, set goals and KPIs",
              },
              {
                step: 2,
                title: "Audience Research",
                description:
                  "Define target audience, create buyer personas, research competitors",
              },
              {
                step: 3,
                title: "Campaign Setup",
                description:
                  "Create ads, set targeting, configure tracking, and launch campaigns",
              },
              {
                step: 4,
                title: "Optimization",
                description:
                  "Monitor performance, A/B test, adjust bids, and refine targeting",
              },
              {
                step: 5,
                title: "Scaling",
                description:
                  "Increase budgets for winning campaigns to maximize ROI at scale",
              },
              {
                step: 6,
                title: "Reporting & Analysis",
                description:
                  "Monthly reports, insights, and recommendations for improvement",
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

        {/* Tools */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Marketing Tools & Platforms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Advertising", tools: "Google Ads, Facebook Ads Manager, LinkedIn Ads" },
              {
                category: "Analytics",
                tools: "Google Analytics 4, UTM Tracking, Conversion Tracking",
              },
              { category: "Email", tools: "Mailchimp, ConvertKit, ActiveCampaign" },
              { category: "Content", tools: "WordPress, HubSpot, Contentful" },
              {
                category: "Social",
                tools: "Buffer, Hootsuite, Later, Meta Business Suite",
              },
              { category: "CRM", tools: "HubSpot, Salesforce, Pipedrive" },
              { category: "Reporting", tools: "Data Studio, Tableau, Power BI" },
              { category: "Optimization", tools: "Optimizely, VWO, Google Optimize" },
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
          <h2 className="display text-4xl mb-12">Digital Marketing Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ad Management",
                price: "10-20% of ad spend",
                description: "Ad campaign management",
                features: [
                  "Campaign setup",
                  "Ongoing optimization",
                  "A/B testing",
                  "Weekly monitoring",
                  "Monthly reporting",
                  "Minimum: $1,000/mo",
                ],
              },
              {
                name: "Monthly Marketing",
                price: "$2K-10K",
                description: "Full marketing management",
                features: [
                  "PPC campaigns",
                  "Social media ads",
                  "Email marketing",
                  "Content strategy",
                  "Analytics & reporting",
                  "Strategy calls",
                ],
                featured: true,
              },
              {
                name: "Enterprise Package",
                price: "$15K+/mo",
                description: "Complete digital marketing",
                features: [
                  "All services included",
                  "Dedicated account manager",
                  "Weekly strategy calls",
                  "Custom integrations",
                  "Advanced analytics",
                  "Guaranteed results",
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
                <Link
                href="/contact"
                className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Marketing FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "What&apos;s the typical ROI on digital marketing?",
                a: "Average 3-5x ROI. We&apos;ve seen some clients achieve 10x+ ROI depending on industry and sales funnel.",
              },
              {
                q: "How long before we see results?",
                a: "Initial data available in 1-2 weeks. Optimization and results scaling takes 4-8 weeks.",
              },
              {
                q: "Can you manage our current campaigns?",
                a: "Yes! We can audit existing campaigns and improve performance or take over management.",
              },
              {
                q: "Do you work with our budget or yours?",
                a: "Your budget! We manage your ad spend efficiently. You control the budget completely.",
              },
              {
                q: "How do you measure success?",
                a: "By your goals: leads, conversions, revenue, or brand awareness. We track everything.",
              },
              {
                q: "Do we get monthly reports?",
                a: "Absolutely. Detailed monthly reports showing spend, conversions, ROI, and recommendations.",
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
          <h2 className="display text-4xl mb-6">Ready to grow your business?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let&apos;s create a digital marketing strategy that drives measurable results and grows your bottom line.
          </p>
          <Link
                href="/book-consultation"
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Schedule Marketing Consultation
              </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
