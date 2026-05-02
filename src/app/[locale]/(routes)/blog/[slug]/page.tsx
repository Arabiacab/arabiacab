import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { blogPosts } from '@/data/blogPosts';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | ArabiaCab Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.arabiacab.com/en/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // A very simple markdown to HTML parser for this specific content structure
  const formattedContent = post.content
    .split('\n')
    .map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-white text-3xl md:text-4xl font-bold mt-12 mb-6" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-white text-2xl font-bold mt-10 mb-4" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('- ')) {
        const text = line.replace('- ', '');
        if (text.includes('**')) {
          const parts = text.split('**');
          return <li key={index} className="text-[#CCC] mb-2 ml-6 list-disc"><strong className="text-white">{parts[1]}</strong>{parts[2]}</li>;
        }
        return <li key={index} className="text-[#CCC] mb-2 ml-6 list-disc">{text}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-[#AAA] leading-relaxed mb-4 text-lg">{line}</p>;
    });

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <article className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-[#CCFF00] font-medium mb-4">{post.date} • By {post.author}</p>
        </div>
        <div className="prose prose-invert prose-lg max-w-none">
          {formattedContent}
        </div>
      </article>
    </main>
  );
}
