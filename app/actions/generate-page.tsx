"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// This ensures page creation works even if offer_id nullable migration hasn't been run
const SYSTEM_OFFER_ID = "00000000-0000-0000-0000-000000000001"

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

function normalizeAffiliateLink(link: string): string {
  // Remove any whitespace
  link = link.trim()

  // If the link already has a protocol, return it as is
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link
  }

  // If it starts with //, add https:
  if (link.startsWith("//")) {
    return "https:" + link
  }

  // Otherwise, add https://
  return "https://" + link
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 100)
}

export default async function generatePageAction(nicheId: string, affiliateLink: string) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    console.log("[v0] Generating page for user:", user.id)

    const normalizedAffiliateLink = normalizeAffiliateLink(affiliateLink)
    console.log("[v0] Normalized affiliate link:", normalizedAffiliateLink)

    const { data: niche, error: nicheError } = await supabase.from("niches").select("*").eq("id", nicheId).single()

    if (nicheError) {
      console.error("[v0] Error fetching niche:", nicheError)
      return { success: false, error: "Failed to fetch niche" }
    }

    if (!niche) {
      return { success: false, error: "Invalid niche" }
    }

    console.log("[v0] Generating content for niche:", niche.name)

    const prompt = `Write a comprehensive, high-value affiliate marketing article of at least 2,000 words in the ${niche.name} niche.

FORMAT THE ARTICLE AS HTML with proper structure:
- Use <h1> for the main headline
- Use <h2> for major section headings
- Use <h3> for subsection headings
- Use <p> for paragraphs
- Use <strong> for emphasis
- IMPORTANT: Include 10-12 inline hyperlinks distributed naturally throughout the article (every 2-3 paragraphs)
- Make relevant keywords and phrases into hyperlinks to [LINK]
- Use contextual anchor text like "this proven method", "the solution", "learn the exact strategy", "discover how", etc.
- Format inline links as: <a href="[LINK]" class="inline-link">keyword phrase</a>
- Also include explicit CTAs with phrases like "click here", "learn more", "get started"
- Format CTA links as: <a href="[LINK]" class="affiliate-link">click here</a>
- NEVER show raw URLs or long links in the text

<h2>The Problem You're Facing</h2>
<p>Opening hook that grabs attention (300+ words)</p>
<p>Start with a relatable problem or story. Many people struggle with this issue, but <a href="[LINK]" class="inline-link">there's a proven solution</a> that has helped thousands.</p>
<p>Build empathy and connection</p>
<p>Mention how <a href="[LINK]" class="inline-link">this specific approach</a> addresses the root cause.</p>

<h2>Why Traditional Solutions Don't Work</h2>
<p>Deep dive into the pain points (400+ words)</p>
<p>Make the reader feel understood</p>
<p>Amplify the cost of not solving the problem. That's why <a href="[LINK]" class="inline-link">the right system</a> makes all the difference.</p>

<div class="mid-article-cta">
  <h3>Ready to See Real Results?</h3>
  <p>Don't wait another day struggling with outdated methods. <a href="[LINK]" class="affiliate-link">Click here to get started now</a> and join thousands who are already succeeding.</p>
</div>

<h2>Introducing the Solution You've Been Looking For</h2>
<p>Explain what it is and how it works (500+ words). This is where <a href="[LINK]" class="inline-link">the breakthrough method</a> comes in.</p>
<p>Focus on the transformation it provides</p>
<p>Share specific features that deliver results. Users report that <a href="[LINK]" class="inline-link">this exact strategy</a> changed everything for them.</p>

<h3>How It Works</h3>
<p>Step-by-step explanation with <a href="[LINK]" class="inline-link">proven techniques</a></p>

<h3>What Makes It Different</h3>
<p>Unique selling points. Unlike anything else, <a href="[LINK]" class="inline-link">this system</a> is designed for real results.</p>

<h2>The Benefits You'll Experience</h2>
<p>List 5-7 key benefits with explanations (400+ words)</p>
<p>Include specific outcomes users can expect when they <a href="[LINK]" class="inline-link">implement this approach</a></p>
<p>Add benefits like faster results, easier implementation, and lasting transformation</p>

<h2>Real Results from Real People</h2>
<p>Social proof section (200+ words)</p>
<p>Mention success stories of people who used <a href="[LINK]" class="inline-link">this exact method</a></p>
<p>Include statistics if relevant</p>

<h2>Is This Right for You?</h2>
<p>Addressing objections (300+ words)</p>
<p>"Is this right for me?" - If you're serious about results, <a href="[LINK]" class="inline-link">this system</a> is perfect for you.</p>
<p>"How long does it take?"</p>
<p>"What if it doesn't work?" - That's why <a href="[LINK]" class="inline-link">the proven framework</a> includes guarantees.</p>

<h2>How to Get Started Today</h2>
<p>Strong call-to-action (200+ words)</p>
<p>Create urgency (limited time, bonuses, etc.)</p>
<p>Clear next steps: If you're ready to transform your results, <a href="[LINK]" class="affiliate-link">click here to get started</a> with instant access.</p>
<p>Use natural language: "You can <a href="[LINK]" class="affiliate-link">learn more here</a>" or "Ready to begin? <a href="[LINK]" class="affiliate-link">Get instant access</a>"</p>
<p>Reinforce the transformation with <a href="[LINK]" class="inline-link">this life-changing opportunity</a></p>

CRITICAL REQUIREMENTS:
- Include 10-12 inline hyperlinks (use class="inline-link") distributed naturally every 2-3 paragraphs
- Use keyword phrases as anchor text: "this proven method", "the breakthrough system", "the exact strategy", "this powerful approach"
- Also include 3-4 explicit CTA links (use class="affiliate-link") with "click here", "learn more", "get started"
- Add the mid-article CTA section in the middle of the content
- Write naturally and conversationally
- Use short paragraphs (2-3 sentences max)
- Include subheadings every 200-300 words
- NEVER show raw URLs - always use contextual link text
- DO NOT mention "affiliate link" or "commission"
- Write complete HTML with proper tags

Write the complete HTML article now:`

    let articleContent = await generateWithRapidAPI(prompt)

    console.log("[v0] Generated article length:", articleContent.length)

    articleContent = articleContent.replace(/\`\`\`html\s*/gi, '').replace(/\`\`\`\s*/g, '')
    articleContent = articleContent.trim()

    if (articleContent.length < 4000) {
      console.log("[v0] Article too short, generating part 2...")
      const part2Prompt = `Continue the previous HTML article about ${niche.name}. Add 1,000 more words with proper HTML formatting:
- Use <h2> and <h3> for headings
- Use <p> for paragraphs
- Include more <a href="[LINK]" class="inline-link">inline links</a>
- Cover: More detailed benefits, step-by-step guide, FAQs, final CTA
Write naturally as a continuation with proper HTML tags:`

      const part2 = await generateWithRapidAPI(part2Prompt)
      const cleanedPart2 = part2.replace(/\`\`\`html\s*/gi, '').replace(/\`\`\`\s*/g, '').trim()
      articleContent += "\n\n" + cleanedPart2
      console.log("[v0] Final article length:", articleContent.length)
    }

    articleContent = articleContent.replace(/\[LINK\]/g, normalizedAffiliateLink)

    const h1Match = articleContent.match(/<h1[^>]*>(.*?)<\/h1>/i)
    const title = h1Match ? h1Match[1].replace(/<[^>]*>/g, "").substring(0, 200) : `${niche.name} - Complete Guide`

    console.log("[v0] Content generated, inserting into database")

    let insertData: any = {
      user_id: user.id,
      niche_id: nicheId,
      offer_id: null,
      title,
      content: articleContent,
      affiliate_link: normalizedAffiliateLink,
      status: "active",
    }

    let { data: newPage, error: insertError } = await supabase
      .from("pages")
      .insert(insertData)
      .select()
      .single()

    // If insertion failed due to NOT NULL constraint, retry with system offer ID
    if (insertError && insertError.message.includes("offer_id")) {
      console.log("[v0] offer_id null failed, using system offer ID as fallback")
      insertData.offer_id = SYSTEM_OFFER_ID
      
      const retryResult = await supabase
        .from("pages")
        .insert(insertData)
        .select()
        .single()
      
      newPage = retryResult.data
      insertError = retryResult.error
    }

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
