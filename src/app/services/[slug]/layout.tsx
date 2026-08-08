import { ServiceStructuredData } from "@/components/service-structured-data";

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <ServiceStructuredData slug={slug} />
      {children}
    </>
  );
}
