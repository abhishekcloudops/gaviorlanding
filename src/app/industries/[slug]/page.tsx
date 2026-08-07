import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { CTA } from "@/components/sections";
import { industries, industrySlug, services } from "@/content/site-data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((name) => ({ slug: industrySlug(name) }));
}

type IndustryDetail = {
  title: string;
  metaTitle: string;
  metaDesc: string;
  heroHeadline: string;
  heroSub: string;
  capabilities: { name: string; desc: string }[];
  techKeywords: string[];
  caseStudyHighlight: { title: string; result: string; desc: string };
};

const industryDataMap: Record<string, IndustryDetail> = {
  manufacturing: {
    title: "Manufacturing",
    metaTitle: "Manufacturing ERP & Factory Automation Software Company | Gavior",
    metaDesc: "Bespoke manufacturing execution systems (MES), ERP integrations, inventory management, and automated production monitoring built by Gavior.",
    heroHeadline: "Smart Factory Automation & ERP Solutions for Manufacturing Leaders",
    heroSub: "We replace fragmented spreadsheet tracking with real-time MES dashboards, predictive inventory software, and automated production workflow engines.",
    capabilities: [
      { name: "Custom ERP & MES Systems", desc: "Connect shop floor machinery with back-office planning for real-time throughput metrics." },
      { name: "Inventory & Supply Chain Tracking", desc: "Automate raw material reordering and track work-in-progress (WIP) across facilities." },
      { name: "Predictive Quality Assurance", desc: "Deploy IoT telemetry and AI algorithms to predict equipment maintenance before breakdowns occur." },
      { name: "Supply Chain & Logistics Portals", desc: "Provide vendors and distribution partners with live order tracking and automated dispatch notes." },
    ],
    techKeywords: ["ERP Solutions", "Manufacturing Execution System (MES)", "Factory Automation", "Inventory Management", "Production Monitoring", "IoT Telemetry"],
    caseStudyHighlight: {
      title: "Automated Shop Floor Command Center",
      result: "24% Increase in Machine Uptime",
      desc: "Integrated legacy CNC machinery with a modern Next.js operational dashboard, eliminating manual shift logging.",
    },
  },
  construction: {
    title: "Construction",
    metaTitle: "Construction Project Management Software & BOQ Platforms | Gavior",
    metaDesc: "Custom civil engineering software, Bill of Quantities (BOQ) estimators, contractor portals, and site management web apps by Gavior.",
    heroHeadline: "Civil Engineering Software & Contractor Operations Platforms",
    heroSub: "Transform complex site operations with instant BOQ estimations, digital subcontractor portals, and automated tender compliance tracking.",
    capabilities: [
      { name: "Automated BOQ & Estimation", desc: "Parse architectural CAD files and PDFs to generate accurate material cost estimates instantly." },
      { name: "Subcontractor & Tender Portals", desc: "Streamline bid management, milestone sign-offs, and compliance document verification." },
      { name: "Site Progress & Daily Log Apps", desc: "Equip field engineers with offline-capable mobile web apps for real-time safety & milestone reporting." },
      { name: "Project Cost & Retainage Tracking", desc: "Gain total clarity on budget vs. actual expenditure across multi-site civil developments." },
    ],
    techKeywords: ["Construction Project Management", "Bill of Quantities (BOQ)", "Contractor Portals", "Civil Engineering Software", "Site Management", "Tender Tracking"],
    caseStudyHighlight: {
      title: "Multi-Site Construction Management Engine",
      result: "18 Hours Saved Weekly per Site Manager",
      desc: "Built a unified contractor portal managing over 40 concurrent site projects with real-time BOQ tracking.",
    },
  },
  restaurants: {
    title: "Restaurants",
    metaTitle: "Restaurant Web Systems, POS & Kitchen Display Solutions | Gavior",
    metaDesc: "High-performance POS integrations, QR code table ordering, Kitchen Display Systems (KDS), and online reservation web engines by Gavior.",
    heroHeadline: "Restaurant Web Platforms, POS & Kitchen Display Systems",
    heroSub: "Deliver seamless guest experiences and ultra-fast kitchen throughput with custom QR ordering engines, POS integrations, and loyalty systems.",
    capabilities: [
      { name: "QR Code Table Ordering & Payments", desc: "Allow diners to view rich digital menus, split bills, and pay instantly without waiting." },
      { name: "Kitchen Display Systems (KDS)", desc: "Route orders from online platforms and tables directly to kitchen screens in real time." },
      { name: "Multi-Location POS Sync", desc: "Connect POS terminals, inventory, and sales analytics across multiple restaurant venues." },
      { name: "Automated Inventory & Margin Control", desc: "Track ingredient usage per dish to automatically alert chefs when margins drop or stock runs low." },
    ],
    techKeywords: ["Restaurant POS Systems", "Kitchen Display System (KDS)", "QR Code Ordering", "Online Reservation Engine", "Food Delivery API", "Multi-Venue Analytics"],
    caseStudyHighlight: {
      title: "Omnichannel Restaurant Operating Platform",
      result: "32% Higher Average Order Value",
      desc: "Engineered a lightning-fast QR ordering web app integrated directly with kitchen display units and Stripe payment gates.",
    },
  },
  healthcare: {
    title: "Healthcare",
    metaTitle: "Healthcare Software Development & EHR/EMR Integration | Gavior",
    metaDesc: "HIPAA-compliant telemedicine platforms, EHR/EMR integrations, patient booking portals, and clinical workflow engines by Gavior.",
    heroHeadline: "HIPAA-Compliant Healthcare Platforms & Telemedicine Systems",
    heroSub: "Empower clinicians and reassure patients with secure, accessible digital care portals and seamless EHR integration.",
    capabilities: [
      { name: "Patient Booking & Care Portals", desc: "Intuitive appointment scheduling, medical history management, and lab result delivery." },
      { name: "EHR / EMR Interoperability", desc: "Seamless HL7/FHIR integrations connecting clinic software with national health databases." },
      { name: "Telemedicine Video Consultations", desc: "End-to-end encrypted video care rooms with real-time prescription writing." },
      { name: "Clinical Analytics & Compliance", desc: "Automated audit logs, role-based access control, and HIPAA privacy compliance." },
    ],
    techKeywords: ["EHR/EMR Interoperability", "HIPAA Compliance", "Telemedicine Platforms", "Patient Care Portals", "HL7 / FHIR Standards", "Clinical Analytics"],
    caseStudyHighlight: {
      title: "Nimbus Health Patient Portal",
      result: "38% Increase in Completed Bookings",
      desc: "Designed and built a accessible care portal connecting patients with specialist providers across North America.",
    },
  },
  finance: {
    title: "Finance",
    metaTitle: "Fintech Software Development & Core Banking Integrations | Gavior",
    metaDesc: "Secure fintech web platforms, algorithmic reporting engines, payment gateways, and banking compliance software built by Gavior.",
    heroHeadline: "High-Security Fintech Systems & Banking Infrastructure",
    heroSub: "We build high-concurrency financial platforms with bank-grade security, instant settlement pipelines, and automated reporting.",
    capabilities: [
      { name: "Payment Gateway & Ledger Engines", desc: "Multi-currency transaction processing with automated double-entry ledger verification." },
      { name: "Algorithmic Reporting & KYC/AML", desc: "Automate user identity verification and flag suspicious transactions in real time." },
      { name: "Investment & Wealth Dashboards", desc: "Real-time portfolio visualization, tax lot accounting, and performance analytics." },
      { name: "Regulatory Compliance Audit Trails", desc: "Immutable logging and reporting meeting SOC2, PCI-DSS, and ISO27001 standards." },
    ],
    techKeywords: ["Fintech Software", "Core Banking API", "KYC / AML Automation", "Payment Ledger Systems", "PCI-DSS Security", "Wealth Analytics"],
    caseStudyHighlight: {
      title: "Institutional Wealth & Ledger Engine",
      result: "Sub-Second Multi-Currency Settlement",
      desc: "Engineered a high-throughput transaction ledger handling millions in daily volume with zero audit discrepancy.",
    },
  },
  retail: {
    title: "Retail",
    metaTitle: "Retail Omnichannel Platforms & Headless E-commerce | Gavior",
    metaDesc: "Headless commerce architectures, retail POS synchronization, supply chain inventory, and loyalty systems engineered by Gavior.",
    heroHeadline: "Omnichannel Retail Systems & Headless E-commerce",
    heroSub: "Bridge physical store locations with digital channels using real-time inventory synchronization and personalized customer experiences.",
    capabilities: [
      { name: "Headless E-commerce Stores", desc: "Ultra-fast Next.js storefronts connected to Shopify, Commerce Layer, or custom backends." },
      { name: "Unified Retail POS Integration", desc: "Sync physical store purchases with online inventory instantly to prevent overselling." },
      { name: "Customer Loyalty & Rewards Engine", desc: "Automated reward calculation across in-store checkout and web transactions." },
      { name: "Demand Forecasting & Replenishment", desc: "AI-driven stock recommendations for store managers based on seasonal buying trends." },
    ],
    techKeywords: ["Headless Commerce", "Omnichannel Retail POS", "Inventory Sync", "Storefront Architecture", "Loyalty Systems", "Supply Chain Tracking"],
    caseStudyHighlight: {
      title: "Vanta Retail Intelligence Platform",
      result: "2.4× Faster Campaign Launches",
      desc: "Built a high-performance retail operating engine powering over 120 global physical and digital storefronts.",
    },
  },
};

function getFallbackIndustryData(name: string): IndustryDetail {
  return {
    title: name,
    metaTitle: `${name} Software Development & Digital Transformation | Gavior`,
    metaDesc: `Bespoke web applications, custom software development, and automation systems tailored for ${name} leaders by Gavior.`,
    heroHeadline: `Bespoke Software & Digital Transformation for ${name}`,
    heroSub: `We build custom software, intuitive web platforms, and automated workflow engines tailored specifically for ${name.toLowerCase()} organizations.`,
    capabilities: [
      { name: `Custom ${name} Web Platforms`, desc: `High-performance digital products engineered to solve complex operational challenges in ${name.toLowerCase()}.` },
      { name: "Workflow & Process Automation", desc: "Streamline daily team tasks and eliminate manual data entry with modern software pipelines." },
      { name: "System Integration & APIs", desc: "Unify legacy software databases with modern cloud platforms for total operational clarity." },
      { name: "Customer Experience Systems", desc: "Build intuitive digital touchpoints that convert visitors into loyal customers." },
    ],
    techKeywords: [`${name} Software Solutions`, `${name} Web Apps`, "Digital Transformation", "Custom ERP", "Process Automation"],
    caseStudyHighlight: {
      title: `${name} Enterprise Operations Engine`,
      result: "35% Average Productivity Gain",
      desc: `Modernized core legacy workflows for a leading ${name.toLowerCase()} enterprise into a unified cloud system.`,
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rawName = industries.find((i) => industrySlug(i) === slug);
  if (!rawName) return {};

  const detail = industryDataMap[slug] || getFallbackIndustryData(rawName);

  return {
    title: detail.metaTitle,
    description: detail.metaDesc,
    alternates: {
      canonical: `/industries/${slug}`,
    },
    openGraph: {
      title: detail.metaTitle,
      description: detail.metaDesc,
      type: "website",
    },
  };
}

export default async function Industry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rawName = industries.find((i) => industrySlug(i) === slug);
  if (!rawName) notFound();

  const detail = industryDataMap[slug] || getFallbackIndustryData(rawName);

  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${detail.title} Software Development`,
    description: detail.metaDesc,
    provider: {
      "@type": "Organization",
      name: "Gavior",
      url: "https://gavior.in",
    },
    areaServed: "Worldwide",
    serviceType: `${detail.title} Engineering & Digital Systems`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gavior.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: "https://gavior.in/industries",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: detail.title,
        item: `https://gavior.in/industries/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industrySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="shell py-20 sm:py-28 max-w-[1000px]">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#667085]">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-[#7018ff] transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/industries" className="hover:text-[#7018ff] transition-colors">Industries</Link>
            </li>
            <li>/</li>
            <li className="text-[#101828] font-bold">{detail.title}</li>
          </ol>
        </nav>

        <p className="eyebrow">Industry Expertise · {detail.title}</p>
        <h1 className="display text-[44px] sm:text-[68px] font-bold tracking-tight text-[#101828] mt-4 leading-[1.1]">
          {detail.heroHeadline}
        </h1>
        <p className="text-xl leading-8 text-[#475467] mt-8 max-w-[760px]">
          {detail.heroSub}
        </p>

        {/* Industry Tech Intent Badges */}
        <div className="mt-8 flex flex-wrap gap-2">
          {detail.techKeywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#7018ff]/10 text-[#7018ff] border border-[#7018ff]/20"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Industry Capabilities Grid */}
      <section className="shell pb-20">
        <div className="border-t border-[#eaecf0] pt-16">
          <h2 className="text-3xl font-bold tracking-tight text-[#101828] mb-10">
            Tailored Engineering for {detail.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {detail.capabilities.map((cap, i) => (
              <div
                key={cap.name}
                className="p-8 border border-[#eaecf0] rounded-2xl bg-white hover:border-[#7018ff] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#7018ff] uppercase tracking-widest">
                    Capability 0{i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-[#101828] mt-3">{cap.name}</h3>
                  <p className="text-sm text-[#475467] leading-relaxed mt-3">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study Highlight */}
      <section className="shell pb-20">
        <div className="bg-[#0b1220] rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-[580px]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c7f3ec]">
              Impact Story · {detail.title}
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight mt-3">
              {detail.caseStudyHighlight.title}
            </h3>
            <p className="text-base text-gray-300 mt-4 leading-relaxed">
              {detail.caseStudyHighlight.desc}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex-shrink-0 text-center min-w-[240px]">
            <span className="block text-3xl font-extrabold text-[#c7f3ec]">
              {detail.caseStudyHighlight.result}
            </span>
            <span className="text-xs text-gray-300 uppercase font-semibold mt-1 block">
              Verified Metric
            </span>
            <Link
              href="/case-studies"
              className="mt-4 button w-full bg-[#7018ff] text-white text-xs font-semibold hover:bg-[#6012e0]"
            >
              View Case Study
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services Cluster */}
      <section className="shell pb-20">
        <div className="border-t border-[#eaecf0] pt-16">
          <h2 className="text-2xl font-bold text-[#101828] mb-6">
            Recommended Services for {detail.title} Systems
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {services.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="p-6 border border-[#eaecf0] rounded-xl hover:border-[#7018ff] transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#7018ff] uppercase tracking-wider">Service</span>
                  <h4 className="text-lg font-bold text-[#101828] group-hover:text-[#7018ff] transition-colors mt-2">
                    {s.name}
                  </h4>
                  <p className="text-xs text-[#667085] mt-2 line-clamp-2">{s.short}</p>
                </div>
                <div className="mt-4 text-xs font-semibold text-[#7018ff] flex items-center gap-1">
                  Explore service <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}
