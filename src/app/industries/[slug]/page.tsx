import { notFound } from "next/navigation";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { StandardPage } from "@/components/page-templates";
import { industries, industrySlug } from "@/content/site-data";

// Bounded to the industries we actually serve; every other slug 404s instead
// of returning 200 with the URL text injected into the page.
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((name) => ({ slug: industrySlug(name) }));
}

export default async function Industry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = industries.find((i) => industrySlug(i) === slug);
  if (!name) notFound();
  return (
    <>
      <Header />
      <StandardPage
        eyebrow="Industry focus"
        title={`${name}, built to move with confidence.`}
        copy={`We help ${name.toLowerCase()} organisations make complicated systems clearer for customers, teams and the people they serve.`}
        blocks={[
          {
            title: "Earn confidence",
            body: "Clear information, dependable interactions and an experience that makes every important choice easier.",
          },
          {
            title: "Operate better",
            body: "Connected systems and automation remove needless friction, giving your people more room for high-value work.",
          },
          {
            title: "Keep adapting",
            body: "We build flexible digital foundations designed to evolve as your market, team and customers change.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
