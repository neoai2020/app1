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

  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("id", pageId)
    .single()

  if (error || !page) {
    notFound()
  }

  let niche = null
  let offer = null

  if (page.niche_id) {
    const { data: nicheData } = await supabase
      .from("niches")
      .select("name")
      .eq("id", page.niche_id)
      .single()
    niche = nicheData
  }

  if (page.offer_id) {
    const { data: offerData } = await supabase
      .from("offers")
      .select("title")
      .eq("id", page.offer_id)
      .single()
    offer = offerData
  }

  const pageWithRelations = {
    ...page,
    niches: niche,
    offers: offer,
  }

  await supabase
    .from("pages")
    .update({ views: (page.views || 0) + 1 })
    .eq("id", page.id)

  return <ArticleContent page={pageWithRelations} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug: pageId } = await params
  
  const supabase = await createClient()

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

  let nicheTitle = page.title
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
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 155) + "..."

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
