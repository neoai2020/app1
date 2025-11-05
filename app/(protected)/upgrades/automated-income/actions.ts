"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface Sequence {
  id: string
  title: string
  category: string
  emails: number
  content: string
  avgEarnings: string
  author: string
  bestFor: string
}

export async function createPageFromSequence(userId: string, sequence: Sequence, affiliateLink: string) {
  try {
    const supabase = await createClient()

    // Get or create default niche and offer
    let { data: niche } = await supabase.from("niches").select("id").limit(1).single()

    if (!niche) {
      const { data: newNiche, error: nicheError } = await supabase
        .from("niches")
        .insert({ name: "General", description: "General niche" })
        .select("id")
        .single()

      if (nicheError) throw nicheError
      niche = newNiche
    }

    let { data: offer } = await supabase.from("offers").select("id").limit(1).single()

    if (!offer) {
      const { data: newOffer, error: offerError } = await supabase
        .from("offers")
        .insert({
          name: "Default Offer",
          description: "Default offer",
          niche_id: niche.id,
          commission_rate: 50,
        })
        .select("id")
        .single()

      if (offerError) throw offerError
      offer = newOffer
    }

    // Replace placeholder with actual affiliate link
    const finalContent = sequence.content.replace(/\[INSERT YOUR AFFILIATE LINK HERE\]/g, affiliateLink)

    // Create the page
    const { data: page, error: pageError } = await supabase
      .from("pages")
      .insert({
        user_id: userId,
        niche_id: niche.id,
        offer_id: offer.id,
        title: sequence.title,
        content: finalContent,
        affiliate_link: affiliateLink,
        status: "active",
      })
      .select()
      .single()

    if (pageError) throw pageError

    revalidatePath("/pages")
    revalidatePath("/dashboard")

    return { success: true, page }
  } catch (error: any) {
    console.error("Error creating page:", error)
    return { success: false, error: error.message }
  }
}
