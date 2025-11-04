"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"

interface ArticleContentProps {
  page: {
    id: string
    title: string
    content: string
    affiliate_link: string
    views: number
    created_at: string
    niches?: { name: string }
    offers?: { title: string }
  }
}

export default function ArticleContent({ page }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const links = contentRef.current.querySelectorAll('a.affiliate-link, a[href*="' + page.affiliate_link + '"]')

    const handleClick = async () => {
      try {
        await fetch("/api/track-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageId: page.id }),
        })
      } catch (error) {
        console.error("Failed to track click:", error)
      }
    }

    links.forEach((link) => {
      link.addEventListener("click", handleClick)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick)
      })
    }
  }, [page.id, page.affiliate_link])

  return (
    <div className="min-h-screen bg-[#0A0E12]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#131820]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-[#00F0FF]">
            P55 Account
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-[#131820]/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-white/60 mb-8 pb-8 border-b border-white/10">
            <span className="px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF]">{page.niches?.name}</span>
            <span>
              {new Date(page.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>{page.views || 0} views</span>
          </div>

          <div ref={contentRef} className="article-content" dangerouslySetInnerHTML={{ __html: page.content }} />

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="bg-gradient-to-r from-[#00F0FF]/10 to-[#7A5CFF]/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-white/80 mb-6">Don't miss out on this opportunity to transform your results</p>
              <a
                href={page.affiliate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#00F0FF] to-[#7A5CFF] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300"
              >
                Click Here to Learn More →
              </a>
            </div>
          </div>
        </article>

        {/* Powered by P55 */}
        <div className="text-center mt-8 text-white/40 text-sm">
          <Link href="/" className="hover:text-[#00F0FF] transition-colors">
            Powered by P55 Account
          </Link>
        </div>
      </main>

      <style jsx global>{`
        .article-content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 2rem;
        }

        .article-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          line-height: 1.3;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid rgba(0, 240, 255, 0.2);
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          line-height: 1.4;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .article-content p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 1.5rem;
        }

        .article-content strong {
          font-weight: 600;
          color: white;
        }

        .article-content a.affiliate-link,
        .article-content a {
          color: #00F0FF;
          text-decoration: underline;
          text-decoration-color: rgba(0, 240, 255, 0.3);
          text-underline-offset: 3px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .article-content a.affiliate-link:hover,
        .article-content a:hover {
          color: #7A5CFF;
          text-decoration-color: rgba(122, 92, 255, 0.5);
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        }

        .article-content ul,
        .article-content ol {
          margin-left: 2rem;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .article-content li {
          font-size: 1.125rem;
          line-height: 1.8;
          margin-bottom: 0.75rem;
        }

        @media (max-width: 768px) {
          .article-content h1 {
            font-size: 2rem;
          }

          .article-content h2 {
            font-size: 1.5rem;
          }

          .article-content h3 {
            font-size: 1.25rem;
          }

          .article-content p,
          .article-content li {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
