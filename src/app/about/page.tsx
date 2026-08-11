import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Gavior",
  description: "Meet Gavior, the digital partner for ambitious businesses building brands, websites and intelligent systems.",
  alternates: { canonical: "/about" },
};

const principles = [
  ["01", "Start with the real problem", "We get clear on what needs to change before deciding what to make."],
  ["02", "Make the complex feel simple", "Good strategy, design and technology should make the next decision easier."],
  ["03", "Build for what comes next", "Every project should be useful now and flexible enough to grow with the business."],
];

export default function About() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell py-20 sm:py-24 md:py-28 text-center">
            <p className="eyebrow justify-center">About Gavior</p>
            <h1 className="display mx-auto mt-5 max-w-5xl text-[44px] sm:text-[64px] lg:text-[82px] text-balance">
              We make the next move feel clear.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-7 text-[#667085] text-pretty">
              Gavior partners with ambitious businesses to turn good ideas into clear brands, useful digital products and systems that keep moving forward.
            </p>
          </div>
        </section>

        <section className="shell grid gap-10 py-16 sm:py-24 md:grid-cols-[1.08fr_.92fr] md:gap-16">
          <div>
            <p className="eyebrow">Our point of view</p>
            <h2 className="display mt-5 max-w-2xl text-[42px] sm:text-[56px] text-balance">
              The work should create momentum, not more noise.
            </h2>
          </div>
          <div className="self-end space-y-5 text-[17px] leading-7 text-[#667085]">
            <p>We believe strong digital work begins with a clear understanding of the business, the people it serves and the decision it needs to help them make.</p>
            <p>That means combining strategy, design and technology into one practical process—so every part of the experience works together and earns its place.</p>
          </div>
        </section>

        <section className="shell pb-16 sm:pb-24">
          <div className="overflow-hidden rounded-[26px] bg-[#171717] px-7 py-10 text-white sm:px-12 sm:py-14">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#c8adff]">What we bring</p>
            <div className="mt-8 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-3 md:gap-10">
              <div><p className="text-2xl font-bold tracking-[-.05em]">Clarity</p><p className="mt-3 text-sm leading-6 text-white/65">A focused path from the first question to the final launch.</p></div>
              <div><p className="text-2xl font-bold tracking-[-.05em]">Craft</p><p className="mt-3 text-sm leading-6 text-white/65">Thoughtful details that make a brand or product feel distinct and easy to use.</p></div>
              <div><p className="text-2xl font-bold tracking-[-.05em]">Momentum</p><p className="mt-3 text-sm leading-6 text-white/65">A practical delivery process that keeps work moving and teams aligned.</p></div>
            </div>
          </div>
        </section>

        <section className="shell pb-16 sm:pb-24">
          <div className="mb-9 flex flex-col gap-4 sm:mb-11 md:flex-row md:items-end md:justify-between">
            <div><p className="eyebrow">How we work</p><h2 className="display mt-4 text-[40px] sm:text-[54px]">Built around progress.</h2></div>
            <p className="max-w-sm text-[15px] leading-6 text-[#667085]">A shared approach that keeps the important things visible throughout the work.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(([number, title, copy]) => (
              <article className="rounded-[20px] border border-[#e6e5e8] bg-white p-7 sm:p-8" key={number}>
                <span className="text-xs font-bold tracking-[.12em] text-[#7018ff]">{number}</span>
                <h3 className="mt-9 text-[25px] font-bold leading-[1.05] tracking-[-.055em]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#667085]">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell pb-16 sm:pb-24">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[26px] bg-[#eee7ff] px-7 py-10 sm:px-12 sm:py-14 md:flex-row md:items-end">
            <div><p className="eyebrow">Have a project in mind?</p><h2 className="display mt-5 max-w-2xl text-[42px] sm:text-[58px]">Let&apos;s make the next move count.</h2></div>
            <Link className="button header-primary shrink-0" href="/book-consultation">Start a conversation <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
