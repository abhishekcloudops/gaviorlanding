import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { BlogPage } from "@/components/page-templates";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/blog",
  },
};


export default function Blog() {
  return (
    <>
      <Header />
      <BlogPage />
      <Footer />
    </>
  );
}
