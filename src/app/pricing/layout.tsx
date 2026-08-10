import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordable Website, Branding & Marketing Pricing | Gavior",
  description:
    "Explore transparent, affordable Gavior pricing for websites, branding, social media, SEO, marketing, AI automation and cloud support in India.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
