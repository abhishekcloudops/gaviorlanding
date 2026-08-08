import { notFound } from "next/navigation";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { CTA, FAQ, Intro } from "@/components/sections";
import { allServices } from "@/content/site-data";
import { PageHero, TextBlocks } from "@/components/page-templates";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.name} | Gavior Services`,
    description: service.short,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} | Gavior Services`,
      description: service.short,
      type: "website",
    },
  };
}

export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = allServices.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <PageHero
        eyebrow={service.tag}
        title={service.name}
        copy={
          service.short +
          " We combine business perspective, design craft and technical discipline to make the result genuinely useful."
        }
        action="Talk to an expert"
      />
      <Intro
        eyebrow="The opportunity"
        title="Make the experience an advantage."
        copy="Too often, digital work starts with outputs. We begin with the choices that create value: who matters, what needs to change and how we’ll know it is working."
      />
      <TextBlocks
        items={[
          {
            title: "The business problem",
            body: "Growth is slowed by a fragmented experience, unclear value or systems that make good work harder than it should be.",
          },
          {
            title: "Our approach",
            body: "We map the important decisions, prototype quickly and build a focused solution that your people can own.",
          },
          {
            title: "What changes",
            body: "A stronger customer experience, better operational visibility and a digital asset that improves with your business.",
          },
        ]}
      />
      <section className="bg-[#0b1220] text-white py-18">
        <div className="shell grid md:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow text-white/60 before:bg-[#7018ff]">
              How we work
            </p>
            <h2 className="display text-5xl mt-5">
              A clear path
              <br />
              to useful change.
            </h2>
          </div>
          <ol className="grid gap-4">
            {[
              "Understand the real decision",
              "Design the smallest meaningful system",
              "Build, test and refine with your team",
              "Measure what moves the business forward",
            ].map((x, i) => (
              <li
                className="border-t border-white/20 pt-4 text-lg font-semibold"
                key={x}
              >
                <span className="text-[#9e6bff] mr-4">0{i + 1}</span>
                {x}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
