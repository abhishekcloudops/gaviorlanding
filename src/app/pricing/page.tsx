import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { PageHero } from "@/components/page-templates";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/pricing",
  },
};


export default function Pricing() {
  const tiers = [
    [
      "Discovery sprint",
      "For decisions that need certainty",
      "2–3 weeks",
      "A focused strategy, product and technical direction.",
    ],
    [
      "Transformation project",
      "For a defined digital step-change",
      "From 8 weeks",
      "A cross-functional team focused on one meaningful outcome.",
    ],
    [
      "Embedded partnership",
      "For ongoing momentum",
      "Flexible",
      "Senior capability woven into your team’s rhythm.",
    ],
  ];
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Ways to work"
        title="Investment follows the outcome."
        copy="The work is too important for fixed packages that ignore your context. These are useful starting points, not rigid boundaries."
        action="Discuss your project"
      />
      <section className="shell pb-20 grid md:grid-cols-3 gap-4">
        {tiers.map((t, i) => (
          <div
            className={`card p-7 flex flex-col ${i === 1 ? "bg-[#0b1220] text-white" : ""}`}
            key={t[0]}
          >
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">
              {t[1]}
            </p>
            <h2 className="text-2xl font-bold tracking-[-.05em] mt-6">
              {t[0]}
            </h2>
            <p className="text-sm opacity-70 mt-3 flex-1">{t[3]}</p>
            <div className="border-t border-current/20 mt-8 pt-5">
              <strong>{t[2]}</strong>
              <Link
                href="/book-consultation"
                className="button mt-5 w-full bg-[#7018ff] text-white"
              >
                Explore fit
              </Link>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
