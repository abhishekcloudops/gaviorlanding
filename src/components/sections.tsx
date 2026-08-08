"use client";
import Link from "next/link";
import { ArrowRight, ChevronDown, MoveUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { faqs, projects, services } from "@/content/site-data";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
export const Reveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);
export function KineticHero() {
  return (
    <section className="kinetic-hero">
      <div className="shell cap-hero">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: "easeOut" }} className="cap-hero-content">
          <p className="cap-hero-kicker">Design. Develop. Deliver.</p>
          <h1 className="display cap-hero-title">Make your next move<br /><span>impossible to ignore.</span></h1>
          <p className="cap-hero-copy">Gavior partners with ambitious teams to create clear brands, useful products and systems that earn attention and keep it.</p>
          <div className="cap-hero-actions">
            <Link className="button cap-hero-main" href="/book-consultation">Start a project <ArrowRight size={16} /></Link>
            <a
              className="button bg-[#25D366] text-[#082d17] shadow-[0_8px_24px_rgba(25,120,61,.2)] hover:bg-[#2ee06f]"
              href={whatsappUrl("Hi Gavior, I found you through your website and would like to discuss a project. Please help me choose the right service.")}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
            </a>
            <Link className="button cap-hero-secondary" href="/portfolio"><Play size={14} fill="currentColor" /> See our work</Link>
          </div>
          <p className="cap-hero-note">No pressure. Just a useful first conversation.</p>
          <div className="cap-hero-proof"><span><b>01</b> Brand strategy</span><span><b>02</b> Digital products</span><span><b>03</b> Intelligent systems</span></div>
        </motion.div>
      </div>
    </section>
  );
}
export function Intro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="shell py-20 md:py-28 grid md:grid-cols-[1.05fr_.95fr] gap-9 items-end">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display text-[44px] sm:text-[59px] mt-5 max-w-xl">
          {title}
        </h2>
      </Reveal>
      <Reveal>
        <p className="text-[17px] leading-7 text-[#667085] max-w-md">{copy}</p>
      </Reveal>
    </div>
  );
}
export function ServiceGrid() {
  return (
    <section className="shell py-18 md:py-25">
      <div className="deck-layout">
        <Reveal className="deck-intro">
          <p className="eyebrow">What we do</p>
          <h2 className="display text-[42px] sm:text-[58px] mt-4">
            Built around your
            <br />
            next big move.
          </h2>
          <p className="deck-intro-copy">
            Six capabilities, one operating rhythm. Pick the one that moves your
            next release forward.
          </p>
          <Link href="/services" className="button button-light deck-intro-cta">
            All capabilities <ArrowRight size={15} />
          </Link>
        </Reveal>
        <Reveal className="deck">
          {services.slice(0, 6).map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="deck-card"
                style={
                  {
                    "--i": i,
                    "--tint": s.color,
                    zIndex: i + 1,
                  } as React.CSSProperties
                }
              >
                <div className="deck-card-top">
                  <span className="deck-card-kicker">
                    0{i + 1} / {s.tag}
                  </span>
                  <span
                    className="deck-card-icon"
                    style={{
                      background: s.color,
                      color: s.color === "#7018ff" ? "#fff" : "#111",
                    }}
                  >
                    <Icon size={16} />
                  </span>
                </div>
                <h3 className="deck-card-title">{s.name}</h3>
                <p className="deck-card-copy">{s.short}</p>
                <span className="deck-card-link">
                  Explore <MoveUpRight size={14} />
                </span>
                <span className="deck-card-bar" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
export function ProjectGrid() {
  return (
    <section className="bg-[#f7f7f8] py-20 md:py-28">
      <div className="shell">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="eyebrow before:bg-[#7018ff]">
              Selected work
            </p>
            <h2 className="display text-[46px] sm:text-[61px] mt-5">
              Evidence, not
              <br />
              empty promises.
            </h2>
          </div>
          <Link href="/portfolio" className="hidden sm:flex button button-light">
            View all work <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((p) => (
            <Reveal key={p.slug}>
              <Link href={`/portfolio/${p.slug}`} className="group block">
                <div
                  className="rounded-2xl p-5 aspect-[.82] flex flex-col justify-between overflow-hidden"
                  style={{ background: p.color }}
                >
                  <div className="flex justify-between text-xs font-bold">
                    <span>{p.type}</span>
                    <MoveUpRight
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      size={18}
                    />
                  </div>
                  <div className="rounded-xl bg-white/15 border border-white/25 backdrop-blur p-4">
                    <div className="font-semibold text-xl tracking-[-.04em]">
                      {p.name}
                    </div>
                    <div className="text-sm opacity-80 mt-1">
                      {p.description}
                    </div>
                  </div>
                </div>
              <div className="py-4 text-sm font-semibold text-[#667085]">
                  {p.result}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="shell py-20 md:py-28 grid lg:grid-cols-[.9fr_1.1fr] gap-12">
      <div>
        <p className="eyebrow">The details</p>
        <h2 className="display text-[44px] sm:text-[58px] mt-5">
          Good questions.
          <br />
          Clear answers.
        </h2>
      </div>
      <div>
        {faqs.map(([q, a]) => (
          <details className="group border-t border-[#dfe3ea] py-5" key={q}>
            <summary className="list-none cursor-pointer flex justify-between gap-4 font-bold text-[17px]">
              {q}
              <ChevronDown className="shrink-0 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-4 text-sm leading-6 text-[#667085] max-w-xl">
              {a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="shell pb-20">
      <div className="rounded-[24px] bg-[#171717] text-white p-7 sm:p-12 md:p-16 grid md:grid-cols-[1fr_auto] gap-10 items-end">
        <div>
          <p className="eyebrow text-white/70 before:bg-[#a56bff]">Make your move</p>
          <h2 className="display text-[47px] sm:text-[68px] mt-6 max-w-2xl">
            Ready to turn a better idea into a better business?
          </h2>
        </div>
          <Link className="button bg-white text-[#171717]" href="/book-consultation">
          Start a conversation <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
export function Metrics() {
  return (
    <section className="shell grid grid-cols-2 lg:grid-cols-4 border-y border-[#e1e4e8]">
      {[
        ["Strategy", "clear choices before execution"],
        ["Design", "experiences people can use"],
        ["Engineering", "systems built to evolve"],
        ["Partnership", "direct, practical collaboration"],
      ].map(([a, b]) => (
        <div key={a} className="py-9 px-4 first:pl-0">
          <div className="display text-5xl">{a}</div>
          <div className="text-xs font-semibold text-[#667085] mt-2">{b}</div>
        </div>
      ))}
    </section>
  );
}
