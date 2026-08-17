import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { LegalPage } from "@/components/page-templates";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Gavior",
  description: "Gavior helps ambitious companies build durable digital products, brands and intelligent systems.",
  alternates: {
    canonical: "/refund-policy",
  },
};


export default function Refund() {
  return (
    <>
      <Header />
      <LegalPage
        eyebrow="Legal"
        title="Clear scope. Fair outcomes."
        copy="Last updated: 18 August 2026. Gavior provides custom digital services. This policy explains how cancellations, scope changes and refunds are handled alongside your written proposal or service agreement."
        blocks={[
          {
            title: "What governs your project",
            body: "Your proposal, invoice, statement of work or signed agreement takes priority where it includes specific payment, cancellation, refund or dispute terms. Please review those terms before approving work or making a payment.",
          },
          {
            title: "Before work begins",
            body: "If you cancel before work has started and before capacity or third-party costs have been committed, we will review the payment fairly and confirm any applicable refund in writing. Processing charges, payment-provider fees and non-recoverable third-party costs may be deducted where applicable.",
          },
          {
            title: "Deposits and work already completed",
            body: "Deposits reserve delivery capacity and allow discovery, planning, design or development to begin. Once work has started, payments for completed work, committed time and approved third-party costs are generally non-refundable. We will provide a clear record of the work completed if a project is paused or cancelled.",
          },
          {
            title: "Scope changes and pauses",
            body: "If your requirements change, we will explain the effect on scope, timeline and cost before undertaking material additional work. If a project is paused for an extended period, restart dates, availability and any re-planning work may need to be agreed again.",
          },
          {
            title: "Issues with delivery",
            body: "If you believe delivered work does not match the agreed scope, contact us promptly with the relevant details. We will review the agreed requirements and, where appropriate, work with you to correct the issue, provide the agreed revision process or discuss another reasonable resolution.",
          },
          {
            title: "How to request help",
            body: "Email hello@gavior.in with your project name, invoice or payment reference, the issue and the resolution you are seeking. We aim to acknowledge requests within a reasonable time and will respond after reviewing the relevant project records.",
          },
        ]}
      />
      <Footer />
    </>
  );
}
