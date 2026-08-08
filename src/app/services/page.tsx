import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Footer } from "@/components/site-footer";
import { Header } from "@/components/site-header";
import { allServices } from "@/content/site-data";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Gavior",
  description:
    "Explore Gavior services across digital products, creative growth, AI systems, cloud infrastructure and technical consulting.",
  alternates: {
    canonical: "/services",
  },
};

type ServiceChapter = {
  eyebrow: string;
  title: string;
  copy: string;
  tone: "dark" | "light";
  slugs: string[];
  images: string[];
};

const chapters: ServiceChapter[] = [
  {
    eyebrow: "01 / Build",
    title: "Digital product services",
    copy: "Useful, high-performing digital experiences built around what your customers and teams need to do next.",
    tone: "dark",
    slugs: [
      "custom-websites",
      "enterprise-applications",
      "saas-development",
      "mobile-app-development",
      "ui-ux-design",
      "e-commerce-development",
      "custom-software-development",
      "api-development",
    ],
    images: [
      "/services/digital-products.jpg",
      "/brand/gavior-sky-hero.png",
      "/showcase/mens-grooming-ui.png",
      "/showcase/event-social-posts.png",
    ],
  },
  {
    eyebrow: "02 / Be seen",
    title: "Creative & growth services",
    copy: "Brand, content and performance systems that make your business easier to recognise, trust and choose.",
    tone: "light",
    slugs: [
      "growth-marketing",
      "brand-identity-design",
      "graphic-design",
      "video-editing-motion-graphics",
      "search-engine-optimization",
      "digital-marketing",
      "social-media-management",
      "content-marketing",
    ],
    images: [
      "/services/creative-growth.jpg",
      "/showcase/cafe-brew-identity.jpg",
      "/showcase/floriaa-identity.png",
      "/showcase/vector-illustrations.png",
      "/showcase/2d-animation-portfolio.png",
      "/showcase/event-social-posts.png",
    ],
  },
  {
    eyebrow: "03 / Automate",
    title: "AI & business systems",
    copy: "Practical intelligence and connected operating systems that remove repetitive work without removing human judgment.",
    tone: "dark",
    slugs: [
      "ai-automation",
      "ai-chatbots",
      "ai-agents",
      "erp-development",
      "crm-development",
    ],
    images: [
      "/services/ai-automation.jpg",
      "/services/digital-products.jpg",
      "/services/cloud-infrastructure.jpg",
    ],
  },
  {
    eyebrow: "04 / Scale",
    title: "Cloud & infrastructure",
    copy: "Secure foundations, automated delivery and dependable operations for products that cannot afford to stand still.",
    tone: "dark",
    slugs: [
      "aws-solutions",
      "azure-solutions",
      "google-cloud",
      "devops-engineering",
      "ci-cd-automation",
      "docker-kubernetes",
      "vps-dedicated-servers",
      "linux-administration",
    ],
    images: [
      "/services/cloud-infrastructure.jpg",
      "/services/ai-automation.jpg",
      "/brand/gavior-sky-hero.png",
    ],
  },
  {
    eyebrow: "05 / Decide",
    title: "Technical consulting",
    copy: "Senior technical perspective for the choices that shape your product, architecture and next phase of growth.",
    tone: "light",
    slugs: ["technical-consulting"],
    images: ["/services/creative-growth.jpg"],
  },
];

export default function Services() {
  const servicesBySlug = new Map(allServices.map((service) => [service.slug, service]));

  return (
    <>
      <Header />
      <main className="services-editorial">
        <section className="services-editorial-hero">
          <div className="shell services-editorial-hero-grid">
            <div className="services-editorial-hero-copy">
              <p className="services-editorial-kicker">Gavior services</p>
              <h1>
                Design, technology
                <br />
                and <em>intelligent systems.</em>
              </h1>
              <p>
                One partner for the strategy, craft and engineering it takes to
                turn an ambitious idea into something people can use, trust and
                grow with.
              </p>
              <div className="services-editorial-actions">
                <Link href="/book-consultation" className="services-lime-button">
                  Start a project <ArrowRight size={15} />
                </Link>
                <Link href="#all-services" className="services-text-link">
                  Explore all 30 services
                </Link>
              </div>
            </div>
            <Link
              href="/services/custom-websites"
              className="services-editorial-hero-media"
              aria-label="Explore custom website development"
            >
              <Image
                src="/services/digital-products.jpg"
                alt="Designer reviewing a responsive digital product"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <span className="services-hero-media-label">
                Digital products <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>
          <div className="shell services-editorial-proof" aria-label="Gavior service summary">
            <span><strong>30</strong> connected services</span>
            <span><strong>05</strong> specialist disciplines</span>
            <span><strong>01</strong> accountable partner</span>
          </div>
        </section>

        <div id="all-services">
          {chapters.map((chapter, chapterIndex) => {
            const chapterServices = chapter.slugs
              .map((slug) => servicesBySlug.get(slug))
              .filter((service): service is NonNullable<typeof service> => Boolean(service));

            return (
              <section
                key={chapter.title}
                className={`services-chapter services-chapter-${chapter.tone}`}
              >
                <div className="shell">
                  <div className="services-chapter-heading">
                    <p>{chapter.eyebrow}</p>
                    <h2>{chapter.title}</h2>
                    <span>{chapter.copy}</span>
                  </div>

                  <div className={`services-showcase-grid services-showcase-grid-${chapterServices.length}`}>
                    {chapterServices.map((service, index) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className={`services-showcase-card services-showcase-card-${index % 6} ${
                          chapterServices.length === 1 ? "services-showcase-card-single" : ""
                        }`}
                      >
                        <Image
                          src={chapter.images[index % chapter.images.length]}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <span className="services-card-shade" />
                        <span className="services-card-number">
                          {String(chapterIndex + 1).padStart(2, "0")}.{String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="services-card-content">
                          <strong>{service.name}</strong>
                          <small>{service.short}</small>
                        </span>
                        <span className="services-card-arrow" aria-hidden>
                          <ArrowUpRight size={16} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section className="services-editorial-cta">
          <div className="shell services-editorial-cta-inner">
            <p>Have a project in mind?</p>
            <h2>Your next move deserves the right creative and technical team.</h2>
            <Link href="/book-consultation" className="services-lime-button">
              Let&apos;s build it <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
