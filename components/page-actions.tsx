"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Pause, Play, Trash2, Youtube, MessageSquare } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SharePageDialog } from "@/components/share-page-dialog"
import Link from "next/link"

interface PageActionsProps {
  pageId: string
  status: string
  affiliateLink: string
  videoUrl?: string
}

export function PageActions({ pageId, status, affiliateLink, videoUrl }: PageActionsProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleToggleStatus = async () => {
    setLoading(true)
    const supabase = createClient()
    const newStatus = status === "active" ? "paused" : "active"

    await supabase.from("pages").update({ status: newStatus }).eq("id", pageId)

    router.refresh()
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this pack? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    const supabase = createClient()

    await supabase.from("pages").delete().eq("id", pageId)

    router.refresh()
    setLoading(false)
  }

  const packUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/article/${pageId}`

  return (
    <div className="flex items-center gap-2">
      <Button 
        asChild 
        className="flex-1 h-14 text-base font-black bg-linear-to-r from-primary to-secondary hover:brightness-110 text-primary-foreground rounded-xl border-0 shadow-lg shadow-primary/30"
      >
        <Link href={`/article/${pageId}`} target="_blank">
          <MessageSquare className="w-5 h-5 mr-2" />
          View Comments
        </Link>
      </Button>
      
      <Button 
        asChild 
        className="flex-1 h-14 text-base font-black bg-linear-to-r from-primary/80 to-accent hover:brightness-110 text-primary-foreground rounded-xl border-0 shadow-lg shadow-secondary/30"
      >
        <a href={videoUrl || affiliateLink} target="_blank" rel="noopener noreferrer">
          <Youtube className="w-5 h-5 mr-2" />
          Open Video
        </a>
      </Button>

      <Button
        variant="outline"
        onClick={handleToggleStatus}
        disabled={loading}
        className="h-14 px-5 glass bg-transparent border-2 border-primary/30 text-white font-bold hover:bg-primary/10 rounded-xl"
      >
        {status === "active" ? (
          <>
            <Pause className="w-5 h-5" />
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
          </>
        )}
      </Button>
      
      <Button
        variant="outline"
        onClick={handleDelete}
        disabled={loading}
        className="h-14 px-5 glass bg-transparent border-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive font-bold rounded-xl"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  )
}
