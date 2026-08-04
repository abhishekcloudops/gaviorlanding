import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = {
  metadataBase: new URL("https://gavior.in"),
  title: {
    default: "Gavior — Digital transformation, made tangible.",
    template: "%s | Gavior",
  },
  description:
    "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  icons: {
    icon: [{ url: "/brand/gavicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/brand/gavicon.png",
    apple: "/brand/gavicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Gavior",
    title: "Gavior — Digital transformation, made tangible.",
    description:
      "Design, technology, cloud and AI for businesses built to move.",
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
    name: "Gavior",
    url: "https://gavior.in",
    email: "hello@gavior.in",
    description:
      "Digital transformation company delivering design, software, cloud, automation and AI.",
  };
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        {children}
      </body>
    </html>
  );
}
