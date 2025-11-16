import { createClient } from "@supabase/supabase-js"
import { notFound } from 'next/navigation'
import ArticleContent from "./article-content"

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

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: PageProps) {
  try {
    const { slug: pageId } = await params
    
    const { data: page, error } = await supabase
      .from("pages")
      .select("*")
      .eq("id", pageId)
      .single()

    if (error || !page) {
      console.log("[v0] Article not found:", pageId, error)
      notFound()
    }

    // Fetch niche if exists
    let niche = null
    if (page.niche_id) {
      const { data: nicheData } = await supabase
        .from("niches")
        .select("name")
        .eq("id", page.niche_id)
        .single()
      niche = nicheData
    }

    const pageWithRelations = {
      ...page,
      niches: niche,
      offers: null,
    }

    supabase
      .from("pages")
      .update({ views: (page.views || 0) + 1 })
      .eq("id", page.id)
      .then(() => {})
      .catch(() => {})

    return <ArticleContent page={pageWithRelations} />
  } catch (error) {
    console.error("[v0] Error loading article:", error)
    notFound()
  }
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug: pageId } = await params
    
    const { data: page } = await supabase
      .from("pages")
      .select("title, content, niche_id")
      .eq("id", pageId)
      .single()

    if (!page) {
      return {
        title: "Article Not Found",
      }
    }

    let nicheTitle = page.title || "Life-Changing Insights"
    
    if (page.niche_id) {
      const { data: niche } = await supabase
        .from("niches")
        .select("name")
        .eq("id", page.niche_id)
        .single()
      
      if (niche?.name) {
        const heroTitles: Record<string, string> = {
          "Weight Loss": "The Ultimate Weight Loss Breakthrough",
          "Make Money Online": "How to Build Real Online Income",
          "Health & Fitness": "Transform Your Health Starting Today",
          "Tech & Gadgets": "The Latest Tech That Changes Everything",
          "Beauty & Skincare": "The Beauty Secrets That Actually Work",
          "Relationships": "Build the Relationship You Deserve",
          "Pets": "Everything Your Pet Needs to Thrive",
          "Home & Garden": "Transform Your Home Into Paradise",
        }
        nicheTitle = heroTitles[niche.name] || page.title
      }
    }

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
  } catch (error) {
    console.error("[v0] Error generating metadata:", error)
    return {
      title: "Article",
      description: "Read this article",
    }
  }
}
