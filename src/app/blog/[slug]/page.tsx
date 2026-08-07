import { notFound } from "next/navigation";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { CTA } from "@/components/sections";
import { getPostBySlug, getAllPosts } from "@/content/blog-api";
import Markdown from "react-markdown";

// Only these slugs exist. Anything else 404s instead of rendering the URL
// string as an <h1>, which previously returned 200 for every possible slug.
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
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: "Gavior",
      url: "https://gavior.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Gavior",
      logo: {
        "@type": "ImageObject",
        url: "https://gavior.in/brand/gavior-logo-light.png",
      },
    },
    datePublished: post.date,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <article className="shell max-w-[820px] py-20">
        <p className="eyebrow">
          Gavior journal · {post.category} · {post.readTime}
        </p>
        <h1 className="display text-[52px] sm:text-[72px] mt-6">
          {post.title}
        </h1>
        <p className="text-xl leading-8 text-[#667085] mt-8">
          {post.excerpt}
        </p>
        <div className="mt-14 grid gap-7 text-[17px] leading-8 text-[#344054]">
          <Markdown
            components={{
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-bold tracking-[-.05em] text-[#101828] mt-4" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-bold tracking-[-.02em] text-[#101828] mt-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 space-y-2" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-[#101828]" {...props} />
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
      <CTA />
      <Footer />
    </>
  );
}
