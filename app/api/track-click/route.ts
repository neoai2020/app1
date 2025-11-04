import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { pageId } = await request.json()
    const supabase = await createClient()

    // Increment click count
    const { data: page } = await supabase.from("pages").select("clicks").eq("id", pageId).single()

    if (page) {
      await supabase
        .from("pages")
        .update({ clicks: (page.clicks || 0) + 1 })
        .eq("id", pageId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Track click error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
