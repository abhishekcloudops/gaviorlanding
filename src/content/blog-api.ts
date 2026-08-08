import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');

export type Author = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
  bio: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  date: string;
  updatedDate: string;
  author: Author;
  relatedServices: string[];
  relatedIndustries: string[];
  targetKeyword: string;
  secondaryKeywords: string[];
};

const defaultAuthor: Author = {
  name: "Gavior Editorial Team",
  role: "Editorial team",
  avatar: "",
  linkedIn: "",
  bio: "The Gavior Editorial Team shares practical guidance on product design, software engineering, cloud delivery and AI automation.",
};

export function getPostSlugs() {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(blogsDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const wordCount = (content.match(/\b[\w’'-]+\b/g) || []).length;

  return {
    slug: realSlug,
    title: data.title || '',
    category: data.category || 'Engineering',
    readTime: `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
    excerpt: data.excerpt || '',
    date: data.date || '2026-08-01',
    updatedDate: data.updatedDate || data.date || '2026-08-07',
    author: {
      name: data.authorName || defaultAuthor.name,
      role: data.authorRole || defaultAuthor.role,
      avatar: data.authorAvatar ?? defaultAuthor.avatar,
      linkedIn: data.authorLinkedIn ?? defaultAuthor.linkedIn,
      bio: data.authorBio ?? defaultAuthor.bio,
    },
    relatedServices: data.relatedServices || ['custom-websites', 'ai-automation', 'saas-development'],
    relatedIndustries: data.relatedIndustries || ['technology', 'finance', 'manufacturing'],
    targetKeyword: data.targetKeyword || '',
    secondaryKeywords: data.secondaryKeywords || [],
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
