
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/common/Navbar';
import { blogPosts } from '@/data/blogPosts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | ArabiaCab - Taxi Service News & Guides in Saudi Arabia',
  description: 'Read the latest news, guides, and tips about taxi services, airport transfers, and travel in Saudi Arabia with ArabiaCab.',
  alternates: {
    canonical: 'https://www.arabiacab.com/en/blog',
  },
};

export default async function BlogPage() {

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <div className="pt-24 md:pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
          ArabiaCab <span className="text-[#CCFF00]">Blog</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="bg-[#111111] border border-white/5 rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#CCFF00]/50 hover:bg-[#1A1A1A]">
                <p className="text-[#CCFF00] text-sm mb-3 font-medium">{post.date}</p>
                <h2 className="text-white text-xl font-bold mb-3 group-hover:text-[#CCFF00] transition-colors" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                  {post.title}
                </h2>
                <p className="text-[#888] text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <span className="text-white text-sm font-semibold flex items-center gap-2 group-hover:text-[#CCFF00] transition-colors">
                  Read Article →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
