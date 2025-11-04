"use client"

import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ClientArticlePage({ params }: PageProps) {
  const supabase = await createClient()

  // Fetch the page by slug (publicly accessible)
  const { data: page, error } = await supabase
    .from("pages")
    .select(`
      *,
      niches (name),
      offers (title)
    `)
    .eq("slug", params.slug)
    .eq("status", "active")
    .single()

  if (error || !page) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("pages")
    .update({ views: (page.views || 0) + 1 })
    .eq("id", page.id)

  // Format content with proper line breaks
  const formattedContent = page.content.split("\n").map((paragraph: string, index: number) => {
    if (!paragraph.trim()) return null
    return (
      <p key={index} className="mb-4 text-lg leading-relaxed">
        {paragraph}
      </p>
    )
  })

  return (
    <div className="min-h-screen bg-[#0A0E12]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#131820]/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-[#00F0FF]">
            P55 Account
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-[#131820]/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{page.title}</h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-white/60 mb-8 pb-8 border-b border-white/10">
            <span className="px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF]">{page.niches?.name}</span>
            <span>{new Date(page.created_at).toLocaleDateString()}</span>
            <span>{page.views || 0} views</span>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none text-white/90">{formattedContent}</div>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="bg-gradient-to-r from-[#00F0FF]/10 to-[#7A5CFF]/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <a
                href={page.affiliate_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={async () => {
                  // Track click
                  await fetch("/api/track-click", {
                    method: "POST",
                    body: JSON.stringify({ pageId: page.id }),
                  })
                }}
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
    </div>
  )
}
