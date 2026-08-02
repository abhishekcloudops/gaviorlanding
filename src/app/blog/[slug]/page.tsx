import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { CTA } from "@/components/sections";
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(" ");
  return (
    <>
      <Header />
      <article className="shell max-w-[820px] py-20">
        <p className="eyebrow">Gavior journal · 6 min read</p>
        <h1 className="display text-[52px] sm:text-[72px] mt-6">{title}</h1>
        <p className="text-xl leading-8 text-[#667085] mt-8">
          The most useful digital work is built around the choices people need
          to make—not the technology they happen to use.
        </p>
        <div className="mt-14 grid gap-7 text-[17px] leading-8 text-[#344054]">
          <p>
            It is easy to mistake activity for progress. A new tool, a more
            detailed brief, another campaign—each can create the feeling of
            motion without making the underlying experience any clearer.
          </p>
          <h2 className="text-3xl font-bold tracking-[-.05em] text-[#101828]">
            Start with the thing that has to change.
          </h2>
          <p>
            We have found that the strongest teams work backwards from the real
            outcome. They name the behaviour that matters, understand what
            currently gets in its way, and make a deliberate decision about the
            smallest change worth shipping.
          </p>
          <p>
            That approach does not make the work smaller. It makes it coherent.
            Design, technology and growth stop competing for attention and start
            reinforcing one another.
          </p>
        </div>
      </article>
      <CTA />
      <Footer />
    </>
  );
}
