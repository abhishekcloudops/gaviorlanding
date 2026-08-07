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

const staticRoutes: { route: string; priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }[] = [
  { route: "", priority: 1.0, changeFrequency: "daily" },
  { route: "/about", priority: 0.8, changeFrequency: "monthly" },
  { route: "/services", priority: 0.9, changeFrequency: "weekly" },
  { route: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
  { route: "/showcase", priority: 0.7, changeFrequency: "monthly" },
  { route: "/case-studies", priority: 0.8, changeFrequency: "weekly" },
  { route: "/industries", priority: 0.9, changeFrequency: "weekly" },
  { route: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { route: "/blog", priority: 0.9, changeFrequency: "daily" },
  { route: "/careers", priority: 0.6, changeFrequency: "monthly" },
  { route: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { route: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { route: "/book-consultation", priority: 0.9, changeFrequency: "monthly" },
  { route: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { route: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { route: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
  { route: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceSlugs = Array.from(
    new Set([...hardcodedServiceSlugs, ...allServices.map((s) => s.slug)])
  );

  const posts = getAllPosts();

  const urls: MetadataRoute.Sitemap = [
    ...staticRoutes.map((s) => ({
      url: `${base}${s.route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: s.changeFrequency,
      priority: s.priority,
    })),
    ...serviceSlugs.map((s) => ({
      url: `${base}/services/${s}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...projects.map((p) => ({
      url: `${base}/portfolio/${p.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...industries.map((i) => ({
      url: `${base}/industries/${industrySlug(i)}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedDate ? new Date(p.updatedDate).toISOString() : new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return urls;
}
