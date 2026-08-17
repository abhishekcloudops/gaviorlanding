import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { LegalPage } from "@/components/page-templates";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/cookie-policy",
  },
};


export default function Cookies() {
  return (
    <>
      <Header />
      <LegalPage
        eyebrow="Legal"
        title="How cookies work here."
        copy="Last updated: 18 August 2026. Cookies are small text files that help a website remember information about a visit. This page explains how they may be used on gavior.in."
        blocks={[
          {
            title: "Strictly necessary cookies",
            body: "Some cookies or similar technologies may be needed for core website functions, security, load balancing and remembering essential preferences. Blocking these can affect how the site works.",
          },
          {
            title: "Analytics and performance measurement",
            body: "We may use analytics tools to understand pages viewed, referral sources, device and browser trends, and website performance. This helps us improve content and identify technical problems. Analytics providers may set their own cookies or use similar technologies under their privacy terms.",
          },
          {
            title: "Third-party services",
            body: "If you follow a link to WhatsApp, social platforms, embedded content or another third-party service, that provider may set cookies or collect information according to its own policies. Gavior does not control those technologies.",
          },
          {
            title: "Your controls",
            body: "Most browsers let you view, delete or block cookies through their settings. You can also use browser privacy controls or opt-out tools offered by particular analytics providers. Blocking cookies does not remove information already collected and may limit some functionality.",
          },
          {
            title: "Changes and contact",
            body: "We may update this policy if the technologies used on the site change. Questions about cookies can be sent to hello@gavior.in. For broader information-handling practices, please read our Privacy Policy.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
