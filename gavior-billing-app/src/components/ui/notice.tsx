"use client";

const labels: Record<string, string> = {
  settings_saved: "Company settings and financial parameters saved successfully.",
  smtp_verified: "Hostinger SMTP connected and verification email sent.",
  client_created: "Client added to directory.",
  client_deleted: "Client record deleted.",
  item_created: "Catalog item added.",
  item_deleted: "Catalog item removed.",
  catalog_seeded: "All 30 standard Gavior plans and pricing packages synced to database.",
  catalog_cleaned: "Duplicate catalog items purged successfully.",
  created: "Document created successfully.",
  ai_generated: "AI proposal narrative generated with Gemini. Review sections below.",
  content_saved: "Quotation narrative content saved.",
  status_updated: "Document status updated.",
  converted_from_quote: "Quotation accepted and converted into formal Tax Invoice.",
  payment_recorded: "Payment received and invoice balance reconciled.",
  email_sent: "Document dispatched directly to client email via Hostinger SMTP.",
};

const errors: Record<string, string> = {
  invalid_client: "Check client details and required fields.",
  invalid_item: "Check catalog item details.",
  invalid_quotation: "Check quotation fields and client selection.",
  invalid_items: "Check line item amounts, quantities, and GST rates.",
  invalid_invoice: "Check invoice details.",
  invalid_recipient: "Please enter a valid client email address.",
  save_failed: "Database save failed.",
  delete_failed: "Failed to delete record.",
  gemini_not_configured: "Gemini API key is not configured in environment.",
  ai_failed: "Gemini proposal generation encountered an issue. Please try again.",
  convert_failed: "Could not convert quotation to invoice.",
  invalid_payment_amount: "Please enter a valid payment amount.",
  email_failed: "SMTP email delivery failed. Check email address and Hostinger SMTP settings.",
  smtp_test_failed: "SMTP handshake failed. Check your password and port in settings.",
  not_found: "Record not found.",
};

export function Notice({ saved, error }: { saved?: string; error?: string }) {
  if (error) {
    return (
      <div className="ops-alert ops-alert-error" role="alert">
        ⚠️ {errors[error] || "An unexpected error occurred. Please verify your inputs."}
      </div>
    );
  }

  if (saved) {
    return (
      <div className="ops-alert ops-alert-success" role="status">
        ✓ {labels[saved] || "Operation completed successfully."}
      </div>
    );
  }

  return null;
}
