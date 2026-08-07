import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Development Services | Gavior",
  description:
    "Build scalable SaaS products with modern architecture. We specialize in multi-tenant platforms, payment integration, and user management.",
  keywords: ["SaaS development", "SaaS platform", "B2B software", "cloud platform"],
  alternates: {
    canonical: "/services/saas-development",
  },
};

export default function SaaSDevelopment() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">SaaS Development</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Build your SaaS product right
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              We help you launch and scale B2B SaaS products with enterprise-grade architecture, payment processing, and user management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start Your SaaS
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

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Why we&apos;re different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Scalable Architecture",
                description: "Built to handle millions of users and petabytes of data",
              },
              {
                title: "Multi-tenant Design",
                description: "Secure, isolated workspaces for each customer",
              },
              {
                title: "Payment Processing",
                description: "Stripe, Razorpay, and custom billing integration",
              },
              {
                title: "Security First",
                description: "SOC 2, GDPR, and enterprise security standards",
              },
              {
                title: "Analytics Built-in",
                description: "Usage metrics, revenue tracking, and insights",
              },
              {
                title: "White-label Ready",
                description: "Customizable branding and deployment options",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#667085]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">What we build</h2>
          <div className="space-y-6 max-w-3xl">
            {[
              "Multi-tenant platforms with isolated data and billing",
              "Payment and subscription management systems",
              "User authentication and authorization frameworks",
              "Real-time collaboration features and WebSocket integration",
              "API-first architectures for integrations",
              "Admin dashboards and analytics platforms",
              "Mobile apps for your SaaS (iOS & Android)",
              "Compliance tools (SOC 2, HIPAA, GDPR, etc.)",
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-2xl text-black">✓</span>
                <p className="text-lg text-[#667085]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Ideation & Planning",
                description: "Define features, user flows, and technical requirements",
              },
              {
                step: 2,
                title: "Architecture Design",
                description: "Scalable infrastructure, database design, and API structure",
              },
              {
                step: 3,
                title: "MVP Development",
                description: "Build core features and get to market faster",
              },
              {
                step: 4,
                title: "Payment Integration",
                description: "Stripe, Razorpay, custom billing, and subscription management",
              },
              {
                step: 5,
                title: "Launch & Scale",
                description: "Monitor performance, handle growth, and optimize",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 pb-6 border-b last:border-b-0">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#667085]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Tech Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Frontend", tools: "React, Next.js, TypeScript, Vue" },
              { category: "Backend", tools: "Node.js, Python, Go, Java" },
              { category: "Database", tools: "PostgreSQL, MongoDB, Redis" },
              { category: "Infrastructure", tools: "AWS, GCP, Kubernetes, Docker" },
              { category: "Payments", tools: "Stripe, Razorpay, 2Checkout" },
              { category: "Auth", tools: "Auth0, Firebase Auth, OAuth" },
              { category: "Real-time", tools: "Socket.io, WebSockets, Pusher" },
              { category: "Analytics", tools: "Mixpanel, Amplitude, Segment" },
            ].map((tech, i) => (
              <div key={i} className="p-6 bg-[#f4f4f5] rounded-xl">
                <h3 className="font-bold mb-3">{tech.category}</h3>
                <p className="text-sm text-[#667085]">{tech.tools}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Pricing & Timeline</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "MVP",
                price: "$30,000",
                timeline: "8-12 weeks",
                features: [
                  "Core features only",
                  "Single-tenant or multi-tenant",
                  "Basic payment integration",
                  "Admin dashboard",
                ],
              },
              {
                name: "Growth",
                price: "$60,000",
                timeline: "12-16 weeks",
                features: [
                  "Full feature set",
                  "Advanced billing",
                  "API marketplace",
                  "Analytics dashboard",
                  "White-label options",
                ],
                featured: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                timeline: "Custom",
                features: [
                  "Custom features",
                  "Dedicated infrastructure",
                  "Enterprise security",
                  "Compliance tools",
                  "Dedicated team",
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
                <p className="text-3xl font-bold mb-2">{plan.price}</p>
                <p className="text-[#667085] mb-6">{plan.timeline}</p>
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

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "Can you help with product strategy?",
                a: "Yes! We provide product strategy consulting to validate ideas and plan your roadmap.",
              },
              {
                q: "Do you handle infrastructure and DevOps?",
                a: "Absolutely. We manage AWS, GCP, deployment, monitoring, and scalability.",
              },
              {
                q: "What about data security and compliance?",
                a: "We build with security first, including GDPR, HIPAA, SOC 2, and enterprise standards.",
              },
              {
                q: "Can you help raise funding?",
                a: "We&apos;ve helped 20+ SaaS companies raise funding. We can help with demo building and metrics.",
              },
              {
                q: "What&apos;s your experience with SaaS metrics?",
                a: "We track MRR, ARR, CAC, LTV, churn, and other key metrics for your business.",
              },
            ].map((faq, i) => (
              <details key={i} className="border border-[#e1e4e8] rounded-lg p-4">
                <summary className="font-bold cursor-pointer">{faq.q}</summary>
                <p className="mt-3 text-[#667085]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-20 shell text-center">
          <h2 className="display text-4xl mb-6">Ready to build your SaaS?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your product idea and how we can help you launch and scale.
          </p>
          <Link
                href="/book-consultation"
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Schedule a Call
              </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
