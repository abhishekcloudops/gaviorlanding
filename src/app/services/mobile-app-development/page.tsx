import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development Services | Gavior",
  description:
    "Build native iOS and Android apps with React Native and Flutter. Custom mobile app development services for iOS, Android, and cross-platform apps.",
  keywords: [
    "mobile app development",
    "iOS app development",
    "Android app development",
    "React Native",
    "Flutter",
  ],
  openGraph: {
    title: "Mobile App Development Services | Gavior",
    description: "Native apps that users love",
    type: "website",
  },
};

export default function MobileAppDevelopment() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Mobile App Development</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Native apps that users love
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              Build iOS and Android apps with React Native or Flutter. We create high-performance apps that leverage device capabilities and deliver exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start Your App
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
          <h2 className="display text-4xl mb-12">Why choose Gavior for mobile</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Push Notifications",
                description:
                  "Real-time notifications keep users engaged and informed about important events",
              },
              {
                title: "Offline Functionality",
                description:
                  "Full app functionality even without internet connection with smart data sync",
              },
              {
                title: "Device Features",
                description:
                  "Access camera, GPS, contacts, storage, and other native device capabilities",
              },
              {
                title: "App Store Optimization",
                description:
                  "Expert App Store and Google Play optimization for maximum visibility",
              },
              {
                title: "Native Performance",
                description:
                  "Lightning-fast performance with native animations and transitions",
              },
              {
                title: "Monetization Ready",
                description:
                  "In-app purchases, subscriptions, and ad integration built-in",
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
          <h2 className="display text-4xl mb-12">Our Development Process</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Strategy & UX Design",
                description:
                  "Define app goals, user flows, and create intuitive mobile-first designs",
              },
              {
                step: 2,
                title: "Wireframes & Prototypes",
                description:
                  "Interactive prototypes for user testing and stakeholder feedback",
              },
              {
                step: 3,
                title: "iOS & Android Development",
                description:
                  "Build native apps using React Native or Flutter with optimized code",
              },
              {
                step: 4,
                title: "Testing & QA",
                description:
                  "Rigorous testing on actual devices, performance optimization, and bug fixes",
              },
              {
                step: 5,
                title: "App Store Submission",
                description:
                  "Complete submission process for Apple App Store and Google Play",
              },
              {
                step: 6,
                title: "Post-Launch Support",
                description:
                  "Monitoring, updates, and support for sustained success",
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
              { category: "Frameworks", tools: "React Native, Flutter, Swift" },
              {
                category: "Languages",
                tools: "JavaScript, Kotlin, Objective-C",
              },
              { category: "Backend", tools: "Node.js, Firebase, GraphQL" },
              { category: "Database", tools: "Firebase Realtime, SQLite, Realm" },
              {
                category: "Payment",
                tools: "Stripe, Apple Pay, Google Pay",
              },
              { category: "Testing", tools: "Jest, Detox, XCTest, Espresso" },
              { category: "DevOps", tools: "GitHub Actions, TestFlight, CI/CD" },
              { category: "Analytics", tools: "Firebase Analytics, Mixpanel" },
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
          <h2 className="display text-4xl mb-12">App Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$25,000",
                description: "Simple app with core features",
                features: [
                  "Single platform (iOS or Android)",
                  "5-8 screens",
                  "Basic backend integration",
                  "8 weeks development",
                  "3 months support",
                  "App Store submission support",
                ],
              },
              {
                name: "Growth",
                price: "$60,000",
                description: "Full-featured cross-platform app",
                features: [
                  "iOS + Android (cross-platform)",
                  "15-20 screens",
                  "Custom backend",
                  "Payment integration",
                  "12 weeks development",
                  "6 months support",
                  "Push notifications",
                ],
                featured: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "Complex app with advanced features",
                features: [
                  "Unlimited platforms",
                  "Complex features",
                  "Real-time sync",
                  "Advanced security",
                  "Custom timeline",
                  "12+ months support",
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

        {/* FAQs */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "Should I build iOS or Android first?",
                a: "We recommend cross-platform development with React Native or Flutter to build both simultaneously. This saves time and cost.",
              },
              {
                q: "How long does it take to launch an app?",
                a: "Typically 8-12 weeks for a production-ready app from concept to App Store launch, depending on complexity.",
              },
              {
                q: "What about app maintenance?",
                a: "We provide ongoing support packages including bug fixes, OS updates, and feature enhancements.",
              },
              {
                q: "Can you help with App Store submission?",
                a: "Yes! We handle the complete submission process for both Apple App Store and Google Play.",
              },
              {
                q: "Do you support in-app purchases?",
                a: "Absolutely. We integrate payment systems including in-app purchases, subscriptions, and multiple payment methods.",
              },
              {
                q: "What happens after launch?",
                a: "We monitor app performance, gather user feedback, and help with updates and improvements.",
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
          <h2 className="display text-4xl mb-6">Ready to build your app?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your app idea and create something amazing together.
          </p>
          <Link
                href="/book-consultation"
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Schedule App Consultation
              </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
