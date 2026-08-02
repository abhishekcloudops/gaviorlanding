import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { PageHero } from "@/components/page-templates";
import { ServiceGrid, CTA } from "@/components/sections";
import { allServices } from "@/content/site-data";
import Link from "next/link";
export default function Services() {
  return (
    <>
      <Header />
      <PageHero
        eyebrow="Capabilities"
        title="Every capability your next chapter needs."
        copy="Bring us the question. Together, we’ll find the clearest path from where you are to where the business needs to go."
        action="Plan your project"
      />
      <ServiceGrid />
      <section className="shell pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-[#e1e4e8]">
          {allServices.slice(6).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="py-5 pr-5 border-b border-[#e1e4e8] text-base font-bold hover:text-[#7018ff]"
            >
              {s.name} <span className="float-right">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <CTA />
      <Footer />
    </>
  );
}
