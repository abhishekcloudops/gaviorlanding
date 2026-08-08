import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";
import { ServiceStructuredData } from "@/components/service-structured-data";

export const metadata: Metadata = {
  title: "Branding Services | Gavior",
  description:
    "Logo design, brand identity, messaging, and brand guidelines. Build a brand that stands out and connects with your audience.",
  keywords: [
    "branding",
    "logo design",
    "brand identity",
    "brand strategy",
    "brand guidelines",
    "corporate identity",
  ],
  alternates: {
    canonical: "/services/branding",
  },
  openGraph: {
    title: "Branding Services | Gavior",
    description: "Build a brand that stands out",
    type: "website",
  },
};

export default function Branding() {
  return (
    <>
      <Header />
      <ServiceStructuredData slug="branding" />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Branding Services</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Build a brand that stands out
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              Logo design, brand identity, messaging, and comprehensive brand guidelines. We create memorable brands that resonate with your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start Branding Project
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-black rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                View Brand Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* What&apos;s Included */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">What we deliver</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Brand Strategy",
                description:
                  "Positioning, messaging, values, and unique brand story that connects",
              },
              {
                title: "Logo Design",
                description:
                  "Multiple concept options refined based on your feedback and direction",
              },
              {
                title: "Brand Identity",
                description:
                  "Complete visual identity including color palette, typography, imagery style",
              },
              {
                title: "Brand Guidelines",
                description:
                  "Comprehensive document showing how to use brand across all platforms",
              },
              {
                title: "Social Media Templates",
                description:
                  "Ready-to-use templates for social media posts and graphics",
              },
              {
                title: "Email Templates",
                description:
                  "Professional email templates aligned with your brand identity",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#667085]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Branding Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Discovery & Strategy",
                description:
                  "Deep dive into your business, values, target audience, and competitive landscape",
              },
              {
                step: 2,
                title: "Concept Development",
                description:
                  "Multiple logo and brand direction concepts for your review and feedback",
              },
              {
                step: 3,
                title: "Design Refinement",
                description:
                  "Refine selected concepts, finalize color palette, typography, and visual direction",
              },
              {
                step: 4,
                title: "Brand Guidelines",
                description:
                  "Comprehensive guidelines document covering all brand applications",
              },
              {
                step: 5,
                title: "Deliverables Package",
                description:
                  "Logo files, brand templates, social media assets, and complete brand kit",
              },
              {
                step: 6,
                title: "Launch Support",
                description:
                  "Support implementing brand across website, marketing, and communications",
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

        {/* Design Tools */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Brand Design Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Design", tools: "Adobe Creative Suite, Figma" },
              {
                category: "Logo Design",
                tools: "Illustrator, Affinity Designer, Fontforge",
              },
              { category: "Typography", tools: "Adobe Fonts, Google Fonts, Typekit" },
              { category: "Color", tools: "Adobe Color, Color Theory, Pantone" },
              {
                category: "Research",
                tools: "Brand Analytics, Competitor Analysis",
              },
              { category: "Mockups", tools: "Figma, Adobe XD, Smartmockups" },
              { category: "Brand Assets", tools: "Asset Management, Figma Files" },
              { category: "Delivery", tools: "Figma, PDF, Digital Asset Library" },
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
          <h2 className="display text-4xl mb-12">Branding Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$3,000",
                description: "Essential brand identity",
                features: [
                  "Brand strategy",
                  "Logo design (3 concepts)",
                  "Color palette",
                  "Typography selection",
                  "Basic guidelines",
                  "Logo files only",
                ],
              },
              {
                name: "Growth",
                price: "$8,000",
                description: "Complete brand identity",
                features: [
                  "Full brand strategy",
                  "Logo design (5 concepts)",
                  "Complete visual identity",
                  "Brand guidelines",
                  "Social media templates",
                  "Email templates",
                  "2 rounds revisions",
                ],
                featured: true,
              },
              {
                name: "Premium",
                price: "$15K+",
                description: "Enterprise branding",
                features: [
                  "Executive positioning",
                  "Comprehensive brand audit",
                  "Multiple logo variations",
                  "Complete brand system",
                  "Extended guidelines",
                  "Marketing asset library",
                  "Unlimited revisions",
                  "Launch support",
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
          <h2 className="display text-4xl mb-12">Branding Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "How long does branding take?",
                a: "Typically 4-8 weeks depending on complexity. Starter projects can be done in 2-3 weeks.",
              },
              {
                q: "Can you redesign our existing logo?",
                a: "Yes! We can refresh or completely redesign existing logos while maintaining brand recognition if desired.",
              },
              {
                q: "What file formats will we get?",
                a: "We provide logo in all formats: PNG, SVG, PDF, AI, and more. Perfect for any application.",
              },
              {
                q: "Can we have multiple logo versions?",
                a: "Absolutely! We create horizontal, vertical, icon, and monochrome versions of your logo.",
              },
              {
                q: "What if we don&apos;t like the concepts?",
                a: "We include revision rounds in all packages. We'll iterate until you're happy with the direction.",
              },
              {
                q: "Do you help implement the brand?",
                a: "Yes! We provide brand guidelines and support implementing your brand across all platforms.",
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
          <h2 className="display text-4xl mb-6">Ready to build your brand?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let&apos;s create a distinctive brand that represents your values and resonates with your audience.
          </p>
          <Link
                href="/book-consultation"
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Schedule Branding Consultation
              </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
