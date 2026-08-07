import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { WorkPage } from "@/components/page-templates";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/case-studies",
  },
};


export default function Studies() {
  return (
    <>
      <Header />
      <WorkPage caseStudies />
      <Footer />
    </>
  );
}
