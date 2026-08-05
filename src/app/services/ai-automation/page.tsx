import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Services | Gavior",
  description:
    "Automate your business processes with AI. Custom AI solutions for workflows, chatbots, data analysis, and intelligent automation.",
};

export default function AIAutomation() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 lg:py-32 shell">
          <div className="max-w-3xl">
            <p className="eyebrow">AI Automation</p>
            <h1 className="display text-5xl lg:text-6xl mt-4 mb-6">
              Work smarter with AI
            </h1>
            <p className="text-xl text-[#667085] mb-8 max-w-2xl">
              We automate repetitive tasks, extract insights from data, and build intelligent systems that save your team time and money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold">
                Explore Solutions
              </button>
              <button className="px-6 py-3 border border-black rounded-lg font-semibold">
                View Projects
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">What we automate</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Customer Support", desc: "AI chatbots and intelligent ticketing systems" },
              { title: "Data Processing", desc: "Extract, transform, and analyze large datasets" },
              { title: "Email & Documents", desc: "Auto-categorize, respond, and process documents" },
              { title: "Lead Qualification", desc: "Automatically score and route qualified leads" },
              { title: "Content Generation", desc: "AI-powered content creation and optimization" },
              { title: "Business Intelligence", desc: "Predictive analytics and insights generation" },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-[#e1e4e8] rounded-xl">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#667085] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Benefits</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              "Save 10-30 hours per week on repetitive tasks",
              "Improve accuracy and reduce human errors",
              "Scale operations without hiring more people",
              "Make better decisions with AI-powered insights",
              "Improve customer experience with 24/7 support",
              "Reduce operational costs by 30-50%",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 border-b last:border-b-0">
                <span className="text-2xl">⚡</span>
                <p className="text-lg text-[#667085]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Our Approach</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Process Audit", desc: "Identify automation opportunities" },
              { step: 2, title: "Solution Design", desc: "Plan the AI system architecture" },
              { step: 3, title: "Development", desc: "Build custom AI solutions" },
              { step: 4, title: "Integration", desc: "Connect with your existing tools" },
              { step: 5, title: "Training & Support", desc: "Train your team and provide support" },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 pb-6 border-b last:border-b-0">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-[#667085]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Tech Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: "AI/ML", tools: "GPT-4, Claude, LLaMA, Custom Models" },
              { category: "Platforms", tools: "OpenAI, Anthropic, Hugging Face" },
              { category: "Tools", tools: "Zapier, Make, N8N, LangChain" },
              { category: "Integration", tools: "APIs, Webhooks, Database Integration" },
            ].map((tech, i) => (
              <div key={i} className="p-6 bg-[#f4f4f5] rounded-xl">
                <h3 className="font-bold mb-3">{tech.category}</h3>
                <p className="text-sm text-[#667085]">{tech.tools}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">Pricing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Quick Win",
                price: "$5,000",
                desc: "Single automation process",
                timeline: "2-4 weeks",
              },
              {
                name: "System",
                price: "$15,000",
                desc: "Multiple connected automations",
                timeline: "6-10 weeks",
                featured: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "Full automation platform",
                timeline: "Custom",
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
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <p className="text-[#667085] mb-6">{plan.desc}</p>
                <p className="text-sm mb-6">Timeline: {plan.timeline}</p>
                <button className="w-full px-6 py-3 bg-black text-white rounded-lg font-semibold">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 shell">
          <h2 className="display text-4xl mb-12">FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "How much can we save with automation?",
                a: "Typically 30-50% reduction in operational costs for automated processes.",
              },
              {
                q: "Is it secure to use AI for our data?",
                a: "Yes! We ensure enterprise-grade security and compliance with GDPR, SOC 2, and more.",
              },
              {
                q: "How long does implementation take?",
                a: "Typically 2-4 weeks for simple automations, 6-10 weeks for complex systems.",
              },
              {
                q: "Will we need to change our workflows?",
                a: "We design systems to fit your existing workflows, minimizing disruption.",
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
          <h2 className="display text-4xl mb-6">Ready to automate?</h2>
          <p className="text-xl text-[#667085] mb-8 max-w-2xl mx-auto">
            Let's discuss how AI can save your team time and money.
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg">
            Schedule Consultation
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
