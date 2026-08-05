import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { Search } from "lucide-react";

// Search UI, not a destination page: keep it out of the index.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};
const results = [
  [
    "Custom website development",
    "Services",
    "A high-performance digital presence built to turn attention into action.",
    "/services/custom-websites",
  ],
  [
    "AI automation",
    "Services",
    "Practical intelligence woven into the way your business works.",
    "/services/ai-automation",
  ],
  [
    "Selected work",
    "Portfolio",
    "Evidence from teams that chose to make the work more serious.",
    "/portfolio",
  ],
];
export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="shell py-20 min-h-[65vh]">
        <p className="eyebrow">Search</p>
        <h1 className="display text-6xl mt-5">Find your next move.</h1>
        <div className="relative mt-9">
          <Search className="absolute left-5 top-4 text-[#667085]" />
          <input
            autoFocus
            aria-label="Search Gavior"
            className="w-full bg-white border border-[#dfe3ea] rounded-2xl py-4 pl-13 pr-5 text-lg"
            placeholder="Search services, work and insights"
          />
        </div>
        <div className="mt-10 max-w-3xl">
          {results.map(([title, type, copy, url]) => (
            <Link
              href={url}
              key={title}
              className="block border-t border-[#dfe3ea] py-6"
            >
              <p className="text-xs uppercase tracking-widest font-bold text-[#667085]">
                {type}
              </p>
              <h2 className="font-bold text-xl tracking-[-.04em] mt-2">
                {title}
              </h2>
              <p className="text-sm text-[#667085] mt-2">{copy}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
