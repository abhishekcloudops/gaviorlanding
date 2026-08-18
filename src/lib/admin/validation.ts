import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) => text(max).optional().or(z.literal(""));

export const clientSchema = z.object({
  company_name: text(160).min(1), contact_name: optionalText(120),
  email: z.string().trim().email().max(254).optional().or(z.literal("")), phone: optionalText(30),
  billing_address: optionalText(1000), state: optionalText(100), state_code: optionalText(4),
  gstin: z.string().trim().regex(/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9])?$/), notes: optionalText(2000),
});

export const catalogSchema = z.object({
  name: text(180).min(1), description: optionalText(1200),
  item_type: z.enum(["product", "service"]), unit: text(30).min(1), sac_hsn: optionalText(20),
  unit_price: z.string().trim().regex(/^\d+(\.\d{1,2})?$/),
  tax_rate: z.coerce.number().min(0).max(100),
});

export const quotationSchema = z.object({
  client_id: z.string().uuid(), title: text(180).min(1), short_summary: text(4000).min(10),
  timeline: optionalText(500), valid_until: z.string().date().optional().or(z.literal("")),
  item_description: text(500).min(1), quantity: z.string().regex(/^\d+(\.\d{1,3})?$/),
  unit: text(30).min(1), sac_hsn: optionalText(20), unit_price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  tax_rate: z.coerce.number().min(0).max(100),
});

export const quotationContentSchema = z.object({
  executiveSummary: text(4000), understanding: text(5000), proposedSolution: text(5000),
  scope: text(8000), timelineNarrative: text(3000), assumptions: text(5000),
  exclusions: text(5000), clientResponsibilities: text(5000), support: text(4000), closing: text(3000),
});

export type QuotationContent = z.infer<typeof quotationContentSchema>;
