"use server"

import { createClient } from "@/lib/supabase/server"
import { generateText } from "ai"

export default async function generatePageAction(nicheId: string, offerId: string, affiliateLink: string) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    console.log("[v0] Generating page for user:", user.id)

    const { data: niche, error: nicheError } = await supabase.from("niches").select("*").eq("id", nicheId).single()

    if (nicheError) {
      console.error("[v0] Error fetching niche:", nicheError)
      return { success: false, error: "Failed to fetch niche" }
    }

    const { data: offer, error: offerError } = await supabase.from("offers").select("*").eq("id", offerId).single()

    if (offerError) {
      console.error("[v0] Error fetching offer:", offerError)
      return { success: false, error: "Failed to fetch offer" }
    }

    if (!niche || !offer) {
      return { success: false, error: "Invalid niche or offer" }
    }

    console.log("[v0] Generating content for:", offer.title)

    const { text } = await generateText({
      model: "openai/gpt-5",
      prompt: `Write a 1000-word affiliate marketing review article for the product "${offer.title}" in the ${niche.name} niche. 
        
Product description: ${offer.description}

Requirements:
- Write at a 4th-grade reading level (simple, clear language)
- Include a compelling headline
- Start with a relatable problem/pain point
- Build trust with personal story or testimonials
- Explain the product benefits clearly
- Include 3-5 key features
- Add social proof and urgency
- End with a strong call-to-action
- Include FTC compliance disclaimer
- Make it conversational and engaging
- Use short paragraphs (2-3 sentences max)
- Format with clear sections and subheadings

Return ONLY the article content in HTML format with proper heading tags (h2, h3), paragraph tags, and list tags. Do not include any markdown formatting.`,
      maxOutputTokens: 2000,
      temperature: 0.7,
    })

    console.log("[v0] Content generated, inserting into database")

    const { data: newPage, error: insertError } = await supabase
      .from("pages")
      .insert({
        user_id: user.id,
        niche_id: nicheId,
        offer_id: offerId,
        title: `${offer.title} Review - Is It Worth It?`,
        content: text,
        affiliate_link: affiliateLink,
        status: "active",
      })
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Error inserting page:", insertError)
      return { success: false, error: "Failed to save page" }
    }

    console.log("[v0] Page created successfully:", newPage.id)

    return { success: true, pageId: newPage.id }
  } catch (error) {
    console.error("[v0] Error in generatePageAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
