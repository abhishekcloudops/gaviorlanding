"use client";

export function PrintButton() {
  return <button type="button" className="admin-button admin-button-secondary no-print" onClick={() => window.print()}>Print / Save PDF</button>;
}

export function ConfirmButton({ children, message }: { children: React.ReactNode; message: string }) {
  return <button className="admin-button admin-button-danger" type="submit" onClick={(event) => { if (!window.confirm(message)) event.preventDefault(); }}>{children}</button>;
}
