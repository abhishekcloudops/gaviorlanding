import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { LegalPage } from "@/components/page-templates";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/terms",
  },
};


export default function Terms() {
  return (
    <>
      <Header />
      <LegalPage
        eyebrow="Legal"
        title="Terms for using this website."
        copy="Last updated: 18 August 2026. These terms apply to your use of gavior.in. A signed proposal, statement of work or service agreement governs any paid Gavior engagement."
        blocks={[
          {
            title: "Using this website",
            body: "You may use this site for lawful, personal or business-information purposes. Do not misuse the site, probe or interfere with its systems, introduce harmful code, scrape it at scale, impersonate another person, or use content in a way that infringes rights or breaks applicable law.",
          },
          {
            title: "Information and enquiries",
            body: "We aim to keep website information useful and current, but it is general information and may change without notice. A contact form submission, WhatsApp conversation, pricing page or proposal discussion does not create a client relationship, guaranteed availability or binding commitment unless we confirm it in writing.",
          },
          {
            title: "Pricing and project scope",
            body: "Published prices are starting points or clearly stated package prices, subject to availability and written scope confirmation. Deliverables, timelines, revisions, third-party costs, payment milestones, ownership and support obligations are confirmed in the applicable proposal or agreement.",
          },
          {
            title: "Intellectual property",
            body: "Gavior and its licensors retain rights in this site’s design, copy, code, graphics, trademarks and other original materials. You may not copy, republish, modify, distribute or commercially use them without permission. Ownership of project deliverables is addressed in the relevant client agreement.",
          },
          {
            title: "Third-party links and services",
            body: "This site may link to third-party websites or tools for convenience. We do not control, endorse or accept responsibility for their content, availability, privacy practices or services. Your use of them is governed by their own terms.",
          },
          {
            title: "Liability and legal effect",
            body: "To the extent permitted by applicable law, this site is provided as available and without warranties of uninterrupted, error-free or secure operation. Gavior is not liable for indirect, incidental or consequential loss arising from use of this site. Nothing in these terms limits liability that cannot lawfully be excluded.",
          },
          {
            title: "Governing law and contact",
            body: "These terms are governed by applicable laws of India. If any part is unenforceable, the remaining terms continue to apply. Questions about these terms can be sent to hello@gavior.in.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
