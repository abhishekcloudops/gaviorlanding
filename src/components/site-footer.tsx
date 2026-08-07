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
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
