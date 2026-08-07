import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'src/content/blogs');

const generateMarkdown = (title, category, date, readTime, slug, content) => `---
title: "${title}"
category: "${category}"
date: "${date}"
readTime: "${readTime}"
excerpt: "${content.substring(0, 150).replace(/"/g, "'")}..."
---

${content}
`;

const pillarPosts = [
  {
    title: "The Comprehensive Guide to Custom Website Development in 2026",
    category: "Engineering",
    slug: "comprehensive-guide-custom-website-development-2026",
    content: "Custom website development is no longer just about writing HTML and CSS. It's about creating high-performance digital front doors that turn attention into action. In this guide, we explore the latest frameworks, performance optimization strategies, and why off-the-shelf templates fail modern enterprises.\n\n## Why Custom Matters\nTemplates restrict your brand. Custom development ensures that your user experience is uniquely tailored to your customer journey..."
  },
  {
    title: "Why Enterprise Web Applications Fail (And How to Succeed)",
    category: "Strategy",
    slug: "why-enterprise-web-applications-fail",
    content: "Building enterprise web applications is inherently complex. Workflows must be intuitive, dependable, and highly secure. We dissect the common pitfalls of enterprise software—from poor scope definition to ignoring the end-user experience—and provide a blueprint for operating without friction.\n\n## The Role of User Experience\nEven the most powerful backend is useless if the frontend is confusing..."
  },
  {
    title: "Scaling SaaS: Architectural Decisions for the First Release",
    category: "Technology",
    slug: "scaling-saas-architectural-decisions",
    content: "SaaS development requires designing subscription products for scale from day one. Launching with conviction means choosing the right database architectures, multi-tenant structures, and cloud infrastructure early on to prevent expensive rewrites later.\n\n## Multi-Tenancy Made Right\nChoosing between isolated databases or shared schemas is the most critical decision you will make..."
  },
  {
    title: "The Future of Native Mobile App Development",
    category: "Engineering",
    slug: "future-of-native-mobile-app-development",
    content: "Mobile app development must create native-feeling experiences for customers on the move. We look at the rise of advanced cross-platform frameworks, the integration of on-device AI, and how to be useful everywhere your customers are.\n\n## Performance is a Feature\nUsers abandon slow apps. Optimizing render cycles and network requests is paramount..."
  },
  {
    title: "Integrating AI Automation Without Losing the Human Touch",
    category: "Innovation",
    slug: "integrating-ai-automation",
    content: "AI automation shouldn't just replace jobs; it should weave practical intelligence into the way your business works. We explore how to put repetitive work on autopilot while elevating your team's ability to focus on creative, high-impact tasks.\n\n## Practical Intelligence\nStop looking for AGI. Start looking for workflows where a 20% efficiency gain yields millions in ROI..."
  }
];

// Generate 45 additional SEO titles based on Gavior services
const services = ["Website Development", "Enterprise Apps", "SaaS Platforms", "Mobile Apps", "UI/UX Design", "AI Automation"];
const keywords = ["Best Practices", "Future Trends", "ROI Analysis", "Implementation Guide", "Case Studies", "Tools and Technologies", "Security Essentials", "Cost Optimization"];

const stubPosts = [];
for(let i = 0; i < 45; i++) {
  const service = services[i % services.length];
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  const title = `Exploring ${service}: ${keyword} for Modern Businesses`;
  const slug = `exploring-${service.toLowerCase().split('/').join('-').split(' ').join('-')}-${keyword.toLowerCase().split(' ').join('-')}-${i}`;
  
  stubPosts.push({
    title,
    category: service.split(' ')[0],
    slug,
    content: `${title} is critical for businesses looking to scale. By focusing on ${service.toLowerCase()}, companies can dramatically improve their digital footprint and operational efficiency. \n\n## Why it matters\nInvesting in ${keyword.toLowerCase()} within the realm of ${service.toLowerCase()} provides compounding returns over time. Contact Gavior today to learn how we can help you build durable digital products.`
  });
}

const allPosts = [...pillarPosts, ...stubPosts];

let dateCounter = new Date('2026-08-01');

allPosts.forEach((post, i) => {
  // subtract a day for each post to stagger dates
  dateCounter.setDate(dateCounter.getDate() - 1);
  const dateStr = dateCounter.toISOString().split('T')[0];
  const readTime = `${Math.max(3, Math.floor(Math.random() * 8))} min read`;
  
  const fileContent = generateMarkdown(post.title, post.category, dateStr, readTime, post.slug, post.content);
  fs.writeFileSync(path.join(outDir, `${post.slug}.md`), fileContent);
});

console.log(`Generated ${allPosts.length} blog posts in ${outDir}`);
