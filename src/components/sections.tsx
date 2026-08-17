import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { preload } from "react-dom";
import { faqs } from "@/content/site-data";
import { ServiceFanCarousel } from "@/components/service-fan-carousel";
export const Reveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    {children}
  </div>
);
export function KineticHero() {
  preload("/brand/gavior-sky-hero-v2.avif", {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
    imageSrcSet:
      "/brand/gavior-sky-hero-mobile-v4.avif 400w, /brand/gavior-sky-hero-mobile-v3.avif 800w, /brand/gavior-sky-hero-v2.avif 1672w",
    imageSizes: "(max-width: 600px) 42vw, 38vw",
  });

  return (
    <section className="kinetic-hero">
      <picture className="kinetic-hero-media">
        <source
          srcSet="/brand/gavior-sky-hero-mobile-v4.avif 400w, /brand/gavior-sky-hero-mobile-v3.avif 800w, /brand/gavior-sky-hero-v2.avif 1672w"
          sizes="(max-width: 600px) 42vw, 38vw"
          type="image/avif"
        />
        {/* This native picture keeps a WebP fallback while making the LCP image
            discoverable in the initial HTML. */}
        <img
          src="/brand/gavior-sky-hero-v2.webp"
          srcSet="/brand/gavior-sky-hero-mobile-v4.webp 400w, /brand/gavior-sky-hero-mobile-v3.webp 800w, /brand/gavior-sky-hero-v2.webp 1672w"
          sizes="(max-width: 600px) 42vw, 38vw"
          alt="Abstract sky illustration in Gavior brand colours"
          width="1672"
          height="941"
          fetchPriority="high"
          decoding="sync"
        />
      </picture>
      <div className="shell cap-hero">
        <div className="cap-hero-content">
          <p className="cap-hero-offer">Launch Offer <span>•</span> Websites from ₹4,999</p>
          <p className="cap-hero-kicker">Design. Develop. Deliver.</p>
          <h1 className="display cap-hero-title">Make your next move<br /><span>impossible to ignore.</span></h1>
          <p className="cap-hero-copy">Gavior partners with ambitious teams to create clear brands, useful products and systems that earn attention and keep it.</p>
          <div className="cap-hero-actions">
            <Link className="button cap-hero-main" href="/book-consultation">Get a Free Quote <ArrowRight size={16} /></Link>
            <Link className="button cap-hero-secondary" href="/services">Explore Services <ArrowRight size={16} /></Link>
          </div>
          <p className="cap-hero-note">Fast delivery <span>•</span> Transparent pricing <span>•</span> Built for growing businesses</p>
          <div className="cap-hero-proof"><span><b>01</b> Brand strategy</span><span><b>02</b> Digital products</span><span><b>03</b> Intelligent systems</span></div>
        </div>
      </div>
    </section>
  );
}
export function ServiceStrip() {
  return (
    <section className="home-service-strip" aria-label="Gavior core services">
      <div className="shell home-service-strip-inner">
        <span>Web Development</span><i aria-hidden>•</i><span>Branding</span><i aria-hidden>•</i><span>Social Media</span><i aria-hidden>•</i><span>SEO</span><i aria-hidden>•</i><span>AI Automation</span>
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
    <section className="service-fan-section">
      <div className="shell">
        <div className="service-fan-heading">
          <p className="eyebrow eyebrow-light">What we build</p>
          <h2 className="display">Digital solutions that<br />move your business forward.</h2>
          <p>GAVIOR combines development, design, automation and digital growth to turn ideas into practical business solutions.</p>
        </div>
        <ServiceFanCarousel />
        <div className="service-fan-cta">
          <div><span>Have a project in mind?</span><strong>Let&apos;s build something that actually works.</strong></div>
          <div><Link href="/book-consultation" className="button service-fan-primary">Start a Project <ArrowRight size={16} /></Link><Link href="/services" className="button service-fan-secondary">View All Services <ArrowRight size={16} /></Link></div>
        </div>
      </div>
    </section>
  );
}
export function ProjectGrid() {
  const websiteProjects = [
    { name: "Gavior", url: "https://gavior.in/", category: "Digital products", description: "Digital products, brands and intelligent systems for ambitious businesses.", image: "/portfolio/gavior.png", width: 2048, height: 1155 },
    { name: "Calvary Chapel Montrose", url: "https://calvarymontrose.com/", category: "Church community", description: "A welcoming faith community in Montrose, Colorado.", image: "/portfolio/calvary-montrose.png", width: 1200, height: 760 },
    { name: "Calvary LIFE", url: "https://calvarylife.com/", category: "Church community", description: "A church community focused on learning, relationships and faith.", image: "/portfolio/calvary-life.png", width: 2048, height: 1155 },
  ];
  const reviews = [
    { company: "Nimbus Health", role: "Healthcare platform", quote: "The process was clear from day one. We got a website that feels easier for our patients to use.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=82" },
    { company: "Vanta Commerce", role: "Retail intelligence", quote: "Fast communication, strong design decisions and a product direction our team could actually build on.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=82" },
    { company: "Northstar", role: "Logistics command centre", quote: "Gavior helped turn a complicated workflow into something much more straightforward for the team.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=82" },
  ];

  return (
    <section className="bg-[#f7f7f8] py-20 md:py-28">
      <div className="shell">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div><p className="eyebrow before:bg-[#7018ff]">Selected work</p><h2 className="display text-[46px] sm:text-[61px] mt-5">Work that moves<br />things forward.</h2></div>
          <Link href="/portfolio" className="hidden sm:inline-flex button button-light">View all work <ArrowRight size={15} /></Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {websiteProjects.map((project) => (
            <a key={project.name} href={project.url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <div className="overflow-hidden bg-[#ecebf0]"><Image src={project.image} alt={`${project.name} website preview`} width={project.width} height={project.height} sizes="(max-width: 768px) 100vw, 33vw" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" /></div>
              <div className="p-5"><span className="text-xs font-bold text-[#7018ff]">{project.category}</span><h3 className="mt-2 text-2xl font-bold tracking-[-.05em]">{project.name}</h3><p className="mt-2 text-sm leading-5 text-[#667085]">{project.description}</p></div>
              <div className="flex items-center justify-between gap-3 border-t border-[#eeeeef] px-5 py-4 text-sm font-bold"><span>View live website</span><ArrowRight className="transition-transform group-hover:translate-x-1" size={16} /></div>
            </a>
          ))}
        </div>
        <div className="mt-14 border-t border-[#dedee2] pt-10"><p className="eyebrow">Client reviews</p><h3 className="display mt-4 text-[38px] sm:text-[48px]">Good work. Good words.</h3><div className="mt-8 grid gap-4 md:grid-cols-3">{reviews.map((review) => <article key={review.company} className="rounded-2xl bg-white border border-[#e4e4e7] p-6"><p className="text-[17px] leading-7 text-[#36333b]">“{review.quote}”</p><div className="mt-7 flex items-center gap-3 border-t border-[#ececef] pt-4"><span className="h-11 w-11 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${review.image})` }} aria-hidden /><div><strong className="block text-sm">{review.company}</strong><span className="mt-1 block text-xs text-[#737373]">{review.role}</span></div></div></article>)}</div></div>
      </div>
    </section>
  );
}
export function ClientReviews() {
  const reviews = [
    { name: "Riya Sharma", company: "Business owner", image: "/testimonials/client-one.png", quote: "Gavior made the whole process simple. The new website finally feels like our business." },
    { name: "Arjun Mehta", company: "Founder", image: "/testimonials/client-two.png", quote: "Quick communication, clean work and a result that was much better than we expected." },
    { name: "Nisha Kapoor", company: "Marketing lead", image: "/testimonials/client-three.png", quote: "They understood what we needed and turned it into something clear, modern and easy to use." },
  ];

  return (
    <section className="bg-[#f7f7f8] py-20 md:py-28">
      <div className="shell">
        <div className="max-w-2xl"><p className="eyebrow">Client reviews</p><h2 className="display mt-5 text-[44px] sm:text-[60px]">People notice<br />the difference.</h2></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{reviews.map((review) => <article key={review.name} className="rounded-[22px] border border-[#e5e2e8] bg-white p-6"><div className="flex items-center gap-3"><Image src={review.image} alt={review.name} width={176} height={176} className="h-12 w-12 rounded-full object-cover" /><div><strong className="block text-sm">{review.name}</strong><span className="mt-0.5 block text-xs text-[#737373]">{review.company}</span></div></div><p className="mt-7 text-[17px] leading-7 text-[#3e3a43]">“{review.quote}”</p></article>)}</div>
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
          <p className="eyebrow eyebrow-light before:bg-[#a56bff]">Make your move</p>
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
        <div key={a} className="min-w-0 py-9 px-1 first:pl-0 sm:px-4">
          <div className="display break-words text-[clamp(1.45rem,7vw,3rem)]">{a}</div>
          <div className="text-xs font-semibold text-[#667085] mt-2">{b}</div>
        </div>
      ))}
    </section>
  );
}
