import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphic Design Services | Gavior",
  description:
    "Professional graphic design for marketing materials, social graphics, packaging, and illustrations. Visual design that captivates.",
  keywords: [
    "graphic design",
    "design services",
    "social media graphics",
    "print design",
    "packaging design",
  ],
  openGraph: {
    title: "Graphic Design Services | Gavior",
    description: "Visual design that captivates",
    type: "website",
  },
};

export default function GraphicDesign() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Graphic Design</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Visual design that captivates
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              Professional graphic design for all your marketing needs. From social media graphics to print materials, we create stunning visuals that tell your brand story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start Design Project
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-black rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Design services we offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Social Media Graphics",
                description:
                  "Eye-catching posts, stories, and graphics optimized for engagement",
              },
              {
                title: "Print Materials",
                description:
                  "Business cards, flyers, brochures, and posters print-ready",
              },
              {
                title: "Packaging Design",
                description:
                  "Product packaging that stands out on shelves and online",
              },
              {
                title: "Illustrations",
                description:
                  "Custom illustrations and artwork for websites and marketing",
              },
              {
                title: "Infographics",
                description:
                  "Data visualization and infographics that communicate complex ideas",
              },
              {
                title: "Presentations",
                description:
                  "Professional PowerPoint, Keynote, and Google Slides presentations",
              },
            ].map((service, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-[#667085]">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design Process */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Design Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Brief & Discovery",
                description:
                  "Understand your project goals, brand guidelines, and target audience",
              },
              {
                step: 2,
                title: "Concept Development",
                description:
                  "Create multiple design concepts for your review and feedback",
              },
              {
                step: 3,
                title: "Design Refinement",
                description:
                  "Polish and refine the selected concept based on your feedback",
              },
              {
                step: 4,
                title: "Final Deliverables",
                description:
                  "Multiple file formats for different uses (print, web, social)",
              },
              {
                step: 5,
                title: "Implementation Support",
                description:
                  "Help implement designs across your marketing channels",
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
          <h2 className="display text-4xl mb-12">Design Tools We Use</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Design", tools: "Adobe Creative Suite, Figma" },
              {
                category: "Vector Graphics",
                tools: "Illustrator, Affinity Designer",
              },
              { category: "Photo Editing", tools: "Photoshop, Lightroom, Affinity Photo" },
              { category: "Animation", tools: "After Effects, Figma Motion" },
              {
                category: "Typography",
                tools: "Adobe Fonts, Google Fonts, Typeface",
              },
              { category: "3D", tools: "Cinema 4D, Blender" },
              { category: "Prototyping", tools: "Figma, Adobe XD, Framer" },
              { category: "File Management", tools: "Dropbox, Google Drive, Frame.io" },
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
          <h2 className="display text-4xl mb-12">Design Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Project-Based",
                price: "$1K-5K",
                description: "One-off design projects",
                features: [
                  "Single project (1-5 designs)",
                  "2-3 rounds of revisions",
                  "All file formats",
                  "Print-ready deliverables",
                  "High-resolution files",
                  "Fast turnaround",
                ],
              },
              {
                name: "Monthly Retainer",
                price: "$2K-5K",
                description: "Ongoing design support",
                features: [
                  "Up to 40 hours/month",
                  "Multiple projects",
                  "Priority support",
                  "Unlimited revisions",
                  "Rush availability",
                  "Strategic input",
                ],
                featured: true,
              },
              {
                name: "Design System",
                price: "$10K+",
                description: "Complete design system",
                features: [
                  "Comprehensive component library",
                  "Brand application guide",
                  "Multiple templates",
                  "Figma library",
                  "Custom patterns",
                  "Ongoing updates",
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

        {/* Turnaround Times */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Design Turnaround Times</h2>
          <div className="bg-[#f4f4f5] rounded-xl p-8 max-w-2xl">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-40 font-bold">Social Graphics</div>
                <div>3-5 days</div>
              </div>
              <div className="flex gap-4">
                <div className="w-40 font-bold">Print Materials</div>
                <div>5-7 days</div>
              </div>
              <div className="flex gap-4">
                <div className="w-40 font-bold">Packaging Design</div>
                <div>2-3 weeks</div>
              </div>
              <div className="flex gap-4">
                <div className="w-40 font-bold">Illustrations</div>
                <div>1-2 weeks</div>
              </div>
              <div className="flex gap-4">
                <div className="w-40 font-bold">Infographics</div>
                <div>5-10 days</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-[#667085]">
              * Rush turnarounds available. Contact for specifics.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Design FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "What file formats do I get?",
                a: "We provide PSD, AI, PDF, PNG, JPG, and any other format needed for your project.",
              },
              {
                q: "How many rounds of revisions are included?",
                a: "2-3 rounds included in project pricing. Additional revisions available at hourly rate.",
              },
              {
                q: "Can you match my brand guidelines?",
                a: "Absolutely! We follow your brand guidelines precisely for consistency.",
              },
              {
                q: "Do you design for print and web?",
                a: "Yes! We deliver print-ready files and web-optimized versions.",
              },
              {
                q: "What if I need ongoing graphic design?",
                a: "Our monthly retainer gives you ongoing design support at a fixed monthly rate.",
              },
              {
                q: "Can you create custom illustrations?",
                a: "Yes! We create custom illustrations for websites, marketing, and products.",
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
          <h2 className="display text-4xl mb-6">Ready to elevate your visual design?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let&apos;s create stunning graphics that bring your brand to life.
          </p>
          <Link
                href="/book-consultation"
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start Design Project
              </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
