import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const cols = [
  [
    "Explore",
    [
      ["Services", "/services"],
      ["Our work", "/portfolio"],
      ["Case studies", "/case-studies"],
      ["Industries", "/industries"],
    ],
  ],
  [
    "Company",
    [
      ["About Gavior", "/about"],
      ["Careers", "/careers"],
      ["Journal", "/blog"],
      ["Contact", "/contact"],
    ],
  ],
  [
    "Capabilities",
    [
      ["Product & web", "/services/custom-websites"],
      ["Brand & experience", "/services/ui-ux-design"],
      ["Cloud & engineering", "/services/enterprise-applications"],
      ["AI & automation", "/services/ai-automation"],
    ],
  ],
];
export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-8">
      <div className="shell">
        <div className="grid lg:grid-cols-[1.3fr_2fr] gap-16 pb-20">
          <div>
            <div className="relative h-20 w-64 overflow-hidden">
              <Image
                src="/brand/gavior-logo-light.png"
                alt="Gavior — Design. Develop. Deliver."
                fill
                sizes="256px"
                className="object-contain scale-[4.2]"
              />
            </div>
            <h2 className="display text-[44px] mt-8 max-w-md">
              The next version of your business starts here.
            </h2>
            <Link
              href="/book-consultation"
              className="button mt-8 bg-[#7018ff] text-white"
            >
              Book a free consultation <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-9">
            {cols.map(([title, items]) => (
              <div key={title as string}>
                <h3 className="text-xs uppercase tracking-widest text-white/45 mb-5">
                  {title}
                </h3>
                <div className="grid gap-3">
                  {(items as string[][]).map(([l, h]) => (
                    <Link
                      key={h}
                      className="text-sm text-white/75 hover:text-[#b48cff]"
                      href={h}
                    >
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/45">
          <span>
            © {new Date().getFullYear()} Gavior Technologies. Built for forward
            motion.
          </span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookies</Link>
          </div>
          <a href="mailto:hello@gavior.in" className="hover:text-white transition-colors">hello@gavior.in</a>
        </div>
      </div>
    </footer>
  );
}
