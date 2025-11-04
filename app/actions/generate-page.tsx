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

FORMAT THE ARTICLE AS HTML with proper structure:
- Use <h1> for the main headline
- Use <h2> for major section headings
- Use <h3> for subsection headings
- Use <p> for paragraphs
- Use <strong> for emphasis
- Use <a href="[LINK]" class="affiliate-link">text</a> for inline affiliate links (use [LINK] as placeholder)
- Include 8-10 inline affiliate links throughout the article naturally

ARTICLE REQUIREMENTS:
- Minimum 2,000 words (this is critical - do not write less)
- Write in a conversational, engaging tone that builds trust
- Include personal anecdotes and relatable stories
- Focus on benefits and transformation, not just features
- Address common objections and concerns
- Use persuasive copywriting techniques
- Include social proof and credibility markers
- Create urgency without being pushy

STRUCTURE WITH HTML TAGS:
<h1>Compelling headline that promises a specific benefit</h1>

<h2>The Problem You're Facing</h2>
<p>Opening hook that grabs attention (300+ words)</p>
<p>Start with a relatable problem or story</p>
<p>Build empathy and connection</p>
<p>Include an <a href="[LINK]" class="affiliate-link">inline link</a> naturally</p>

<h2>Why Traditional Solutions Don't Work</h2>
<p>Deep dive into the pain points (400+ words)</p>
<p>Make the reader feel understood</p>
<p>Amplify the cost of not solving the problem</p>

<h2>Introducing ${offer.title}: The Solution You've Been Looking For</h2>
<p>Explain what it is and how it works (500+ words)</p>
<p>Focus on the transformation it provides</p>
<p>Share specific features that deliver results</p>
<p>Include <a href="[LINK]" class="affiliate-link">multiple inline links</a> throughout</p>

<h3>How It Works</h3>
<p>Step-by-step explanation</p>

<h3>What Makes It Different</h3>
<p>Unique selling points</p>

<h2>The Benefits You'll Experience</h2>
<p>List 5-7 key benefits with explanations (400+ words)</p>
<p>Include specific outcomes users can expect</p>
<p>Add <a href="[LINK]" class="affiliate-link">links to learn more</a></p>

<h2>Real Results from Real People</h2>
<p>Social proof section (200+ words)</p>
<p>Mention success stories</p>
<p>Include statistics if relevant</p>

<h2>Is This Right for You?</h2>
<p>Addressing objections (300+ words)</p>
<p>"Is this right for me?"</p>
<p>"How long does it take?"</p>
<p>"What if it doesn't work?"</p>

<h2>How to Get Started Today</h2>
<p>Strong call-to-action (200+ words)</p>
<p>Create urgency (limited time, bonuses, etc.)</p>
<p>Clear next steps with <a href="[LINK]" class="affiliate-link">action links</a></p>
<p>Reinforce the transformation</p>

IMPORTANT:
- Write naturally and conversationally
- Use short paragraphs (2-3 sentences max)
- Include subheadings every 200-300 words
- Use transition phrases to maintain flow
- Include 8-10 inline affiliate links throughout (use [LINK] as placeholder)
- DO NOT mention "affiliate link" or "commission"
- Write complete HTML with proper tags

Write the complete HTML article now:`

    let articleContent = await generateWithRapidAPI(prompt)

    console.log("[v0] Generated article length:", articleContent.length)

    if (articleContent.length < 4000) {
      console.log("[v0] Article too short, generating part 2...")
      const part2Prompt = `Continue the previous HTML article about "${offer.title}". Add 1,000 more words with proper HTML formatting:
- Use <h2> and <h3> for headings
- Use <p> for paragraphs
- Include more <a href="[LINK]" class="affiliate-link">inline links</a>
- Cover: More detailed benefits, step-by-step guide, FAQs, final CTA
Write naturally as a continuation with proper HTML tags:`

      const part2 = await generateWithRapidAPI(part2Prompt)
      articleContent += "\n\n" + part2
      console.log("[v0] Final article length:", articleContent.length)
    }

    articleContent = articleContent.replace(/\[LINK\]/g, affiliateLink)

    const h1Match = articleContent.match(/<h1[^>]*>(.*?)<\/h1>/i)
    const title = h1Match
      ? h1Match[1].replace(/<[^>]*>/g, "").substring(0, 200)
      : `${offer.title} - Complete Review & Guide`

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
        status: "active",
      })
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Error inserting page:", insertError)
      return { success: false, error: `Database error: ${insertError.message}` }
    }

    console.log("[v0] Page created successfully:", newPage.id)

    revalidatePath("/pages")
    revalidatePath("/dashboard")

    return {
      success: true,
      pageId: newPage.id,
      publicUrl: `/article/${newPage.id}`,
    }
  } catch (error) {
    console.error("[v0] Error in generatePageAction:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
