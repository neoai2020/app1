"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createPageFromTemplate({
  title,
  content,
  affiliateLink,
}: {
  title: string
  content: string
  affiliateLink: string
}) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: "Not authenticated" }
    }

    // Create the page
    const { data, error } = await supabase
      .from("pages")
      .insert({
        user_id: user.id,
        title,
        content,
        affiliate_link: affiliateLink,
        status: "published",
        views: 0,
        clicks: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating page:", error)
      return { success: false, error: error.message }
    }

    // Revalidate the pages list
    revalidatePath("/pages")

    return { success: true, pageId: data.id }
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
