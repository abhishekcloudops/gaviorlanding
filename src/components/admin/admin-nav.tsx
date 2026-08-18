import Link from "next/link";
import { FileText, Gauge, LogOut, Package, ReceiptIndianRupee, Settings, Users } from "lucide-react";
import { signOutAction } from "@/app/admin/auth-actions";

const links = [
  ["Dashboard", "/admin", Gauge], ["Clients", "/admin/clients", Users],
  ["Catalog", "/admin/catalog", Package], ["Quotations", "/admin/quotations", FileText],
  ["Invoices", "/admin/invoices", ReceiptIndianRupee], ["Settings", "/admin/settings", Settings],
] as const;

export function AdminNav({ email }: { email: string }) {
  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand">GAVIOR</Link>
      <span className="admin-sidebar-label">Operations</span>
      <nav>{links.map(([label, href, Icon]) => <Link href={href} key={href}><Icon size={17} />{label}</Link>)}</nav>
      <div className="admin-account"><span>{email}</span><form action={signOutAction}><button type="submit"><LogOut size={16} /> Sign out</button></form></div>
    </aside>
  );
}
