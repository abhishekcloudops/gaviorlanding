import Link from "next/link";
import { allServices } from "@/content/site-data";

type ServiceDetail = {
  question: string;
  answer: string;
  deliverables: string[];
  considerations: string[];
};

const details: Record<string, ServiceDetail> = {
  "custom-websites": {
    question: "What is included in custom website development?",
    answer: "A custom website engagement can include positioning, information architecture, UX and visual design, content structure, frontend development, CMS or API integration, technical SEO, analytics and launch support. The right scope depends on the audience, conversion journey and systems the website needs to connect with.",
    deliverables: ["Audience and conversion-path mapping", "Responsive website design and component system", "Content structure, CMS or API integration", "Technical SEO, analytics and launch checklist"],
    considerations: ["What must a first-time visitor understand immediately?", "Which actions create a qualified enquiry or sale?", "Who will maintain pages and publish new content after launch?"],
  },
  "enterprise-applications": {
    question: "How does Gavior approach enterprise web applications?",
    answer: "Enterprise application work starts with the workflow, users, permissions and systems that already shape the operation. Gavior designs a practical path from discovery to a testable release, with attention to access control, integrations, data quality and adoption by the people who use the product every day.",
    deliverables: ["Workflow and role mapping", "UX prototypes for critical tasks", "Integration and data-flow design", "Phased build, QA and release plan"],
    considerations: ["Which workflow creates the most friction today?", "Which existing systems are the source of truth?", "What must be auditable, controlled or reversible?"],
  },
  "saas-development": {
    question: "What does SaaS product development cover?",
    answer: "SaaS development covers the decisions required to launch and improve a subscription product: product flows, tenant boundaries, roles and permissions, billing events, integrations, product analytics and a delivery plan that can evolve as customer feedback arrives.",
    deliverables: ["MVP scope and product roadmap", "Multi-tenant and permission model", "Billing and integration architecture", "Product analytics and operating handover"],
    considerations: ["What is the smallest valuable first release?", "How will tenant data and roles be protected?", "Which product events should guide the next release?"],
  },
  "mobile-app-development": {
    question: "What makes a mobile app project successful?",
    answer: "A useful mobile product is designed around the moments people need it: a task in the field, a decision away from a desk or a service interaction where speed matters. The project should define the core journeys, device behaviour, offline needs, notifications, APIs and a safe release process before development expands.",
    deliverables: ["Mobile user journeys and prototype", "Platform and API integration plan", "Device, accessibility and QA coverage", "Release readiness and iteration backlog"],
    considerations: ["Which task must work well on a small screen?", "Is offline access or device hardware important?", "How will feedback and crashes be triaged after launch?"],
  },
  "ui-ux-design": {
    question: "What is included in a UI/UX design engagement?",
    answer: "UI/UX design combines research, task flows, information architecture, prototypes and a reusable interface system. The aim is to help people complete important tasks with less effort while giving product and engineering teams clear, testable decisions to build from.",
    deliverables: ["User and task-flow research", "Information architecture and wireframes", "Interactive prototypes and usability feedback", "Design system and implementation guidance"],
    considerations: ["Which users and tasks matter most?", "Where do people abandon, repeat work or ask for help?", "Which patterns need to remain consistent as the product grows?"],
  },
  "ai-automation": {
    question: "What is included in an AI automation project?",
    answer: "AI automation should connect a real business trigger to a controlled outcome. Gavior maps the workflow, identifies useful source data and integrations, defines validation and review steps, and designs a release that can be monitored and improved without handing irreversible decisions to an untested system.",
    deliverables: ["Workflow and data-readiness assessment", "Integration and validation design", "Human-review and exception handling", "Monitoring, feedback and iteration plan"],
    considerations: ["Which repetitive step has a clear input and owner?", "What should be reviewed by a person before action?", "How will outputs be logged, corrected and measured?"],
  },
};

function fallback(name: string): ServiceDetail {
  return {
    question: `What does ${name.toLowerCase()} involve?`,
    answer: `Gavior scopes ${name.toLowerCase()} around the business problem, the people using the result and the systems it must work with. The engagement defines a focused outcome, practical deliverables, responsible owners and a clear path from discovery through implementation and handover.`,
    deliverables: ["Discovery and requirements alignment", "Practical delivery plan and priorities", "Design or engineering implementation", "Testing, handover and next-step recommendations"],
    considerations: ["What business outcome should this work improve?", "Who needs to use, manage or approve the result?", "Which systems, constraints and risks shape the delivery?"],
  };
}

export function ServicePageExpansion({ slug, name }: { slug: string; name: string }) {
  const detail = details[slug] ?? fallback(name);
  const related = allServices.filter((service) => service.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="shell py-20 md:py-28 border-t border-[#e1e4e8]">
        <div className="max-w-3xl">
          <p className="eyebrow">Service overview</p>
          <h2 className="display text-[42px] sm:text-[56px] mt-5">{detail.question}</h2>
          <p className="mt-7 text-[17px] leading-8 text-[#667085]">{detail.answer}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-12">
          <div className="rounded-2xl bg-[#f4f4f5] p-7 sm:p-8">
            <h3 className="text-xl font-bold">Typical delivery areas</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#475467]">
              {detail.deliverables.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e1e4e8] p-7 sm:p-8">
            <h3 className="text-xl font-bold">Questions we work through</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#475467]">
              {detail.considerations.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-[#f7f7f8] py-20">
        <div className="shell">
          <p className="eyebrow">From first conversation to delivery</p>
          <h2 className="display text-[40px] sm:text-[54px] mt-5 max-w-3xl">A service process built around decisions, not deliverables alone.</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-10">
            {["Understand the business context", "Define the priority workflow and scope", "Design and build with regular review", "Test, launch and plan the next improvement"].map((step, index) => (
              <div key={step} className="bg-white rounded-xl p-6 border border-[#e1e4e8]">
                <p className="text-xs font-bold text-[#7018ff]">0{index + 1}</p>
                <p className="mt-5 font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="shell py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div><p className="eyebrow">Related capabilities</p><h2 className="display text-[38px] mt-5">Build the right next step.</h2></div>
          <Link href="/book-consultation" className="button header-primary">Discuss your project</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {related.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="card p-6 hover:-translate-y-1 transition-transform"><p className="eyebrow">Service</p><h3 className="text-xl font-bold mt-5">{service.name}</h3><p className="text-sm leading-6 text-[#667085] mt-3">{service.short}</p><p className="text-sm font-bold text-[#7018ff] mt-6">Explore service →</p></Link>)}
        </div>
      </section>
    </>
  );
}
