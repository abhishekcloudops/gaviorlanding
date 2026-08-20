export type CompanySettings = {
  id: string;
  legal_name: string;
  trading_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  state: string | null;
  state_code: string | null;
  gstin: string | null;
  pan: string | null;
  bank_name: string | null;
  account_name: string | null;
  account_number: string | null;
  ifsc: string | null;
  upi_id: string | null;
  quotation_prefix: string;
  invoice_prefix: string;
  default_tax_rate_bps: number;
  default_terms: string | null;
  ai_model: string;
  updated_at: string;
};

export type Client = {
  id: string;
  company_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  billing_address: string | null;
  shipping_address: string | null;
  state: string | null;
  state_code: string | null;
  gstin: string | null;
  pan: string | null;
  currency: string;
  notes: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  item_type: "service" | "product";
  unit: string;
  sac_hsn: string | null;
  unit_price_paise: number;
  tax_rate_bps: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type QuotationContent = {
  executiveSummary?: string;
  understanding?: string;
  proposedSolution?: string;
  scope?: string;
  timelineNarrative?: string;
  assumptions?: string;
  exclusions?: string;
  clientResponsibilities?: string;
  support?: string;
  closing?: string;
};

export type Milestone = {
  id: string;
  title: string;
  percentage?: number;
  amount_paise?: number;
  due_condition?: string;
  status: "pending" | "invoiced" | "completed";
};

export type QuotationItem = {
  id?: string;
  quotation_id?: string;
  catalog_item_id?: string | null;
  position: number;
  description: string;
  quantity: number | string;
  unit: string;
  sac_hsn?: string | null;
  unit_price_paise: number;
  tax_rate_bps: number;
  line_subtotal_paise: number;
  line_tax_paise: number;
  line_total_paise: number;
};

export type Quotation = {
  id: string;
  quotation_number: string;
  client_id: string;
  title: string;
  short_summary: string;
  timeline: string | null;
  valid_until: string | null;
  currency: string;
  status: "draft" | "reviewed" | "sent" | "viewed" | "accepted" | "rejected" | "expired";
  subtotal_paise: number;
  discount_paise: number;
  tax_paise: number;
  total_paise: number;
  content: QuotationContent;
  milestones: Milestone[];
  portal_token: string;
  client_notes: string | null;
  immutable_snapshot: Record<string, unknown> | null;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
  clients?: Client;
  quotation_items?: QuotationItem[];
};

export type InvoiceItem = {
  id?: string;
  invoice_id?: string;
  position: number;
  description: string;
  quantity: number | string;
  unit: string;
  sac_hsn?: string | null;
  unit_price_paise: number;
  tax_rate_bps: number;
  line_subtotal_paise: number;
  line_tax_paise: number;
  line_total_paise: number;
};

export type Payment = {
  id: string;
  invoice_id: string;
  paid_at: string;
  amount_paise: number;
  payment_method: string | null;
  reference: string | null;
  notes: string | null;
  created_at: string;
};

export type Invoice = {
  id: string;
  invoice_number: string;
  quotation_id: string | null;
  client_id: string;
  title: string;
  invoice_type: "tax_invoice" | "retainer" | "proforma";
  issue_date: string;
  due_date: string | null;
  place_of_supply: string | null;
  billing_period_start: string | null;
  billing_period_end: string | null;
  currency: string;
  status: "draft" | "issued" | "sent" | "viewed" | "partially_paid" | "paid" | "overdue" | "cancelled";
  subtotal_paise: number;
  discount_paise: number;
  tax_paise: number;
  cgst_paise: number;
  sgst_paise: number;
  igst_paise: number;
  total_paise: number;
  amount_paid_paise: number;
  balance_due_paise: number;
  notes: string | null;
  portal_token: string;
  immutable_snapshot: Record<string, unknown> | null;
  issued_at: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  clients?: Client;
  invoice_items?: InvoiceItem[];
  payments?: Payment[];
};
