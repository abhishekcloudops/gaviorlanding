import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Editing Services | Gavior",
  description:
    "Professional video editing, color grading, and sound design. Transform raw footage into polished, professional videos.",
  keywords: [
    "video editing",
    "video production",
    "color grading",
    "sound design",
    "video post-production",
  ],
  openGraph: {
    title: "Video Editing Services | Gavior",
    description: "Professional video production",
    type: "website",
  },
};

export default function VideoEditing() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Video Editing</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Professional video production
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              Expert video editing, color grading, and sound design. We transform raw footage into polished, broadcast-quality videos that engage and convert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold">
                Submit Footage
              </button>
              <button className="px-6 py-3 border border-black rounded-lg font-semibold">
                View Portfolio
              </button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Editing services we provide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Raw Footage Editing",
                description:
                  "Organize, cut, and arrange footage into smooth, professional sequences",
              },
              {
                title: "Color Grading & Correction",
                description:
                  "Professional color grading for cinematic look and consistency",
              },
              {
                title: "Sound Design & Mixing",
                description:
                  "Audio mixing, sound effects, and professional audio engineering",
              },
              {
                title: "Motion Graphics Integration",
                description:
                  "Add animated titles, graphics, and visual effects to your video",
              },
              {
                title: "Subtitles & Captions",
                description:
                  "Professional subtitles and captions for accessibility and engagement",
              },
              {
                title: "Multi-Format Export",
                description:
                  "Export in multiple formats for web, social, streaming, and broadcast",
              },
            ].map((service, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-[#667085]">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Editing Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Footage Review",
                description:
                  "Review all raw footage, logs, and project specifications",
              },
              {
                step: 2,
                title: "Rough Cut",
                description:
                  "Create initial edit sequence for your approval and feedback",
              },
              {
                step: 3,
                title: "Fine Cut",
                description:
                  "Refine timing, transitions, and pacing based on feedback",
              },
              {
                step: 4,
                title: "Color Grading",
                description:
                  "Professional color correction and grading for consistent look",
              },
              {
                step: 5,
                title: "Sound Design",
                description:
                  "Audio mixing, sound effects, and music integration",
              },
              {
                step: 6,
                title: "Final Export",
                description:
                  "Export in required formats with proper metadata and specifications",
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
          <h2 className="display text-4xl mb-12">Professional Editing Software</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Editing", tools: "Premiere Pro, Final Cut Pro, DaVinci" },
              {
                category: "Color Grading",
                tools: "DaVinci Resolve, SpeedGrade, Lumetri",
              },
              { category: "Audio", tools: "Audition, Logic Pro, Pro Tools" },
              { category: "Motion Graphics", tools: "After Effects, Motion" },
              {
                category: "VFX",
                tools: "After Effects, Nuke, Fusion",
              },
              { category: "3D", tools: "Cinema 4D, Blender" },
              { category: "Plugins", tools: "Red Giant, Boris FX" },
              { category: "Stock Media", tools: "Shutterstock, Getty, Pond5" },
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
          <h2 className="display text-4xl mb-12">Video Editing Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Per Minute",
                price: "$100-300",
                description: "Simple editing projects",
                features: [
                  "Basic editing per minute",
                  "Single color grade",
                  "Standard audio mixing",
                  "One revision round",
                  "MP4 export",
                  "Fast turnaround",
                ],
              },
              {
                name: "Full Production",
                price: "$3K-10K",
                description: "Complete post-production",
                features: [
                  "Complete editing suite",
                  "Professional color grading",
                  "Advanced sound design",
                  "Motion graphics included",
                  "Subtitles & captions",
                  "Multiple format export",
                  "3 revision rounds",
                ],
                featured: true,
              },
              {
                name: "Monthly Retainer",
                price: "$2K-5K",
                description: "Ongoing video work",
                features: [
                  "Up to 40 hours/month",
                  "Multiple projects",
                  "Priority turnaround",
                  "Unlimited revisions",
                  "All services included",
                  "Dedicated editor",
                  "Strategic input",
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

        {/* Turnaround */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Editing Turnaround Times</h2>
          <div className="bg-[#f4f4f5] rounded-xl p-8 max-w-2xl">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-40 font-bold">Simple Edit</div>
                <div>3-5 days</div>
              </div>
              <div className="flex gap-4">
                <div className="w-40 font-bold">Full Edit + Grade</div>
                <div>1-2 weeks</div>
              </div>
              <div className="flex gap-4">
                <div className="w-40 font-bold">Complex Production</div>
                <div>2-4 weeks</div>
              </div>
              <div className="flex gap-4">
                <div className="w-40 font-bold">Rush Service</div>
                <div>24-48 hours</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-[#667085]">
              * Turnaround depends on project complexity and footage length.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Video Editing FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "How much does video editing cost per minute?",
                a: "$100-300 per minute depending on complexity. Full production includes all services.",
              },
              {
                q: "Can you work with footage from different cameras?",
                a: "Yes! We work with footage from any camera, phone, or device. We normalize and color match everything.",
              },
              {
                q: "Do you provide sound design?",
                a: "Absolutely. Professional audio mixing and sound effects are included in full production packages.",
              },
              {
                q: "What video formats do you work with?",
                a: "We work with any format: MP4, MOV, AVI, Prores, DNG sequences, and more.",
              },
              {
                q: "Can you add subtitles and captions?",
                a: "Yes! We provide SRT files, hardcoded captions, and full subtitle services.",
              },
              {
                q: "What about rush turnaround?",
                a: "Rush service available for 24-48 hour turnaround at premium rates.",
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
          <h2 className="display text-4xl mb-6">Ready to polish your videos?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Send us your raw footage and let's create something professional and engaging.
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg">
            Submit Your Footage
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
