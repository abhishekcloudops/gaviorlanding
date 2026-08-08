import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { GENERAL_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

const quickQueries = [
  ["Website", "Hi Gavior, I want to discuss a website for my business. Please share the right package and next steps."],
  ["Design & branding", "Hi Gavior, I need help with design or branding. I would like to discuss the scope and pricing."],
  ["Marketing & SEO", "Hi Gavior, I am interested in marketing or SEO services. Please help me choose the right plan."],
  ["Software & AI", "Hi Gavior, I have a software or AI project idea and would like to discuss feasibility, timeline and pricing."],
];

export function FloatingWhatsApp() {
  return (
    <details className="group fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <div className="mb-3 w-[min(350px,calc(100vw-32px))] overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_22px_65px_rgba(18,26,33,.22)]">
          <div className="flex items-start justify-between gap-5 bg-[#101b16] p-5 text-white">
            <div className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366]">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold">Chat with Gavior</p>
                <p className="mt-1 text-xs leading-5 text-white/60">Choose your query. A ready message will open in WhatsApp.</p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <p className="px-2 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[.15em] text-[#8a8490]">What can we help with?</p>
            <div className="grid gap-1.5">
              {quickQueries.map(([label, message]) => (
                <a
                  key={label}
                  href={whatsappUrl(message)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-bold text-[#28232c] transition-colors hover:bg-[#eefbf3] hover:text-[#147d3d]"
                >
                  {label}<span className="text-[#25a85a] transition-transform group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
            <a
              href={whatsappUrl(GENERAL_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block border-t border-[#eeeaf0] px-3 pt-3 text-xs font-semibold text-[#6d6772] hover:text-[#147d3d]"
            >
              Something else? Start a general chat →
            </a>
          </div>
        </div>

      <summary
        aria-label="Toggle WhatsApp enquiry"
        className="ml-auto flex min-h-14 w-fit cursor-pointer list-none items-center gap-3 rounded-full bg-[#25D366] p-2 pr-4 text-[#082d17] shadow-[0_12px_35px_rgba(25,120,61,.3)] transition-transform hover:-translate-y-1 hover:bg-[#2ee06f] [&::-webkit-details-marker]:hidden"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1faf56]">
          <WhatsAppIcon className="h-6 w-6 group-open:hidden" />
          <X className="hidden h-5 w-5 text-[#082d17] group-open:block" />
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-[10px] font-extrabold uppercase tracking-[.12em]">Quick enquiry</span>
          <span className="block text-sm font-extrabold">Chat on WhatsApp</span>
        </span>
      </summary>
    </details>
  );
}
