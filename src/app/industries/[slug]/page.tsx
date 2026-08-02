import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { StandardPage } from "@/components/page-templates";
export default async function Industry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(" ");
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
