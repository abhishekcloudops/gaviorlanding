import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { CTA } from "@/components/sections";
import { getPostBySlug, getAllPosts } from "@/content/blog-api";
import { services, industries, industrySlug } from "@/content/site-data";
import Markdown from "react-markdown";
import { ArrowRight, Calendar, Clock, ExternalLink, User } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Gavior Insights`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const matchedServices = services.filter((s) =>
    post.relatedServices.includes(s.slug)
  );
  const selectedServices = matchedServices.length > 0 ? matchedServices : services.slice(0, 3);

  const matchedIndustries = industries
    .map((name) => ({ name, slug: industrySlug(name) }))
    .filter((i) => post.relatedIndustries.includes(i.slug))
    .slice(0, 2);

  const selectedIndustries =
    matchedIndustries.length > 0
      ? matchedIndustries
      : industries.slice(0, 2).map((name) => ({ name, slug: industrySlug(name) }));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gavior.in/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      sameAs: post.author.linkedIn,
      url: "https://gavior.in/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Gavior",
      url: "https://gavior.in",
      logo: {
        "@type": "ImageObject",
        url: "https://gavior.in/brand/gavior-logo-light.png",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gavior.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: "https://gavior.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://gavior.in/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <article className="shell max-w-[840px] py-16 sm:py-24">
        {/* Breadcrumb Header Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold uppercase tracking-wider text-[#667085]">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-[#7018ff] transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-[#7018ff] transition-colors">Journal</Link>
            </li>
            <li>/</li>
            <li className="text-[#101828] truncate max-w-[240px]">{post.category}</li>
          </ol>
        </nav>

        <p className="eyebrow">
          Gavior Journal · {post.category} · {post.readTime}
        </p>

        <h1 className="display text-[40px] sm:text-[64px] font-bold tracking-tight text-[#101828] mt-4 leading-[1.1]">
          {post.title}
        </h1>

        {/* EEAT Author Metadata Bar */}
        <div className="mt-8 pt-6 border-t border-b border-[#eaecf0] py-4 flex flex-wrap items-center justify-between gap-4 text-sm text-[#475467]">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#7018ff]/10 border border-[#7018ff]/20 flex items-center justify-center font-bold text-[#7018ff]">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={44}
                  height={44}
                  className="object-cover"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#101828]">{post.author.name}</span>
                {post.author.linkedIn && (
                  <a
                    href={post.author.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0077b5] hover:opacity-80 inline-flex items-center"
                    aria-label="LinkedIn profile"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-xs text-[#667085]">{post.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#667085]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Published: {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Updated: {post.updatedDate}
            </span>
          </div>
        </div>

        <p className="text-xl leading-8 text-[#475467] font-medium mt-10">
          {post.excerpt}
        </p>

        {/* Main Article Body */}
        <div className="mt-12 grid gap-7 text-[17px] leading-8 text-[#344054]">
          <Markdown
            components={{
              h2: (props) => (
                <h2 className="text-2xl sm:text-3xl font-bold tracking-[-.04em] text-[#101828] mt-10 mb-4 border-b border-[#f2f4f7] pb-3" {...props} />
              ),
              h3: (props) => (
                <h3 className="text-xl font-bold tracking-[-.02em] text-[#101828] mt-6 mb-3" {...props} />
              ),
              ul: (props) => (
                <ul className="list-disc pl-5 space-y-2 my-4" {...props} />
              ),
              ol: (props) => (
                <ol className="list-decimal pl-5 space-y-2 my-4" {...props} />
              ),
              p: (props) => (
                <p className="my-3 leading-relaxed" {...props} />
              ),
              strong: (props) => (
                <strong className="font-semibold text-[#101828]" {...props} />
              ),
              table: (props) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-left text-sm border-collapse border border-[#eaecf0]" {...props} />
                </div>
              ),
              th: (props) => (
                <th className="bg-[#f9fafb] p-3 font-semibold text-[#101828] border border-[#eaecf0]" {...props} />
              ),
              td: (props) => (
                <td className="p-3 border border-[#eaecf0]" {...props} />
              ),
              a: ({ href, ...props }) => (
                <a href={href} className="text-[#7018ff] font-medium underline underline-offset-4 hover:opacity-80" {...props} />
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>

        {/* EEAT Author Bio Card */}
        <div className="mt-16 bg-[#f9fafb] border border-[#eaecf0] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#7018ff]/10 border border-[#7018ff]/20 flex-shrink-0 flex items-center justify-center text-xl font-bold text-[#7018ff]">
            {post.author.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                className="object-cover"
              />
            ) : (
              post.author.name.charAt(0)
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="text-lg font-bold text-[#101828]">{post.author.name}</h4>
                <p className="text-xs text-[#667085]">{post.author.role} at Gavior</p>
              </div>
              {post.author.linkedIn && (
                <a
                  href={post.author.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#0077b5] border border-[#0077b5]/30 px-3 py-1.5 rounded-full hover:bg-[#0077b5]/5 transition-colors inline-flex items-center gap-1.5"
                >
                  Connect on LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <p className="mt-3 text-sm text-[#475467] leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

        {/* Internal Linking Engine (Services & Industry Clusters) */}
        <div className="mt-16 border-t border-[#eaecf0] pt-12">
          <h3 className="text-xl font-bold text-[#101828] mb-6">Explore Related Gavior Capabilities</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {selectedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="p-5 border border-[#eaecf0] rounded-xl hover:border-[#7018ff] hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7018ff]">Service</span>
                  <h4 className="text-base font-bold text-[#101828] group-hover:text-[#7018ff] transition-colors mt-1">
                    {s.name}
                  </h4>
                  <p className="text-xs text-[#667085] mt-1.5 line-clamp-2">{s.short}</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-[#7018ff] gap-1 group-hover:translate-x-1 transition-transform">
                  Learn about service <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}

            {selectedIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="p-5 border border-[#eaecf0] rounded-xl hover:border-[#7018ff] hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#344054]">Industry Focus</span>
                  <h4 className="text-base font-bold text-[#101828] group-hover:text-[#7018ff] transition-colors mt-1">
                    {ind.name} Software Solutions
                  </h4>
                  <p className="text-xs text-[#667085] mt-1.5">
                    Tailored engineering, automation, and enterprise systems for {ind.name.toLowerCase()} leaders.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-[#7018ff] gap-1 group-hover:translate-x-1 transition-transform">
                  View industry solutions <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-10 border-t border-[#eaecf0]">
            <h3 className="text-xl font-bold text-[#101828] mb-6">Further Reading</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="p-6 border border-[#eaecf0] rounded-xl hover:border-[#7018ff] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="eyebrow text-xs">{rel.category}</span>
                    <h4 className="text-lg font-bold text-[#101828] group-hover:text-[#7018ff] transition-colors mt-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#667085] mt-2 line-clamp-2">{rel.excerpt}</p>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-[#7018ff] flex items-center gap-1">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      <CTA />
      <Footer />
    </>
  );
}
