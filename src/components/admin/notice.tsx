const labels: Record<string, string> = {
  company: "Company settings saved.", gemini: "Gemini key tested and encrypted successfully.",
  gemini_deleted: "Gemini key deleted.", client: "Client created.", item: "Catalog item created.",
  catalog_seeded: "All Gavior standard plans and pricing packages have been synced to the database catalog.",
  created: "Document created.", generated: "Quotation generated. Review every section before sending.",
  content: "Quotation content reviewed and versioned.", status: "Status updated.", issued: "Invoice issued and locked.",
  payment: "Payment recorded.",
};
const errors: Record<string, string> = {
  invalid_settings: "Check the settings fields and try again.", save_failed: "Could not save the record.",
  invalid_api_key: "Enter a valid Gemini API key.", gemini_key_test_failed: "Gemini rejected the key or model request.",
  secret_save_failed: "The encrypted key could not be saved.", secret_delete_failed: "The key could not be deleted.",
  invalid_client: "Check the client details.", client_save_failed: "The client could not be saved.",
  invalid_item: "Check the catalog item.", item_save_failed: "The catalog item could not be saved.",
  invalid_quotation: "Check all quotation fields.", invalid_amount: "Enter valid quantity, price and tax values.",
  quotation_save_failed: "The quotation could not be saved.", quotation_item_failed: "The quotation item could not be saved.",
  number_failed: "A unique document number could not be reserved.", gemini_not_configured: "Save a valid Gemini key in Settings first.",
  generation_failed: "Gemini generation failed safely. The draft was not changed.", generation_save_failed: "Generated content could not be saved.",
  generation_rate_limited: "AI generation is temporarily rate-limited. Try again later.",
  invalid_content: "One or more quotation sections are too long or invalid.", quotation_locked: "This quotation is locked.",
  version_save_failed: "A safe document version could not be created.", content_save_failed: "Content could not be saved.",
  accept_before_invoice: "Accept the quotation before converting it to an invoice.", invoice_save_failed: "Invoice could not be created.",
  invoice_items_failed: "Invoice items could not be copied.", invoice_locked: "This invoice is already locked.", issue_failed: "Invoice could not be issued.",
  invalid_payment: "Check the payment details.", invoice_not_payable: "This invoice cannot receive payments.",
  payment_exceeds_balance: "Payment exceeds the outstanding balance.", payment_failed: "Payment could not be recorded.",
  payment_status_failed: "Payment saved but status reconciliation needs attention.", not_found: "Record not found.",
  invalid_status: "That status change is not allowed from the document's current state.",
  incomplete_invoice_settings: "Complete the supplier and client billing addresses before issuing.",
  incomplete_tax_settings: "A taxed invoice requires the supplier GSTIN and client state/place of supply.",
};

export function AdminNotice({ saved, error }: { saved?: string; error?: string }) {
  if (error) return <div className="admin-alert admin-alert-error" role="alert">{errors[error] || "The request could not be completed."}</div>;
  if (saved) return <div className="admin-alert admin-alert-success" role="status">{labels[saved] || "Saved successfully."}</div>;
  return null;
}
