import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { DrivePortfolioGallery } from "@/components/drive-portfolio-gallery";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/portfolio",
  },
};


export default function Portfolio() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell py-20 sm:py-24 md:py-32 text-center">
            <p className="eyebrow justify-center">Social media portfolio</p>
            <h1 className="display text-[42px] sm:text-[60px] lg:text-[80px] max-w-4xl mt-5 sm:mt-6 mx-auto text-balance">Work made to stop the scroll.</h1>
            <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-[17px] leading-7 text-[#667085] text-pretty">A live selection of social media work. This gallery updates automatically as new posts are added to our portfolio.</p>
          </div>
        </section>
        <section className="shell py-12 sm:py-18">
          <DrivePortfolioGallery />
        </section>
      </main>
      <Footer />
    </>
  );
}
