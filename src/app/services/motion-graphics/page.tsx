import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motion Graphics Services | Gavior",
  description:
    "Animated videos, explainers, and motion graphics. Bring your brand to life with professional animation and video content.",
  keywords: [
    "motion graphics",
    "animation",
    "explainer videos",
    "video production",
    "animated videos",
  ],
  openGraph: {
    title: "Motion Graphics Services | Gavior",
    description: "Bring your brand to life",
    type: "website",
  },
};

export default function MotionGraphics() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Motion Graphics</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Bring your brand to life
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              Animated videos, explainers, and motion graphics that captivate your audience. Professional animation for websites, marketing, and social media.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold">
                Start Animation Project
              </button>
              <button className="px-6 py-3 border border-black rounded-lg font-semibold">
                View Portfolio
              </button>
            </div>
          </div>
        </section>

        {/* What We Create */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">What we create</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Explainer Videos",
                description:
                  "60-90 second videos that explain your product and drive conversions",
              },
              {
                title: "Product Demos",
                description:
                  "Showcase your product features and benefits with animated demos",
              },
              {
                title: "Social Media Animations",
                description:
                  "Engaging animated videos optimized for Instagram, TikTok, LinkedIn",
              },
              {
                title: "Logo Animations",
                description:
                  "Animated logo reveals and transitions for websites and videos",
              },
              {
                title: "Animated Presentations",
                description:
                  "Dynamic presentations with animations and motion graphics",
              },
              {
                title: "Interactive Graphics",
                description:
                  "Interactive animations for websites and multimedia projects",
              },
            ].map((service, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-[#667085]">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Animation Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Concept & Storyboarding",
                description:
                  "Develop video concept, story arc, and visual style direction",
              },
              {
                step: 2,
                title: "Script & Voiceover",
                description:
                  "Professional script writing and voiceover recording in multiple languages",
              },
              {
                step: 3,
                title: "Animatic",
                description:
                  "Rough animated storyboard to preview flow and timing",
              },
              {
                step: 4,
                title: "Animation Production",
                description:
                  "Professional animation with motion graphics and visual effects",
              },
              {
                step: 5,
                title: "Sound & Music",
                description:
                  "Original music, sound effects, and professional audio mixing",
              },
              {
                step: 6,
                title: "Final Delivery",
                description:
                  "Export in multiple formats for web, social, and presentations",
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

        {/* Tools & Software */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Animation Tools & Software</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Animation", tools: "After Effects, Cinema 4D, Maya" },
              {
                category: "Design",
                tools: "Adobe Creative Suite, Figma",
              },
              { category: "3D", tools: "Cinema 4D, Blender, 3ds Max" },
              { category: "Video Editing", tools: "Premiere Pro, Final Cut Pro" },
              {
                category: "Sound",
                tools: "Audition, Logic Pro, Foley Library",
              },
              { category: "Motion Tracking", tools: "Mocha, 3D Tracking" },
              { category: "Color Grading", tools: "DaVinci Resolve, Speedgrade" },
              { category: "Stock Assets", tools: "Adobe Stock, Envato, Pond5" },
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
          <h2 className="display text-4xl mb-12">Animation Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Short Video",
                price: "$2K-5K",
                description: "15-30 second video",
                features: [
                  "Concept development",
                  "Animation production",
                  "Music & sound",
                  "15-30 seconds length",
                  "2 rounds revisions",
                  "Multiple formats",
                ],
              },
              {
                name: "Explainer Video",
                price: "$5K-10K",
                description: "60-90 second explainer",
                features: [
                  "Full storyboarding",
                  "Professional voiceover",
                  "Animatic review",
                  "Animation production",
                  "Original music",
                  "Sound design",
                  "3 rounds revisions",
                ],
                featured: true,
              },
              {
                name: "Custom Project",
                price: "$10K+",
                description: "Large-scale production",
                features: [
                  "Custom script writing",
                  "Multiple scenes",
                  "3D animation",
                  "Professional crew",
                  "Color grading",
                  "VFX & effects",
                  "Unlimited revisions",
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
          <h2 className="display text-4xl mb-12">Animation FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "How long does animation production take?",
                a: "3-6 weeks typically. Simple 15-30s videos can be done in 2-3 weeks. Complex projects take 8+ weeks.",
              },
              {
                q: "Do you provide voiceover?",
                a: "Yes! We provide professional voiceover in multiple languages with talent selection.",
              },
              {
                q: "Can you use my branding?",
                a: "Absolutely. We integrate your brand colors, logo, fonts, and style throughout the animation.",
              },
              {
                q: "What formats will I get?",
                a: "MP4, MOV, WebM for web. We also export for social media platforms with correct dimensions.",
              },
              {
                q: "Can I request revisions?",
                a: "Yes! Revision rounds are included based on your package. Additional revisions available.",
              },
              {
                q: "Can animations work on different platforms?",
                a: "Yes! We optimize for YouTube, Instagram, TikTok, LinkedIn, websites, and presentations.",
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
          <h2 className="display text-4xl mb-6">Ready to animate your story?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let's create engaging animations that captivate your audience and drive results.
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg">
            Start Animation Project
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
