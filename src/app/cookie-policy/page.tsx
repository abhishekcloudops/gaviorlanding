import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { StandardPage } from "@/components/page-templates";

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
      <StandardPage
        eyebrow="Legal"
        title="Cookies, without the mystery."
        copy="We use essential cookies to make this website function and may use privacy-conscious analytics to understand what content is useful."
        blocks={[
          {
            title: "Essential cookies",
            body: "These support basic site functionality and cannot be switched off in our systems.",
          },
          {
            title: "Analytics",
            body: "Aggregated measurement helps us understand website performance; it is not used to identify you personally.",
          },
          {
            title: "Control",
            body: "You can manage cookies through your browser settings. Restricting them may affect some site features.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
