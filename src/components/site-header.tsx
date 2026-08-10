import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
export function Header() {
  const links = [
    ["Services", "/services"],
    ["Work", "/portfolio"],
    ["About", "/about"],
    ["Insights", "/blog"],
    ["Pricing", "/pricing"],
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
              src="/brand/gavior-logo-header.avif"
              alt="Gavior — Design. Develop. Deliver."
              fill
              sizes="160px"
              className="object-contain object-left"
              unoptimized
              loading="eager"
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-semibold text-[#727272]">
            {links.map(([label, href]) => (
              <Link key={href} className="hover:text-[#9e6bff]" href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex gap-3">
            <Link className="button header-contact" href="/contact">
              Contact
            </Link>
            <Link className="button header-primary" href="/book-consultation">
              Let’s build <ArrowRight size={15} />
            </Link>
          </div>
          <details className="group relative lg:hidden">
            <summary
              aria-label="Toggle navigation"
              className="grid h-9 w-9 cursor-pointer list-none place-items-center rounded-full bg-[#f4f4f5] [&::-webkit-details-marker]:hidden"
            >
              <Menu className="group-open:hidden" />
              <X className="hidden group-open:block" />
            </summary>
            <nav className="absolute right-0 top-12 w-[min(330px,calc(100vw-28px))] rounded-[20px] border border-black/10 bg-white/95 p-2 grid gap-1 shadow-[0_12px_28px_rgba(15,23,42,.08)]">
              {[
                ...links,
                ["Contact", "/contact"],
                ["Book a consultation", "/book-consultation"],
              ].map(([label, href]) => (
                <Link
                  className="rounded-xl p-3 text-sm font-semibold hover:bg-[#f5f5f5]"
                  key={href}
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
