import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { StandardPage } from "@/components/page-templates";
import Link from "next/link";
export default function Careers() {
  return (
    <>
      <Header />
      <StandardPage
        eyebrow="Careers"
        title="Work that respects your craft."
        copy="We’re a team of independent thinkers who care deeply about making useful, beautiful things together."
        blocks={[
          {
            title: "Stay curious",
            body: "Good work starts with a willingness to learn the context, ask better questions and keep improving the answer.",
          },
          {
            title: "Make it real",
            body: "We value people who can move from an idea to a tangible, considered outcome without losing the important details.",
          },
          {
            title: "Grow generously",
            body: "We share context, give clear feedback and create room for people to do the best work of their career.",
          },
        ]}
      />
      <section className="shell pb-20">
        <div className="card p-8 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-[-.05em]">
              Don’t see the right role?
            </h2>
            <p className="text-[#667085] mt-2">
              We still want to meet thoughtful people.
            </p>
          </div>
          <Link
            href="mailto:careers@gavior.in"
            className="button button-dark self-start"
          >
            Introduce yourself
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
