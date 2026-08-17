import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/site-footer";
import { Header } from "@/components/site-header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Gavior | Digital Product, Brand & AI Partner",
  description:
    "Learn how Gavior helps ambitious businesses turn strategy into clear brands, useful digital products, growth systems and dependable technology.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Gavior | Make the next move clear",
    description:
      "Gavior brings strategy, design, engineering, growth and AI together around practical business progress.",
    url: "https://gavior.in/about",
  },
};

const principles = [
  [
    "01",
    "Start with the business decision",
    "We clarify the customer, workflow, constraint and outcome before we decide what to design or build.",
  ],
  [
    "02",
    "Make progress visible",
    "The important choices stay easy to review through research, prototypes, working software and clear delivery updates.",
  ],
  [
    "03",
    "Leave teams stronger",
    "A launch is not the finish line. We create systems your people can understand, operate and improve after the work is live.",
  ],
];

const capabilities = [
  ["Brand & direction", "Positioning, identity and clear messaging that give a business a recognisable point of view."],
  ["Digital products", "Websites, SaaS products, customer portals and internal tools designed around the work people need to get done."],
  ["Growth systems", "Search, content, campaigns and measurement that connect attention to meaningful commercial action."],
  ["Intelligent operations", "AI automation, cloud delivery and practical engineering that remove friction without losing control."],
];

export default function About() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell py-20 text-center sm:py-24 md:py-28">
            <p className="eyebrow justify-center">About Gavior</p>
            <h1 className="display mx-auto mt-5 max-w-6xl text-[44px] text-balance sm:text-[64px] lg:text-[82px]">
              We help ambitious businesses become easier to understand, choose and grow.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-[17px] leading-7 text-[#667085] text-pretty">
              Gavior is a digital partner for teams turning a business ambition into a clearer brand, a stronger product experience and systems that keep working as the business moves forward.
            </p>
          </div>
        </section>

        <section className="shell grid gap-10 py-16 sm:py-24 md:grid-cols-[1.06fr_.94fr] md:gap-16">
          <div>
            <p className="eyebrow">The company</p>
            <h2 className="display mt-5 max-w-2xl text-[42px] text-balance sm:text-[56px]">
              One connected team for the work that changes a business.
            </h2>
          </div>
          <div className="self-end space-y-5 text-[17px] leading-7 text-[#667085]">
            <p>Gavior works with founders, operators and established teams when a website, product, brand or internal system needs to do more than look polished. It needs to make a real business decision easier—for a customer, an employee or the team leading the company.</p>
            <p>Based in India and built to collaborate across time zones, we bring strategy, design, engineering, growth and cloud delivery into one practical working relationship. You work with the people shaping the idea and delivering it, not a chain of handoffs.</p>
          </div>
        </section>

        <section className="shell pb-16 sm:pb-24">
          <div className="overflow-hidden rounded-[28px] bg-[#171717] px-7 py-10 text-white sm:px-12 sm:py-14 md:px-16 md:py-16">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#c8adff]">Our goal</p>
            <div className="mt-7 grid gap-10 border-t border-white/15 pt-8 md:grid-cols-[1.1fr_.9fr] md:gap-16">
              <h2 className="display max-w-3xl text-[42px] leading-[.98] text-balance sm:text-[58px]">
                Turn business intent into digital systems people can trust and use.
              </h2>
              <div className="space-y-5 text-[16px] leading-7 text-white/68">
                <p>Our goal is not to add more technology, more content or more meetings. It is to help a business make its next move with confidence—whether that means earning trust faster, launching a product, creating demand or removing an operational bottleneck.</p>
                <p>We measure the quality of the work by what it makes possible: clearer choices, better experiences, dependable delivery and a stronger base for what comes next.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="shell pb-16 sm:pb-24">
          <div className="mb-9 flex flex-col gap-4 sm:mb-11 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">What we bring together</p>
              <h2 className="display mt-4 max-w-3xl text-[40px] text-balance sm:text-[54px]">The right capability, connected to the right outcome.</h2>
            </div>
            <p className="max-w-sm text-[15px] leading-6 text-[#667085]">Businesses can start with one focused need or combine disciplines around a larger digital goal.</p>
          </div>
          <div className="divide-y divide-[#e2e4e8] border-y border-[#e2e4e8]">
            {capabilities.map(([title, copy], index) => (
              <article className="grid gap-4 py-7 sm:py-8 md:grid-cols-[90px_1fr_1fr] md:items-start" key={title}>
                <span className="text-xs font-bold tracking-[.12em] text-[#7018ff]">0{index + 1}</span>
                <h3 className="text-[25px] font-bold leading-[1.05] tracking-[-.055em] text-[#171717]">{title}</h3>
                <p className="text-sm leading-6 text-[#667085]">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell pb-16 sm:pb-24">
          <div className="mb-9 flex flex-col gap-4 sm:mb-11 md:flex-row md:items-end md:justify-between">
            <div><p className="eyebrow">How we work</p><h2 className="display mt-4 text-[40px] sm:text-[54px]">Built around progress.</h2></div>
            <p className="max-w-sm text-[15px] leading-6 text-[#667085]">A shared approach that keeps the important decisions visible from first conversation through launch.</p>
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
