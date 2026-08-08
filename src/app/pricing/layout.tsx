import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website, Design, AI & Software Pricing | Gavior",
  description:
    "Explore transparent Gavior pricing for websites, branding, digital marketing, software, AI automation, cloud and DevOps services.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
