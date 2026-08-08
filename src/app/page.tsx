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
