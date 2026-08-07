import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { IndustriesPage } from "@/components/page-templates";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/industries",
  },
};


export default function Industries() {
  return (
    <>
      <Header />
      <IndustriesPage />
      <Footer />
    </>
  );
}
