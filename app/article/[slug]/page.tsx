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
    .eq("status", "active")
    .single()

  if (error || !page) {
    console.error("[v0] Article page not found:", pageId, error)
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

  // Increment view count
  await supabase
    .from("pages")
    .update({ views: (page.views || 0) + 1 })
    .eq("id", page.id)

  return <ArticleContent page={pageWithRelations} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug: pageId } = await params
  const supabase = await createClient()

  const { data: page } = await supabase.from("pages").select("title, content").eq("id", pageId).single()

  if (!page) {
    return {
      title: "Article Not Found",
    }
  }

  const description = page.content.substring(0, 160) + "..."

  return {
    title: page.title,
    description,
  }
}
