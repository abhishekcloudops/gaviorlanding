import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevOps Services | Gavior",
  description:
    "CI/CD pipelines, infrastructure as code, monitoring and deployment automation. Deploy with confidence using modern DevOps practices.",
  keywords: [
    "DevOps",
    "CI/CD",
    "deployment automation",
    "infrastructure as code",
    "kubernetes",
  ],
  openGraph: {
    title: "DevOps Services | Gavior",
    description: "Deploy with confidence",
    type: "website",
  },
  alternates: {
    canonical: "/services/devops",
  },
};

export default function DevOps() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">DevOps Services</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Deploy with confidence
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              Automated CI/CD pipelines, infrastructure as code, and 24/7 monitoring. Deploy 50+ times per day with zero downtime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Start DevOps Setup
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
          <h2 className="display text-4xl mb-12">Benefits of Modern DevOps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Deploy 50+ Times Daily",
                description:
                  "Automated pipelines enable frequent deployments, reducing time to market",
              },
              {
                title: "Zero Downtime Deployments",
                description:
                  "Blue-green deployments and canary releases ensure zero user impact",
              },
              {
                title: "Faster Time to Market",
                description:
                  "Reduce deployment time from hours to minutes with automation",
              },
              {
                title: "Fewer Production Issues",
                description:
                  "Automated testing catches bugs before they reach production",
              },
              {
                title: "Better Cost Control",
                description:
                  "Infrastructure automation reduces cloud costs by 30-50%",
              },
              {
                title: "24/7 Monitoring",
                description:
                  "Real-time alerts and monitoring ensure issues are caught immediately",
              },
            ].map((benefit, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-[#667085]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our DevOps Services</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "CI/CD Pipeline Setup",
                description:
                  "GitHub Actions, GitLab CI, or Jenkins pipelines with automated testing and deployment",
              },
              {
                step: 2,
                title: "Infrastructure Automation",
                description:
                  "Terraform, CloudFormation, and infrastructure-as-code for reproducible environments",
              },
              {
                step: 3,
                title: "Containerization",
                description:
                  "Docker containerization and Kubernetes orchestration for scalable applications",
              },
              {
                step: 4,
                title: "Monitoring & Alerts",
                description:
                  "Real-time monitoring with Datadog, Prometheus, and custom alerting rules",
              },
              {
                step: 5,
                title: "Log Aggregation",
                description:
                  "Centralized logging with ELK Stack or cloud-native solutions for easy debugging",
              },
              {
                step: 6,
                title: "Security Scanning",
                description:
                  "Automated security scanning, vulnerability detection, and compliance checks",
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
          <h2 className="display text-4xl mb-12">DevOps Tech Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "CI/CD", tools: "GitHub Actions, GitLab CI, Jenkins" },
              {
                category: "Containerization",
                tools: "Docker, Kubernetes, Docker Compose",
              },
              { category: "IaC", tools: "Terraform, CloudFormation, Helm" },
              { category: "Monitoring", tools: "Datadog, Prometheus, New Relic" },
              {
                category: "Logging",
                tools: "ELK Stack, Splunk, CloudWatch",
              },
              { category: "Security", tools: "SonarQube, Trivy, Vault" },
              { category: "Cloud", tools: "AWS, Google Cloud, Azure" },
              { category: "Configuration", tools: "Ansible, Chef, Puppet" },
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
          <h2 className="display text-4xl mb-12">DevOps Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Setup",
                price: "$10,000",
                description: "Complete DevOps implementation",
                features: [
                  "CI/CD pipeline setup",
                  "Infrastructure automation",
                  "Monitoring setup",
                  "Documentation",
                  "Team training",
                  "Initial optimization",
                ],
              },
              {
                name: "Managed (Monthly)",
                price: "$3K-5K",
                description: "Ongoing DevOps management",
                features: [
                  "24/7 monitoring",
                  "Pipeline optimization",
                  "Infrastructure management",
                  "Security updates",
                  "Cost optimization",
                  "Incident response",
                ],
                featured: true,
              },
              {
                name: "Custom",
                price: "Contact",
                description: "Enterprise DevOps solutions",
                features: [
                  "Custom architecture",
                  "Multi-cloud setup",
                  "Advanced security",
                  "Dedicated team",
                  "SLA guarantees",
                  "Custom integrations",
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
          <h2 className="display text-4xl mb-12">DevOps FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "What&apos;s the difference between DevOps and SRE?",
                a: "DevOps is a practice that bridges development and operations. SRE (Site Reliability Engineering) is a specific implementation of DevOps principles with focus on reliability.",
              },
              {
                q: "How long does DevOps setup take?",
                a: "A basic CI/CD pipeline takes 2-4 weeks. Full DevOps transformation typically takes 2-3 months depending on complexity.",
              },
              {
                q: "Will DevOps reduce our deployment risk?",
                a: "Yes! Automated testing and monitoring catch issues before production. We use blue-green deployments for zero downtime.",
              },
              {
                q: "Do we need Kubernetes for DevOps?",
                a: "Not necessarily. Kubernetes is great for large-scale deployments, but simpler solutions like Docker Compose or managed services work well for most teams.",
              },
              {
                q: "How do we handle secrets and sensitive data?",
                a: "We implement HashiCorp Vault, AWS Secrets Manager, or similar solutions to securely manage credentials.",
              },
              {
                q: "What&apos;s your support like?",
                a: "We offer 24/7 monitoring, incident response, and regular optimization reviews with dedicated support teams.",
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
          <h2 className="display text-4xl mb-6">Ready to modernize your deployments?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let&apos;s set up a modern DevOps pipeline that gets code to production faster and safer.
          </p>
          <Link
                href="/book-consultation"
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg inline-flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                Schedule DevOps Consultation
              </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
