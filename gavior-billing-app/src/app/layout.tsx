import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gavior Operations • Quotations & Invoicing Suite",
  description: "Enterprise quotation, proposal, and GST tax billing operations dashboard for Gavior.",
  icons: {
    icon: "/brand/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
