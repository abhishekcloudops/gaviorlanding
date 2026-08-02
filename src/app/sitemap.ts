import type { MetadataRoute } from "next";
import { allServices, projects } from "@/content/site-data";
const base = "https://gavior.in";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/showcase",
    "/case-studies",
    "/industries",
    "/pricing",
    "/blog",
    "/careers",
    "/contact",
    "/faq",
    "/book-consultation",
  ]
    .map((url) => ({ url: base + url, lastModified: new Date() }))
    .concat(
      allServices.map((x) => ({
        url: `${base}/services/${x.slug}`,
        lastModified: new Date(),
      })),
      projects.map((x) => ({
        url: `${base}/portfolio/${x.slug}`,
        lastModified: new Date(),
      })),
    );
}
