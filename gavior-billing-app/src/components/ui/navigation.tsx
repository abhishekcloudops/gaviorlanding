"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Receipt,
  Users,
  Layers,
  Settings,
  Globe,
  ExternalLink,
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/quotations", label: "Quotations", icon: FileText },
    { href: "/invoices", label: "Invoices & Billing", icon: Receipt },
    { href: "/clients", label: "Client Directory", icon: Users },
    { href: "/catalog", label: "Plans & Catalog", icon: Layers },
    { href: "/settings", label: "Settings & SMTP", icon: Settings },
  ];

  return (
    <aside className="ops-sidebar">
      <Link href="/" className="ops-sidebar-brand">
        <Image
          src="/brand/gavior-logo-header.avif"
          alt="Gavior"
          width={120}
          height={32}
          className="ops-sidebar-logo"
          priority
        />
      </Link>

      <div className="ops-sidebar-label">Operations</div>
      <nav className="ops-nav">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`ops-nav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="ops-sidebar-label">Quick Links</div>
      <nav className="ops-nav">
        <a
          href="https://gavior.in"
          target="_blank"
          rel="noreferrer"
          className="ops-nav-link"
        >
          <Globe size={18} />
          <span>Gavior Main Site</span>
          <ExternalLink size={12} style={{ marginLeft: "auto", opacity: 0.6 }} />
        </a>
      </nav>

      <div className="ops-sidebar-footer">
        <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#c9ded3" }}>
          Gavior Billing Suite v2.0
        </p>
        <p style={{ margin: 0, opacity: 0.7 }}>Connected to Supabase & Hostinger SMTP</p>
      </div>
    </aside>
  );
}
