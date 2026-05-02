
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { blogPosts } from '@/data/blogPosts';
import { RiyadhJeddahTaxiPost } from '@/components/blog/posts/RiyadhJeddahTaxiPost';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';

const richPostRegistry: Record<string, ComponentType> = {
  'riyadh-to-jeddah-taxi': RiyadhJeddahTaxiPost,
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = post.metaTitle ?? `${post.title} | ArabiaCab Blog`;
  const description = post.metaDescription ?? post.excerpt;
  const url = `https://www.arabiacab.com/en/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle ?? post.title,
      description,
      url,
      type: 'article',
      siteName: 'Arabia Cab',
      locale: 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle ?? post.title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const RichComponent = richPostRegistry[slug];
  if (RichComponent) {
    return (
      <main className="min-h-screen bg-[#0A0A0A]">
        <Navbar />
        <div className="pt-20 md:pt-24">
          <RichComponent />
        </div>
      </main>
    );
  }

  // Fallback: simple markdown renderer for existing posts
  const formattedContent = post.content
    .split('\n')
    .map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1
            key={index}
            className="text-white text-3xl md:text-4xl font-bold mt-12 mb-6"
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
          >
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2
            key={index}
            className="text-white text-2xl font-bold mt-10 mb-4"
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
          >
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('- ')) {
        const text = line.replace('- ', '');
        if (text.includes('**')) {
          const parts = text.split('**');
          return (
            <li key={index} className="text-[#CCC] mb-2 ml-6 list-disc">
              <strong className="text-white">{parts[1]}</strong>
              {parts[2]}
            </li>
          );
        }
        return (
          <li key={index} className="text-[#CCC] mb-2 ml-6 list-disc">
            {text}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-[#AAA] leading-relaxed mb-4 text-lg">
          {line}
        </p>
      );
    });

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <article className="pt-24 md:pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-[#CCFF00] font-medium mb-4">
            {post.date} • By {post.author}
          </p>
        </div>
        <div className="prose prose-invert prose-lg max-w-none">{formattedContent}</div>
      </article>
    </main>
  );
}
