"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Services", "/services"],
    ["Work", "/portfolio"],
    ["Showcase", "/showcase"],
    ["About", "/about"],
    ["Insights", "/blog"],
  ];
  return (
    <header className="sticky top-0 z-40 pt-3 text-[#171717]">
      <div className="shell">
        <div className="h-[60px] sm:h-[66px] px-3 sm:px-4 flex items-center justify-between gap-3 rounded-[22px] sm:rounded-[26px] border border-black/10 bg-white/85 backdrop-blur-xl shadow-[0_5px_24px_rgba(15,23,42,.06)]">
          <Link
            href="/"
            aria-label="Gavior home"
            className="relative block h-9 w-28 shrink-0 sm:h-10 sm:w-32"
          >
            <Image
              src="/brand/gavior-logo.png"
              alt="Gavior — Design. Develop. Deliver."
              fill
              sizes="160px"
              className="object-contain object-left"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-semibold text-[#727272]">
            {links.map(([label, href]) => (
              <Link key={href} className="hover:text-[#9e6bff]" href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex gap-3">
            <Link className="button header-contact" href="/contact">
              Contact
            </Link>
            <Link className="button header-primary" href="/book-consultation">
              Let’s build <ArrowRight size={15} />
            </Link>
          </div>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            className="md:hidden grid h-9 w-9 place-items-center rounded-full bg-[#f4f4f5]"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="mt-2 rounded-[20px] border border-black/10 bg-white/95 p-2 grid gap-1 shadow-[0_12px_28px_rgba(15,23,42,.08)] md:hidden">
            {[
              ...links,
              ["Contact", "/contact"],
              ["Book a consultation", "/book-consultation"],
            ].map(([l, h]) => (
              <Link
                onClick={() => setOpen(false)}
                className="font-semibold text-sm p-3 rounded-xl hover:bg-[#f5f5f5]"
                key={h}
                href={h}
              >
                {l}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
