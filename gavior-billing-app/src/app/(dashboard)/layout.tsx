import { Navigation } from "@/components/ui/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ops-shell">
      <Navigation />
      <main className="ops-main">{children}</main>
    </div>
  );
}
