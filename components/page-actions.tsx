"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Pause, Play, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SharePageDialog } from "@/components/share-page-dialog"
import Link from "next/link"

interface PageActionsProps {
  pageId: string
  status: string
  affiliateLink: string
}

export function PageActions({ pageId, status, affiliateLink }: PageActionsProps) {
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
    if (!confirm("Are you sure you want to delete this page? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    const supabase = createClient()

    await supabase.from("pages").delete().eq("id", pageId)

    router.refresh()
    setLoading(false)
  }

  const articleUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/article/${pageId}`

  return (
    <div className="flex items-center gap-3">
      <Button asChild variant="default" className="flex-1 h-12 text-base font-bold glow-cyan">
        <Link href={`/article/${pageId}`} target="_blank">
          <ExternalLink className="w-5 h-5 mr-2" />
          View Page
        </Link>
      </Button>
      <SharePageDialog pageUrl={articleUrl} pageTitle="Check out this amazing offer!" />
      <Button
        variant="outline"
        onClick={handleToggleStatus}
        disabled={loading}
        className="h-12 px-6 glass bg-transparent"
      >
        {status === "active" ? (
          <>
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" />
            Activate
          </>
        )}
      </Button>
      <Button
        variant="outline"
        onClick={handleDelete}
        disabled={loading}
        className="h-12 px-6 glass bg-transparent text-destructive hover:text-destructive"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  )
}
