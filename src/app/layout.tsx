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
    // Gavior currently publishes one English version. Declaring it explicitly
    // prevents regional crawlers from treating duplicate URL variants as a
    // separate language version.
    languages: {
      "en-IN": "./",
      en: "./",
    },
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
      url: "/brand/gavior-social-preview.png",
      width: 1200,
      height: 630,
      alt: "Gavior — Make your next move impossible to ignore.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gavior — Digital transformation, made tangible.",
    description:
      "Design, technology, cloud and AI for businesses built to move.",
    images: ["/brand/gavior-social-preview.png"],
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
    sameAs: [
      "https://www.facebook.com/profile.php?id=61592622064419",
      "https://www.instagram.com/gavior.in/",
    ],
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KLLW8RMB');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KLLW8RMB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
