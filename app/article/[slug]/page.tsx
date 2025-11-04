import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import ArticleContent from "./article-content"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the page by slug (publicly accessible)
  const { data: page, error } = await supabase
    .from("pages")
    .select(`
      *,
      niches (name),
      offers (title)
    `)
    .eq("slug", slug)
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

  return <ArticleContent page={page} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: page } = await supabase.from("pages").select("title, content").eq("slug", slug).single()

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
