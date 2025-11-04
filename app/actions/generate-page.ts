"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

async function generateWithRapidAPI(prompt: string): Promise<string> {
  const response = await fetch("https://chatgpt-42.p.rapidapi.com/gpt4", {
    method: "POST",
    headers: {
      "x-rapidapi-key": "e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316",
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      web_access: false,
    }),
  })

  if (!response.ok) {
    throw new Error(`RapidAPI error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.result || data.message || data.content || ""
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 100)
}

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

    const prompt = `Write a comprehensive, high-value affiliate marketing article of at least 2,000 words promoting "${offer.title}" in the ${niche.name} niche.

ARTICLE REQUIREMENTS:
- Minimum 2,000 words (this is critical - do not write less)
- Write in a conversational, engaging tone that builds trust
- Include personal anecdotes and relatable stories
- Focus on benefits and transformation, not just features
- Address common objections and concerns
- Use persuasive copywriting techniques
- Include social proof and credibility markers
- Create urgency without being pushy

STRUCTURE:
1. Compelling headline that promises a specific benefit
2. Opening hook that grabs attention (300+ words)
   - Start with a relatable problem or story
   - Build empathy and connection
   - Tease the solution

3. The Problem Section (400+ words)
   - Deep dive into the pain points
   - Make the reader feel understood
   - Amplify the cost of not solving the problem

4. The Solution - Introduce ${offer.title} (500+ words)
   - Explain what it is and how it works
   - Focus on the transformation it provides
   - Share specific features that deliver results
   - Include how it's different from alternatives

5. Benefits & Results (400+ words)
   - List 5-7 key benefits with explanations
   - Include specific outcomes users can expect
   - Use bullet points for easy scanning

6. Social Proof Section (200+ words)
   - Mention success stories (you can create realistic examples)
   - Include statistics if relevant
   - Build credibility

7. Addressing Objections (300+ words)
   - "Is this right for me?"
   - "How long does it take?"
   - "What if it doesn't work?"
   - Provide reassuring answers

8. Strong Call-to-Action (200+ words)
   - Create urgency (limited time, bonuses, etc.)
   - Clear next steps
   - Reinforce the transformation
   - Include the phrase "Click here to get started" multiple times

IMPORTANT INSTRUCTIONS:
- Write naturally and conversationally
- Use short paragraphs (2-3 sentences max)
- Include subheadings every 200-300 words
- Use transition phrases to maintain flow
- End with a powerful call-to-action
- DO NOT include any HTML tags or markdown - just plain text with line breaks
- DO NOT mention "affiliate link" or "commission" - keep it natural
- Where you want to include a link, write [AFFILIATE_LINK] and I'll replace it

Write the complete article now:`

    let articleContent = await generateWithRapidAPI(prompt)

    console.log("[v0] Generated article length:", articleContent.length)

    if (articleContent.length < 4000) {
      console.log("[v0] Article too short, generating part 2...")
      const part2Prompt = `Continue the previous article about "${offer.title}". Add 1,000 more words covering:
- More detailed benefits and use cases
- Step-by-step guide on getting started
- Frequently asked questions
- Final compelling call-to-action
Write naturally as a continuation:`

      const part2 = await generateWithRapidAPI(part2Prompt)
      articleContent += "\n\n" + part2
      console.log("[v0] Final article length:", articleContent.length)
    }

    articleContent = articleContent.replace(/\[AFFILIATE_LINK\]/g, affiliateLink)
    articleContent = articleContent.replace(
      /(click here|get started|learn more|try it now|check it out)/gi,
      `$1: ${affiliateLink}`,
    )

    const lines = articleContent.split("\n").filter((line) => line.trim())
    const title = lines[0]?.substring(0, 200) || `${offer.title} - Complete Review & Guide`
    const baseSlug = generateSlug(title)
    const slug = `${baseSlug}-${Date.now().toString(36)}`

    console.log("[v0] Content generated, inserting into database")

    const { data: newPage, error: insertError } = await supabase
      .from("pages")
      .insert({
        user_id: user.id,
        niche_id: nicheId,
        offer_id: offerId,
        title,
        content: articleContent,
        affiliate_link: affiliateLink,
        slug,
        status: "active",
      })
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Error inserting page:", insertError)
      return { success: false, error: "Failed to save page" }
    }

    console.log("[v0] Page created successfully:", newPage.id)

    revalidatePath("/pages")
    revalidatePath("/dashboard")

    return {
      success: true,
      pageId: newPage.id,
      slug: newPage.slug,
      publicUrl: `/article/${newPage.slug}`,
    }
  } catch (error) {
    console.error("[v0] Error in generatePageAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
