import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development Services | Gavior",
  description:
    "Custom website development with Next.js, React, and modern tech stack. We build fast, scalable, SEO-optimized websites that convert.",
  keywords: [
    "website development",
    "web design",
    "Next.js development",
    "custom websites",
    "e-commerce websites",
  ],
  openGraph: {
    title: "Website Development Services | Gavior",
    description: "Build amazing websites that convert visitors into customers",
    type: "website",
  },
  alternates: {
    canonical: "/services/website-development",
  },
};

export default function WebsiteDevelopment() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Website Development</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Websites that drive real growth
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              We build fast, beautiful, and conversion-optimized websites using
              the latest technologies. From concept to launch, we handle every
              detail so your website becomes your most powerful sales tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start Your Project
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

        {/* Benefits Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Why choose Gavior</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "300%+ Traffic Growth",
                description:
                  "Our websites consistently drive 300% increase in organic traffic within 6 months",
              },
              {
                title: "Conversion Optimized",
                description:
                  "Average 150% increase in conversions with strategic design and CRO best practices",
              },
              {
                title: "Lightning Fast",
                description:
                  "Average LCP of 1.8s and 95+ PageSpeed scores for optimal user experience",
              },
              {
                title: "SEO Built-In",
                description:
                  "Technical SEO, structured data, and mobile optimization from day one",
              },
              {
                title: "Scalable Architecture",
                description:
                  "Built to grow with your business using cloud-native technologies",
              },
              {
                title: "24/7 Support",
                description:
                  "Dedicated support team available round-the-clock for maintenance and updates",
              },
            ].map((benefit, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-[#667085]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Discovery & Strategy",
                description:
                  "We understand your business, goals, target audience, and competitive landscape",
              },
              {
                step: 2,
                title: "Design & Wireframes",
                description:
                  "Beautiful, user-centered designs with conversion optimization in mind",
              },
              {
                step: 3,
                title: "Development",
                description:
                  "Clean, optimized code using Next.js, React, and modern best practices",
              },
              {
                step: 4,
                title: "Testing & QA",
                description:
                  "Rigorous testing across devices, browsers, and performance metrics",
              },
              {
                step: 5,
                title: "Launch & Optimization",
                description:
                  "Smooth deployment with monitoring, analytics setup, and ongoing optimization",
              },
              {
                step: 6,
                title: "Support & Growth",
                description:
                  "Dedicated support for updates, improvements, and continuous growth",
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

        {/* Tech Stack */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Tech Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Frontend", tools: "React, Next.js, TypeScript" },
              {
                category: "Styling",
                tools: "Tailwind CSS, CSS Modules, Framer Motion",
              },
              { category: "Backend", tools: "Node.js, Express, Python, Go" },
              { category: "Database", tools: "PostgreSQL, MongoDB, Firebase" },
              {
                category: "Hosting",
                tools: "Vercel, AWS, Google Cloud, Cloudflare",
              },
              { category: "Tools", tools: "Git, Docker, CI/CD, Monitoring" },
              { category: "Testing", tools: "Jest, Cypress, Playwright" },
              { category: "Analytics", tools: "GA4, GTM, Hotjar, Clarity" },
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
          <h2 className="display text-4xl mb-12">Flexible Pricing Models</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$5,000",
                description: "Perfect for small businesses",
                features: [
                  "5-7 pages",
                  "Responsive design",
                  "Contact form",
                  "Basic SEO",
                  "3 months support",
                ],
              },
              {
                name: "Growth",
                price: "$15,000",
                description: "For growing companies",
                features: [
                  "15-20 pages",
                  "CMS integration",
                  "E-commerce ready",
                  "Advanced SEO",
                  "6 months support",
                  "Analytics setup",
                ],
                featured: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large scale projects",
                features: [
                  "Unlimited pages",
                  "Custom backend",
                  "Advanced features",
                  "White-label options",
                  "12 months support",
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

        {/* Timeline */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Project Timeline</h2>
          <div className="bg-[#f4f4f5] rounded-xl p-8 max-w-2xl">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-24 font-bold">Week 1-2</div>
                <div>Discovery, strategy, and initial designs</div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-bold">Week 3-5</div>
                <div>Design refinement and approval</div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-bold">Week 6-10</div>
                <div>Development and integration</div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-bold">Week 11-12</div>
                <div>Testing, QA, and optimization</div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-bold">Week 13</div>
                <div>Launch and monitoring</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-[#667085]">
              * Timeline varies based on project scope and complexity
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "How much does a website cost?",
                a: "Pricing depends on complexity and features. Starting from $5,000 for simple sites to $50,000+ for enterprise solutions.",
              },
              {
                q: "How long does it take to build a website?",
                a: "Typically 8-12 weeks for a complete website. Simpler projects can be done in 4-6 weeks.",
              },
              {
                q: "Do you provide support after launch?",
                a: "Yes! All our websites include post-launch support. We offer maintenance packages ranging from 3 to 12 months.",
              },
              {
                q: "Is the website SEO optimized?",
                a: "Absolutely. SEO is built into every website we create, including technical SEO, structured data, and mobile optimization.",
              },
              {
                q: "Can you migrate my existing website?",
                a: "Yes. We can migrate your existing site with zero downtime and maintain all your SEO rankings.",
              },
              {
                q: "What happens if I need changes?",
                a: "We provide support and maintenance services. You can request updates anytime during your support period.",
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
          <h2 className="display text-4xl mb-6">Ready to grow?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your website project and how we can help you achieve
            your business goals.
          </p>
          <Link
                href="/book-consultation"
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Schedule Consultation
              </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
