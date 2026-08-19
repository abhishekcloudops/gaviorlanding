"use client";

import { useRef, useState } from "react";

export function PrintButton() {
  return (
    <button
      type="button"
      className="admin-button admin-button-secondary no-print"
      onClick={() => window.print()}
    >
      Print / Save PDF
    </button>
  );
}

export function ConfirmButton({
  children,
  message,
}: {
  children: React.ReactNode;
  message: string;
}) {
  return (
    <button
      className="admin-button admin-button-danger"
      type="submit"
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

export function GeminiGenerateButton({
  id,
  hasContent,
  generateAction,
}: {
  id: string;
  hasContent: boolean;
  generateAction: (formData: FormData) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const label = hasContent ? "Regenerate with Gemini" : "Generate with Gemini";
  const confirmMsg = hasContent
    ? "Regenerate all AI sections? The current version will be preserved."
    : "Generate quotation content with Gemini?";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!window.confirm(confirmMsg)) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    setConfirmed(true);
  };

  return (
    <form ref={formRef} action={generateAction} className="admin-gemini-form">
      <input type="hidden" name="id" value={id} />
      <button
        className={`admin-button admin-button-gemini${loading ? " admin-button-loading" : ""}`}
        type="submit"
        disabled={loading}
        onClick={handleClick}
        aria-busy={loading}
        aria-label={loading ? "Generating with Gemini, please wait…" : label}
      >
        {loading ? (
          <>
            <span className="admin-spinner" aria-hidden="true" />
            <span>Generating…</span>
          </>
        ) : (
          <>
            <span className="admin-gemini-icon" aria-hidden="true">✦</span>
            <span>{label}</span>
          </>
        )}
      </button>
      {loading && (
        <div className="admin-gemini-progress" role="status" aria-live="polite">
          <div className="admin-gemini-progress-bar" />
          <p className="admin-gemini-progress-label">
            Gemini is writing your quotation — this usually takes 15–30 seconds…
          </p>
        </div>
      )}
    </form>
  );
}
