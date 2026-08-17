import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { LegalPage } from "@/components/page-templates";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/privacy-policy",
  },
};


export default function Privacy() {
  return (
    <>
      <Header />
      <LegalPage
        eyebrow="Legal"
        title="Your information, handled with care."
        copy="Last updated: 18 August 2026. This policy explains how Gavior Technologies handles personal information when you visit gavior.in, contact us or work with us."
        blocks={[
          {
            title: "When this policy applies",
            body: "This policy covers information collected through gavior.in, our contact and consultation forms, email, WhatsApp and project communications. Project agreements may include additional data-handling terms where the work requires them.",
          },
          {
            title: "Information we may collect",
            body: "We may collect your name, business name, email address, phone number, project requirements, budget and timeline details, messages you send us, and limited technical information such as device, browser, IP address and pages visited. Please do not send sensitive personal information unless we have specifically asked for it in connection with an agreed project.",
          },
          {
            title: "Why we use it",
            body: "We use information to respond to enquiries, prepare proposals, deliver and support services, process agreed payments, protect our website and systems, understand website performance, and meet legal or accounting obligations. We do not sell personal information.",
          },
          {
            title: "Who we share it with",
            body: "We share information only where needed to run our business or deliver a service: trusted hosting, analytics, communication, payment or project-delivery providers; professional advisers; and authorities where legally required. These providers may process information under their own terms and security practices.",
          },
          {
            title: "Retention and security",
            body: "We keep information only for as long as reasonably needed for the purpose collected, including service delivery, records, dispute handling and legal compliance. We use reasonable organisational and technical safeguards, but no online transmission or storage method is completely secure.",
          },
          {
            title: "Your choices and requests",
            body: "You may ask us to access, correct or delete information we hold about you, or withdraw consent where consent is the basis for processing. We may need to retain certain records or verify your identity before completing a request. To make a request, email hello@gavior.in.",
          },
          {
            title: "Updates and contact",
            body: "We may update this policy when our services, tools or legal obligations change. The latest version will always be posted on this page. Questions or privacy requests can be sent to hello@gavior.in.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
