"use client";

import { useState } from "react";
import { Sparkles, Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      className="ops-btn ops-btn-secondary no-print"
      onClick={() => window.print()}
    >
      <Printer size={15} /> Print / PDF
    </button>
  );
}

export function ConfirmButton({
  children,
  message,
  className,
}: {
  children: React.ReactNode;
  message: string;
  className?: string;
}) {
  return (
    <button
      className={className || "ops-btn ops-btn-danger"}
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

  const label = hasContent ? "Regenerate Proposal with Gemini" : "Generate Proposal with Gemini";
  const confirmMsg = hasContent
    ? "Regenerate all AI sections? This will overwrite the current draft."
    : "Generate structured corporate proposal content with Gemini AI?";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!window.confirm(confirmMsg)) {
      event.preventDefault();
      return;
    }
    setLoading(true);
  };

  return (
    <form action={generateAction} style={{ display: "inline-block" }}>
      <input type="hidden" name="id" value={id} />
      <button
        className={`ops-btn ops-btn-gemini${loading ? " opacity-75 cursor-wait" : ""}`}
        type="submit"
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? (
          <>
            <span className="ops-spinner" />
            <span>Gemini is generating proposal…</span>
          </>
        ) : (
          <>
            <Sparkles size={15} />
            <span>{label}</span>
          </>
        )}
      </button>
      {loading && (
        <div style={{ marginTop: 8, width: 280 }}>
          <div className="ops-progress-bar" />
          <p style={{ margin: "4px 0 0", fontSize: "0.72rem", color: "#1e6a47", fontWeight: 700 }}>
            Analyzing deliverables & generating scope…
          </p>
        </div>
      )}
    </form>
  );
}
