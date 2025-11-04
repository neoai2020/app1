import { createClient } from "@/lib/supabase/server"
import ClientArticlePage from "./client-page"

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <ClientArticlePage params={params} />
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = await createClient()

  const { data: page } = await supabase.from("pages").select("title, content").eq("slug", params.slug).single()

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
