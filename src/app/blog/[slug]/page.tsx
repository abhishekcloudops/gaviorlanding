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
  return (
    <>
      <Header />
      <article className="shell max-w-[820px] py-20">
        <p className="eyebrow">
          Gavior journal · {post.category} · {post.readTime}
        </p>
        <h1 className="display text-[52px] sm:text-[72px] mt-6">
          {post.title}
        </h1>
        <div className="mt-14 prose prose-lg max-w-none text-[17px] leading-8 text-[#344054]">
          <Markdown>{post.content}</Markdown>
        </div>
      </article>
      <CTA />
      <Footer />
    </>
  );
}
