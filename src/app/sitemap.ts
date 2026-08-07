import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog-api";
import {
  allServices,
  hardcodedServiceSlugs,
  industries,
  industrySlug,
  projects,
} from "@/content/site-data";

export const base = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gavior.in"
).replace(/\/$/, "");

// Excluded deliberately: /coming-soon and /search are thin placeholder pages
// and are marked noindex, so listing them would contradict that directive.
const staticRoutes = [
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
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/refund-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // The 13 hardcoded pages take precedence over the [slug] template wherever a
  // slug appears in both, so dedupe rather than emit the same URL twice.
  const serviceSlugs = Array.from(
    new Set([...hardcodedServiceSlugs, ...allServices.map((s) => s.slug)]),
  );

  const urls = [
    ...staticRoutes.map((url) => ({ url: base + url })),
    ...serviceSlugs.map((s) => ({ url: `${base}/services/${s}` })),
    ...projects.map((p) => ({ url: `${base}/portfolio/${p.slug}` })),
    ...industries.map((i) => ({ url: `${base}/industries/${industrySlug(i)}` })),
    ...getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}` })),
  ];

  return urls;
}
