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
};

const defaultAuthor: Author = {
  name: "Abhishek Sharma",
  role: "Principal Technical Architect",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  linkedIn: "https://linkedin.com/company/gavior",
  bio: "Abhishek leads technical architecture and product strategy at Gavior, specializing in high-performance web systems and enterprise AI integration.",
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

  return {
    slug: realSlug,
    title: data.title || '',
    category: data.category || 'Engineering',
    readTime: data.readTime || '5 min read',
    excerpt: data.excerpt || '',
    date: data.date || '2026-08-01',
    updatedDate: data.updatedDate || data.date || '2026-08-07',
    author: {
      name: data.authorName || defaultAuthor.name,
      role: data.authorRole || defaultAuthor.role,
      avatar: data.authorAvatar || defaultAuthor.avatar,
      linkedIn: data.authorLinkedIn || defaultAuthor.linkedIn,
      bio: data.authorBio || defaultAuthor.bio,
    },
    relatedServices: data.relatedServices || ['custom-websites', 'ai-automation', 'saas-development'],
    relatedIndustries: data.relatedIndustries || ['technology', 'finance', 'manufacturing'],
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
