import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CommentPackViewer } from "./CommentPackViewer"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

type CommentPack = {
  version: number
  videoId: string
  videoUrl: string
  videoTitle: string
  channelTitle?: string
  createdAt?: string
  comments: string[]
  tips?: string[]
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug: pageId } = await params
  const supabase = await createClient()

  const { data: page, error } = await supabase
    .from("pages")
    .select("id, title, content, affiliate_link, status")
    .eq("id", pageId)
    .eq("status", "active")
    .single()

  if (error || !page) {
    notFound()
  }

  let pack: CommentPack | null = null
  try {
    pack = JSON.parse(page.content || "null")
  } catch {
    pack = null
  }

  if (!pack || !Array.isArray(pack.comments)) {
    notFound()
  }

  // Ensure required fields are present even if older rows exist.
  const normalizedPack: CommentPack = {
    version: Number(pack.version || 1),
    videoId: String(pack.videoId || ""),
    videoUrl: String(pack.videoUrl || page.affiliate_link || ""),
    videoTitle: String(pack.videoTitle || page.title || "Comment Pack"),
    channelTitle: pack.channelTitle,
    createdAt: pack.createdAt,
    comments: pack.comments,
    tips: pack.tips,
  }

  return <CommentPackViewer pageId={page.id} pack={normalizedPack} />
}
