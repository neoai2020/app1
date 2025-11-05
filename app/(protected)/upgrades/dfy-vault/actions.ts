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

    const { data: niches, error: nicheError } = await supabase.from("niches").select("id").limit(1).single()

    if (nicheError || !niches) {
      console.error("[v0] Error fetching niche:", nicheError)
      return { success: false, error: "Could not find a niche" }
    }

    const { data: offers, error: offerError } = await supabase.from("offers").select("id").limit(1).single()

    if (offerError || !offers) {
      console.error("[v0] Error fetching offer:", offerError)
      return { success: false, error: "Could not find an offer" }
    }

    // Create the page
    const { data, error } = await supabase
      .from("pages")
      .insert({
        user_id: user.id,
        niche_id: niches.id, // Added required niche_id
        offer_id: offers.id, // Added required offer_id
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
