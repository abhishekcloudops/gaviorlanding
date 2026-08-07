import { notFound } from "next/navigation";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { PageHero, TextBlocks } from "@/components/page-templates";
import { CTA } from "@/components/sections";
import { projects } from "@/content/site-data";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  
  return {
    title: `${p.name} | Gavior Portfolio`,
    description: p.description,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: `${p.name} | Gavior Portfolio`,
      description: p.description,
      type: "article",
    },
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Header />
      <PageHero
        eyebrow={p.type}
        title={p.name}
        copy={
          p.description +
          " A considered new experience built around the people who depend on it."
        }
        action="Start a similar project"
      />
      <section className="shell py-12">
        <div
          className="rounded-[28px] aspect-[2.1] p-8 flex items-end"
          style={{ background: p.color }}
        >
          <div className="bg-white/15 rounded-xl border border-white/25 backdrop-blur p-6 text-white text-3xl font-bold tracking-[-.05em]">
            A more capable way
            <br />
            to do the important work.
          </div>
        </div>
      </section>
      <TextBlocks
        items={[
          {
            title: "The challenge",
            body: "A fast-growing organisation had outgrown the patchwork of tools and messages holding its customer experience together.",
          },
          {
            title: "The solution",
            body: "We clarified the service model, designed a calmer interface and built an adaptable platform around the moments that drive confidence.",
          },
          {
            title: "The result",
            body:
              p.result +
              ", plus a platform the internal team can evolve without depending on a release queue.",
          },
        ]}
      />
      <CTA />
      <Footer />
    </>
  );
}
