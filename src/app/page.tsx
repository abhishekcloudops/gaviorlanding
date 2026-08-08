import type { Metadata } from "next";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import {
  CTA,
  FAQ,
  Intro,
  KineticHero,
  Metrics,
  ProjectGrid,
  ServiceGrid,
} from "@/components/sections";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gavior — Web Development, AI Automation & Digital Products",
  description: "Build modern websites, SaaS products, and AI automation systems with Gavior — designed for growth, speed, and clarity.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <KineticHero />
        <Intro
          eyebrow="The Gavior difference"
          title="Clarity is a competitive advantage."
          copy="We bring strategy, craft and engineering together—so every decision serves the bigger picture and every detail earns its place."
        />
        <Metrics />
        <ServiceGrid />
        <section className="bg-[#f7f7f8] py-20 md:py-28">
          <div className="shell grid lg:grid-cols-[.9fr_1.1fr] gap-12">
            <div>
              <p className="eyebrow">Digital product and engineering partner</p>
              <h2 className="display text-[43px] sm:text-[58px] mt-5">What Gavior helps businesses build.</h2>
            </div>
            <div className="text-[17px] leading-8 text-[#667085] grid gap-5">
              <p>Gavior works with organisations that need a clearer digital presence, a more useful product or a better way to operate. Our work spans custom website development, SaaS products, enterprise applications, UI/UX design, cloud engineering and AI workflow automation.</p>
              <p>Every engagement starts by understanding the business decision behind the request: the audience, the workflow, the systems involved and the outcome that would make the investment worthwhile. That lets strategy, design and engineering move in one direction.</p>
              <p>Whether you need a focused discovery sprint, a defined product release or ongoing delivery support, we help shape the scope into a practical plan your team can understand and own.</p>
              <Link href="/services" className="font-bold text-[#7018ff]">Explore all Gavior services →</Link>
            </div>
          </div>
        </section>
        <section className="shell py-20 md:py-28">
          <p className="eyebrow">How we approach a project</p>
          <h2 className="display text-[43px] sm:text-[58px] mt-5 max-w-3xl">Start with the decision. Build the system around it.</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[['01', 'Clarify the problem', 'Align on the people, workflow, constraints and outcome before choosing the solution.'], ['02', 'Make the right thing visible', 'Use research, prototypes and technical planning to turn assumptions into decisions the team can review.'], ['03', 'Deliver with a practical rhythm', 'Build, test and improve in focused increments, with clear ownership at launch and beyond.']].map(([number, title, copy]) => (
              <div key={number} className="card p-7">
                <p className="text-xs font-bold text-[#7018ff]">{number}</p>
                <h3 className="text-2xl font-bold tracking-[-.04em] mt-7">{title}</h3>
                <p className="text-sm leading-6 text-[#667085] mt-4">{copy}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="shell py-20 grid lg:grid-cols-2 gap-8">
          <div className="rounded-[20px] bg-[#f4f4f5] p-8 sm:p-11">
            <p className="eyebrow">One connected team</p>
            <h2 className="display text-[42px] mt-6">
              Less handoff.
              <br />
              More progress.
            </h2>
            <p className="mt-6 leading-7 text-[#667085] max-w-md">
              Our strategists, designers and engineers sit on the same side of
              the table. It makes the work stronger—and the route from insight
              to impact much shorter.
            </p>
          </div>
          <div className="rounded-[20px] bg-[#171717] text-white p-8 sm:p-11 flex flex-col justify-between">
            <div>
              <p className="eyebrow text-white/70 before:bg-[#a56bff]">A practical point of view</p>
              <h2 className="display text-[42px] mt-6">
                Beautiful only
                <br />
                matters if it works.
              </h2>
            </div>
            <p className="font-semibold max-w-sm">
              Everything we create is designed to be understood, used and
              measured in the real world.
            </p>
          </div>
        </section>
        <ProjectGrid />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
