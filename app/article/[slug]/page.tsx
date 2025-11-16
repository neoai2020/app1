import { createClient } from "@supabase/supabase-js"
import { notFound } from 'next/navigation'
import ArticleContent from "./article-content"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getArticle(pageId: string) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    
    const { data: page, error } = await supabase
      .from("pages")
      .select(`
        *,
        niches (
          name
        )
      `)
      .eq("id", pageId)
      .single()

    if (error || !page) {
      console.log("[v0] Page not found:", pageId, error)
      return null
    }

    // Increment views asynchronously
    supabase
      .from("pages")
      .update({ views: (page.views || 0) + 1 })
      .eq("id", pageId)
      .then(() => {})
      .catch(() => {})

    return page
  } catch (error) {
    console.error("[v0] Error fetching article:", error)
    return null
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug: pageId } = await params

  const page = await getArticle(pageId)

  if (!page) {
    notFound()
  }

  return <ArticleContent page={page} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug: pageId } = await params
  const page = await getArticle(pageId)

  if (!page) {
    return {
      title: "Article Not Found",
    }
  }

  const heroTitles: Record<string, string> = {
    "Weight Loss": "The Ultimate Weight Loss Breakthrough",
    "Make Money Online": "How to Build Real Online Income",
    "Health & Fitness": "Transform Your Health Starting Today",
    "Tech & Gadgets": "The Latest Tech That Changes Everything",
    "Beauty & Skincare": "The Beauty Secrets That Actually Work",
    Relationships: "Build the Relationship You Deserve",
    Pets: "Everything Your Pet Needs to Thrive",
    "Home & Garden": "Transform Your Home Into Paradise",
  }

  const nicheName = page.niches?.name
  const nicheTitle = nicheName
    ? heroTitles[nicheName] || page.title
    : page.title || "Life-Changing Insights"

  const description = page.content
    ? page.content
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 155) + "..."
    : "Discover life-changing insights and strategies."

  return {
    title: nicheTitle,
    description,
    openGraph: {
      title: nicheTitle,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: nicheTitle,
      description,
    },
  }
}
