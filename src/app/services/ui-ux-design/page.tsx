import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI/UX Design Services | Gavior",
  description:
    "User research, wireframes, prototypes, and design systems. Design experiences that convert with human-centered design principles.",
  keywords: [
    "UI design",
    "UX design",
    "user experience",
    "design system",
    "figma design",
  ],
  openGraph: {
    title: "UI/UX Design Services | Gavior",
    description: "Design experiences that convert",
    type: "website",
  },
};

export default function UIUXDesign() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">UI/UX Design</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Design experiences that convert
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              User research, wireframes, prototypes, and design systems. We create beautiful, intuitive interfaces that drive engagement and conversions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold">
                Start Design Project
              </button>
              <button className="px-6 py-3 border border-black rounded-lg font-semibold">
                View Portfolio
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Why good design matters</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "40% Conversion Increase",
                description:
                  "Well-designed interfaces consistently drive 40%+ increase in user conversions",
              },
              {
                title: "Reduced Bounce Rate",
                description:
                  "Intuitive design keeps users engaged and reduces bounce rates by 25-35%",
              },
              {
                title: "Better Retention",
                description:
                  "User-centered design increases user retention and lifetime value",
              },
              {
                title: "Faster Development",
                description:
                  "Complete design system and components accelerate developer handoff",
              },
              {
                title: "Brand Consistency",
                description:
                  "Design systems ensure consistent branding across all touchpoints",
              },
              {
                title: "User Research Backed",
                description:
                  "All designs validated through user testing and feedback cycles",
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
          <h2 className="display text-4xl mb-12">Our Design Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "User Research & Testing",
                description:
                  "Interviews, surveys, and usability testing to understand user needs and pain points",
              },
              {
                step: 2,
                title: "Information Architecture",
                description:
                  "Organize content and features into intuitive user flows and site structure",
              },
              {
                step: 3,
                title: "Wireframes & User Flows",
                description:
                  "Low-fidelity wireframes to establish layout and interaction patterns",
              },
              {
                step: 4,
                title: "High-Fidelity Designs",
                description:
                  "Beautiful, polished designs with brand colors, typography, and visual hierarchy",
              },
              {
                step: 5,
                title: "Prototypes & Testing",
                description:
                  "Interactive prototypes tested with real users for validation and refinement",
              },
              {
                step: 6,
                title: "Design System & Handoff",
                description:
                  "Complete design system and developer-ready specifications for smooth development",
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

        {/* Tools & Technologies */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Design Tools We Use</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Design", tools: "Figma, Sketch, Adobe XD" },
              {
                category: "Prototyping",
                tools: "Figma Prototypes, Framer, Protopie",
              },
              { category: "User Testing", tools: "UserTesting, Maze, Validately" },
              { category: "Research", tools: "Dovetail, Miro, Optimal Workshop" },
              {
                category: "Accessibility",
                tools: "WAVE, Axe, Contrast Checker",
              },
              { category: "Analytics", tools: "Hotjar, Clarity, LogRocket" },
              { category: "Collaboration", tools: "Figma, Slack, Asana" },
              { category: "Handoff", tools: "Figma Specs, Zeplin, InVision" },
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
          <h2 className="display text-4xl mb-12">Design Services Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Small Project",
                price: "$5,000",
                description: "Landing page or simple app",
                features: [
                  "User research",
                  "Wireframes & flows",
                  "High-fidelity designs",
                  "1 round of revisions",
                  "Design specs",
                  "3-4 weeks",
                ],
              },
              {
                name: "Medium Project",
                price: "$15,000",
                description: "Full website or complex app",
                features: [
                  "Full user research",
                  "Competitive analysis",
                  "Complete wireframes",
                  "High-fidelity designs",
                  "Interactive prototype",
                  "Design system basics",
                  "2 rounds revisions",
                ],
                featured: true,
              },
              {
                name: "Large Project",
                price: "$30K+",
                description: "Enterprise design system",
                features: [
                  "Extensive research",
                  "Multiple prototypes",
                  "Design system",
                  "Component library",
                  "User testing",
                  "Ongoing support",
                  "Custom scope",
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
          <h2 className="display text-4xl mb-12">Design FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "How much will good design improve conversions?",
                a: "On average, 40%+ improvement in conversions with proper UX research and optimization.",
              },
              {
                q: "How long does a design project take?",
                a: "3-4 weeks for small projects, 6-8 weeks for medium, and 10-12 weeks for complex projects.",
              },
              {
                q: "Do you do user testing?",
                a: "Yes! User testing is core to our process. We validate designs with real users before development.",
              },
              {
                q: "Can you design a design system?",
                a: "Absolutely. Design systems are essential for scalable products. We create comprehensive component libraries.",
              },
              {
                q: "What about design for accessibility?",
                a: "Accessibility is built into all our designs. WCAG 2.1 AA compliance is standard.",
              },
              {
                q: "Do you provide hand-off to developers?",
                a: "Yes! We provide complete design specs, component documentation, and Figma files for seamless handoff.",
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
          <h2 className="display text-4xl mb-6">Ready to design something amazing?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let&apos;s create a beautiful, conversion-optimized design for your product.
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg">
            Schedule Design Consultation
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
