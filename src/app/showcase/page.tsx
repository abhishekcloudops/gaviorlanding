import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/showcase",
  },
};



const projects = [
  {
    title: "Men’s Grooming E-commerce UI Design",
    type: "UI / UX Design",
    image: "/showcase/mens-grooming-ui.png",
    href: "https://www.behance.net/gallery/244133067/Mens-Grooming-E-commerce-UI-Design",
  },
  {
    title: "Floriaa – Luxury Jewelry Brand Identity",
    type: "Brand Identity",
    image: "/showcase/floriaa-identity.png",
    href: "https://www.behance.net/gallery/243751775/Floriaa-Luxury-Jewelry-Brand-Identity",
  },
  {
    title: "Cafe Brew – Brand Identity Design",
    type: "Brand Identity",
    image: "/showcase/cafe-brew-identity.jpg",
    href: "https://www.behance.net/gallery/243272337/Cafe-Brew-Brand-Identity-Design",
  },
  {
    title: "Modern Vector Illustration Series",
    type: "Illustration",
    image: "/showcase/vector-illustrations.png",
    href: "https://www.behance.net/gallery/243123445/Modern-Vector-Illustration-Series",
  },
  {
    title: "Event Day Social Media Post Designs",
    type: "Social Media Design",
    image: "/showcase/event-social-posts.png",
    href: "https://www.behance.net/gallery/242775549/Event-Day-Social-Media-Post-Designs",
  },
  {
    title: "BotX Logo",
    type: "Logo Design",
    image: "/showcase/botx-logo.png",
    href: "https://www.behance.net/gallery/242771853/BotX-Logo",
  },
  {
    title: "2D Animation Portfolio",
    type: "Motion Design",
    image: "/showcase/2d-animation-portfolio.png",
    href: "https://www.behance.net/gallery/194345889/2D-ANIMATION-PORTFOLIO",
  },
];

export default function ShowcasePage() {
  return (
    <>
      <Header />
      <main>
        <section className="showcase-hero">
          <div className="shell py-24 sm:py-32 text-center">
            <p className="eyebrow justify-center">Graphic design showcase</p>
            <h1 className="display mt-6 max-w-4xl mx-auto text-[56px] sm:text-[82px]">
              Design work, made to be remembered.
            </h1>
            <p className="mt-7 max-w-2xl mx-auto text-[17px] leading-7 text-[#737373]">
              A selection of identity, UI, social and motion work by Gopa Dutta.
            </p>
            <a
              className="showcase-behance"
              href="https://www.behance.net/gopadutta"
              target="_blank"
              rel="noreferrer"
            >
              View all work on Behance <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        <section className="shell py-12 sm:py-18">
          <div className="showcase-grid">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className={`showcase-card ${index === 0 || index === 3 ? "showcase-card-wide" : ""}`}
              >
                <div className="showcase-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[.13em] font-bold text-[#737373]">
                      {project.type}
                    </p>
                    <h2 className="mt-2 text-lg sm:text-xl font-bold tracking-[-.045em]">
                      {project.title}
                    </h2>
                  </div>
                  <ArrowUpRight className="shrink-0" size={19} />
                </div>
              </a>
            ))}
          </div>
          <div className="mt-16 rounded-[22px] bg-[#171717] text-white px-7 py-10 sm:px-12 sm:py-14 flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
            <div>
              <p className="text-sm font-bold text-[#c8adff]">Have a project in mind?</p>
              <h2 className="display text-[42px] sm:text-[56px] mt-4 max-w-xl">Let&apos;s make it unmistakable.</h2>
            </div>
            <Link className="button bg-white text-[#171717]" href="/book-consultation">Start a conversation <ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
