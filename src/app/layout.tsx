import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import Script from "next/script";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import "./globals.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gavior.in"),
  title: {
    default: "Gavior — Digital transformation, made tangible.",
    // Individual routes provide descriptive, brand-qualified titles. Applying
    // another suffix here created titles such as "Services | Gavior | Gavior".
    template: "%s",
  },
  description:
    "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  keywords: [
    "Web Development Agency",
    "Custom SaaS Development",
    "UI/UX Design Studio",
    "AI Automation Consultants",
    "Enterprise Web Applications",
    "Gavior Technologies",
  ],
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Gavior",
    title: "Gavior — Digital transformation, made tangible.",
    description:
      "Design, technology, cloud and AI for businesses built to move.",
    url: "https://gavior.in",
    images: [{
      url: "/brand/gavior-sky-hero.png",
      width: 1200,
      height: 630,
      alt: "Gavior — digital products, brands and intelligent systems",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gavior — Digital transformation, made tangible.",
    description:
      "Design, technology, cloud and AI for businesses built to move.",
    images: ["/brand/gavior-sky-hero.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://gavior.in/#organization",
    name: "Gavior",
    url: "https://gavior.in",
    logo: "https://gavior.in/brand/gavior-logo-light.png",
    email: "hello@gavior.in",
    description:
      "Digital transformation company delivering custom website development, enterprise SaaS applications, cloud infrastructure, and AI automation.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Custom website development",
      "SaaS development",
      "Enterprise software development",
      "UI/UX design",
      "AI workflow automation",
      "Cloud infrastructure",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@gavior.in",
      telephone: "+91-6291-939-807",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://gavior.in/#website",
    name: "Gavior",
    url: "https://gavior.in/",
    inLanguage: "en",
    publisher: { "@id": "https://gavior.in/#organization" },
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-7YYV1JFZ95" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7YYV1JFZ95');
          `}
        </Script>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
