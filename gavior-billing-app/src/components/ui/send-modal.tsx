"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, X, Copy, Check } from "lucide-react";

export function SendDocumentModal({
  documentType,
  documentId,
  documentNumber,
  title,
  clientEmail,
  clientPhone,
  clientName,
  totalFormatted,
  portalUrl,
  sendEmailAction,
}: {
  documentType: "quotation" | "invoice";
  documentId: string;
  documentNumber: string;
  title: string;
  clientEmail?: string | null;
  clientPhone?: string | null;
  clientName: string;
  totalFormatted: string;
  portalUrl: string;
  sendEmailAction: (formData: FormData) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const whatsappMessage = documentType === "quotation"
    ? `Hello ${clientName},\n\nWe have prepared the quotation for *${title}* (${documentNumber}).\n\nTotal Investment: *${totalFormatted}*\n\nYou can review the complete scope and approve it online here:\n${portalUrl}\n\nThank you,\n*Gavior*`
    : `Hello ${clientName},\n\nPlease find your tax invoice *${documentNumber}* for *${title}*.\n\nTotal Amount: *${totalFormatted}*\n\nYou can view your invoice, download PDF, or scan UPI QR code here:\n${portalUrl}\n\nThank you,\n*Gavior*`;

  const whatsappHref = `https://wa.me/${(clientPhone || "").replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        className="ops-btn ops-btn-gemini"
        onClick={() => setIsOpen(true)}
      >
        <Send size={15} /> Send to Customer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#dde5e0] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-[#17211c] mb-1">
              Send {documentType === "quotation" ? "Quotation" : "Invoice"}
            </h3>
            <p className="text-xs text-[#5e7066] mb-5">
              {documentNumber} • {title}
            </p>

            {/* Email Dispatch Option */}
            <div className="mb-6 p-4 rounded-xl bg-[#f6f9f7] border border-[#dde5e0]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1e6a47] mb-3">
                <Mail size={16} /> Direct Email via Hostinger SMTP
              </div>
              <form
                action={async (formData) => {
                  setLoading(true);
                  await sendEmailAction(formData);
                  setLoading(false);
                  setIsOpen(false);
                }}
              >
                <input type="hidden" name="id" value={documentId} />
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={clientEmail || ""}
                      placeholder="client@company.com"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Custom Note (Optional)
                    </label>
                    <textarea
                      name="custom_message"
                      rows={2}
                      placeholder="e.g. Please review the attached quotation for our upcoming sprint."
                      className="text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="ops-btn w-full justify-center"
                  >
                    {loading ? (
                      <>
                        <span className="ops-spinner" /> Dispatching email…
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Send Branded Email
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* WhatsApp Share Option */}
            <div className="mb-6 p-4 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#166534] mb-2">
                <MessageSquare size={16} /> WhatsApp Direct Message
              </div>
              <p className="text-xs text-[#166534]/80 mb-3">
                Send a pre-formatted message with a live portal link directly to the client.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="ops-btn bg-[#16a34a] hover:bg-[#15803d] text-white w-full justify-center"
              >
                <MessageSquare size={15} /> Open in WhatsApp
              </a>
            </div>

            {/* Copy Public Portal Link */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Client Portal Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={portalUrl}
                  className="text-xs bg-gray-50 font-mono text-gray-600 truncate"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ops-btn ops-btn-secondary shrink-0 px-3"
                >
                  {copied ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
