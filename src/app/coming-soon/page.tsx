import Link from "next/link";
import type { Metadata } from "next";

// Placeholder page: kept reachable, but not a search result.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-[#0b1220] text-white grid place-items-center p-6">
      <div className="text-center max-w-xl">
        <div className="text-4xl font-bold tracking-[-.1em]">
          gavior<span className="text-[#7018ff]">.</span>
        </div>
        <p className="eyebrow justify-center mt-20 text-white/70 before:bg-[#7018ff]">
          A new chapter
        </p>
        <h1 className="display text-6xl sm:text-8xl mt-6">
          Something useful is taking shape.
        </h1>
        <p className="text-white/60 mt-8">
          We’re putting the finishing touches on an experience worth your
          attention.
        </p>
        <Link href="/" className="button bg-[#7018ff] text-white mt-9">
          Back to Gavior
        </Link>
      </div>
    </main>
  );
}
