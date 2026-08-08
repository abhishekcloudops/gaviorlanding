import { allServices } from "@/content/site-data";

const siteUrl = "https://gavior.in";

function displayName(slug: string) {
  return slug
    .split("-")
    .map((part) => part.toUpperCase() === "AI" ? "AI" : part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ServiceStructuredData({ slug }: { slug: string }) {
  const knownService = allServices.find((service) => service.slug === slug);
  const name = knownService?.name ?? `${displayName(slug)} services`;
  const description = knownService?.short ?? `Gavior provides ${displayName(slug)} services for organisations building and improving digital products.`;
  const url = `${siteUrl}/services/${slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url,
    provider: { "@type": "Organization", name: "Gavior", url: siteUrl },
    areaServed: "Worldwide",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
