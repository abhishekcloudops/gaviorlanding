import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WHATSAPP_DISPLAY_NUMBER, whatsappUrl } from "@/lib/whatsapp";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Gavior Digital Engineering",
  description: "Get in touch with Gavior's software architecture and design team. We respond within 24 hours to discuss custom website development, AI automation, and enterprise apps.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Gavior",
    url: "https://gavior.in",
    logo: "https://gavior.in/brand/gavior-logo-light.png",
    image: "https://gavior.in/brand/gavior-sky-hero.png",
    description: "Gavior provides custom web application development, AI workflow automation, SaaS engineering, and UI/UX design.",
    email: "hello@gavior.in",
    telephone: "+91-6291-939-807",
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Header />
      <main className="shell py-20 md:py-28 grid lg:grid-cols-[.85fr_1.15fr] gap-12">
        <div>
          <p className="eyebrow">Contact Gavior</p>
          <h1 className="display text-[56px] sm:text-[72px] mt-6">
            Let’s make the next move count.
          </h1>
          <p className="text-[17px] leading-7 text-[#667085] mt-7 max-w-md">
            Tell us what you’re solving, building or rethinking. We’ll bring the
            right people to the first conversation.
          </p>
          <div className="mt-12 grid gap-6 text-sm">
            <a
              href={whatsappUrl("Hi Gavior, I found your contact page and would like to discuss a project with your team.")}
              target="_blank"
              rel="noreferrer"
              className="group flex max-w-md items-center gap-4 rounded-2xl border border-[#bfe8ce] bg-[#f1fbf5] p-4 transition-all hover:-translate-y-0.5 hover:border-[#25D366] hover:shadow-[0_12px_30px_rgba(25,120,61,.1)]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-7 w-7" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-[.16em] text-[#28864c]">WhatsApp Business</span>
                <span className="mt-1 block text-lg font-extrabold text-[#153622]">{WHATSAPP_DISPLAY_NUMBER}</span>
                <span className="mt-0.5 block text-xs font-semibold text-[#4f785e]">Quick project enquiries • Chat now →</span>
              </span>
            </a>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#667085]">
                Email
              </p>
              <a className="font-bold text-lg" href="mailto:hello@gavior.in">
                hello@gavior.in
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#667085]">
                Based in
              </p>
              <p className="font-bold text-lg">India, working globally</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#667085]">
                Response time
              </p>
              <p className="font-bold text-lg">Within one business day</p>
            </div>
          </div>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
