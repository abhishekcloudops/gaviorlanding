import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { StandardPage } from "@/components/page-templates";

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
      <StandardPage
        eyebrow="Legal"
        title="Terms of use."
        copy="By using this website, you agree to use it lawfully and not to interfere with its security, operation or the experience of other visitors."
        blocks={[
          {
            title: "Website content",
            body: "Gavior retains rights in the original materials on this website. Please request permission before reproducing them.",
          },
          {
            title: "No warranty",
            body: "Information is provided in good faith but without warranty. Project commitments are governed by a separate written agreement.",
          },
          {
            title: "Get in touch",
            body: "Questions about these terms can be sent to hello@gavior.in.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
