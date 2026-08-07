import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloud Solutions Services | Gavior",
  description:
    "AWS, Google Cloud, and Azure migration and management. Scale your infrastructure infinitely with cloud-native architecture.",
  keywords: [
    "cloud solutions",
    "AWS migration",
    "Google Cloud",
    "Azure",
    "cloud infrastructure",
  ],
  openGraph: {
    title: "Cloud Solutions Services | Gavior",
    description: "Scale infinitely with the cloud",
    type: "website",
  },
  alternates: {
    canonical: "/services/cloud-solutions",
  },
};

export default function CloudSolutions() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Cloud Solutions</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Scale infinitely with the cloud
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              AWS, Google Cloud, and Azure migration and management. We help you migrate, optimize, and manage cloud infrastructure for maximum performance and cost efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start Cloud Migration
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
          <h2 className="display text-4xl mb-12">Why move to the cloud</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Reduce Costs",
                description:
                  "Pay only for what you use. Reduce infrastructure costs by 40-60% compared to on-premise",
              },
              {
                title: "Auto-Scaling",
                description:
                  "Automatically scale resources up or down based on demand without manual intervention",
              },
              {
                title: "High Availability",
                description:
                  "99.99% uptime SLA with multi-region redundancy and automatic failover",
              },
              {
                title: "Global Distribution",
                description:
                  "Serve content from data centers worldwide with CDN and edge locations",
              },
              {
                title: "Disaster Recovery",
                description:
                  "Automated backups, snapshots, and recovery procedures for business continuity",
              },
              {
                title: "Security & Compliance",
                description:
                  "Enterprise-grade security, encryption, and compliance certifications included",
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
          <h2 className="display text-4xl mb-12">Our Cloud Strategy</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Assessment & Planning",
                description:
                  "Analyze current infrastructure, identify optimization opportunities, plan migration path",
              },
              {
                step: 2,
                title: "Architecture Design",
                description:
                  "Design cloud-native architecture optimized for performance, cost, and security",
              },
              {
                step: 3,
                title: "Migration Execution",
                description:
                  "Migrate applications and data with minimal downtime using proven methods",
              },
              {
                step: 4,
                title: "Performance Optimization",
                description:
                  "Tune resources, implement caching, optimize databases for peak performance",
              },
              {
                step: 5,
                title: "Security & Monitoring",
                description:
                  "Set up monitoring, alerts, logging, and security best practices",
              },
              {
                step: 6,
                title: "Cost Optimization",
                description:
                  "Implement cost optimization strategies and provide ongoing recommendations",
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
          <h2 className="display text-4xl mb-12">Cloud Platforms & Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "Cloud Platforms", tools: "AWS, Google Cloud, Azure" },
              {
                category: "Containerization",
                tools: "Docker, Kubernetes, ECS",
              },
              { category: "Infrastructure", tools: "Terraform, CloudFormation, Helm" },
              { category: "Databases", tools: "RDS, Firestore, Cosmos DB, DynamoDB" },
              {
                category: "Monitoring",
                tools: "Datadog, New Relic, CloudWatch",
              },
              { category: "CI/CD", tools: "GitHub Actions, GitLab CI, CodePipeline" },
              { category: "Storage", tools: "S3, Cloud Storage, Azure Blob" },
              { category: "CDN", tools: "CloudFront, Cloud CDN, Azure CDN" },
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
          <h2 className="display text-4xl mb-12">Cloud Services Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Assessment",
                price: "$5,000",
                description: "Audit and optimization plan",
                features: [
                  "Current infrastructure audit",
                  "Cost analysis",
                  "Optimization recommendations",
                  "Migration roadmap",
                  "One-time service",
                  "Detailed report",
                ],
              },
              {
                name: "Migration",
                price: "$15K-50K",
                description: "Complete cloud migration",
                features: [
                  "Full infrastructure migration",
                  "Data transfer",
                  "Minimal downtime",
                  "Testing & validation",
                  "Documentation",
                  "3 months support",
                ],
                featured: true,
              },
              {
                name: "Managed Services",
                price: "$3K-5K/mo",
                description: "Ongoing cloud management",
                features: [
                  "24/7 monitoring",
                  "Performance optimization",
                  "Cost optimization",
                  "Security updates",
                  "Scaling management",
                  "Dedicated support",
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
          <h2 className="display text-4xl mb-12">Cloud Questions & Answers</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "Which cloud platform should we choose?",
                a: "We recommend based on your specific needs. AWS dominates market share, Google Cloud excels at data, Azure works best with Microsoft stack.",
              },
              {
                q: "How long does cloud migration take?",
                a: "Typically 2-6 months depending on complexity. We minimize downtime through careful planning and phased migration.",
              },
              {
                q: "Will we save money moving to the cloud?",
                a: "Most clients see 40-60% cost reduction. We provide detailed ROI analysis before and track savings monthly.",
              },
              {
                q: "What about data security in the cloud?",
                a: "Cloud providers offer enterprise-grade security with encryption, compliance certifications, and regular audits.",
              },
              {
                q: "Can you help optimize our cloud costs?",
                a: "Yes! We implement reserved instances, spot instances, and other cost optimization strategies saving 30-50%.",
              },
              {
                q: "Do you provide ongoing support?",
                a: "Absolutely. We offer managed services with 24/7 monitoring, optimization, and dedicated support teams.",
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
          <h2 className="display text-4xl mb-6">Ready to move to the cloud?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Get a free assessment of your current infrastructure and discover cloud savings opportunities.
          </p>
          <Link
                href="/book-consultation"
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Schedule Cloud Assessment
              </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
