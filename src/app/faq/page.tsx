import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { PageHero } from "@/components/page-templates";
import { FAQ, CTA } from "@/components/sections";
import { faqs } from "@/content/site-data";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Gavior",
  description: "Get answers to common questions about Gavior's custom website development, AI automation, pricing, and enterprise software engineering.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <PageHero
        eyebrow="FAQ"
        title="A little more clarity before we begin."
        copy="The questions we hear most often from teams considering a Gavior partnership."
      />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
