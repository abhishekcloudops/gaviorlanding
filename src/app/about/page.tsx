import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { StandardPage } from "@/components/page-templates";
export default function About() {
  return (
    <>
      <Header />
      <StandardPage
        eyebrow="About Gavior"
        title="Built by people who care about the way things work."
        copy="Gavior is an independent digital transformation company for organisations that want to become more useful, more resilient and more distinct."
        blocks={[
          {
            title: "Our mission",
            body: "To make meaningful progress more accessible by connecting sharp thinking with exceptional execution.",
          },
          {
            title: "Our philosophy",
            body: "We believe the best digital work is calm, clear and commercially awake. It earns trust before it asks for attention.",
          },
          {
            title: "Our future",
            body: "A globally-minded, deeply collaborative studio that gives ambitious businesses an unfair advantage through craft.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
