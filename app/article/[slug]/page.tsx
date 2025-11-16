import { createClient } from "@/lib/supabase/server"
import { notFound } from 'next/navigation'
import ArticleContent from "./article-content"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug: pageId } = await params
  
  const supabase = await createClient()

  // Fetch page without RLS restrictions by not checking auth
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
    notFound()
  }

  // Increment views without awaiting
  supabase
    .from("pages")
    .update({ views: (page.views || 0) + 1 })
    .eq("id", page.id)
    .then(() => {})

  return <ArticleContent page={page} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug: pageId } = await params
  const supabase = await createClient()

  const { data: page } = await supabase
    .from("pages")
    .select(`
      title,
      content,
      niches (
        name
      )
    `)
    .eq("id", pageId)
    .single()

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
    "Relationships": "Build the Relationship You Deserve",
    "Pets": "Everything Your Pet Needs to Thrive",
    "Home & Garden": "Transform Your Home Into Paradise",
  }

  const nicheName = page.niches?.name
  const nicheTitle = nicheName ? heroTitles[nicheName] || page.title : page.title || "Life-Changing Insights"

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
