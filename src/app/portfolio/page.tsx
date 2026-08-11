import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { PortfolioWorkTabs } from "@/components/portfolio-work-tabs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/portfolio",
  },
};

const webProjects = [
  {
    name: "Gavior",
    url: "https://gavior.in/",
    category: "Digital products",
    description: "Digital products, brands and intelligent systems for ambitious businesses.",
    accent: "#c8adff",
    ink: "#251145",
    mark: "G",
    image: "/portfolio/gavior.png",
  },
  {
    name: "Calvary Chapel Montrose",
    url: "https://calvarymontrose.com/",
    category: "Church community",
    description: "A welcoming faith community in Montrose, Colorado.",
    accent: "#c28cff",
    ink: "#251136",
    mark: "CM",
    image: "/portfolio/calvary-montrose.png",
  },
  {
    name: "Calvary LIFE",
    url: "https://calvarylife.com/",
    category: "Church community",
    description: "A church community focused on learning, relationships and faith.",
    accent: "#71dcea",
    ink: "#071b20",
    mark: "CL",
    image: "/portfolio/calvary-life.png",
  },
  {
    name: "Books of David",
    url: "https://booksofdavid.com/home-landing/",
    category: "Author website",
    description: "An author and book collection designed for literary discovery.",
    accent: "#d9c49a",
    ink: "#302b21",
    mark: "BD",
    image: "/portfolio/books-of-david.png",
  },
  {
    name: "Zironyx",
    url: "https://zironyx.com/",
    category: "Digital marketing",
    description: "Digital marketing solutions built for growth.",
    accent: "#f8d765",
    ink: "#302100",
    mark: "Z",
    image: "/portfolio/zironyx.png",
  },
  {
    name: "VA Talks",
    url: "https://vatalks.com/",
    category: "Virtual assistants",
    description: "Dedicated virtual assistant services for growing teams.",
    accent: "#ffb49f",
    ink: "#431714",
    mark: "VA",
    image: "/portfolio/vatalks.png",
  },
  {
    name: "Texnova",
    url: "https://texnova.org/",
    category: "Crypto payments",
    description: "Enterprise crypto payment gateway infrastructure.",
    accent: "#79d8ff",
    ink: "#062c42",
    mark: "TX",
    image: "/portfolio/texnova.png",
  },
  {
    name: "SwiftPress Support",
    url: "https://swiftpresssupport.com/",
    category: "Patient acquisition",
    description: "A patient acquisition system for wellness practices.",
    accent: "#f7a7c0",
    ink: "#3b1530",
    mark: "SP",
    image: "/portfolio/swiftpress.png",
  },
];


export default function Portfolio() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="shell py-20 sm:py-24 md:py-32 text-center">
            <p className="eyebrow justify-center">Selected work</p>
            <h1 className="display text-[42px] sm:text-[60px] lg:text-[80px] max-w-4xl mt-5 sm:mt-6 mx-auto text-balance">Digital experiences built to perform.</h1>
            <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-[17px] leading-7 text-[#667085] text-pretty">A selection of live websites, platforms and digital brands created for ambitious businesses.</p>
          </div>
        </section>

        <PortfolioWorkTabs projects={webProjects} />
      </main>
      <Footer />
    </>
  );
}
